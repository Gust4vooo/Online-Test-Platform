import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const createTransactionService = async (newTransaction) => {
    return await prisma.transaction.create({
        data: {
            testId: newTransaction.testId,
            userId: newTransaction.userId,
            paymentMethod: newTransaction.paymentMethod,
            price: newTransaction.price,
            total: newTransaction.total,
            status: 'pending',
            paymentTime: null,
            isPaid: false
        },
        include: {
            test: true,   // Menyertakan data test
            user: true,   // Menyertakan data user
        }
    });
};

// Get a transaction by ID
const getTransactionByIdService = async (transactionId) => {
    try {
        const transaction = await prisma.transaction.findUnique({
            where: {
                id: transactionId,
            },
            include: {
                test: true,   // Menyertakan relasi test
                user: true,   // Menyertakan relasi user
            }
        });

        return transaction; // Return transaction if found
    } catch (error) {
        console.error("Error fetching transaction from database:", error);
        throw new Error('Database error'); // Handle error
    }
};

// Update an existing transaction
const updateTransactionService = async (transactionId, updatedData) => {
    return await prisma.transaction.update({
        where: { id: transactionId },
        status: { newStatus },
    });
};

// Delete a transaction by ID
const deleteTransactionService = async (transactionId) => {
    return await prisma.transaction.delete({
        where: { id: transactionId },
    });
};

export { createTransactionService, getTransactionByIdService, updateTransactionService, deleteTransactionService };