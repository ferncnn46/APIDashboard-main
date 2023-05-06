/*
  Warnings:

  - A unique constraint covering the columns `[license]` on the table `license` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `license_license_key` ON `license`(`license`);
