
USE `wav_game`;

-- LEVEL SETTINGS
CREATE TABLE `level_setting` (
  `level` INT(11)  NOT NULL,
  `countdown_start_at` DATETIME NULL,
  `countdown_ends` INT(11) NOT NULL DEFAULT(0),
  PRIMARY KEY (`artist_id`, `level`)
);

-- level 4 
INSERT INTO `level_setting` (`level`, `countdown_start_at`, `countdown_ends`)
VALUES(4, '2023-06-24 17:52:47', 259200000) -- 3 days

-- level 5
INSERT INTO `level_setting` (`level`, `countdown_start_at`, `countdown_ends`)
VALUES(5, '2023-06-24 17:52:47', 432000000) -- 5 days

-- level 6
INSERT INTO `level_setting` (`level`, `countdown_start_at`, `countdown_ends`)
VALUES(5, '2023-06-24 17:52:47', 604800000) -- 7 days