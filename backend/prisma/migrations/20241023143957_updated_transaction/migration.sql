/*
  Warnings:

  - The values [PENDING,SUCCESS,FAILED] on the enum `TransactionStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `optionLabel` on the `Option` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[optionId,resultId]` on the table `Detail_result` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[testId,userId,attemptNumber]` on the table `Result` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `attemptNumber` to the `Result` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TransactionStatus_new" AS ENUM ('Expired', 'Pending', 'Settlement');
ALTER TABLE "Transaction" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Transaction" ALTER COLUMN "status" TYPE "TransactionStatus_new" USING ("status"::text::"TransactionStatus_new");
ALTER TYPE "TransactionStatus" RENAME TO "TransactionStatus_old";
ALTER TYPE "TransactionStatus_new" RENAME TO "TransactionStatus";
DROP TYPE "TransactionStatus_old";
ALTER TABLE "Transaction" ALTER COLUMN "status" SET DEFAULT 'Pending';
COMMIT;

-- AlterTable
ALTER TABLE "Option" DROP COLUMN "optionLabel";

-- AlterTable
ALTER TABLE "Result" ADD COLUMN     "attemptNumber" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "isPaid" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "paymentTime" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'Pending';

-- CreateIndex
CREATE UNIQUE INDEX "Detail_result_optionId_resultId_key" ON "Detail_result"("optionId", "resultId");

-- CreateIndex
CREATE UNIQUE INDEX "Result_testId_userId_attemptNumber_key" ON "Result"("testId", "userId", "attemptNumber");
