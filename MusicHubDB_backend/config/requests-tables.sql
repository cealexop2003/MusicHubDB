-- Additional tables for request management (not in original schema)
-- These will be created when the backend starts if they don't exist

USE `MusicHubDB`;

-- Create tables for managing requests/interests
CREATE TABLE IF NOT EXISTS `JamSession_Requests` (
  `request_id` INT AUTO_INCREMENT PRIMARY KEY,
  `jam_id` INT NOT NULL,
  `musician_id` INT NOT NULL,
  `status` ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  `created_at` DATE NOT NULL,
  FOREIGN KEY (`jam_id`) REFERENCES `Jam-Session`(`jam_id`),
  FOREIGN KEY (`musician_id`) REFERENCES `Musician`(`musician_id`),
  UNIQUE KEY `unique_jam_request` (`jam_id`, `musician_id`, `status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `Band_Requests` (
  `request_id` INT AUTO_INCREMENT PRIMARY KEY,
  `band_id` INT NOT NULL,
  `musician_id` INT NOT NULL,
  `status` ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  `created_at` DATE NOT NULL,
  FOREIGN KEY (`band_id`) REFERENCES `Band`(`band_id`),
  FOREIGN KEY (`musician_id`) REFERENCES `Musician`(`musician_id`),
  UNIQUE KEY `unique_band_request` (`band_id`, `musician_id`, `status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `Lesson_Requests` (
  `request_id` INT AUTO_INCREMENT PRIMARY KEY,
  `teacher_id` INT NOT NULL,
  `student_id` INT NOT NULL,
  `status` ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  `created_at` DATE NOT NULL,
  FOREIGN KEY (`teacher_id`) REFERENCES `Teacher`(`teacher_id`),
  FOREIGN KEY (`student_id`) REFERENCES `Student`(`student_id`),
  UNIQUE KEY `unique_lesson_request` (`teacher_id`, `student_id`, `status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

CREATE TABLE IF NOT EXISTS `Concert_Interests` (
  `interest_id` INT AUTO_INCREMENT PRIMARY KEY,
  `concert_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `created_at` DATE NOT NULL,
  FOREIGN KEY (`concert_id`) REFERENCES `CONCERT`(`concert_id`),
  FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`),
  UNIQUE KEY `unique_concert_interest` (`concert_id`, `user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
