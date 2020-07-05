/*
 Navicat Premium Data Transfer

 Source Server         : JelenaEposlovanje
 Source Server Type    : MySQL
 Source Server Version : 100131
 Source Host           : localhost:3306
 Source Schema         : auto_oglasi

 Target Server Type    : MySQL
 Target Server Version : 100131
 File Encoding         : 65001

 Date: 05/07/2020 14:54:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for advertisement
-- ----------------------------
DROP TABLE IF EXISTS `advertisement`;
CREATE TABLE `advertisement`  (
  `advertisement_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `vehicle_id` int(10) UNSIGNED NOT NULL,
  `status` tinyint(1) NULL DEFAULT 1,
  PRIMARY KEY (`advertisement_id`) USING BTREE,
  INDEX `fk_advertisement_vehicle_id`(`vehicle_id`) USING BTREE,
  CONSTRAINT `fk_advertisement_vehicle_id` FOREIGN KEY (`vehicle_id`) REFERENCES `vehicle` (`vehicle_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of advertisement
-- ----------------------------
INSERT INTO `advertisement` VALUES (1, 1, 1);
INSERT INTO `advertisement` VALUES (2, 2, 0);
INSERT INTO `advertisement` VALUES (3, 6, 1);
INSERT INTO `advertisement` VALUES (4, 7, 1);
INSERT INTO `advertisement` VALUES (5, 9, 1);
INSERT INTO `advertisement` VALUES (6, 10, 1);
INSERT INTO `advertisement` VALUES (7, 12, 1);

-- ----------------------------
-- Table structure for fuel_type
-- ----------------------------
DROP TABLE IF EXISTS `fuel_type`;
CREATE TABLE `fuel_type`  (
  `fuel_type_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` varchar(50) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`fuel_type_id`) USING BTREE,
  UNIQUE INDEX `uq_fuel_type_type`(`type`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of fuel_type
-- ----------------------------
INSERT INTO `fuel_type` VALUES (2, 'Diesel');
INSERT INTO `fuel_type` VALUES (3, 'Electric');
INSERT INTO `fuel_type` VALUES (4, 'Hybrid');
INSERT INTO `fuel_type` VALUES (5, 'LPG');
INSERT INTO `fuel_type` VALUES (6, 'Other');
INSERT INTO `fuel_type` VALUES (1, 'Petrol');

-- ----------------------------
-- Table structure for make
-- ----------------------------
DROP TABLE IF EXISTS `make`;
CREATE TABLE `make`  (
  `make_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`make_id`) USING BTREE,
  UNIQUE INDEX `uq_make_name`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 15 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of make
-- ----------------------------
INSERT INTO `make` VALUES (6, 'Alfa Romeo');
INSERT INTO `make` VALUES (2, 'Audi');
INSERT INTO `make` VALUES (1, 'BMW');
INSERT INTO `make` VALUES (13, 'Dacia');
INSERT INTO `make` VALUES (5, 'Fiat');
INSERT INTO `make` VALUES (10, 'Ford');
INSERT INTO `make` VALUES (14, 'Jeep');
INSERT INTO `make` VALUES (9, 'Mazda');
INSERT INTO `make` VALUES (8, 'Mercedes Benz');
INSERT INTO `make` VALUES (11, 'Peugeot');
INSERT INTO `make` VALUES (12, 'Renault');
INSERT INTO `make` VALUES (3, 'Seat');
INSERT INTO `make` VALUES (4, 'Skoda');
INSERT INTO `make` VALUES (7, 'VW');

-- ----------------------------
-- Table structure for model
-- ----------------------------
DROP TABLE IF EXISTS `model`;
CREATE TABLE `model`  (
  `model_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `make_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`model_id`) USING BTREE,
  UNIQUE INDEX `uq_model_name`(`name`) USING BTREE,
  INDEX `fk_model_make_id`(`make_id`) USING BTREE,
  CONSTRAINT `fk_model_make_id` FOREIGN KEY (`make_id`) REFERENCES `make` (`make_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 35 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of model
-- ----------------------------
INSERT INTO `model` VALUES (1, 1, '320i');
INSERT INTO `model` VALUES (2, 1, '325d');
INSERT INTO `model` VALUES (4, 1, '116i');
INSERT INTO `model` VALUES (5, 1, '118d');
INSERT INTO `model` VALUES (6, 1, 'X5');
INSERT INTO `model` VALUES (7, 1, 'X3');
INSERT INTO `model` VALUES (8, 2, 'A4');
INSERT INTO `model` VALUES (9, 2, 'A5');
INSERT INTO `model` VALUES (10, 3, 'Ibiza');
INSERT INTO `model` VALUES (11, 3, 'Leon');
INSERT INTO `model` VALUES (12, 4, 'Fabia');
INSERT INTO `model` VALUES (13, 4, 'Superb');
INSERT INTO `model` VALUES (14, 4, 'Octavia');
INSERT INTO `model` VALUES (15, 5, 'Punto');
INSERT INTO `model` VALUES (16, 5, 'Bravo');
INSERT INTO `model` VALUES (17, 6, 'Mito');
INSERT INTO `model` VALUES (18, 6, 'Gullieta');
INSERT INTO `model` VALUES (19, 6, 'Gullia');
INSERT INTO `model` VALUES (20, 7, 'Golf ');
INSERT INTO `model` VALUES (21, 7, 'Polo');
INSERT INTO `model` VALUES (22, 7, 'Tiguan');
INSERT INTO `model` VALUES (23, 7, 'Touareg');
INSERT INTO `model` VALUES (24, 8, 'C 220');
INSERT INTO `model` VALUES (25, 8, 'B 180');
INSERT INTO `model` VALUES (26, 8, 'E 220');
INSERT INTO `model` VALUES (27, 9, 'MX-5');
INSERT INTO `model` VALUES (28, 9, '3');
INSERT INTO `model` VALUES (29, 9, '6');
INSERT INTO `model` VALUES (30, 10, 'Mustang');
INSERT INTO `model` VALUES (31, 11, '3008');
INSERT INTO `model` VALUES (32, 12, 'Megane');
INSERT INTO `model` VALUES (33, 13, 'Duster');
INSERT INTO `model` VALUES (34, 14, 'Patrol');

-- ----------------------------
-- Table structure for tag
-- ----------------------------
DROP TABLE IF EXISTS `tag`;
CREATE TABLE `tag`  (
  `tag_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(128) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `category` int(11) NOT NULL,
  PRIMARY KEY (`tag_id`) USING BTREE,
  UNIQUE INDEX `name_UNIQUE`(`name`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 140 CHARACTER SET = latin1 COLLATE = latin1_swedish_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of tag
-- ----------------------------
INSERT INTO `tag` VALUES (101, 'Air bag za vozaca', 1);
INSERT INTO `tag` VALUES (102, 'Air bag za suvozaca', 1);
INSERT INTO `tag` VALUES (107, 'Airbag bocni', 1);
INSERT INTO `tag` VALUES (108, 'Child lock', 1);
INSERT INTO `tag` VALUES (109, 'ABS', 1);
INSERT INTO `tag` VALUES (110, 'ASR', 1);
INSERT INTO `tag` VALUES (111, 'ESP', 1);
INSERT INTO `tag` VALUES (112, 'Alarm', 1);
INSERT INTO `tag` VALUES (113, 'Kodiran kljuc', 1);
INSERT INTO `tag` VALUES (114, 'Zeder', 1);
INSERT INTO `tag` VALUES (115, 'Servo volan', 2);
INSERT INTO `tag` VALUES (116, 'Multifukncijski volan', 2);
INSERT INTO `tag` VALUES (117, 'Tempomat', 2);
INSERT INTO `tag` VALUES (118, 'Daljinsko zakljucavanje', 2);
INSERT INTO `tag` VALUES (119, 'Elektricni podizaci', 2);
INSERT INTO `tag` VALUES (120, 'Elektricni retrovizori', 2);
INSERT INTO `tag` VALUES (121, 'Svetla za maglu', 2);
INSERT INTO `tag` VALUES (122, 'Senzori za svetla', 2);
INSERT INTO `tag` VALUES (123, 'Senzori za kisu', 2);
INSERT INTO `tag` VALUES (124, 'Parking senzori', 2);
INSERT INTO `tag` VALUES (125, 'Navigacija', 2);
INSERT INTO `tag` VALUES (126, 'Webasto', 2);
INSERT INTO `tag` VALUES (127, 'DVD/TV', 2);
INSERT INTO `tag` VALUES (128, 'Grejaci u sedistima', 2);
INSERT INTO `tag` VALUES (129, 'Panoramski krov', 2);
INSERT INTO `tag` VALUES (130, 'Prvi vlasnik', 3);
INSERT INTO `tag` VALUES (131, 'Kupkjen nov u Srbiji', 2);
INSERT INTO `tag` VALUES (132, 'Garancija', 3);
INSERT INTO `tag` VALUES (133, 'Garaziran', 3);
INSERT INTO `tag` VALUES (134, 'Servisna knjiga', 3);
INSERT INTO `tag` VALUES (135, 'Rezervni kljuc', 3);
INSERT INTO `tag` VALUES (136, 'Restauran', 3);
INSERT INTO `tag` VALUES (137, 'Oldtimer', 3);
INSERT INTO `tag` VALUES (138, 'Taxi', 3);
INSERT INTO `tag` VALUES (139, 'Test vozilo', 3);

-- ----------------------------
-- Table structure for transmission
-- ----------------------------
DROP TABLE IF EXISTS `transmission`;
CREATE TABLE `transmission`  (
  `transmission_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`transmission_id`) USING BTREE,
  UNIQUE INDEX `uq_transmission_type`(`type`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of transmission
-- ----------------------------
INSERT INTO `transmission` VALUES (2, 'Automatic ');
INSERT INTO `transmission` VALUES (1, 'Manual 5 ');
INSERT INTO `transmission` VALUES (3, 'Manual 6 ');
INSERT INTO `transmission` VALUES (4, 'Semi-automatic');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `forename` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `surname` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `password_hash` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`) USING BTREE,
  UNIQUE INDEX `uq_user_email`(`email`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'Nemanja', 'Milutinovic', 'nm@gmail.com', '9a6d124632754e72cef231195d8f4b049743df4e150d884af6aa7cfe3ae424e0e7816c8426fdca36b5ec383a6d8ac7c2659896eb42e9ea7c501edae8e7245e42\r\n', '063998866');
INSERT INTO `user` VALUES (2, 'Feli', 'Felic', 'ff@gmail.com', 'c09ca86a9f0ec7c56003ddf8bae87192644be7329aec13f37a5ae0e2d4d2c171e8026dbc9fe2bd49e46535ed3478a80fb88d2b285b6fb016aae8770304cc3bb5\r\n', '06399665');
INSERT INTO `user` VALUES (3, 'Pera', 'Peric', 'pp@gmail.com', '3A772C82DC28AF481FF4099526353598F8ADA4D243DDD0AE182A3AC631B7A6432AFE0D215108E28A4FCD2AD61A70C8D45E97D87BA36665F8C55C18DC524105EA', '022335588');
INSERT INTO `user` VALUES (4, 'Marko', 'Markovic', 'mm@gmail.com', '5B92776E9E92DB3F7D870E3ED7F3E6AD78CEB1362ED7DD02EBAD00D837763E4F0B23B4348BF6BEC35A013CE6D5B70F4919BFA1E38A70364F6F7878A1F882FA72', '069998855');

-- ----------------------------
-- Table structure for vehicle
-- ----------------------------
DROP TABLE IF EXISTS `vehicle`;
CREATE TABLE `vehicle`  (
  `vehicle_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `vehicle_type_id` int(10) UNSIGNED NOT NULL,
  `price` int(10) NOT NULL,
  `transmisson_id` int(10) UNSIGNED NOT NULL,
  `model_id` int(10) UNSIGNED NOT NULL,
  `description` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `photo` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `fuel_type_id` int(10) UNSIGNED NOT NULL,
  `door` int(1) NOT NULL,
  `color` varchar(30) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `cubic_capacity` int(5) NOT NULL,
  `power` int(4) NOT NULL,
  `kilometer` int(9) NOT NULL,
  `registration` tinyint(1) UNSIGNED NOT NULL DEFAULT 1,
  `seller` enum('Owner','Agency') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `tags` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `year_of_production` int(4) NOT NULL,
  PRIMARY KEY (`vehicle_id`) USING BTREE,
  UNIQUE INDEX `uq_vehicle_photo`(`photo`) USING BTREE,
  INDEX `fk_vehicle_vehicle_type_id`(`vehicle_type_id`) USING BTREE,
  INDEX `fk_vehicle_model_id`(`model_id`) USING BTREE,
  INDEX `fk_vehicle_fuel_type_id`(`fuel_type_id`) USING BTREE,
  INDEX `fk_vehicle_transmission_id`(`transmisson_id`) USING BTREE,
  INDEX `fk_vehicle_user_id`(`user_id`) USING BTREE,
  CONSTRAINT `fk_vehicle_fuel_type_id` FOREIGN KEY (`fuel_type_id`) REFERENCES `fuel_type` (`fuel_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_vehicle_model_id` FOREIGN KEY (`model_id`) REFERENCES `model` (`model_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_vehicle_transmission_id` FOREIGN KEY (`transmisson_id`) REFERENCES `transmission` (`transmission_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_vehicle_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_vehicle_vehicle_type_id` FOREIGN KEY (`vehicle_type_id`) REFERENCES `vehicle_type` (`vehicle_type_id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 13 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of vehicle
-- ----------------------------
INSERT INTO `vehicle` VALUES (1, 2, 15000, 1, 1, 'U dobrom stanju NOV NOV', 'slika', 1, 5, 'red', 2000, 150, 200000, 0, 'Owner', '101,102', 1, 2005);
INSERT INTO `vehicle` VALUES (2, 1, 15000, 1, 1, 'bravo', '0', 1, 5, 'plava', 2000, 150, 63000, 0, 'Owner', '101 102 105', 1, 2015);
INSERT INTO `vehicle` VALUES (6, 1, 15000, 1, 1, 'odlican', 'dsdasssda/asdads/adas', 1, 5, 'plava', 2000, 150, 25000, 0, 'Owner', '101 102 105', 1, 2018);
INSERT INTO `vehicle` VALUES (7, 2, 15000, 2, 4, 'wooow', 'asdsadasdasaqqqq/asdads/adas', 2, 3, 'zuta', 1500, 150, 63000, 0, 'Agency', '101 102 105', 2, 2002);
INSERT INTO `vehicle` VALUES (9, 2, 15000, 2, 4, 'wooow', 'slika/asdads/adas', 2, 3, 'zuta', 1500, 150, 63000, 0, 'Agency', '101 102 105', 2, 2006);
INSERT INTO `vehicle` VALUES (10, 3, 1000, 3, 5, 'NOV NOV', 'slika/slike/adas', 3, 3, 'zelena', 2200, 180, 120000, 0, 'Agency', '101 102 105', 2, 2010);
INSERT INTO `vehicle` VALUES (12, 4, 12360, 2, 10, 'Najnoviji', 'slika/slike/slicice', 3, 3, 'bela', 1600, 250, 6300, 0, 'Agency', '101 102 105', 2, 2020);

-- ----------------------------
-- Table structure for vehicle_type
-- ----------------------------
DROP TABLE IF EXISTS `vehicle_type`;
CREATE TABLE `vehicle_type`  (
  `vehicle_type_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `type` varchar(60) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`vehicle_type_id`) USING BTREE,
  UNIQUE INDEX `uq_vehicle_type_type`(`type`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of vehicle_type
-- ----------------------------
INSERT INTO `vehicle_type` VALUES (1, 'Cabriolet / Roadster');
INSERT INTO `vehicle_type` VALUES (6, 'Estate Car');
INSERT INTO `vehicle_type` VALUES (7, 'Hatchback');
INSERT INTO `vehicle_type` VALUES (2, 'Saloon');
INSERT INTO `vehicle_type` VALUES (3, 'Sports Car / Coupe');
INSERT INTO `vehicle_type` VALUES (4, 'SUV / Off-road Vehicle / Pickup Truck');
INSERT INTO `vehicle_type` VALUES (5, 'Van / Minibus');

SET FOREIGN_KEY_CHECKS = 1;
