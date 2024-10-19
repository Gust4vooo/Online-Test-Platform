import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import adminRoutes from './src/routes/adminRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import authorRoutes from './src/routes/authorRoutes.js';
import { startCleanupJob } from './src/jobs/schedularToken.js';
import testRoutes from './src/routes/testRoutes.js';
import multiplechoiceRoutes from './src/routes/multiplechoiceRoutes.js';
import answerTest from './src/routes/answerTestRoutes.js';
import dashboardRoutes from './src/routes/dashboardRoutes.js';
import paymentRoutes from './src/routes/paymentRoutes.js';
import transactionRoutes from './src/routes/transactionRoutes.js'
// import { orderApi } from './src/routes/orderAPI.js';
import detailSoal from './src/routes/detailsoalRoutes.js';
import timerRoutes from './src/routes/timerRoutes.js';

dotenv.config();
const app = express();
startCleanupJob();

// Middleware
app.use(express.json()); // Parse incoming JSON requests
app.use(cors()); // Enable CORS for all origins

// Parsing JSON dari request body
app.use(bodyParser.json()); 

// Parsing URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000', // Mengizinkan request dari frontend di port 3000
    methods: ['GET', 'POST', 'DELETE'],        // Metode HTTP yang diizinkan
    credentials: true                // Jika ingin mengirimkan cookies atau auth credentials
}));

app.use((req, res, next) => {
    res.setHeader('ngrok-skip-browser-warning', 'true');
    next();
});

// app.use("/api/auth", userRoutes);
app.use("/author", authorRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/soal", multiplechoiceRoutes);
app.use("/answer", answerTest);
app.use("/auth", authRoutes);

// Routes admin
app.use("/api/multiplechoice", multiplechoiceRoutes);
app.use("/api/answer-test", answerTest);
app.use("/api/payment", paymentRoutes);
app.use("/api/transaction", transactionRoutes);

// Routes dashboard
app.use("/dashboard", dashboardRoutes);
app.use('/tes', detailSoal);
app.use('/timer', timerRoutes);

// Mulai server
const PORT = process.env.PORT || 2000;
app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost ${PORT}`);
});