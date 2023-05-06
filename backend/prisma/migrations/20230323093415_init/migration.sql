/*
  Warnings:

  - A unique constraint covering the columns `[license]` on the table `license` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE `historyslip` (
    `slipId` INTEGER NOT NULL AUTO_INCREMENT,
    `transRef` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `historyslip_transRef_key`(`transRef`),
    PRIMARY KEY (`slipId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `license_license_key` ON `license`(`license`);
