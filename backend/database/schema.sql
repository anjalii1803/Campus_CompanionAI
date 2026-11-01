-- ========================================================
-- Campus Companion AI - Database Schema
-- Database Name: campus_companion_db
-- ========================================================

CREATE DATABASE IF NOT EXISTS campus_companion_db;
USE campus_companion_db;

-- --------------------------------------------------------
-- Table 1: timetable
-- --------------------------------------------------------
DROP TABLE IF EXISTS timetable;
CREATE TABLE timetable (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  subject     VARCHAR(100) NOT NULL,
  faculty     VARCHAR(100),
  room        VARCHAR(50),
  day         ENUM('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'),
  start_time  TIME,
  end_time    TIME,
  semester    INT,
  branch      VARCHAR(50)
);

-- --------------------------------------------------------
-- Table 2: rooms
-- --------------------------------------------------------
DROP TABLE IF EXISTS rooms;
CREATE TABLE rooms (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  room_name   VARCHAR(50) NOT NULL,
  block       VARCHAR(50),
  floor       INT,
  capacity    INT,
  type        ENUM('Lab','Classroom','Auditorium')
);

-- --------------------------------------------------------
-- Table 3: events
-- --------------------------------------------------------
DROP TABLE IF EXISTS events;
CREATE TABLE events (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(150),
  description TEXT,
  venue       VARCHAR(100),
  event_date  DATE,
  event_time  TIME,
  organizer   VARCHAR(100)
);

-- --------------------------------------------------------
-- Table 4: faculty
-- --------------------------------------------------------
DROP TABLE IF EXISTS faculty;
CREATE TABLE faculty (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  subject     VARCHAR(100),
  email       VARCHAR(100),
  department  VARCHAR(100),
  cabin_no    VARCHAR(50)
);

-- --------------------------------------------------------
-- Table 5: notices
-- --------------------------------------------------------
DROP TABLE IF EXISTS notices;
CREATE TABLE notices (
  id             INT AUTO_INCREMENT PRIMARY KEY,
  title          VARCHAR(200),
  file_path      VARCHAR(255),
  extracted_text LONGTEXT,
  uploaded_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
