-- CreateTable
CREATE TABLE `productImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productid` INTEGER NOT NULL,
    `imageUrl` TEXT NULL,
    `createdBy` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `productImage` ADD CONSTRAINT `ProductImage_productid_fkey` FOREIGN KEY (`productid`) REFERENCES `product`(`productid`) ON DELETE RESTRICT ON UPDATE CASCADE;
