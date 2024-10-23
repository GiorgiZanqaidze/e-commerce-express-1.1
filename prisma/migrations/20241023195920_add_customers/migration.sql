/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `Customers` (
    `customer_id` INTEGER NOT NULL AUTO_INCREMENT,
    `zip_code` VARCHAR(20) NOT NULL DEFAULT '',
    `country` VARCHAR(50) NOT NULL DEFAULT '',
    `first_name` VARCHAR(50) NOT NULL DEFAULT '',
    `last_name` VARCHAR(50) NOT NULL DEFAULT '',
    `email` VARCHAR(100) NOT NULL DEFAULT '',
    `phone_number` VARCHAR(20) NOT NULL DEFAULT '',
    `address` VARCHAR(255) NOT NULL DEFAULT '',
    `city` VARCHAR(50) NOT NULL DEFAULT '',
    `state` VARCHAR(50) NOT NULL DEFAULT '',

    PRIMARY KEY (`customer_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
