/*
  Warnings:

  - You are about to drop the column `licensetype` on the `license` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `license` DROP COLUMN `licensetype`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `plan` ENUM('NotAllow', 'Basic', 'Pro', 'Premium') NOT NULL DEFAULT 'NotAllow';
