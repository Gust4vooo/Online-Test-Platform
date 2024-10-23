import express from 'express';
import { handleQuizAccess } from '../controllers/checkStatusController.js';

const router = express.Router();

router.get('/quiz-detail/:testId', handleQuizAccess);

export default router;