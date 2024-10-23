import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const checkTransactionStatus = async (userId, testId) => {
    return await prisma.transaction.findFirst({
      where: {
        userId: userId,
        testId: testId
      },
      orderBy: {
        paymentTime: 'desc'
      }
    });
}

export { checkTransactionStatus };