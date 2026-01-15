import express from 'express';
import {
  createContact,
  getAllContacts,
  getContactById,
  updateContact,
  deleteContact,
} from '../controllers/contactController.js';
import protect from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/', createContact);

// Admin routes (to be protected with admin middleware)
router.get('/', protect, getAllContacts);
router.get('/:id', protect, getContactById);
router.put('/:id', protect, updateContact);
router.delete('/:id', protect, deleteContact);

export default router;
