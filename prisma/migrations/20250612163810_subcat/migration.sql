-- DropForeignKey
ALTER TABLE `Product` DROP FOREIGN KEY `product_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductImage` DROP FOREIGN KEY `productImage_productid_fkey`;

-- AlterTable
ALTER TABLE `Product` ADD COLUMN `description` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `subcategoryId` INTEGER NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `Subcategory` (
    `subcategoryId` INTEGER NOT NULL AUTO_INCREMENT,
    `subcatname` VARCHAR(191) NOT NULL,
    `imageSubCatUrl` TEXT NULL,
    `homeView` INTEGER NOT NULL DEFAULT 0,
    `createdBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateBy` VARCHAR(191) NOT NULL,
    `updateAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`subcategoryId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category`(`categoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_subcategoryId_fkey` FOREIGN KEY (`subcategoryId`) REFERENCES `Subcategory`(`subcategoryId`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductImage` ADD CONSTRAINT `ProductImage_productid_fkey` FOREIGN KEY (`productid`) REFERENCES `Product`(`productid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `User` RENAME INDEX `user_uname_key` TO `User_uname_key`;
