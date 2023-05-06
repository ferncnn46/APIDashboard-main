/*
  Warnings:

  - You are about to drop the column `transRef` on the `historyslip` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[qrCode]` on the table `historyslip` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `qrCode` to the `historyslip` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `historyslip_transRef_key` ON `historyslip`;

-- AlterTable
ALTER TABLE `historyslip` DROP COLUMN `transRef`,
    ADD COLUMN `qrCode` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `historyslip_qrCode_key` ON `historyslip`(`qrCode`);
