-- CreateTable
CREATE TABLE `account` (
    `accountId` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `point` INTEGER NOT NULL DEFAULT 0,
    `isAdmin` BOOLEAN NOT NULL DEFAULT false,

    UNIQUE INDEX `account_username_key`(`username`),
    UNIQUE INDEX `account_email_key`(`email`),
    PRIMARY KEY (`accountId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `historytopup` (
    `historyId` INTEGER NOT NULL AUTO_INCREMENT,
    `method` ENUM('wallet', 'bank') NOT NULL DEFAULT 'wallet',
    `code` VARCHAR(191) NOT NULL,
    `amount` INTEGER NOT NULL,
    `accountId` INTEGER NOT NULL,

    PRIMARY KEY (`historyId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `paymentconfig` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `wallet` VARCHAR(191) NOT NULL,
    `bankName` VARCHAR(191) NOT NULL,
    `bankAccount` VARCHAR(191) NOT NULL,
    `bankCode` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `historytopup` ADD CONSTRAINT `historytopup_accountId_fkey` FOREIGN KEY (`accountId`) REFERENCES `account`(`accountId`) ON DELETE RESTRICT ON UPDATE CASCADE;
