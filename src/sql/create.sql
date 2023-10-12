CREATE DATABASE `group_mints`;

USE `group_mints`;

CREATE USER 'group_mints'@'localhost' IDENTIFIED BY '1q2w3e';

GRANT ALL PRIVILEGES ON group_mints.* TO 'group_mints'@'localhost';

FLUSH PRIVILEGES;

CREATE TABLE `group` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `group_name` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE `invite` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `group_id` INT NOT NULL,
  `invite_link` VARCHAR(255) NOT NULL,
  `is_used` BOOLEAN DEFAULT FALSE,
  `expiry_date` TIMESTAMP, -- Set an expiration date for the invite
  FOREIGN KEY (`group_id`) REFERENCES `group` (`id`)
);

CREATE TABLE `message` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `group_id` INT NOT NULL,
  `sender` VARCHAR(255) NOT NULL,
  `text` TEXT NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`group_id`) REFERENCES `group` (`id`)
);


CREATE TABLE members (
  `member_id` INT AUTO_INCREMENT PRIMARY KEY,
  `group_id` INT NOT NULL,
  `sender` VARCHAR(255) NOT NULL, 
  `joined_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (`group_id`) REFERENCES `group` (`id`)
);