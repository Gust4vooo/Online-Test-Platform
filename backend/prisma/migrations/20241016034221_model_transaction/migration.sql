/*
  Warnings:

  - You are about to drop the column `paymentTime` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `paymentT78ime` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "paymentTime",
ADD COLUMN     "paymentT78ime" TIMESTAMP(3) NOT NULL;
