/* 2 MAY 2023 */
/* DATABASA SCHEMA NOT FINISHED; RUN OVER WITH SIMON/UX DESIGN FIRST */
/* 			  */
CREATE DATABASE `wav_game`;

USE `wav_game`;

CREATE USER 'wav_game'@'localhost' IDENTIFIED BY '1q2w3e';

GRANT ALL PRIVILEGES ON wav_game.* TO 'wav_game'@'localhost';

FLUSH PRIVILEGES;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `google_email` varchar(45) NOT NULL,
  `username` varchar(200) NOT NULL,
  `avatar` LONGBLOB,
  `public_address` varchar(200) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `google_email_UNIQUE` (`google_email`)
);

CREATE TABLE `game` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `level` int(11) NOT NULL,
  `game_name` varchar(200) NOT NULL,
  `claimable_prize_count` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_game_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);
