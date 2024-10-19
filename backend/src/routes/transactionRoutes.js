import express from 'express';
import { createTransaction, getTransactionDetail, updateTransaction, deleteTransaction } from '../controllers/transactionController.js';

const router = express.Router();

// Create transaction
router.post('/transactions', createTransaction);

// Get transaction detail by ID
router.get('/transactions/:transactionId', getTransactionDetail);

// Update transaction by ID
router.put('/transactions/:transactionId', updateTransaction);

// Delete transaction by ID
router.delete('/transactions/:transactionId', deleteTransaction);

export default router; // Default export for routes
