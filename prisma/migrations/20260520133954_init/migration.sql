-- DropForeignKey
ALTER TABLE `Product`
DROP FOREIGN KEY `product_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `ProductImage`
DROP FOREIGN KEY `productImage_productid_fkey`;

-- AlterTable
ALTER TABLE `Product` MODIFY `description` TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE `Product` ADD CONSTRAINT `Product_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `Category` (`categoryId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProductImage` ADD CONSTRAINT `ProductImage_productid_fkey` FOREIGN KEY (`productid`) REFERENCES `Product` (`productid`) ON DELETE RESTRICT ON UPDATE CASCADE;