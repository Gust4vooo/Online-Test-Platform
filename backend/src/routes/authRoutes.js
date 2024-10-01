import express from 'express';
<<<<<<< HEAD
import { registrasi, login, logout } from '../controllers/authController.js';
=======
import { registrasi, login, logout } from '../controllers/authControllers.js';
>>>>>>> e88b080d (be-new-auth)

const router = express.Router();

// Route untuk registrasi
router.post('/registrasi', registrasi);

// Route untuk login
router.post('/login', login);

// Route untuk logout
router.post('/logout', logout);

<<<<<<< HEAD
export default router;
=======
export default router;
>>>>>>> e88b080d (be-new-auth)
