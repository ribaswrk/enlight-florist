/*
  Warnings:

  - You are about to drop the column `stock` on the `product` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Product` DROP COLUMN `stock`,
    ADD COLUMN `promoPrice` VARCHAR(191) NOT NULL DEFAULT '0',
    ADD COLUMN `soldqty` VARCHAR(191) NOT NULL DEFAULT '0';
