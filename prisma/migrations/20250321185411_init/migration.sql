/*
  Warnings:

  - You are about to alter the column `createdBy` on the `category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `updateBy` on the `category` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `createdBy` on the `product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `updateBy` on the `product` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `Category` MODIFY `createdBy` INTEGER NOT NULL,
    MODIFY `updateBy` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Product` MODIFY `createdBy` INTEGER NOT NULL,
    MODIFY `updateBy` INTEGER NOT NULL;
