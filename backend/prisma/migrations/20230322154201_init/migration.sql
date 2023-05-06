/*
  Warnings:

  - You are about to drop the column `wallet` on the `paymentconfig` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `paymentconfig` DROP COLUMN `wallet`;

-- CreateTable
CREATE TABLE `keys` (
    `keysid` INTEGER NOT NULL AUTO_INCREMENT,
    `keys` VARCHAR(191) NOT NULL,
    `keystype` ENUM('NotAllow', 'NurmalAccess', 'PremiumAccess', 'FreeAccess') NOT NULL DEFAULT 'NotAllow',
    `accountId` INTEGER NOT NULL,

    PRIMARY KEY (`keysid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `keys` ADD CONSTRAINT `keys_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`accountId`) ON DELETE RESTRICT ON UPDATE CASCADE;
