/*
  Warnings:

  - You are about to drop the column `paymentT78ime` on the `Transaction` table. All the data in the column will be lost.
  - The `status` column on the `Transaction` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `paymentTime` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'SUCCESS', 'FAILED');

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "paymentT78ime",
ADD COLUMN     "paymentTime" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
