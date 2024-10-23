import { checkTransactionStatus } from '../services/checkStatusServices.js';

export async function handleQuizAccess(req, res) {
  const { testId } = req.params;
  const { userId } = req.user; // Assuming req.user is populated from authentication middleware

  try {
    const test = await prisma.test.findUnique({
      where: { id: testId }
    });

    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    if (test.price === 0) {
        return res.redirect('http://localhost:3000/tes/mengerjakan-tes');
    }

    const transaction = await checkTransactionStatus(userId, testId);

    if (!transaction) {
        return res.redirect('http://localhost:3000/tes/kuis-terkunci');
    }

    if (transaction.status === 'Pending') {
      return res.render('quiz-locked', {
        message: 'Waiting for transaction to be processed',
        testId: testId
      });
    }

    if (transaction.status === 'Settlement') {
        return res.redirect('http://localhost:3000/tes/mengerjakan-tes');
    }

    return res.redirect('http://localhost:3000/tes/kuis-terkunci');
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
}