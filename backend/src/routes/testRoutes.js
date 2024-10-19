import express from 'express';
import { createTest, getTestDetail } from '../controllers/testControllers.js';
import { createTest, getTest, testResultController } from '../controllers/testControllers.js';

const router = express.Router();

router.post('/create-test', createTest);
router.get('/get-test/:id', getTest);
router.get('/test-detail/:testId', getTestDetail);
router.get('/test-result/:resultId', testResultController);

export default router; // Menggunakan default export