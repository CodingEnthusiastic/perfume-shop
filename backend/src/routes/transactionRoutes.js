import express from 'express';
import {
  createTransaction,
  getUserTransactions,
  getTransactionById,
  updateTransactionStatus,
  getAllTransactions,
} from '../controllers/transactionController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// Protected routes
router.post('/', protect, createTransaction);
router.get('/', protect, getUserTransactions);
router.get('/:id', protect, getTransactionById);

// Admin routes
router.put('/:id', protect, updateTransactionStatus);
router.get('/admin/all', protect, getAllTransactions);

export default router;
