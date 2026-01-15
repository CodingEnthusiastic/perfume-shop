import User from '../models/User.js';
import generateToken from '../utils/generateToken.js';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { firstName, lastName, email, password, confirmPassword } = req.body;

    // Validate input
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match',
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 6 characters',
      });
    }

    // Check if user already exists
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered',
      });
    }

    // Create user
    user = new User({
      firstName,
      lastName,
      email,
      password,
      authProvider: 'local',
    });

    await user.save();

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if password matches
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const { firstName, lastName, phone, address, profileImage } = req.body;

    let user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phone = phone || user.phone;
    user.address = address || user.address;
    user.profileImage = profileImage || user.profileImage;

    await user.save();

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user: user.toJSON(),
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Google OAuth callback
// @route   GET /api/auth/google/callback
// @access  Public
export const googleCallback = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication failed' });
    }

    // req.user is already set by passport middleware with the user document
    const token = generateToken(req.user._id);
    
    // Redirect to frontend with token
    const redirectUrl = `${process.env.FRONTEND_URL}?token=${token}&userId=${req.user._id}`;
    res.redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
};

// @desc    GitHub OAuth callback
// @route   GET /api/auth/github/callback
// @access  Public
export const githubCallback = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Authentication failed' });
    }

    // req.user is already set by passport middleware with the user document
    const token = generateToken(req.user._id);
    
    // Redirect to frontend with token
    const redirectUrl = `${process.env.FRONTEND_URL}?token=${token}&userId=${req.user._id}`;
    res.redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
};
