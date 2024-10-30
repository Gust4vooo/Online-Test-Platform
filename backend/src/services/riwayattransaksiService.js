import prisma from '../../prisma/prismaClient.js';

export const getTransactionByUserId = async (userId) => {
    try {
        const transactions = await prisma.transaction.findMany({
            where: { userId },
            include: {
                test: {
                    include: {
                        author: true, // Mendapatkan informasi penulis tes
                    },
                },
            },
            orderBy: {
                paymentTime: 'desc',
            },
        });

        // Transformasi setiap transaksi dengan informasi history count
        const transformedTransactions = await Promise.all(
            transactions.map(async (transaction) => {
                // Hitung berapa kali tes sudah dikerjakan oleh semua pengguna
                const historyCount = await prisma.history.count({
                    where: {
                        testId: transaction.testId,
                    },
                });

                const history = await prisma.history.findFirst({
                    where: {
                        userId: transaction.userId,
                        testId: transaction.testId,
                    },
                });

                // Tentukan status khusus untuk transaksi
                let customStatus;
                if (transaction.status === 'Unpaid') {
                    customStatus = 'Belum Bayar';
                } else if (transaction.status === 'Success' && !history) {
                    customStatus = 'Berhasil (Belum Dikerjakan)';
                } else if (transaction.status === 'Success' && history) {
                    customStatus = 'Selesai (Sudah Dikerjakan)';
                } else if (transaction.status === 'Unsuccessful') {
                    customStatus = 'Tidak Berhasil';
                }

                return {
                    ...transaction,
                    customStatus,
                    historyCount, // Tambahkan jumlah peserta ke setiap transaksi
                };
            })
        );

        return transformedTransactions;
    } catch (error) {
        console.error('Error fetching transaction history:', error);
        throw new Error('Failed to retrieve transaction history');
    }
};


// import prisma from '../../prisma/prismaClient.js';

// export const getTransactionByUserId = async (userId) => {
//     try {
//         const transactions = await prisma.transaction.findMany({
//             where: { userId },
//             include: {
//                 test: {
//                     include: {
//                         author: true,  // Menambahkan relasi author
//                     },
//                 },
//             },
//             orderBy: {
//                 paymentTime: 'desc',  // Mengatur sorting berdasarkan waktu pembayaran
//             },
//         });
//         return transactions;
//     } catch (error) {
//         throw new Error('Failed to retrieve transaction history');
//     }
// };

// export const getTransactionById = async (transactionId) => {
//     try {
//         const transaction = await prisma.transaction.findUnique({
//             where: { id: transactionId },
//             include: {
//                 test: {
//                     include: {
//                         author: true,  // Menambahkan include author untuk mendapatkan nama author
//                     }
//                 },
//                 user: true,
//             }
//         });
//         if (!transaction) {
//             throw new Error('Transaction not found');
//         }
//         return transaction;
//     } catch (error) {
//         throw new Error('Failed to retrieve transaction details');
//     }
// };