import Product from '../models/Product.js';

// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const { category, brand, minPrice, maxPrice, search, sort, page = 1, limit = 12 } = req.query;

    let filter = {};

    if (category) {
      filter.category = category;
    }

    if (brand) {
      filter.brand = brand;
    }

    if (search) {
      filter.$text = { $search: search };
    }

    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = parseFloat(minPrice);
      if (maxPrice) filter.price.$lte = parseFloat(maxPrice);
    }

    const skip = (page - 1) * limit;
    let sortObj = {};

    if (sort === 'price-low') {
      sortObj = { price: 1 };
    } else if (sort === 'price-high') {
      sortObj = { price: -1 };
    } else if (sort === 'newest') {
      sortObj = { createdAt: -1 };
    } else if (sort === 'rating') {
      sortObj = { rating: -1 };
    } else {
      sortObj = { createdAt: -1 };
    }

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter).sort(sortObj).skip(skip).limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured products
// @route   GET /api/products/featured
// @access  Public
export const getFeaturedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ featured: true }).limit(6);

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create product (Admin)
// @route   POST /api/products
// @access  Private/Admin
export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
// @access  Private/Admin
export const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
// @access  Private/Admin
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get product categories
// @route   GET /api/products/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const categories = await Product.distinct('category');

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get product brands
// @route   GET /api/products/brands
// @access  Public
export const getBrands = async (req, res, next) => {
  try {
    const brands = await Product.distinct('brand');

    res.status(200).json({
      success: true,
      brands,
    });
  } catch (error) {
    next(error);
  }
};
