/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `event` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Event` DROP COLUMN `imageUrl`,
    ADD COLUMN `imageEventUrl` VARCHAR(191) NULL;
