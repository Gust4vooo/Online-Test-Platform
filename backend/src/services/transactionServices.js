import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new transaction
const createTransactionService = async (newTransaction) => {
    return await prisma.transaction.create({
        data: {
            testId: newTransaction.testId,
            userId: newTransaction.userId,
            paymentMethod: newTransaction.paymentMethod,
            paymentTime: newTransaction.paymentTime,
            price: newTransaction.price,
            total: newTransaction.total,
            status: newTransaction.status,
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