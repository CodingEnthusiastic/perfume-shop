import Review from '../models/Review.js';
import Product from '../models/Product.js';

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
export const getProductReviews = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const total = await Review.countDocuments({ productId: req.params.productId });
    const reviews = await Review.find({ productId: req.params.productId })
      .populate('userId', 'firstName lastName profileImage')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: reviews.length,
      total,
      pages: Math.ceil(total / limit),
      reviews,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create review
// @route   POST /api/reviews
// @access  Private
export const createReview = async (req, res, next) => {
  try {
    const { productId, rating, title, comment } = req.body;

    if (!productId || !rating || !title || !comment) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({
      userId: req.user.id,
      productId,
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this product',
      });
    }

    const review = await Review.create({
      userId: req.user.id,
      productId,
      rating,
      title,
      comment,
    });

    // Update product rating
    const allReviews = await Review.find({ productId });
    const avgRating = allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;

    await Product.findByIdAndUpdate(
      productId,
      { rating: avgRating, reviewCount: allReviews.length },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      review: await review.populate('userId', 'firstName lastName profileImage'),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
export const updateReview = async (req, res, next) => {
  try {
    const { rating, title, comment } = req.body;

    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    // Check ownership
    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this review',
      });
    }

    review.rating = rating || review.rating;
    review.title = title || review.title;
    review.comment = comment || review.comment;

    await review.save();

    // Update product rating
    const allReviews = await Review.find({ productId: review.productId });
    const avgRating = allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length;

    await Product.findByIdAndUpdate(
      review.productId,
      { rating: avgRating },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Review updated successfully',
      review: await review.populate('userId', 'firstName lastName profileImage'),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found',
      });
    }

    // Check ownership
    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this review',
      });
    }

    const productId = review.productId;
    await Review.findByIdAndDelete(req.params.id);

    // Update product rating
    const allReviews = await Review.find({ productId });
    const avgRating = allReviews.length > 0 ? allReviews.reduce((acc, r) => acc + r.rating, 0) / allReviews.length : 0;

    await Product.findByIdAndUpdate(
      productId,
      { rating: avgRating, reviewCount: allReviews.length },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};
