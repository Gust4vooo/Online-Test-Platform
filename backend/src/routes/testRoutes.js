import express from 'express';
import { createTestController, publishTestController, getAllTests, fetchTestsByCategory, getAuthorTests, getTestCategoryByIdController } from '../controllers/testControllers.js';
import { authenticateToken } from '../middleware/authMiddleware.js'; 


const router = express.Router();

router.post('/tests', createTestController);

router.put('/tests/:testId/publish', publishTestController);

router.get('/category/:category', fetchTestsByCategory);

router.get('/get-test', getAllTests);
router.get('/author-tests', authenticateToken, getAuthorTests);
router.get('/tests/type', getTestCategoryByIdController);

export default router; 