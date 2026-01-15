import Transaction from '../models/Transaction.js';
import Product from '../models/Product.js';

// @desc    Create transaction
// @route   POST /api/transactions
// @access  Private
export const createTransaction = async (req, res, next) => {
  try {
    const { items, taxAmount, shippingAmount, discountAmount, paymentMethod, shippingAddress } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please add items to your order',
      });
    }

    let totalAmount = 0;
    const processedItems = [];

    // Validate and process items
    for (const item of items) {
      const product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.productId} not found`,
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`,
        });
      }

      const subtotal = product.price * item.quantity;
      totalAmount += subtotal;

      processedItems.push({
        productId: product._id,
        quantity: item.quantity,
        price: product.price,
        subtotal,
      });
    }

    const finalAmount = totalAmount + (taxAmount || 0) + (shippingAmount || 0) - (discountAmount || 0);

    const transaction = await Transaction.create({
      userId: req.user.id,
      items: processedItems,
      totalAmount,
      taxAmount: taxAmount || 0,
      shippingAmount: shippingAmount || 0,
      discountAmount: discountAmount || 0,
      finalAmount,
      paymentMethod,
      shippingAddress,
      status: 'pending',
      transactionId: `TXN-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    });

    // Update product stock
    for (const item of processedItems) {
      await Product.findByIdAndUpdate(
        item.productId,
        { $inc: { stock: -item.quantity } },
        { new: true }
      );
    }

    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user transactions
// @route   GET /api/transactions
// @access  Private
export const getUserTransactions = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    let filter = { userId: req.user.id };

    if (status) {
      filter.status = status;
    }

    const total = await Transaction.countDocuments(filter);
    const transactions = await Transaction.find(filter)
      .populate('items.productId', 'name price thumbnail')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: transactions.length,
      total,
      pages: Math.ceil(total / limit),
      transactions,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get transaction by ID
// @route   GET /api/transactions/:id
// @access  Private
export const getTransactionById = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.params.id).populate(
      'items.productId',
      'name price thumbnail'
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    // Check if user owns this transaction
    if (transaction.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this transaction',
      });
    }

    res.status(200).json({
      success: true,
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update transaction status (Admin)
// @route   PUT /api/transactions/:id
// @access  Private/Admin
export const updateTransactionStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Transaction updated successfully',
      transaction,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all transactions (Admin)
// @route   GET /api/admin/transactions
// @access  Private/Admin
export const getAllTransactions = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;

    let filter = {};

    if (status) {
      filter.status = status;
    }

    const total = await Transaction.countDocuments(filter);
    const transactions = await Transaction.find(filter)
      .populate('userId', 'firstName lastName email')
      .populate('items.productId', 'name price')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: transactions.length,
      total,
      pages: Math.ceil(total / limit),
      transactions,
    });
  } catch (error) {
    next(error);
  }
};
