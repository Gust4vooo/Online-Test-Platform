// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export const handleMidtransNotification = async (req, res) => {
//     const notificationData = req.body; 

//     try {
//         const { userId, testId, paymentMethod, price, total, status, paymentTime } = notificationData;

//         await prisma.transaction.upsert({
//             where: {
//                 id: order_id 
//             },
//             update: {
//                 status: status || "SUCCESS",
//                 paymentTime: new Date(paymentTime)
//             },
//             create: {
//                 id: orderId,
//                 userId: userId, // userId valid dari request
//                 testId: testId, // testId valid dari request
//                 paymentMethod: paymentMethod || "credit_card",
//                 price: parseInt(price, 10), // Konversi string ke integer
//                 total: parseInt(total, 10),
//                 status: status || "SUCCESS",
//                 paymentTime: new Date(paymentTime)
//             }
//         });


//         return res.status(200).json({ message: 'Transaction updated successfully', transaction });
//     } catch (error) {
//         console.error('Error saving transaction:', error);
//         return res.status(500).json({ message: 'Failed to save transaction', error: error.message });
//     }
// };
