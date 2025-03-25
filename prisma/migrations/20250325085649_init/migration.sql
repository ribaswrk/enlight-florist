-- AlterTable
ALTER TABLE `category` MODIFY `createdBy` VARCHAR(191) NOT NULL,
    MODIFY `updateBy` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `product` ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    MODIFY `createdBy` VARCHAR(191) NOT NULL,
    MODIFY `updateBy` VARCHAR(191) NOT NULL;
