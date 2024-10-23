import express from 'express';
import midtransClient from "midtrans-client";
import prisma from '../../prisma/prismaClient.js'; 

const router = express.Router();

router.post("/payment-process", async (req, res) => {
    try {
        const snap = new midtransClient.Snap({
            isProduction: false,
            serverKey: process.env.SERVER_KEY,
            clientKey: process.env.PUBLIC_CLIENT_KEY,
        });

        const testId = req.body.testId;  

        const test = await prisma.test.findFirst({
            where: {
                id: testId  
            }
        });

        if (!test) {
            return res.status(404).json({ error: 'Test not found' });
        }

        const orderId = `${testId}-${Date.now()}`;    
        const grossAmount = test.price;  

        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: grossAmount,
            },
            callbacks: {
                finish: process.env.DOMAIN  
            },
            enabled_payments: [
                "mandiri_clicpay", 
                "bca_clicpay", 
                "bni_va", 
                "bca_va",
                "other_va",
            ],
        };

        snap.createTransaction(parameter)
        .then((snapResponse) => {
            const dataPayment = {
                midtransResponse : JSON.stringify(snapResponse),
            };

            const snapResponseToken = snapResponseToken

            res.status(200).json({ token: snapResponseToken, dataPayment });
        })
        .catch((error) => {
            console.error('Error creating transaction:', error);
            res.status(500).json({ error: 'Internal server error' });
        });
    } catch (error) {
        console.error("Server error:", error); 
        return res.status(500).json({ error: error.message });
    }
});

// Route untuk menerima notifikasi webhook dari Midtrans
router.post("/webhook", async (req, res) => {
    try {
        const notification = req.body;
        const orderId = notification.order_id;
        const transactionStatus = notification.transaction_status;
        const paymentTime = notification.transaction_time;
        
        // Periksa status transaksi dari webhook
        if (transactionStatus === 'settlement') {
            // Pembayaran berhasil
            await prisma.transaction.update({
                where: { orderId: orderId },
                data: { 
                    isPaid: true, 
                    status: 'settlement',
                    paymentTime: new Date(paymentTime),  // Simpan waktu pembayaran dari webhook
                }
            });
        } else if (transactionStatus === 'pending') {
            await prisma.transaction.update({
                where: { orderId: orderId },
                data: { status: 'pending' }
            });
            // Pembayaran masih pending
            console.log('Pembayaran masih pending');
        } else if (transactionStatus === 'cancel') {
            await prisma.transaction.update({
                where: { orderId: orderId },
                data: { status: 'cancel' }
            });
            // Pembayaran dibatalkan
            console.log('Pembayaran dibatalkan');
        }

        // Kirim response 200 untuk memberi tahu Midtrans bahwa notifikasi diterima
        res.status(200).json({ message: 'Notifikasi diterima' });

    } catch (error) {
        console.error('Error dalam webhook:', error);
        res.status(500).json({ error: 'Error memproses webhook' });
    }
});

router.get("/status/:orderId", async (req, res) => {
    try {
        const snap = new midtransClient.Snap({
            isProduction: false,
            clientKey: process.env.PUBLIC_CLIENT_KEY,
            serverKey: process.env.SERVER_KEY,
        });

        snap.transaction
            .status(req.params.orderId)
            .then(response => {
                res.status(200).json(response)
            }).catch((error) => {
                res.status(404).json({error: "Order Tidak Ditemukan"})
            });
        } catch (error) {
        return res.status(500).json({error: error.message});
        }
    }
);

router.get('/thanks', (req, res) => {
    res.send('<h1>Terima kasih telah melakukan pembayaran!</h1>');
});

export default router;
