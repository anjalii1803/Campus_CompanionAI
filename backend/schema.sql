-- ============================================================
-- Campus Companion AI — Database Schema (Updated)
-- Run this once to create the database and all tables.
-- ============================================================

CREATE DATABASE IF NOT EXISTS campus_companion_db;
USE campus_companion_db;

-- ── notices table (AI/Backend team) ──────────────────────────
CREATE TABLE IF NOT EXISTS notices (
  id             INT          AUTO_INCREMENT PRIMARY KEY,
  title          VARCHAR(255) NOT NULL,
  file_path      TEXT         NOT NULL,
  extracted_text LONGTEXT,
  uploaded_at    DATETIME     DEFAULT CURRENT_TIMESTAMP
);

-- ── timetable table ───────────────────────────────────────────
-- branch column used by Prachi's model (filter by CSE / IT etc.)
CREATE TABLE IF NOT EXISTS timetable (
  id          INT          AUTO_INCREMENT PRIMARY KEY,
  day         VARCHAR(20)  NOT NULL,
  subject     VARCHAR(100) NOT NULL,
  faculty     VARCHAR(100),
  room        VARCHAR(50),
  start_time  TIME         NOT NULL,
  end_time    TIME         NOT NULL,
  semester    INT,
  branch      VARCHAR(20)
);

-- ── rooms table ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS rooms (
  id          INT          AUTO_INCREMENT PRIMARY KEY,
  room_name   VARCHAR(100) NOT NULL,
  block       VARCHAR(50),
  floor       INT,
  capacity    INT,
  type        VARCHAR(50)
);

-- ── events table ──────────────────────────────────────────────
-- title column used by Prachi's model
CREATE TABLE IF NOT EXISTS events (
  id           INT          AUTO_INCREMENT PRIMARY KEY,
  title        VARCHAR(200) NOT NULL,
  description  TEXT,
  venue        VARCHAR(200),
  event_date   DATE,
  event_time   TIME,
  organizer    VARCHAR(100)
);

-- ── faculty table ─────────────────────────────────────────────
-- subject + cabin_no columns used by Prachi's model
CREATE TABLE IF NOT EXISTS faculty (
  id           INT          AUTO_INCREMENT PRIMARY KEY,
  name         VARCHAR(100) NOT NULL,
  subject      VARCHAR(100),
  email        VARCHAR(150),
  department   VARCHAR(100),
  cabin_no     VARCHAR(50)
);
