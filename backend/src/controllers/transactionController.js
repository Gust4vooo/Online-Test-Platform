import { createTransactionService, getTransactionByIdService, updateTransactionService, deleteTransactionService } from '../services/transactionServices.js';

const createTransaction = async (req, res) => {
    try {
        const newTransaction = req.body;

        if (!newTransaction.testId || !newTransaction.userId) {
            return res.status(400).send({
                message: 'Test ID and User ID are required',
            });
        }

        const transaction = await createTransactionService(newTransaction);

        res.status(201).send({
            data: transaction,
            message: 'Transaction created successfully',
        });
    } catch (error) {
        res.status(500).send({
            message: 'Failed to create transaction',
            error: error.message,
        });
    }
};

const getTransactionDetail = async (req, res) => {
    const { transactionId } = req.params;

    try {
        const transaction = await getTransactionByIdService(transactionId);

        if (!transaction) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        res.status(200).json(transaction);
    } catch (error) {
        console.error("Error fetching transaction detail:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const updateTransaction = async (req, res) => {
    const { transactionId } = req.params;
    const { status } = req.body;

    try {
        const transaction = await updateTransactionService(transactionId, status);

        res.status(200).send({
            data: transaction,
            message: 'Transaction updated successfully',
        });
    } catch (error) {
        res.status(500).send({
            message: 'Failed to update transaction',
            error: error.message,
        });
    }
};

const deleteTransaction = async (req, res) => {
    const { transactionId } = req.params;

    try {
        await deleteTransactionService(transactionId);
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete transaction' });
    }
};

export { createTransaction, getTransactionDetail, updateTransaction, deleteTransaction };