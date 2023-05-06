/*
  Warnings:

  - Added the required column `accountId` to the `historyslip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `historyslip` ADD COLUMN `accountId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `historyslip` ADD CONSTRAINT `historyslip_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`accountId`) ON DELETE RESTRICT ON UPDATE CASCADE;
