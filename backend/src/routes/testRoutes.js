import express from 'express';
<<<<<<< HEAD
import { createTest, getTest } from '../controllers/testControllers.js';
=======
import { createTest, getTestDetail } from '../controllers/testControllers.js';
>>>>>>> 67c6347a (get data test pada pembayaran)

const router = express.Router();

router.post('/create-test', createTest);
<<<<<<< HEAD
router.get('/get-test/:id', getTest);
=======
router.get('/test-detail/:testId', getTestDetail);
>>>>>>> 67c6347a (get data test pada pembayaran)

export default router; // Menggunakan default export