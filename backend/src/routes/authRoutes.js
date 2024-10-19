import express from 'express';
import { registrasi, login, logout } from '../controllers/authControllers.js';

const router = express.Router();

// Route untuk registrasi
router.post('/registrasi', registrasi);

// Route untuk login
router.post('/login', login);

// Route untuk logout
router.post('/logout', logout);

<<<<<<< HEAD
<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> e88b080d (be-new-auth)
=======
export default router;
>>>>>>> 69fdcd2f2369f16bf65bfc55a52ec832a8940796
