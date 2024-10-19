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
