-- MySQL dump 10.13  Distrib 8.0.46, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hospital_hms
-- ------------------------------------------------------
-- Server version	8.0.46

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Temporary view structure for view `admitted_patients`
--

DROP TABLE IF EXISTS `admitted_patients`;
/*!50001 DROP VIEW IF EXISTS `admitted_patients`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `admitted_patients` AS SELECT 
 1 AS `name`,
 1 AS `admit_date`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `ambulance_service`
--

DROP TABLE IF EXISTS `ambulance_service`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ambulance_service` (
  `ambulance_id` int NOT NULL,
  `driver_name` varchar(100) DEFAULT NULL,
  `hospital_id` int DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`ambulance_id`),
  KEY `hospital_id` (`hospital_id`),
  CONSTRAINT `ambulance_service_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`hospital_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ambulance_service`
--

LOCK TABLES `ambulance_service` WRITE;
/*!40000 ALTER TABLE `ambulance_service` DISABLE KEYS */;
INSERT INTO `ambulance_service` VALUES (1,'Ramesh',1,'Basic'),(2,'Suresh',2,'ICU'),(3,'Mahesh',3,'Basic'),(4,'Kiran',4,'ICU'),(5,'Anil',5,'Basic'),(6,'Raju',6,'ICU'),(7,'Vikas',7,'Basic'),(8,'Prakash',8,'ICU'),(9,'Deepak',9,'Basic'),(10,'Arun',10,'ICU'),(11,'Manoj',11,'Basic'),(12,'Santosh',12,'ICU'),(13,'Nitin',13,'Basic'),(14,'Akhil',14,'ICU'),(15,'Rohit',15,'Basic');
/*!40000 ALTER TABLE `ambulance_service` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `appointment_id` int NOT NULL,
  `patient_id` int DEFAULT NULL,
  `doctor_id` int DEFAULT NULL,
  `date` date DEFAULT NULL,
  `time` time DEFAULT NULL,
  `status` varchar(50) DEFAULT 'Pending',
  PRIMARY KEY (`appointment_id`),
  KEY `patient_id` (`patient_id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `appointment_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  CONSTRAINT `appointment_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (1,1,1,'2026-01-10','10:00:00','Completed'),(2,2,2,'2026-01-11','11:00:00','Completed'),(3,3,3,'2026-01-12','09:30:00','Completed'),(4,4,4,'2026-01-13','12:00:00','Completed'),(5,5,5,'2026-01-14','10:30:00','Completed'),(6,6,6,'2026-01-15','11:15:00','Cancelled'),(7,7,7,'2026-01-16','09:00:00','Completed'),(8,8,8,'2026-01-17','10:45:00','Completed'),(9,9,9,'2026-01-18','11:30:00','Completed'),(10,10,10,'2026-01-19','12:15:00','Completed'),(11,11,11,'2026-01-20','10:00:00','Completed'),(12,12,12,'2026-01-21','09:45:00','Completed'),(13,13,13,'2026-01-22','11:00:00','Completed'),(14,14,14,'2026-01-23','10:30:00','Completed'),(15,15,15,'2026-01-24','09:15:00','Confirmed'),(16,1,1,'2025-03-20','10:00:00','Pending'),(30,1,1,NULL,'11:00:00','Pending'),(31,22,5,'2026-04-27','18:00:00','Confirmed'),(32,2,5,'2026-04-27','18:30:00','Pending'),(33,23,8,'2026-04-28','09:00:00','Confirmed'),(100,1,1,'2026-05-04','10:00:00','Completed'),(2000,1,1,'2026-05-04','09:00:00','Completed'),(2007,4,4,'2026-05-04','10:45:00','Cancelled'),(2014,3,3,'2026-05-04','11:30:00','Confirmed'),(2021,2,2,'2026-05-04','12:15:00','Pending'),(2028,1,1,'2026-05-04','13:00:00','Completed'),(2035,4,4,'2026-05-04','14:45:00','Completed'),(2036,24,5,'2026-05-05','15:00:00','Confirmed');
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bed_allocation`
--

DROP TABLE IF EXISTS `bed_allocation`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bed_allocation` (
  `bed_id` int NOT NULL,
  `room_id` int DEFAULT NULL,
  `bed_no` int DEFAULT NULL,
  `status` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`bed_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `bed_allocation_ibfk_1` FOREIGN KEY (`room_id`) REFERENCES `rooms` (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bed_allocation`
--

LOCK TABLES `bed_allocation` WRITE;
/*!40000 ALTER TABLE `bed_allocation` DISABLE KEYS */;
INSERT INTO `bed_allocation` VALUES (1,1,101,'Occupied'),(2,2,102,'Occupied'),(3,3,103,'Occupied'),(4,4,104,'Occupied'),(5,5,105,'Free'),(6,6,106,'Occupied'),(7,7,107,'Free'),(8,8,108,'Occupied'),(9,9,109,'Occupied'),(10,10,110,'Free'),(11,11,111,'Occupied'),(12,12,112,'Free'),(13,13,113,'Occupied'),(14,14,114,'Free'),(15,15,115,'Occupied');
/*!40000 ALTER TABLE `bed_allocation` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `billing`
--

DROP TABLE IF EXISTS `billing`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `billing` (
  `bill_id` int NOT NULL,
  `patient_id` int DEFAULT NULL,
  `bill_date` date DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`bill_id`),
  KEY `fk_bill_patient` (`patient_id`),
  CONSTRAINT `billing_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  CONSTRAINT `fk_bill_patient` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  CONSTRAINT `chk_total_amount` CHECK ((`total_amount` > 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `billing`
--

LOCK TABLES `billing` WRITE;
/*!40000 ALTER TABLE `billing` DISABLE KEYS */;
INSERT INTO `billing` VALUES (1,1,'2026-01-15',3500.00),(2,2,'2026-01-16',5200.00),(3,3,'2026-01-17',6000.00),(4,4,'2026-01-18',1500.00),(5,5,'2026-01-19',5000.00),(6,6,'2026-01-20',3000.00),(7,7,'2026-01-21',6500.00),(8,8,'2026-01-22',2800.00),(9,9,'2026-01-23',4100.00),(10,10,'2026-01-24',3600.00),(11,11,'2026-01-25',2900.00),(12,12,'2026-01-26',4700.00),(13,13,'2026-01-27',5200.00),(14,14,'2026-01-28',2500.00),(15,15,'2026-01-29',6000.00),(100,1,'2026-04-15',6825.00),(300,1,'2026-03-01',5250.00),(301,2,'2026-03-02',6300.00),(302,21,'2026-04-26',63000.00),(2000,1,'2026-05-04',3542.95),(2002,3,'2026-05-02',2155.43),(2004,1,'2026-04-30',3911.67),(2006,3,'2026-04-28',3558.19),(2008,1,'2026-05-03',3638.79),(2010,3,'2026-05-01',3767.47),(2012,1,'2026-04-29',2493.87),(2014,3,'2026-05-04',3753.46),(2016,1,'2026-05-02',1314.13),(2018,3,'2026-04-30',1725.13),(2020,1,'2026-04-28',1369.96),(2022,3,'2026-05-03',2236.96),(2024,1,'2026-05-01',2632.51),(2026,3,'2026-04-29',2225.72),(2028,1,'2026-05-04',1751.15),(2030,3,'2026-05-02',3441.63),(2032,1,'2026-04-30',2821.15),(2034,3,'2026-04-28',1045.23),(2036,1,'2026-05-03',2810.93),(2038,3,'2026-05-01',1106.51);
/*!40000 ALTER TABLE `billing` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `billing_view`
--

DROP TABLE IF EXISTS `billing_view`;
/*!50001 DROP VIEW IF EXISTS `billing_view`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `billing_view` AS SELECT 
 1 AS `name`,
 1 AS `total_amount`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `department_id` int NOT NULL,
  `hospital_id` int DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`department_id`),
  KEY `hospital_id` (`hospital_id`),
  CONSTRAINT `department_ibfk_1` FOREIGN KEY (`hospital_id`) REFERENCES `hospital` (`hospital_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,1,'Cardiology'),(2,1,'Neurology'),(3,2,'Orthopedics'),(4,2,'ENT'),(5,3,'General Medicine'),(6,3,'Pediatrics'),(7,4,'Oncology'),(8,4,'Dermatology'),(9,5,'Gynecology'),(10,6,'Urology'),(11,7,'Psychiatry'),(12,8,'Nephrology'),(13,9,'Radiology'),(14,10,'Emergency'),(15,11,'Surgery');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diagnosis`
--

DROP TABLE IF EXISTS `diagnosis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diagnosis` (
  `diagnosis_id` int NOT NULL,
  `record_id` int DEFAULT NULL,
  `disease` varchar(100) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`diagnosis_id`),
  KEY `record_id` (`record_id`),
  CONSTRAINT `diagnosis_ibfk_1` FOREIGN KEY (`record_id`) REFERENCES `medical_record` (`record_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diagnosis`
--

LOCK TABLES `diagnosis` WRITE;
/*!40000 ALTER TABLE `diagnosis` DISABLE KEYS */;
INSERT INTO `diagnosis` VALUES (1,16,'Hypertension','High BP'),(2,17,'Migraine','Severe headache'),(3,18,'Fracture','Bone injury'),(4,19,'Sinusitis','ENT infection'),(5,20,'Fever','Viral infection'),(6,21,'Cold','Seasonal'),(7,22,'Cancer','Oncology case'),(8,23,'Allergy','Skin rash'),(9,24,'PCOD','Hormonal issue'),(10,25,'Kidney Stone','Urology issue'),(11,26,'Depression','Mental health'),(12,27,'Kidney Failure','Nephrology'),(13,28,'Chest Scan','Radiology test'),(14,29,'Accident','Emergency case'),(15,30,'Appendicitis','Surgery case'),(16,102,'headche','medications'),(17,103,'DETAN','REMOVE TAININ G'),(18,104,'migrin','headache '),(19,105,'HIGH BLOOD PRESSURE',' HIGH BP WHICH LEADS TO HEARTATACK IF > 200'),(20,106,'pimples','oily skin '),(21,107,'Deaf','can\'t hear'),(22,108,'VIRAL','VOMITING AND FEVER'),(23,109,'Menstrual CYCLE ','not regular period'),(24,110,'mild fever',''),(25,111,'HEART ','heart pain ');
/*!40000 ALTER TABLE `diagnosis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `discharge`
--

DROP TABLE IF EXISTS `discharge`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `discharge` (
  `discharge_id` int NOT NULL,
  `admit_id` int DEFAULT NULL,
  `discharge_date` date DEFAULT NULL,
  `remarks` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`discharge_id`),
  KEY `admit_id` (`admit_id`),
  CONSTRAINT `discharge_ibfk_1` FOREIGN KEY (`admit_id`) REFERENCES `patient_admit` (`admit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `discharge`
--

LOCK TABLES `discharge` WRITE;
/*!40000 ALTER TABLE `discharge` DISABLE KEYS */;
INSERT INTO `discharge` VALUES (1,1,'2026-01-15','Recovered'),(2,2,'2026-01-16','Recovered'),(3,3,'2026-01-17','Recovered'),(4,4,'2026-01-18','Under observation'),(5,5,'2026-01-19','Recovered'),(6,6,'2026-01-20','Recovered'),(7,7,'2026-01-21','Critical'),(8,8,'2026-01-22','Recovered'),(9,9,'2026-01-23','Recovered'),(10,10,'2026-01-24','Recovered'),(11,11,'2026-01-25','Recovered'),(12,12,'2026-01-26','Recovered'),(13,13,'2026-01-27','Recovered'),(14,14,'2026-01-28','Recovered'),(15,15,'2026-01-29','Recovered');
/*!40000 ALTER TABLE `discharge` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `doctor`
--

DROP TABLE IF EXISTS `doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `doctor` (
  `doctor_id` int NOT NULL,
  `department_id` int DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `specialization` varchar(100) DEFAULT NULL,
  `phone_no` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`doctor_id`),
  KEY `fk_department` (`department_id`),
  CONSTRAINT `doctor_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`),
  CONSTRAINT `fk_department` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `doctor`
--

LOCK TABLES `doctor` WRITE;
/*!40000 ALTER TABLE `doctor` DISABLE KEYS */;
INSERT INTO `doctor` VALUES (1,1,'Dr Rajesh Kumar','Cardiologist','9111111111','rajesh@gmail.com'),(2,2,'Dr Meena Sharma','Neurologist','9222222222','meena@gmail.com'),(3,3,'Dr Arjun Singh','Orthopedic','9333333333','arjun@gmail.com'),(4,4,'Dr Priya Verma','ENT','9444444444','priya@gmail.com'),(5,5,'Dr Anil Joshi','Physician','9555555555','anil@gmail.com'),(6,6,'Dr Kavita Rao','Pediatrician','9666666666','kavita@gmail.com'),(7,7,'Dr Ramesh Iyer','Oncologist','9777777777','ramesh@gmail.com'),(8,8,'Dr Neha Jain','Dermatologist','9888888888','neha@gmail.com'),(9,9,'Dr Sunita Patel','Gynecologist','9999999999','sunita@gmail.com'),(10,10,'Dr Vikas Shah','Urologist','9000000000','vikas@gmail.com'),(11,11,'Dr Aman Khan','Psychiatrist','9110000001','aman@gmail.com'),(12,12,'Dr Rohit Das','Nephrologist','9220000002','rohit@gmail.com'),(13,13,'Dr Sneha Kulkarni','Radiologist','9330000003','sneha@gmail.com'),(14,14,'Dr Mohan Rao','Emergency','9440000004','mohan@gmail.com'),(15,15,'Dr Pooja Nair','Surgeon','9550000005','pooja@gmail.com');
/*!40000 ALTER TABLE `doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `doctor_department`
--

DROP TABLE IF EXISTS `doctor_department`;
/*!50001 DROP VIEW IF EXISTS `doctor_department`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `doctor_department` AS SELECT 
 1 AS `name`,
 1 AS `department`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `hms2_appointment`
--

DROP TABLE IF EXISTS `hms2_appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hms2_appointment` (
  `appointment_id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int DEFAULT NULL,
  `doctor_id` int DEFAULT NULL,
  `appointment_date` date DEFAULT NULL,
  `bill_amount` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`appointment_id`),
  KEY `patient_id` (`patient_id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `hms2_appointment_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `hms2_patient` (`patient_id`),
  CONSTRAINT `hms2_appointment_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `hms2_doctor` (`doctor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hms2_appointment`
--

LOCK TABLES `hms2_appointment` WRITE;
/*!40000 ALTER TABLE `hms2_appointment` DISABLE KEYS */;
INSERT INTO `hms2_appointment` VALUES (1,1,1,'2026-01-10',3500.00),(2,2,2,'2026-01-11',4200.00),(3,3,1,'2026-01-12',5000.00);
/*!40000 ALTER TABLE `hms2_appointment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hms2_doctor`
--

DROP TABLE IF EXISTS `hms2_doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hms2_doctor` (
  `doctor_id` int NOT NULL AUTO_INCREMENT,
  `doctor_name` varchar(100) DEFAULT NULL,
  `department_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`doctor_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hms2_doctor`
--

LOCK TABLES `hms2_doctor` WRITE;
/*!40000 ALTER TABLE `hms2_doctor` DISABLE KEYS */;
INSERT INTO `hms2_doctor` VALUES (1,'Dr Rajesh','Cardiology'),(2,'Dr Meena','Neurology');
/*!40000 ALTER TABLE `hms2_doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hms2_patient`
--

DROP TABLE IF EXISTS `hms2_patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hms2_patient` (
  `patient_id` int NOT NULL,
  `patient_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hms2_patient`
--

LOCK TABLES `hms2_patient` WRITE;
/*!40000 ALTER TABLE `hms2_patient` DISABLE KEYS */;
INSERT INTO `hms2_patient` VALUES (1,'Amit Sharma'),(2,'Riya Mehta'),(3,'Rahul Verma');
/*!40000 ALTER TABLE `hms2_patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hms2_treatment`
--

DROP TABLE IF EXISTS `hms2_treatment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hms2_treatment` (
  `appointment_id` int NOT NULL,
  `medication` varchar(100) NOT NULL,
  `lab_test` varchar(100) NOT NULL,
  PRIMARY KEY (`appointment_id`,`medication`,`lab_test`),
  CONSTRAINT `hms2_treatment_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `hms2_appointment` (`appointment_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hms2_treatment`
--

LOCK TABLES `hms2_treatment` WRITE;
/*!40000 ALTER TABLE `hms2_treatment` DISABLE KEYS */;
INSERT INTO `hms2_treatment` VALUES (1,'Ibuprofen','X-Ray'),(1,'Paracetamol','Blood Test'),(2,'Azithromycin','Blood Test'),(2,'Azithromycin','MRI'),(3,'Amlodipine','X-Ray'),(3,'Paracetamol','ECG');
/*!40000 ALTER TABLE `hms2_treatment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hms3_department`
--

DROP TABLE IF EXISTS `hms3_department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hms3_department` (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hms3_department`
--

LOCK TABLES `hms3_department` WRITE;
/*!40000 ALTER TABLE `hms3_department` DISABLE KEYS */;
INSERT INTO `hms3_department` VALUES (1,'Cardiology'),(2,'Neurology');
/*!40000 ALTER TABLE `hms3_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hms3_doctor`
--

DROP TABLE IF EXISTS `hms3_doctor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hms3_doctor` (
  `doctor_id` int NOT NULL AUTO_INCREMENT,
  `doctor_name` varchar(100) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  PRIMARY KEY (`doctor_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `hms3_doctor_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `hms3_department` (`department_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hms3_doctor`
--

LOCK TABLES `hms3_doctor` WRITE;
/*!40000 ALTER TABLE `hms3_doctor` DISABLE KEYS */;
INSERT INTO `hms3_doctor` VALUES (1,'Dr Rajesh',1),(2,'Dr Meena',2);
/*!40000 ALTER TABLE `hms3_doctor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hms4_appmedication`
--

DROP TABLE IF EXISTS `hms4_appmedication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hms4_appmedication` (
  `appointment_id` int NOT NULL,
  `medication_id` int NOT NULL,
  PRIMARY KEY (`appointment_id`,`medication_id`),
  KEY `medication_id` (`medication_id`),
  CONSTRAINT `hms4_appmedication_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `hms2_appointment` (`appointment_id`),
  CONSTRAINT `hms4_appmedication_ibfk_2` FOREIGN KEY (`medication_id`) REFERENCES `hms4_medication` (`medication_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hms4_appmedication`
--

LOCK TABLES `hms4_appmedication` WRITE;
/*!40000 ALTER TABLE `hms4_appmedication` DISABLE KEYS */;
INSERT INTO `hms4_appmedication` VALUES (1,1),(3,1),(1,2),(2,3),(3,4);
/*!40000 ALTER TABLE `hms4_appmedication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hms4_apptest`
--

DROP TABLE IF EXISTS `hms4_apptest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hms4_apptest` (
  `appointment_id` int NOT NULL,
  `test_id` int NOT NULL,
  PRIMARY KEY (`appointment_id`,`test_id`),
  KEY `test_id` (`test_id`),
  CONSTRAINT `hms4_apptest_ibfk_1` FOREIGN KEY (`appointment_id`) REFERENCES `hms2_appointment` (`appointment_id`),
  CONSTRAINT `hms4_apptest_ibfk_2` FOREIGN KEY (`test_id`) REFERENCES `hms4_labtest` (`test_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hms4_apptest`
--

LOCK TABLES `hms4_apptest` WRITE;
/*!40000 ALTER TABLE `hms4_apptest` DISABLE KEYS */;
INSERT INTO `hms4_apptest` VALUES (1,1),(2,1),(1,2),(3,2),(2,3),(3,4);
/*!40000 ALTER TABLE `hms4_apptest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hms4_labtest`
--

DROP TABLE IF EXISTS `hms4_labtest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hms4_labtest` (
  `test_id` int NOT NULL AUTO_INCREMENT,
  `test_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`test_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hms4_labtest`
--

LOCK TABLES `hms4_labtest` WRITE;
/*!40000 ALTER TABLE `hms4_labtest` DISABLE KEYS */;
INSERT INTO `hms4_labtest` VALUES (1,'Blood Test'),(2,'X-Ray'),(3,'MRI'),(4,'ECG');
/*!40000 ALTER TABLE `hms4_labtest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hms4_medication`
--

DROP TABLE IF EXISTS `hms4_medication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hms4_medication` (
  `medication_id` int NOT NULL AUTO_INCREMENT,
  `medication_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`medication_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hms4_medication`
--

LOCK TABLES `hms4_medication` WRITE;
/*!40000 ALTER TABLE `hms4_medication` DISABLE KEYS */;
INSERT INTO `hms4_medication` VALUES (1,'Paracetamol'),(2,'Ibuprofen'),(3,'Azithromycin'),(4,'Amlodipine');
/*!40000 ALTER TABLE `hms4_medication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hms5_doctormedication`
--

DROP TABLE IF EXISTS `hms5_doctormedication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hms5_doctormedication` (
  `doctor_id` int NOT NULL,
  `medication_id` int NOT NULL,
  PRIMARY KEY (`doctor_id`,`medication_id`),
  KEY `medication_id` (`medication_id`),
  CONSTRAINT `hms5_doctormedication_ibfk_1` FOREIGN KEY (`medication_id`) REFERENCES `hms4_medication` (`medication_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hms5_doctormedication`
--

LOCK TABLES `hms5_doctormedication` WRITE;
/*!40000 ALTER TABLE `hms5_doctormedication` DISABLE KEYS */;
INSERT INTO `hms5_doctormedication` VALUES (1,1),(1,2),(2,3),(1,4);
/*!40000 ALTER TABLE `hms5_doctormedication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hms5_doctorpatient`
--

DROP TABLE IF EXISTS `hms5_doctorpatient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hms5_doctorpatient` (
  `doctor_id` int NOT NULL,
  `patient_id` int NOT NULL,
  PRIMARY KEY (`doctor_id`,`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hms5_doctorpatient`
--

LOCK TABLES `hms5_doctorpatient` WRITE;
/*!40000 ALTER TABLE `hms5_doctorpatient` DISABLE KEYS */;
INSERT INTO `hms5_doctorpatient` VALUES (1,1),(1,3),(2,2);
/*!40000 ALTER TABLE `hms5_doctorpatient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hms5_patientmedication`
--

DROP TABLE IF EXISTS `hms5_patientmedication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hms5_patientmedication` (
  `patient_id` int NOT NULL,
  `medication_id` int NOT NULL,
  PRIMARY KEY (`patient_id`,`medication_id`),
  KEY `medication_id` (`medication_id`),
  CONSTRAINT `hms5_patientmedication_ibfk_1` FOREIGN KEY (`medication_id`) REFERENCES `hms4_medication` (`medication_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hms5_patientmedication`
--

LOCK TABLES `hms5_patientmedication` WRITE;
/*!40000 ALTER TABLE `hms5_patientmedication` DISABLE KEYS */;
INSERT INTO `hms5_patientmedication` VALUES (1,1),(3,1),(1,2),(2,3),(3,4);
/*!40000 ALTER TABLE `hms5_patientmedication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hms_bcnf_department`
--

DROP TABLE IF EXISTS `hms_bcnf_department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hms_bcnf_department` (
  `department_id` int NOT NULL,
  `department_name` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hms_bcnf_department`
--

LOCK TABLES `hms_bcnf_department` WRITE;
/*!40000 ALTER TABLE `hms_bcnf_department` DISABLE KEYS */;
INSERT INTO `hms_bcnf_department` VALUES (1,'Cardiology'),(2,'Neurology');
/*!40000 ALTER TABLE `hms_bcnf_department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hms_bcnf_doctordept`
--

DROP TABLE IF EXISTS `hms_bcnf_doctordept`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hms_bcnf_doctordept` (
  `doctor_id` int NOT NULL,
  `department_id` int NOT NULL,
  PRIMARY KEY (`doctor_id`,`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hms_bcnf_doctordept`
--

LOCK TABLES `hms_bcnf_doctordept` WRITE;
/*!40000 ALTER TABLE `hms_bcnf_doctordept` DISABLE KEYS */;
INSERT INTO `hms_bcnf_doctordept` VALUES (1,1),(2,2);
/*!40000 ALTER TABLE `hms_bcnf_doctordept` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hms_hospital_1nf`
--

DROP TABLE IF EXISTS `hms_hospital_1nf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hms_hospital_1nf` (
  `patient_id` int DEFAULT NULL,
  `patient_name` varchar(100) DEFAULT NULL,
  `doctor_name` varchar(100) DEFAULT NULL,
  `department_name` varchar(100) DEFAULT NULL,
  `appointment_date` date DEFAULT NULL,
  `medication` varchar(100) DEFAULT NULL,
  `lab_test` varchar(100) DEFAULT NULL,
  `bill_amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hms_hospital_1nf`
--

LOCK TABLES `hms_hospital_1nf` WRITE;
/*!40000 ALTER TABLE `hms_hospital_1nf` DISABLE KEYS */;
INSERT INTO `hms_hospital_1nf` VALUES (1,'Amit Sharma','Dr Rajesh','Cardiology','2026-01-10','Paracetamol','Blood Test',3500.00),(1,'Amit Sharma','Dr Rajesh','Cardiology','2026-01-10','Ibuprofen','X-Ray',3500.00),(2,'Riya Mehta','Dr Meena','Neurology','2026-01-11','Azithromycin','MRI',4200.00),(2,'Riya Mehta','Dr Meena','Neurology','2026-01-11','Azithromycin','Blood Test',4200.00),(3,'Rahul Verma','Dr Rajesh','Cardiology','2026-01-12','Paracetamol','ECG',5000.00),(3,'Rahul Verma','Dr Rajesh','Cardiology','2026-01-12','Amlodipine','X-Ray',5000.00);
/*!40000 ALTER TABLE `hms_hospital_1nf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hms_hospital_unf`
--

DROP TABLE IF EXISTS `hms_hospital_unf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hms_hospital_unf` (
  `patient_id` int DEFAULT NULL,
  `patient_name` varchar(100) DEFAULT NULL,
  `doctor_name` varchar(100) DEFAULT NULL,
  `department_name` varchar(100) DEFAULT NULL,
  `appointment_date` date DEFAULT NULL,
  `medications` varchar(200) DEFAULT NULL,
  `lab_tests` varchar(200) DEFAULT NULL,
  `bill_amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hms_hospital_unf`
--

LOCK TABLES `hms_hospital_unf` WRITE;
/*!40000 ALTER TABLE `hms_hospital_unf` DISABLE KEYS */;
INSERT INTO `hms_hospital_unf` VALUES (1,'Amit Sharma','Dr Rajesh','Cardiology','2026-01-10','Paracetamol, Ibuprofen','Blood Test, X-Ray',3500.00),(2,'Riya Mehta','Dr Meena','Neurology','2026-01-11','Azithromycin','MRI, Blood Test',4200.00),(3,'Rahul Verma','Dr Rajesh','Cardiology','2026-01-12','Paracetamol, Amlodipine','ECG, X-Ray',5000.00);
/*!40000 ALTER TABLE `hms_hospital_unf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospital`
--

DROP TABLE IF EXISTS `hospital`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hospital` (
  `hospital_id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `phone_no` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`hospital_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospital`
--

LOCK TABLES `hospital` WRITE;
/*!40000 ALTER TABLE `hospital` DISABLE KEYS */;
INSERT INTO `hospital` VALUES (1,'Apollo','Chennai','9876543210'),(2,'Fortis','Bangalore','9876543211'),(3,'AIIMS','Delhi','9876543212'),(4,'Manipal','Bangalore','9876543213'),(5,'KIMS','Hyderabad','9876543214'),(6,'CMC','Vellore','9876543215'),(7,'Narayana','Bangalore','9876543216'),(8,'Medanta','Gurgaon','9876543217'),(9,'Ruby Hall','Pune','9876543218'),(10,'Yashoda','Hyderabad','9876543219'),(11,'Max','Delhi','9876543220'),(12,'Aster','Kochi','9876543221'),(13,'Care','Vizag','9876543222'),(14,'Columbia Asia','Mysore','9876543223'),(15,'Sahyadri','Pune','9876543224');
/*!40000 ALTER TABLE `hospital` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospital_hms_unf`
--

DROP TABLE IF EXISTS `hospital_hms_unf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hospital_hms_unf` (
  `patient_id` int DEFAULT NULL,
  `patient_name` varchar(100) DEFAULT NULL,
  `doctor_name` varchar(100) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `disease` varchar(200) DEFAULT NULL,
  `medicines` varchar(300) DEFAULT NULL,
  `tests` varchar(200) DEFAULT NULL,
  `room_type` varchar(50) DEFAULT NULL,
  `bill_amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospital_hms_unf`
--

LOCK TABLES `hospital_hms_unf` WRITE;
/*!40000 ALTER TABLE `hospital_hms_unf` DISABLE KEYS */;
INSERT INTO `hospital_hms_unf` VALUES (1,'Amit Sharma','Dr Rajesh Kumar','Cardiology','Hypertension','Paracetamol, Amlodipine','ECG, Blood Test','ICU',5000.00),(2,'Riya Mehta','Dr Rajesh Kumar','Cardiology','Hypertension','Paracetamol, Amlodipine','ECG, MRI','ICU',5200.00),(3,'Rahul Verma','Dr Rajesh Kumar','Cardiology','Hypertension','Paracetamol, Amlodipine','ECG, X-Ray','ICU',5100.00);
/*!40000 ALTER TABLE `hospital_hms_unf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hospital_unf`
--

DROP TABLE IF EXISTS `hospital_unf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hospital_unf` (
  `patient_id` int DEFAULT NULL,
  `patient_name` varchar(100) DEFAULT NULL,
  `doctor_name` varchar(100) DEFAULT NULL,
  `department` varchar(100) DEFAULT NULL,
  `disease` varchar(200) DEFAULT NULL,
  `medicines` varchar(300) DEFAULT NULL,
  `tests` varchar(200) DEFAULT NULL,
  `room_type` varchar(50) DEFAULT NULL,
  `bill_amount` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hospital_unf`
--

LOCK TABLES `hospital_unf` WRITE;
/*!40000 ALTER TABLE `hospital_unf` DISABLE KEYS */;
INSERT INTO `hospital_unf` VALUES (1,'Amit Sharma','Dr Rajesh Kumar','Cardiology','Hypertension','Paracetamol, Amlodipine','ECG','ICU',3500.00),(2,'Riya Mehta','Dr Meena Sharma','Neurology','Migraine','Azithromycin','MRI','General',4200.00),(3,'Rahul Verma','Dr Arjun Singh','Orthopedics','Fracture','Metformin','X-Ray','Private',5000.00),(4,'Neha Gupta','Dr Priya Verma','ENT','Sinusitis','Amlodipine','CT Scan','General',1500.00),(5,'Karan Singh','Dr Anil Joshi','General Medicine','Fever','Omeprazole','Blood Test','Semi-Private',3800.00);
/*!40000 ALTER TABLE `hospital_unf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `insurance`
--

DROP TABLE IF EXISTS `insurance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `insurance` (
  `insurance_id` int NOT NULL,
  `patient_id` int DEFAULT NULL,
  `insurance_type` varchar(100) DEFAULT NULL,
  `card_no` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`insurance_id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `insurance_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insurance`
--

LOCK TABLES `insurance` WRITE;
/*!40000 ALTER TABLE `insurance` DISABLE KEYS */;
INSERT INTO `insurance` VALUES (1,1,'Health Insurance','HDFC123'),(2,2,'Health Insurance','ICICI234'),(3,3,'Updated Insurance','LIC345'),(4,4,'Health Insurance','STAR456'),(5,5,'Health Insurance','MAX567'),(6,6,'Life Insurance','LIC678'),(7,7,'Health Insurance','HDFC789'),(8,8,'Health Insurance','ICICI890'),(9,9,'Life Insurance','LIC901'),(10,10,'Health Insurance','STAR012'),(11,11,'Health Insurance','MAX123'),(12,12,'Life Insurance','LIC234'),(13,13,'Health Insurance','HDFC345'),(14,14,'Health Insurance','ICICI456'),(15,15,'Life Insurance','LIC567'),(301,6,'Health Insurance','INS301');
/*!40000 ALTER TABLE `insurance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lab_test`
--

DROP TABLE IF EXISTS `lab_test`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lab_test` (
  `test_id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `cost` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`test_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lab_test`
--

LOCK TABLES `lab_test` WRITE;
/*!40000 ALTER TABLE `lab_test` DISABLE KEYS */;
INSERT INTO `lab_test` VALUES (1,'Blood Test',500.00),(2,'X-Ray',800.00),(3,'MRI',5000.00),(4,'CT Scan',4000.00),(5,'ECG',700.00),(6,'Urine Test',300.00),(7,'Thyroid',600.00),(8,'Liver Test',1200.00),(9,'Kidney Test',1000.00),(10,'Sugar Test',200.00),(11,'Covid Test',800.00),(12,'Biopsy',3500.00),(13,'Cholesterol',400.00),(14,'Hemoglobin',250.00),(15,'Ultrasound',1500.00);
/*!40000 ALTER TABLE `lab_test` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medical_record`
--

DROP TABLE IF EXISTS `medical_record`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medical_record` (
  `record_id` int NOT NULL,
  `patient_id` int DEFAULT NULL,
  `doctor_id` int DEFAULT NULL,
  `record_date` date DEFAULT NULL,
  PRIMARY KEY (`record_id`),
  KEY `patient_id` (`patient_id`),
  KEY `doctor_id` (`doctor_id`),
  CONSTRAINT `medical_record_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  CONSTRAINT `medical_record_ibfk_2` FOREIGN KEY (`doctor_id`) REFERENCES `doctor` (`doctor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medical_record`
--

LOCK TABLES `medical_record` WRITE;
/*!40000 ALTER TABLE `medical_record` DISABLE KEYS */;
INSERT INTO `medical_record` VALUES (16,1,1,'2026-01-10'),(17,2,2,'2026-01-11'),(18,3,3,'2026-01-12'),(19,4,4,'2026-01-13'),(20,5,5,'2026-01-14'),(21,6,6,'2026-01-15'),(22,7,7,'2026-01-16'),(23,8,8,'2026-01-17'),(24,9,9,'2026-01-18'),(25,10,10,'2026-01-19'),(26,11,11,'2026-01-20'),(27,12,12,'2026-01-21'),(28,13,13,'2026-01-22'),(29,14,14,'2026-01-23'),(30,15,15,'2026-01-24'),(100,1,1,'2026-04-15'),(101,2,2,'2026-04-15'),(102,21,1,'2026-04-26'),(103,23,8,'2026-04-27'),(104,24,1,'2026-05-04'),(105,25,3,'2026-05-04'),(106,26,8,'2026-05-04'),(107,27,4,'2026-05-04'),(108,28,14,'2026-05-04'),(109,29,9,'2026-05-04'),(110,30,5,'2026-05-04'),(111,30,1,'2026-05-04');
/*!40000 ALTER TABLE `medical_record` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medication`
--

DROP TABLE IF EXISTS `medication`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medication` (
  `medication_id` int NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `manufacturer` varchar(100) DEFAULT NULL,
  `cost` decimal(10,2) DEFAULT NULL,
  `stock` int DEFAULT '100',
  PRIMARY KEY (`medication_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medication`
--

LOCK TABLES `medication` WRITE;
/*!40000 ALTER TABLE `medication` DISABLE KEYS */;
INSERT INTO `medication` VALUES (1,'Paracetamol','Cipla',20.00,2),(2,'Azithromycin','Sun Pharma',120.00,2),(3,'Metformin','Lupin',60.00,100),(4,'Amlodipine','Dr Reddy',45.00,100),(5,'Omeprazole','Abbott',30.00,100),(6,'Ibuprofen','Pfizer',50.00,100),(7,'Cetirizine','GSK',25.00,100),(8,'Amoxicillin','Cipla',90.00,100),(9,'Insulin','Novo Nordisk',300.00,100),(10,'Atorvastatin','Zydus',80.00,100),(11,'Losartan','Torrent',55.00,100),(12,'Pantoprazole','Alkem',40.00,100),(13,'Dolo 650','Micro Labs',30.00,5),(14,'Calcium','Himalaya',100.00,100),(15,'Vitamin D','HealthVit',150.00,100),(16,'3DETANTUBE','IPIL',500.00,100);
/*!40000 ALTER TABLE `medication` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `nurse`
--

DROP TABLE IF EXISTS `nurse`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nurse` (
  `nurse_id` int NOT NULL,
  `department_id` int DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `phone_no` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`nurse_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `nurse_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nurse`
--

LOCK TABLES `nurse` WRITE;
/*!40000 ALTER TABLE `nurse` DISABLE KEYS */;
INSERT INTO `nurse` VALUES (1,1,'Nurse A','8111111111'),(2,2,'Nurse B','8222222222'),(3,3,'Nurse C','8333333333'),(4,4,'Nurse D','8444444444'),(5,5,'Nurse E','8555555555'),(6,6,'Nurse F','8666666666'),(7,7,'Nurse G','8777777777'),(8,8,'Nurse H','8888888888'),(9,9,'Nurse I','8999999999'),(10,10,'Nurse J','8000000000'),(11,11,'Nurse K','8110000001'),(12,12,'Nurse L','8220000002'),(13,13,'Nurse M','8330000003'),(14,14,'Nurse N','8440000004'),(15,15,'Nurse O','8550000005');
/*!40000 ALTER TABLE `nurse` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient`
--

DROP TABLE IF EXISTS `patient`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient` (
  `patient_id` int NOT NULL,
  `name` varchar(100) NOT NULL,
  `dob` date DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `phone_no` varchar(15) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`patient_id`),
  UNIQUE KEY `unique_phone` (`phone_no`),
  CONSTRAINT `chk_gender` CHECK ((`gender` in (_cp850'Male',_cp850'Female')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient`
--

LOCK TABLES `patient` WRITE;
/*!40000 ALTER TABLE `patient` DISABLE KEYS */;
INSERT INTO `patient` VALUES (1,'Amit Sharma','1995-05-10','Male','8000000001','Delhi'),(2,'Riya Mehta','1998-02-15','Female','8000000002','Mumbai'),(3,'Rahul Verma','1990-07-21','Male','8000000003','Delhi'),(4,'Neha Gupta','2000-11-01','Female','8888888888','Chennai'),(5,'Karan Singh','1988-08-18','Male','8000000005','Mumbai'),(6,'Ananya Rao','1997-03-05','Female','8000000006','Bangalore'),(7,'Suresh Kumar','1975-09-12','Male','8000000007','Vellore'),(8,'Pooja Patel','1993-12-22','Female','8000000008','Ahmedabad'),(9,'Vivek Mishra','1985-04-30','Male','8000000009','Lucknow'),(10,'Sneha Joshi','1999-06-14','Female','8000000010','Nagpur'),(11,'Rohit Malhotra','1982-01-19','Male','8000000011','Delhi'),(12,'Isha Kapoor','1996-10-07','Female','8000000012','Gurgaon'),(13,'Manish Yadav','1991-02-02','Male','8000000013','Noida'),(14,'Kavya Nair','2001-05-25','Female','8000000014','Kochi'),(15,'Arvind Pillai','1979-08-09','Male','8000000015','Trivandrum'),(16,'Riya Sharma','2000-01-01','Female','9876543210','Chennai'),(20,'Riya',NULL,'Female','9999999999','Chennai'),(21,'RIYA BHARGAVA','2004-05-31','Female','8871133154','Akashwani colony Gwalior, MP'),(22,'ADITYA','2005-12-28','Male','8218885770','estencia , chennai'),(23,'DIVYE','2006-04-28','Male','6005535268','222,C LUDHIYANA'),(24,'AARUSH MANGALANI','2005-12-15','Male','993477554','sanasi hostel srm'),(25,'DR. SADAGOPAN','1973-12-15','Male','97907 43670','SRM QUATERS, CHENNAI'),(26,'SNEHA SINGH','2005-02-25','Female','8957339618','esq B , srm girls hostel'),(27,'NIHARIKA SINGH','2006-05-04','Female','99995448610','B902,shiva temple'),(28,'AGGAM SINGH ','2006-05-04','Male','8812354685','sanasi hostel srm'),(29,'SHAZIA S','2006-05-16','Female','8827239605','M BLOCK SRM '),(30,'DR. E SURESH','1946-11-25','Male','554135461','chennai'),(31,'SANKALP BHARGAVA','2007-07-29','Male','6266403025','Akashwani  colony ');
/*!40000 ALTER TABLE `patient` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_admit`
--

DROP TABLE IF EXISTS `patient_admit`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_admit` (
  `admit_id` int NOT NULL,
  `patient_id` int DEFAULT NULL,
  `bed_id` int DEFAULT NULL,
  `admit_date` date DEFAULT NULL,
  PRIMARY KEY (`admit_id`),
  KEY `patient_id` (`patient_id`),
  KEY `bed_id` (`bed_id`),
  CONSTRAINT `patient_admit_ibfk_1` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`),
  CONSTRAINT `patient_admit_ibfk_2` FOREIGN KEY (`bed_id`) REFERENCES `bed_allocation` (`bed_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_admit`
--

LOCK TABLES `patient_admit` WRITE;
/*!40000 ALTER TABLE `patient_admit` DISABLE KEYS */;
INSERT INTO `patient_admit` VALUES (1,1,1,'2026-01-10'),(2,2,2,'2026-01-11'),(3,3,3,'2026-01-12'),(4,4,4,'2026-01-13'),(5,5,5,'2026-01-14'),(6,6,6,'2026-01-15'),(7,7,7,'2026-01-16'),(8,8,8,'2026-01-17'),(9,9,9,'2026-01-18'),(10,10,10,'2026-01-19'),(11,11,11,'2026-01-20'),(12,12,12,'2026-01-21'),(13,13,13,'2026-01-22'),(14,14,14,'2026-01-23'),(15,15,15,'2026-01-24'),(16,25,3,'2026-05-04');
/*!40000 ALTER TABLE `patient_admit` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `patient_log`
--

DROP TABLE IF EXISTS `patient_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `patient_log` (
  `log_id` int NOT NULL AUTO_INCREMENT,
  `patient_id` int DEFAULT NULL,
  `action` varchar(50) DEFAULT NULL,
  `log_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`log_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `patient_log`
--

LOCK TABLES `patient_log` WRITE;
/*!40000 ALTER TABLE `patient_log` DISABLE KEYS */;
INSERT INTO `patient_log` VALUES (1,20,'Inserted','2026-03-20 19:10:58'),(2,21,'Inserted','2026-04-26 21:19:03'),(3,22,'Inserted','2026-04-27 04:41:55'),(4,23,'Inserted','2026-04-27 05:38:26'),(5,24,'Inserted','2026-05-04 07:20:33'),(6,25,'Inserted','2026-05-04 07:26:26'),(7,26,'Inserted','2026-05-04 17:23:38'),(8,27,'Inserted','2026-05-04 17:34:35'),(9,28,'Inserted','2026-05-04 17:55:51'),(10,29,'Inserted','2026-05-04 18:43:59'),(11,30,'Inserted','2026-05-04 18:52:33'),(12,31,'Inserted','2026-05-22 18:06:39');
/*!40000 ALTER TABLE `patient_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `payment_id` int NOT NULL,
  `bill_id` int DEFAULT NULL,
  `mode` varchar(50) DEFAULT NULL,
  `payment_date` date DEFAULT NULL,
  PRIMARY KEY (`payment_id`),
  KEY `bill_id` (`bill_id`),
  CONSTRAINT `payment_ibfk_1` FOREIGN KEY (`bill_id`) REFERENCES `billing` (`bill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (1,1,'Cash','2026-01-15'),(2,2,'UPI','2026-01-16'),(4,4,'Cash','2026-01-18'),(5,5,'UPI','2026-01-19'),(6,6,'Card','2026-01-20'),(7,7,'UPI','2026-01-21'),(8,8,'Cash','2026-01-22'),(9,9,'Card','2026-01-23'),(10,10,'UPI','2026-01-24'),(11,11,'Cash','2026-01-25'),(12,12,'Card','2026-01-26'),(13,13,'UPI','2026-01-27'),(14,14,'Cash','2026-01-28'),(15,15,'Card','2026-01-29'),(100,100,'UPI','2026-04-15'),(300,300,'Cash','2026-03-01'),(301,301,'UPI','2026-03-02'),(305,3,'UPI','2026-03-05');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `prescription`
--

DROP TABLE IF EXISTS `prescription`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `prescription` (
  `prescription_id` int NOT NULL,
  `record_id` int DEFAULT NULL,
  `medication_id` int DEFAULT NULL,
  `dosage` varchar(50) DEFAULT NULL,
  `duration` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`prescription_id`),
  KEY `record_id` (`record_id`),
  KEY `medication_id` (`medication_id`),
  CONSTRAINT `prescription_ibfk_1` FOREIGN KEY (`record_id`) REFERENCES `medical_record` (`record_id`),
  CONSTRAINT `prescription_ibfk_2` FOREIGN KEY (`medication_id`) REFERENCES `medication` (`medication_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `prescription`
--

LOCK TABLES `prescription` WRITE;
/*!40000 ALTER TABLE `prescription` DISABLE KEYS */;
INSERT INTO `prescription` VALUES (1,16,1,'650mg','5 days'),(2,17,2,'500mg','3 days'),(3,18,3,'500mg','7 days'),(4,19,4,'5mg','10 days'),(5,20,5,'20mg','5 days'),(6,21,6,'400mg','3 days'),(7,22,7,'10mg','5 days'),(8,23,8,'500mg','7 days'),(9,24,9,'10 units','Daily'),(10,25,10,'20mg','30 days'),(11,26,11,'50mg','15 days'),(12,27,12,'40mg','10 days'),(13,28,13,'650mg','3 days'),(14,29,14,'500mg','20 days'),(15,30,15,'600mg','15 days'),(16,23,16,'250','7'),(17,23,16,'500 mg twice','7 days'),(18,25,2,'200','DAILY'),(19,25,6,'500','365'),(20,25,6,'500 mg daily','30 days'),(21,25,3,'500 mg twice daily','15 days'),(22,108,1,'500mg twice daily','5 days'),(23,109,8,'50mg once daily','30 days');
/*!40000 ALTER TABLE `prescription` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `room_id` int NOT NULL,
  `type` varchar(50) DEFAULT NULL,
  `charges` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`room_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,'General',1100.00),(2,'Semi-Private',3000.00),(3,'Private',4600.00),(4,'ICU',5500.00),(5,'Deluxe',4400.00),(6,'General',1100.00),(7,'Private',3300.00),(8,'ICU',6600.00),(9,'Semi-Private',2200.00),(10,'General',1100.00),(11,'Private',3850.00),(12,'ICU',7700.00),(13,'General',1320.00),(14,'Deluxe',4950.00),(15,'Private',4180.00);
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff`
--

DROP TABLE IF EXISTS `staff`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff` (
  `staff_id` int NOT NULL,
  `department_id` int DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `phone_no` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`staff_id`),
  KEY `department_id` (`department_id`),
  CONSTRAINT `staff_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `department` (`department_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff`
--

LOCK TABLES `staff` WRITE;
/*!40000 ALTER TABLE `staff` DISABLE KEYS */;
INSERT INTO `staff` VALUES (1,1,'Rakesh','Clerk','9000000001'),(2,2,'Neha','Receptionist','9000000002'),(3,3,'Amit','Technician','9000000003'),(4,4,'Pooja','Assistant','9000000004'),(5,5,'Ravi','Pharmacist','9000000005'),(6,6,'Anita','Clerk','9000000006'),(7,7,'Suresh','Technician','9000000007'),(8,8,'Kiran','Receptionist','9000000008'),(9,9,'Meena','Assistant','9000000009'),(10,10,'Sunil','Clerk','9000000010'),(11,11,'Arjun','Guard','9000000011'),(12,12,'Nisha','Clerk','9000000012'),(13,13,'Akash','Technician','9000000013'),(14,14,'Komal','Assistant','9000000014'),(15,15,'Deepak','Receptionist','9000000015');
/*!40000 ALTER TABLE `staff` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `staff_unf`
--

DROP TABLE IF EXISTS `staff_unf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `staff_unf` (
  `staff_id` int DEFAULT NULL,
  `name` varchar(100) DEFAULT NULL,
  `role` varchar(50) DEFAULT NULL,
  `phone_no` varchar(50) DEFAULT NULL,
  `department_id` int DEFAULT NULL,
  `department_name` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `staff_unf`
--

LOCK TABLES `staff_unf` WRITE;
/*!40000 ALTER TABLE `staff_unf` DISABLE KEYS */;
INSERT INTO `staff_unf` VALUES (1,'rakesh','clerk','8871133158',1,'ib'),(2,'riya','receptionist','9934774448',3,'it');
/*!40000 ALTER TABLE `staff_unf` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `test_result`
--

DROP TABLE IF EXISTS `test_result`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `test_result` (
  `result_id` int NOT NULL,
  `test_id` int DEFAULT NULL,
  `patient_id` int DEFAULT NULL,
  `result` varchar(200) DEFAULT NULL,
  `test_date` date DEFAULT NULL,
  PRIMARY KEY (`result_id`),
  KEY `test_id` (`test_id`),
  KEY `patient_id` (`patient_id`),
  CONSTRAINT `test_result_ibfk_1` FOREIGN KEY (`test_id`) REFERENCES `lab_test` (`test_id`),
  CONSTRAINT `test_result_ibfk_2` FOREIGN KEY (`patient_id`) REFERENCES `patient` (`patient_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `test_result`
--

LOCK TABLES `test_result` WRITE;
/*!40000 ALTER TABLE `test_result` DISABLE KEYS */;
INSERT INTO `test_result` VALUES (1,1,1,'Normal','2026-01-10'),(2,2,2,'Minor issue','2026-01-11'),(3,3,3,'Normal','2026-01-12'),(4,4,4,'Normal','2026-01-13'),(5,5,5,'High','2026-01-14'),(6,6,6,'Normal','2026-01-15'),(7,7,7,'Critical','2026-01-16'),(8,8,8,'Normal','2026-01-17'),(9,9,9,'Normal','2026-01-18'),(10,10,10,'High','2026-01-19'),(11,11,11,'Positive','2026-01-20'),(12,12,12,'Normal','2026-01-21'),(13,13,13,'Borderline','2026-01-22'),(14,14,14,'Normal','2026-01-23'),(15,15,15,'Normal','2026-01-24'),(16,14,25,'POSITIVE','2026-05-04'),(17,1,26,'positive','2026-05-04'),(18,11,24,'negative','2026-05-04'),(19,4,27,'positive','2026-05-04'),(20,15,29,'positive','2026-05-05');
/*!40000 ALTER TABLE `test_result` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'hospital_hms'
--
/*!50003 DROP FUNCTION IF EXISTS `age_category` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `age_category`(age INT) RETURNS varchar(20) CHARSET utf8mb4
    DETERMINISTIC
BEGIN
    DECLARE category VARCHAR(20);
    
    IF age < 18 THEN
        SET category = 'Child';
    ELSEIF age < 60 THEN
        SET category = 'Adult';
    ELSE
        SET category = 'Senior';
    END IF;
    
    RETURN category;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `apply_discount` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `apply_discount`(amount INT) RETURNS int
    DETERMINISTIC
BEGIN
    RETURN amount - (amount * 0.10);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `bill_status` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `bill_status`(amount INT) RETURNS varchar(20) CHARSET utf8mb4
    DETERMINISTIC
BEGIN
    IF amount > 5000 THEN
        RETURN 'High';
    ELSE
        RETURN 'Normal';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `count_doctors` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `count_doctors`() RETURNS int
    DETERMINISTIC
BEGIN
    DECLARE total INT;
    
    SELECT COUNT(*) INTO total FROM Doctor;
    
    RETURN total;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `count_patients` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `count_patients`() RETURNS int
    DETERMINISTIC
BEGIN
    DECLARE total INT;
    
    SELECT COUNT(*) INTO total FROM Patient;
    
    RETURN total;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `get_doctor_name` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `get_doctor_name`(did INT) RETURNS varchar(100) CHARSET utf8mb4
    DETERMINISTIC
BEGIN
    DECLARE dname VARCHAR(100);
    
    SELECT name INTO dname 
    FROM Doctor 
    WHERE doctor_id = did;
    
    RETURN dname;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `get_patient_name` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `get_patient_name`(pid INT) RETURNS varchar(100) CHARSET utf8mb4
    DETERMINISTIC
BEGIN
    DECLARE pname VARCHAR(100);
    
    SELECT name INTO pname 
    FROM Patient 
    WHERE patient_id = pid;
    
    RETURN pname;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `max_bill` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `max_bill`() RETURNS int
    DETERMINISTIC
BEGIN
    DECLARE maxval INT;
    
    SELECT MAX(total_amount) INTO maxval FROM Billing;
    
    RETURN maxval;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `total_appointments` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `total_appointments`() RETURNS int
    DETERMINISTIC
BEGIN
    DECLARE total INT;
    
    SELECT COUNT(*) INTO total FROM Appointment;
    
    RETURN total;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `total_bill` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `total_bill`(pid INT) RETURNS int
    DETERMINISTIC
BEGIN
    DECLARE total INT;
    
    SELECT SUM(total_amount) INTO total 
    FROM Billing 
    WHERE patient_id = pid;
    
    RETURN total;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `billing_ids` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `billing_ids`()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE bid INT;

    DECLARE cur CURSOR FOR SELECT bill_id FROM Billing;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN cur;

    loop1: LOOP
        FETCH cur INTO bid;
        IF done THEN
            LEAVE loop1;
        END IF;

        SELECT bid;
    END LOOP;

    CLOSE cur;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `count_appointments` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `count_appointments`()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE aid INT;
    DECLARE total INT DEFAULT 0;

    DECLARE cur CURSOR FOR SELECT appointment_id FROM Appointment;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN cur;

    loop1: LOOP
        FETCH cur INTO aid;
        IF done THEN
            LEAVE loop1;
        END IF;
        SET total = total + 1;
    END LOOP;

    CLOSE cur;

    SELECT total;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `count_patients` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `count_patients`()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE id INT;
    DECLARE count_val INT DEFAULT 0;

    DECLARE cur4 CURSOR FOR SELECT patient_id FROM Patient;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN cur4;

    loop3: LOOP
        FETCH cur4 INTO id;
        IF done THEN
            LEAVE loop3;
        END IF;
        SET count_val = count_val + 1;
    END LOOP;

    CLOSE cur4;

    SELECT count_val;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `cursor_error` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `cursor_error`()
BEGIN
    DECLARE done INT DEFAULT 0;

    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    SET done = 1;

    SET done = 0; 

    SELECT 'Cursor execution safely handled' AS message;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `custom_error` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `custom_error`()
BEGIN
    DECLARE amt INT DEFAULT -500;

    IF amt < 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Invalid Billing Amount';
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `delete_error` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_error`()
BEGIN
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    SELECT 'Cannot Delete Record' AS message;

    DELETE FROM Department WHERE department_id = 1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `div_zero` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `div_zero`()
BEGIN
    DECLARE result INT DEFAULT 0;

    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    SET result = 0;

    SET result = 10 / 0;

    SELECT result;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `duplicate_entry` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `duplicate_entry`()
BEGIN
    DECLARE CONTINUE HANDLER FOR 1062
    SELECT 'Duplicate Entry Found' AS message;

    INSERT INTO Patient (patient_id, name, gender, address, phone_no)
    VALUES (1,'Riya','Female','Chennai','9876543210');
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_patient_names` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_patient_names`()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE pname VARCHAR(100);

    DECLARE cur1 CURSOR FOR SELECT name FROM Patient;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN cur1;

    read_loop: LOOP
        FETCH cur1 INTO pname;
        IF done THEN
            LEAVE read_loop;
        END IF;
        SELECT pname;
    END LOOP;

    CLOSE cur1;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `high_bills` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `high_bills`()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE amt INT;

    DECLARE cur CURSOR FOR SELECT total_amount FROM Billing;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN cur;

    loop1: LOOP
        FETCH cur INTO amt;
        IF done THEN
            LEAVE loop1;
        END IF;

        IF amt > 2000 THEN
            SELECT amt;
        END IF;
    END LOOP;

    CLOSE cur;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `list_doctors` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `list_doctors`()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE dname VARCHAR(100);

    DECLARE cur3 CURSOR FOR SELECT name FROM Doctor;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN cur3;

    loop2: LOOP
        FETCH cur3 INTO dname;
        IF done THEN
            LEAVE loop2;
        END IF;
        SELECT dname;
    END LOOP;

    CLOSE cur3;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `multi_error` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `multi_error`()
BEGIN
    DECLARE CONTINUE HANDLER FOR 1062
    SELECT 'Duplicate Error' AS message;

    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    SELECT 'General Error' AS message;

    INSERT INTO Patient VALUES (1,'Test','Male','City','999'); 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `no_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `no_data`()
BEGIN
    DECLARE pname VARCHAR(100);

    DECLARE CONTINUE HANDLER FOR NOT FOUND
    SET pname = 'No Data Found';

    SELECT name INTO pname 
    FROM Patient 
    WHERE patient_id = 999;

    SELECT pname;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `null_error` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `null_error`()
BEGIN
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    SELECT 'NULL Value Not Allowed' AS message;

    INSERT INTO Patient (patient_id, name)
    VALUES (11, NULL);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `patient_city` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `patient_city`()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE pname VARCHAR(100);
    DECLARE addr VARCHAR(100);

    DECLARE cur CURSOR FOR SELECT name, address FROM Patient;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN cur;

    loop1: LOOP
        FETCH cur INTO pname, addr;
        IF done THEN
            LEAVE loop1;
        END IF;
        SELECT pname, addr;
    END LOOP;

    CLOSE cur;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `patient_id_filter` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `patient_id_filter`()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE pid INT;

    DECLARE cur CURSOR FOR SELECT patient_id FROM Patient;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN cur;

    loop1: LOOP
        FETCH cur INTO pid;
        IF done THEN
            LEAVE loop1;
        END IF;

        IF pid > 2 THEN
            SELECT pid;
        END IF;
    END LOOP;

    CLOSE cur;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `resignal_test` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `resignal_test`()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SELECT 'Error occurred' AS message;
        RESIGNAL;
    END;

    SET @a = 10/0;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `total_billing` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `total_billing`()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE amt INT;
    DECLARE total INT DEFAULT 0;

    DECLARE cur2 CURSOR FOR SELECT total_amount FROM Billing;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN cur2;

    loop1: LOOP
        FETCH cur2 INTO amt;
        IF done THEN
            LEAVE loop1;
        END IF;
        SET total = total + amt;
    END LOOP;

    CLOSE cur2;

    SELECT total;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_fail` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_fail`()
BEGIN
    DECLARE CONTINUE HANDLER FOR SQLEXCEPTION
    SELECT 'Update Failed' AS message;

    UPDATE Patient SET name='Test' WHERE patient_id = 999;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `update_room_charges` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp850 */ ;
/*!50003 SET character_set_results = cp850 */ ;
/*!50003 SET collation_connection  = cp850_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `update_room_charges`()
BEGIN
    DECLARE done INT DEFAULT 0;
    DECLARE rid INT;

    DECLARE cur CURSOR FOR SELECT room_id FROM Rooms;
    DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;

    OPEN cur;

    loop1: LOOP
        FETCH cur INTO rid;
        IF done THEN
            LEAVE loop1;
        END IF;

        UPDATE Rooms 
        SET charges = charges * 1.10 
        WHERE room_id = rid;
    END LOOP;

    CLOSE cur;

    SELECT 'Updated Successfully';
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `admitted_patients`
--

/*!50001 DROP VIEW IF EXISTS `admitted_patients`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `admitted_patients` AS select `p`.`name` AS `name`,`pa`.`admit_date` AS `admit_date` from (`patient` `p` join `patient_admit` `pa` on((`p`.`patient_id` = `pa`.`patient_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `billing_view`
--

/*!50001 DROP VIEW IF EXISTS `billing_view`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `billing_view` AS select `p`.`name` AS `name`,`b`.`total_amount` AS `total_amount` from (`patient` `p` join `billing` `b` on((`p`.`patient_id` = `b`.`patient_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `doctor_department`
--

/*!50001 DROP VIEW IF EXISTS `doctor_department`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp850 */;
/*!50001 SET character_set_results     = cp850 */;
/*!50001 SET collation_connection      = cp850_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `doctor_department` AS select `d`.`name` AS `name`,`dep`.`name` AS `department` from (`doctor` `d` join `department` `dep` on((`d`.`department_id` = `dep`.`department_id`))) */;
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

-- Dump completed on 2026-06-25 17:19:00
