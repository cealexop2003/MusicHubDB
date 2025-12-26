-- Remove email and password columns that were added by mistake
USE MusicHubDB;

ALTER TABLE User DROP COLUMN email;
ALTER TABLE User DROP COLUMN password;
