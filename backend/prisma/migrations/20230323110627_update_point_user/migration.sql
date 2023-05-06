/*
  Warnings:

  - You are about to alter the column `point` on the `account` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.

*/
-- AlterTable
ALTER TABLE `account` MODIFY `point` DOUBLE NOT NULL DEFAULT 0;
