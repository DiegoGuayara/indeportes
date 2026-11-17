CREATE TABLE `Category` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(80) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    UNIQUE INDEX `Category_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

ALTER TABLE `Template` ADD COLUMN `categoryId` INTEGER NULL;

CREATE INDEX `Template_categoryId_idx` ON `Template`(`categoryId`);

ALTER TABLE `Template`
ADD CONSTRAINT `Template_categoryId_fkey`
FOREIGN KEY (`categoryId`) REFERENCES `Category`(`id`)
ON DELETE SET NULL ON UPDATE CASCADE;
