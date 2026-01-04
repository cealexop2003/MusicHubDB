DROP SCHEMA IF EXISTS `musichubdb`;
CREATE SCHEMA `musichubdb`;
USE `musichubdb`;

-- MySQL dump 10.13  Distrib 5.7.24, for osx11.1 (x86_64)
--
-- Host: localhost    Database: MusicHubDB
-- ------------------------------------------------------
-- Server version	9.4.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `MusicHubDB`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `MusicHubDB` /*!40100 DEFAULT CHARACTER SET utf8mb3 */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `MusicHubDB`;

--
-- Table structure for table `Band`
--

DROP TABLE IF EXISTS `Band`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Band` (
  `band_id` int NOT NULL,
  `name` varchar(30) NOT NULL,
  `creation_date` varchar(15) NOT NULL,
  `genre` enum('jazz','rock','classical','pop','metal','alternative','hip-hop','R&B','folk','country','electronic','punk','latin','reggae') DEFAULT NULL,
  `members#` int NOT NULL,
  PRIMARY KEY (`band_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Band`
--

LOCK TABLES `Band` WRITE;
/*!40000 ALTER TABLE `Band` DISABLE KEYS */;
INSERT INTO `Band` VALUES (1,'The Strokes','1999','rock',5),(18,'The Strokes','1998-01-01','rock',5),(89,'The Fae\'s Deceit','2000-01-01','folk',6),(125,'3 Psychos and their Therapist','2012-01-01','alternative',4),(234,'Worker\'s Rebellion','2007-01-01','metal',5),(361,'The Yee-Haws and Doo-Dads','2020-01-01','country',7);
/*!40000 ALTER TABLE `Band` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Band_BEFORE_INSERT` BEFORE INSERT ON `band` FOR EACH ROW BEGIN
    -- Ελέγχει αν ο αριθμός μελών είναι μικρότερος του 3
    IF (NEW.`members#` < 3) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid data: A Band must have 3 or more members.';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `Band_BEFORE_UPDATE` BEFORE UPDATE ON `band` FOR EACH ROW BEGIN
    -- Ελέγχει αν ο αριθμός μελών είναι μικρότερος του 3
    IF (NEW.`members#` < 3) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid data: A Band must have 3 or more members.';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Bands_Have_Musicians`
--

DROP TABLE IF EXISTS `Bands_Have_Musicians`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Bands_Have_Musicians` (
  `band_id` int NOT NULL,
  `musician_id` int NOT NULL,
  PRIMARY KEY (`band_id`,`musician_id`),
  KEY `muscian_id_idx` (`musician_id`),
  CONSTRAINT `band_id` FOREIGN KEY (`band_id`) REFERENCES `Band` (`band_id`),
  CONSTRAINT `band_musician_id` FOREIGN KEY (`musician_id`) REFERENCES `Musician` (`musician_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Bands_Have_Musicians`
--

LOCK TABLES `Bands_Have_Musicians` WRITE;
/*!40000 ALTER TABLE `Bands_Have_Musicians` DISABLE KEYS */;
INSERT INTO `Bands_Have_Musicians` VALUES (125,9888),(234,12345),(89,15627),(361,27111),(18,37611);
/*!40000 ALTER TABLE `Bands_Have_Musicians` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CONCERT`
--

DROP TABLE IF EXISTS `CONCERT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CONCERT` (
  `concert_id` int NOT NULL,
  `band_id` int NOT NULL,
  `musician_id` int NOT NULL,
  `instrument` enum('vocals','classical_guitar','acoustic_guitar','electric_guitar','bass','violin','viola','cello','double_bass','harp','banjo','lyre','accordion','piano','trumpet','saxophone','french_horn','tuba','trombone','bassoon','clarinet','flute','recorder','picolo','oboe','drums','xylophone','metallophone') DEFAULT NULL,
  `name` varchar(30) NOT NULL,
  `date` varchar(20) NOT NULL,
  `price` int NOT NULL,
  `genre` enum('jazz','rock','classical','pop','metal','alternative','hip-hop','R&B','folk','country','electronic','punk','latin','reggae') DEFAULT NULL,
  `address` varchar(30) NOT NULL,
  `artist` varchar(30) NOT NULL,
  `start_time` varchar(15) NOT NULL,
  `end_time` varchar(15) NOT NULL,
  PRIMARY KEY (`concert_id`),
  KEY `band_id_idx` (`band_id`),
  KEY `musician_id_idx` (`musician_id`),
  CONSTRAINT `concert_band_id` FOREIGN KEY (`band_id`) REFERENCES `Band` (`band_id`),
  CONSTRAINT `concert_musician_id` FOREIGN KEY (`musician_id`) REFERENCES `Musician` (`musician_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CONCERT`
--

LOCK TABLES `CONCERT` WRITE;
/*!40000 ALTER TABLE `CONCERT` DISABLE KEYS */;
INSERT INTO `CONCERT` VALUES (6,18,1,'vocals','Sweet & Sticky','2026-06-16',15,'rock','Florinis 4','BMBLBZ','21:30','00:30'),(81,18,1,'vocals','Maria\'s Placeholder','2025-01-01',0,'rock','Placeholder Address','Placeholder Artist','00:00','00:00'),(136,18,1,'vocals','John\'s Placeholder','2025-01-01',0,'rock','Placeholder Address','Placeholder Artist','00:00','00:00'),(173,89,909,'vocals','Lost in Diablo','2026-08-05',18,'metal','Kasandrou 3','The Unloved','22:30','01:00'),(568,18,1,'vocals','Alex\'s Placeholder','2025-01-01',0,'rock','Placeholder Address','Placeholder Artist','00:00','00:00'),(579,125,15627,'vocals','Bach\'s Dreams','2026-02-28',45,'classical','Thetidos 2','Ethereal Quartet','19:30','21:45'),(888,234,39037,'vocals','Techno Overdrive','2026-03-31',35,'electronic','Afroditis 15','Protons, Neutrons & Electrons','23:00','04:00'),(937,18,1,'vocals','Evaggelos\'s Placeholder','2025-01-01',0,'rock','Placeholder Address','Placeholder Artist','00:00','00:00'),(999,361,32673,'vocals','Revolution Paid by Blood','2026-05-12',30,'punk','Evrou 13','Anarchy\'s the Way','22:00','00:30');
/*!40000 ALTER TABLE `CONCERT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `formatting`
--

DROP TABLE IF EXISTS `formatting`;
/*!50001 DROP VIEW IF EXISTS `formatting`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `formatting` AS SELECT 
 1 AS `student_name`,
 1 AS `teacher_name`,
 1 AS `lesson_format`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Instrument`
--

DROP TABLE IF EXISTS `Instrument`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Instrument` (
  `instrument_id` int NOT NULL,
  `user_id` int NOT NULL,
  `type` varchar(15) NOT NULL,
  `name` varchar(15) NOT NULL,
  PRIMARY KEY (`instrument_id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `User` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Instrument`
--

LOCK TABLES `Instrument` WRITE;
/*!40000 ALTER TABLE `Instrument` DISABLE KEYS */;
INSERT INTO `Instrument` VALUES (1,7891,'string','electric_guitar'),(3,9431,'percussion','drums'),(7,58958,'string','cello'),(14,49834,'string','piano'),(23,1,'wood_winds','flute');
/*!40000 ALTER TABLE `Instrument` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `instruments`
--

DROP TABLE IF EXISTS `instruments`;
/*!50001 DROP VIEW IF EXISTS `instruments`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `instruments` AS SELECT 
 1 AS `musician_name`,
 1 AS `instrument_name`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Jam-Session`
--

DROP TABLE IF EXISTS `Jam-Session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Jam-Session` (
  `jam_id` int NOT NULL,
  `date` varchar(15) NOT NULL,
  `address` varchar(30) DEFAULT NULL,
  `genre` enum('jazz','rock','classical','pop','metal','alternative','hip-hop','R&B','folk','country','electronic','punk','latin','reggae') DEFAULT NULL,
  `start_time` varchar(15) NOT NULL,
  `end_time` varchar(15) NOT NULL,
  `participants#` int NOT NULL,
  PRIMARY KEY (`jam_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Jam-Session`
--

LOCK TABLES `Jam-Session` WRITE;
/*!40000 ALTER TABLE `Jam-Session` DISABLE KEYS */;
INSERT INTO `Jam-Session` VALUES (29,'23/11/25','Skra 25','rock','18:00','20:30',6),(1745,'27/01/26','Filippou 21','R&B','17:00','19:00',3),(2017,'24/08/26','Eolou 5','hip-hop','19:00','20:30',4),(2095,'08/10/26','Armenopoulou 18','electronic','21:00','22:30',8),(2096,'15/06/26','Kassandrou 87','folk','16:00','18:00',5);
/*!40000 ALTER TABLE `Jam-Session` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `JamSession_BEFORE_INSERT` BEFORE INSERT ON `jam-session` FOR EACH ROW BEGIN
    -- Ελέγχει αν ο αριθμός συμμετεχόντων είναι μικρότερος του 3
    IF (NEW.`participants#` < 3) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid data: A Jam-Session must have 3 or more participants.';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `JamSession_BEFORE_UPDATE` BEFORE UPDATE ON `jam-session` FOR EACH ROW BEGIN
    -- Ελέγχει αν ο αριθμός συμμετεχόντων είναι μικρότερος του 3
    IF (NEW.`participants#` < 3) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Invalid data: A Jam-Session must have 3 or more participants.';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Jam-Sessions_Have_Musicians`
--

DROP TABLE IF EXISTS `Jam-Sessions_Have_Musicians`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Jam-Sessions_Have_Musicians` (
  `jam_id` int NOT NULL,
  `musician_id` int NOT NULL,
  PRIMARY KEY (`jam_id`,`musician_id`),
  KEY `musician_id_idx` (`musician_id`),
  CONSTRAINT `jam_id` FOREIGN KEY (`jam_id`) REFERENCES `Jam-Session` (`jam_id`),
  CONSTRAINT `jam_musician_id` FOREIGN KEY (`musician_id`) REFERENCES `Musician` (`musician_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Jam-Sessions_Have_Musicians`
--

LOCK TABLES `Jam-Sessions_Have_Musicians` WRITE;
/*!40000 ALTER TABLE `Jam-Sessions_Have_Musicians` DISABLE KEYS */;
INSERT INTO `Jam-Sessions_Have_Musicians` VALUES (2095,9888),(2096,12345),(1745,15627),(2017,27111),(29,37611);
/*!40000 ALTER TABLE `Jam-Sessions_Have_Musicians` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `jammers`
--

DROP TABLE IF EXISTS `jammers`;
/*!50001 DROP VIEW IF EXISTS `jammers`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `jammers` AS SELECT 
 1 AS `musician_id`,
 1 AS `jam_id`,
 1 AS `date`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Musician`
--

DROP TABLE IF EXISTS `Musician`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Musician` (
  `musician_id` int NOT NULL,
  `experience` int NOT NULL,
  `band_status` bit(1) NOT NULL,
  `genre` enum('jazz','rock','classical','pop','metal','alternative','hip-hop','R&B','folk','country','electronic','punk','latin','reggae') DEFAULT NULL,
  PRIMARY KEY (`musician_id`),
  CONSTRAINT `musician_id` FOREIGN KEY (`musician_id`) REFERENCES `User` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Musician`
--

LOCK TABLES `Musician` WRITE;
/*!40000 ALTER TABLE `Musician` DISABLE KEYS */;
INSERT INTO `Musician` VALUES (1,34,_binary '','rock'),(909,25,_binary '','classical'),(9888,20,_binary '','alternative'),(12345,8,_binary '','metal'),(15627,47,_binary '\0','folk'),(27111,10,_binary '','country'),(32673,14,_binary '\0','country'),(37611,15,_binary '','rock'),(39037,29,_binary '','metal');
/*!40000 ALTER TABLE `Musician` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Student`
--

DROP TABLE IF EXISTS `Student`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Student` (
  `student_id` int NOT NULL,
  `lesson_format` enum('online','in_person') DEFAULT NULL,
  PRIMARY KEY (`student_id`),
  CONSTRAINT `student_id` FOREIGN KEY (`student_id`) REFERENCES `User` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Student`
--

LOCK TABLES `Student` WRITE;
/*!40000 ALTER TABLE `Student` DISABLE KEYS */;
INSERT INTO `Student` VALUES (92,'in_person'),(118,'online'),(399,'online'),(1180,'online'),(3981,'in_person'),(7891,'online'),(12345,'in_person'),(21346,'online'),(21855,'in_person'),(26789,'in_person');
/*!40000 ALTER TABLE `Student` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Teacher`
--

DROP TABLE IF EXISTS `Teacher`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Teacher` (
  `teacher_id` int NOT NULL,
  `lesson_format` enum('online','in_person') DEFAULT NULL,
  `experience` int NOT NULL,
  `certification` bit(1) NOT NULL,
  `hourly_wage` int NOT NULL,
  PRIMARY KEY (`teacher_id`),
  CONSTRAINT `teacher_id` FOREIGN KEY (`teacher_id`) REFERENCES `User` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Teacher`
--

LOCK TABLES `Teacher` WRITE;
/*!40000 ALTER TABLE `Teacher` DISABLE KEYS */;
INSERT INTO `Teacher` VALUES (5,'online',17,_binary '',20),(3981,'online',23,_binary '\0',25),(7891,'in_person',5,_binary '\0',13),(10080,'online',10,_binary '',22),(10602,'online',8,_binary '',18),(22122,'in_person',10,_binary '',35),(31032,'in_person',20,_binary '',30),(51562,'in_person',15,_binary '\0',30);
/*!40000 ALTER TABLE `Teacher` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Teachers_Give_Lessons_to_Students`
--

DROP TABLE IF EXISTS `Teachers_Give_Lessons_to_Students`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Teachers_Give_Lessons_to_Students` (
  `lesson_id` int NOT NULL,
  `teacher_id` int NOT NULL,
  `student_id` int NOT NULL,
  `lesson_format` enum('online','in_person') DEFAULT NULL,
  `address` varchar(30) NOT NULL,
  `instrument` enum('vocals','classical_guitar','acoustic_guitar','electric_guitar','bass','violin','viola','cello','double_bass','harp','banjo','lyre','accordion','piano','trumpet','saxophone','french_horn','tuba','trombone','bassoon','clarinet','flute','recorder','picolo','oboe','drums','xylophone','metallophone') DEFAULT NULL,
  `start_time` varchar(15) NOT NULL,
  `end_time` varchar(15) NOT NULL,
  `date` varchar(45) NOT NULL,
  `price` varchar(45) NOT NULL,
  PRIMARY KEY (`lesson_id`,`student_id`,`teacher_id`),
  KEY `teacher_id_idx` (`teacher_id`),
  KEY `student_id_idx` (`student_id`),
  CONSTRAINT `lesson_student_id` FOREIGN KEY (`student_id`) REFERENCES `Student` (`student_id`),
  CONSTRAINT `lesson_teacher_id` FOREIGN KEY (`teacher_id`) REFERENCES `Teacher` (`teacher_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Teachers_Give_Lessons_to_Students`
--

LOCK TABLES `Teachers_Give_Lessons_to_Students` WRITE;
/*!40000 ALTER TABLE `Teachers_Give_Lessons_to_Students` DISABLE KEYS */;
INSERT INTO `Teachers_Give_Lessons_to_Students` VALUES (15,3981,399,'in_person','Apollonos 5','vocals','16:00','18:00','01/01/2001','39'),(16,31032,21855,'online','Skra 1','vocals','20:00','21:15','13/03/2003','18'),(17,10080,118,'in_person','Kasandrou 3','vocals','15:15','16:45','20/03/2002','11'),(173,51562,92,'online','Souri 5','vocals','18:00','20:00','11/09/2001','23'),(579,10602,1180,'in_person','Omirou 8','vocals','17:00','18:00','24/07/2011','33');
/*!40000 ALTER TABLE `Teachers_Give_Lessons_to_Students` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `USER`
--

DROP TABLE IF EXISTS `USER`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `USER` (
  `user_id` int NOT NULL,
  `concert_id` int DEFAULT NULL,
  `name` varchar(30) NOT NULL,
  `age` int NOT NULL,
  `address` varchar(30) NOT NULL,
  `range` int NOT NULL,
  PRIMARY KEY (`user_id`),
  KEY `concert_id_idx` (`concert_id`),
  CONSTRAINT `concert_id` FOREIGN KEY (`concert_id`) REFERENCES `Concert` (`concert_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `USER`
--

LOCK TABLES `USER` WRITE;
/*!40000 ALTER TABLE `USER` DISABLE KEYS */;
INSERT INTO `USER` VALUES (1,NULL,'Julian Casablancas',44,'Skra 1',30),(5,NULL,'Teacher ID 5 Name',40,'Teacher Address',15),(92,NULL,'Student 92 Placeholder',19,'Placeholder Address',5),(118,NULL,'Student 118 Placeholder',16,'Placeholder Address',3),(399,NULL,'Student 399 Placeholder',17,'Placeholder Address',4),(909,NULL,'Placeholder Musician 909',28,'Placeholder',5),(1180,NULL,'Student 1180 Placeholder',22,'Placeholder Address',7),(3981,81,'Maria Aggelopoulou',16,'Apollonos 5',4),(7891,937,'Evaggelos Pitsianis',34,'P. Mela 12',5),(9431,NULL,'User 9431 Placeholder',30,'Placeholder Address',10),(9888,NULL,'Musician 9888',45,'Placeholder Address',8),(10080,NULL,'Teacher 10080 Placeholder',40,'Placeholder Address',15),(10602,NULL,'Teacher 10602 Placeholder',35,'Placeholder Address',10),(12345,NULL,'Placeholder Student 12345',20,'Student Address 1',5),(15627,NULL,'Markos Stefanidis',67,'Perdika 36',10),(21346,NULL,'Placeholder Student 21346',18,'Student Address 2',7),(21855,NULL,'Student 21855 Placeholder',25,'Placeholder Address',8),(22122,NULL,'Teacher ID 22122 Name',35,'Teacher Address',7),(26789,NULL,'Placeholder Student 26789',22,'Student Address 3',3),(27111,NULL,'Musician 27111',35,'Placeholder Address',12),(27906,NULL,'Aggeliki Markpoulou',29,'Halkidikis 4',8),(31032,136,'John Smith',43,'Souri 5',27),(32673,NULL,'Placeholder Musician 32673',20,'Placeholder',5),(37611,NULL,'Musician 37611',30,'Placeholder Address',10),(39037,568,'Alex Ioannou',55,'Omirou 8',12),(49834,NULL,'User 49834 Placeholder',45,'Placeholder Address',12),(51562,NULL,'Teacher 51562 Placeholder',50,'Placeholder Address',20),(58958,NULL,'User 58958 Placeholder',25,'Placeholder Address',8);
/*!40000 ALTER TABLE `USER` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'MusicHubDB'
--

--
-- Dumping routines for database 'MusicHubDB'
--

--
-- Current Database: `MusicHubDB`
--

USE `MusicHubDB`;

--
-- Final view structure for view `formatting`
--

/*!50001 DROP VIEW IF EXISTS `formatting`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `formatting` AS select `U_STUDENT`.`name` AS `student_name`,`U_TEACHER`.`name` AS `teacher_name`,`L`.`lesson_format` AS `lesson_format` from ((`teachers_give_lessons_to_students` `L` join `user` `U_STUDENT` on((`L`.`student_id` = `U_STUDENT`.`user_id`))) join `user` `U_TEACHER` on((`L`.`teacher_id` = `U_TEACHER`.`user_id`))) order by `U_TEACHER`.`name`,`U_STUDENT`.`name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `instruments`
--

/*!50001 DROP VIEW IF EXISTS `instruments`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `instruments` AS select `U_NAME`.`name` AS `musician_name`,`I_NAME`.`name` AS `instrument_name` from ((`musician` `M` join `user` `U_NAME` on((`M`.`musician_id` = `U_NAME`.`user_id`))) join `instrument` `I_NAME` on((`U_NAME`.`user_id` = `I_NAME`.`user_id`))) order by `U_NAME`.`name`,`I_NAME`.`name` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `jammers`
--

/*!50001 DROP VIEW IF EXISTS `jammers`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `jammers` AS select `E`.`musician_id` AS `musician_id`,`E`.`jam_id` AS `jam_id`,`J`.`date` AS `date` from (`jam-sessions_have_musicians` `E` join `jam-session` `J` on((`E`.`jam_id` = `J`.`jam_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-12-14 21:00:16
