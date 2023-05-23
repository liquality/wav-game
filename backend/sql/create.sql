
CREATE DATABASE `wav_game`;

USE `wav_game`;

CREATE USER 'wav_game'@'localhost' IDENTIFIED BY '1q2w3e';

GRANT ALL PRIVILEGES ON wav_game.* TO 'wav_game'@'localhost';

FLUSH PRIVILEGES;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `serviceprovider_name` varchar(150) NOT NULL,
  `username` varchar(200) NOT NULL,
  `avatar` LONGBLOB,
  `public_address` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `serviceprovider_name_UNIQUE` (`serviceprovider_name`)
);
CREATE TABLE `game` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(200) NOT NULL,
  `user_id` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `artist_name` varchar(200) NOT NULL,
  `level_4_claimed_prizes` int(11) NOT NULL, 
  `level_5_claimed_prizes` int(11) NOT NULL,
  `level_6_claimed_main_prize` TINYINT(1) NOT NULL DEFAULT 0,
  `claimable_prize_count` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_game_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
