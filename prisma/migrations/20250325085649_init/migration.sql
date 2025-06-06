-- AlterTable
ALTER TABLE `Category` MODIFY `createdBy` VARCHAR(191) NOT NULL,
    MODIFY `updateBy` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `imageUrl` VARCHAR(191) NULL,
    MODIFY `createdBy` VARCHAR(191) NOT NULL,
    MODIFY `updateBy` VARCHAR(191) NOT NULL;
