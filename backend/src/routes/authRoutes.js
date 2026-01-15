import express from 'express';
import passport from 'passport';
import {
  register,
  login,
  getMe,
  updateProfile,
  googleCallback,
  githubCallback,
} from '../controllers/authController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Protected routes
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

// OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/api/auth/failed', session: false }), googleCallback);

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/api/auth/failed', session: false }), githubCallback);

export default router;
