USE `MusicHubDB`;

DROP USER IF EXISTS 'app_admin'@'localhost';
DROP USER IF EXISTS 'teacher_user'@'%';
DROP USER IF EXISTS 'student_user'@'%';
DROP USER IF EXISTS 'musician_user'@'%';

-- 1) Create login accounts FIRST
CREATE USER IF NOT EXISTS 'app_admin'@'localhost' IDENTIFIED BY 'superpass';
CREATE USER IF NOT EXISTS 'teacher_user'@'%' IDENTIFIED BY 'teacherpass';
CREATE USER IF NOT EXISTS 'student_user'@'%' IDENTIFIED BY 'studentpass';
CREATE USER IF NOT EXISTS 'musician_user'@'%' IDENTIFIED BY 'musicianpass';

-- 2) Admin = full access on schema
GRANT ALL PRIVILEGES ON `MusicHubDB`.* TO 'app_admin'@'localhost';

-- =========================
-- STUDENT PRIVILEGES
-- =========================

-- Base "User" privileges
GRANT SELECT ON `MusicHubDB`.`User`       TO 'student_user'@'%';
GRANT SELECT ON `MusicHubDB`.`Concert`    TO 'student_user'@'%';
GRANT SELECT ON `MusicHubDB`.`Instrument` TO 'student_user'@'%';

-- Student tables
GRANT SELECT ON `MusicHubDB`.`Student` TO 'student_user'@'%';
GRANT SELECT ON `MusicHubDB`.`Teacher` TO 'student_user'@'%';

-- Lessons
GRANT SELECT, INSERT, UPDATE, DELETE
ON `MusicHubDB`.`Teachers_Give_Lessons_to_Students`
TO 'student_user'@'%';

-- View access (optional but OK)
GRANT SELECT ON `MusicHubDB`.`formatting` TO 'student_user'@'%';


-- =========================
-- TEACHER PRIVILEGES
-- =========================

GRANT SELECT ON `MusicHubDB`.`User`       TO 'teacher_user'@'%';
GRANT SELECT ON `MusicHubDB`.`Concert`    TO 'teacher_user'@'%';
GRANT SELECT ON `MusicHubDB`.`Instrument` TO 'teacher_user'@'%';

GRANT SELECT ON `MusicHubDB`.`Teacher` TO 'teacher_user'@'%';
GRANT SELECT ON `MusicHubDB`.`Student` TO 'teacher_user'@'%';

GRANT UPDATE ON `MusicHubDB`.`Teacher` TO 'teacher_user'@'%';

GRANT SELECT, INSERT, UPDATE, DELETE
ON `MusicHubDB`.`Teachers_Give_Lessons_to_Students`
TO 'teacher_user'@'%';

-- View access (optional but OK)
GRANT SELECT ON `MusicHubDB`.`formatting` TO 'teacher_user'@'%';


-- =========================
-- MUSICIAN PRIVILEGES
-- =========================

GRANT SELECT ON `MusicHubDB`.`User`       TO 'musician_user'@'%';
GRANT SELECT ON `MusicHubDB`.`Concert`    TO 'musician_user'@'%';
GRANT SELECT ON `MusicHubDB`.`Instrument` TO 'musician_user'@'%';

GRANT SELECT ON `MusicHubDB`.`Musician`    TO 'musician_user'@'%';
GRANT SELECT ON `MusicHubDB`.`Band`        TO 'musician_user'@'%';
GRANT SELECT ON `MusicHubDB`.`Jam-Session` TO 'musician_user'@'%';

GRANT UPDATE ON `MusicHubDB`.`Musician` TO 'musician_user'@'%';

GRANT SELECT, INSERT, DELETE
ON `MusicHubDB`.`Bands_Have_Musicians`
TO 'musician_user'@'%';

GRANT SELECT, INSERT, DELETE
ON `MusicHubDB`.`Jam-Sessions_Have_Musicians`
TO 'musician_user'@'%';

-- View access (optional but OK)
GRANT SELECT ON `MusicHubDB`.`jammers`     TO 'musician_user'@'%';
GRANT SELECT ON `MusicHubDB`.`instruments` TO 'musician_user'@'%';

FLUSH PRIVILEGES;
