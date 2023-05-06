/*
  Warnings:

  - The values [NurmalAccess,PremiumAccess,FreeAccess] on the enum `license_licensetype` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `license` MODIFY `licensetype` ENUM('NotAllow', 'Starter', 'Basic', 'Pro', 'Premium') NOT NULL DEFAULT 'NotAllow';

-- CreateTable
CREATE TABLE `errorlog` (
    `errorId` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `errorMessage` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`errorId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
