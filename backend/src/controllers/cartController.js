import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

// @desc    Get user's cart
// @route   GET /api/cart
// @access  Private
export const getCart = async (req, res, next) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
    
    if (!cart) {
      cart = await Cart.create({
        userId: req.user.id,
        items: [],
      });
    }

    res.status(200).json({
      success: true,
      cart,
      totalPrice: cart.getTotalPrice(),
      totalItems: cart.getTotalItems(),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add item to cart
// @route   POST /api/cart/add
// @access  Private
export const addToCart = async (req, res, next) => {
  try {
    const { productId, quantity = 1, size } = req.body;

    if (!productId || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Product ID and quantity are required',
      });
    }

    // Get product details
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Find or create cart
    let cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      cart = await Cart.create({
        userId: req.user.id,
        items: [],
      });
    }

    // Check if item already exists
    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId,
        name: product.name,
        price: product.price,
        quantity,
        size,
        image: product.images?.[0],
      });
    }

    await cart.save();

    res.status(201).json({
      success: true,
      message: 'Item added to cart',
      cart,
      totalPrice: cart.getTotalPrice(),
      totalItems: cart.getTotalItems(),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/update
// @access  Private
export const updateCartItem = async (req, res, next) => {
  try {
    const { productId, quantity, size } = req.body;

    if (!productId || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Product ID and valid quantity are required',
      });
    }

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart',
      });
    }

    if (quantity === 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart updated',
      cart,
      totalPrice: cart.getTotalPrice(),
      totalItems: cart.getTotalItems(),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private
export const removeFromCart = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { size } = req.query;

    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId && item.size === size
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart',
      });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Item removed from cart',
      cart,
      totalPrice: cart.getTotalPrice(),
      totalItems: cart.getTotalItems(),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found',
      });
    }

    cart.items = [];
    await cart.save();

    res.status(200).json({
      success: true,
      message: 'Cart cleared',
      cart,
    });
  } catch (error) {
    next(error);
  }
};
