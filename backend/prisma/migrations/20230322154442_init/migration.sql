/*
  Warnings:

  - You are about to drop the `keys` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `keys` DROP FOREIGN KEY `keys_accountId_fkey`;

-- DropTable
DROP TABLE `keys`;

-- CreateTable
CREATE TABLE `license` (
    `licenseid` INTEGER NOT NULL AUTO_INCREMENT,
    `license` VARCHAR(191) NOT NULL,
    `licensetype` ENUM('NotAllow', 'NurmalAccess', 'PremiumAccess', 'FreeAccess') NOT NULL DEFAULT 'NotAllow',
    `accountId` INTEGER NOT NULL,

    PRIMARY KEY (`licenseid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `license` ADD CONSTRAINT `license_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`accountId`) ON DELETE RESTRICT ON UPDATE CASCADE;
