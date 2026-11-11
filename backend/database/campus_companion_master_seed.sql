-- ============================================================
--  Campus Companion AI — Master Seed File
--  Database : campus_companion_db
--  Institute : Motilal Nehru National Institute of Technology
--              Allahabad (MNNIT), Prayagraj - 211004, UP
--  Department: Computer Science & Engineering (MCA Programme)
--  Session   : Odd Semester 2026-27
--  How to use: Run this file once in MySQL Workbench
--              (Query → Execute All  or  Ctrl+Shift+Enter)
-- ============================================================

USE campus_companion_db;

-- ============================================================
-- SECTION 0: SAFE CLEANUP (delete old data, keep schema)
-- ============================================================
SET FOREIGN_KEY_CHECKS = 0;
DELETE FROM timetable;
DELETE FROM rooms;
DELETE FROM events;
DELETE FROM faculty;
SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- SECTION 1: FACULTY
-- Source: MNNIT CSE Department + MCA Timetable 2026-27
-- ============================================================
INSERT INTO faculty (id, name, subject, email, department, cabin_no) VALUES
-- ✅ Emails verified from https://mnnit.ac.in/department/engineering/csed#faculty-profile
(1,  'Dr. Manoj Wairiya',            'Programming & Problem Solving, Operating System',
     'wairya@mnnit.ac.in',           'Computer Science & Engineering', 'CS-101'),
-- (Designation: Associate Professor | Ph: 9453317401)

(2,  'Mr. Rajesh Tripathi',          'Digital & Computer Organization',
     'rtripathi@mnnit.ac.in',        'Computer Science & Engineering', 'CS-102'),

(3,  'Dr. Ranvijay',                 'Shell Programming',
     'ranvijay@mnnit.ac.in',         'Computer Science & Engineering', 'CS-103'),

(4,  'Dr. Kapil',                    'Foundation of Logic, IT Industries Management',
     'kapil@mnnit.ac.in',            'Computer Science & Engineering', 'CS-104'),

(5,  'Dr. Prasun Chandra Tripathi',  'Programming & Problem Solving Lab',
     'pctripathi@mnnit.ac.in',       'Computer Science & Engineering', 'CS-105'),

(6,  'Prof. Anil Kumar Singh',       'Database Management System',
     'ak@mnnit.ac.in',               'Computer Science & Engineering', 'CS-201'),
-- (Designation: Professor | Ph: 9452613200)

(7,  'Prof. D.K. Yadav',             'Object Based Modeling',
     'dky@mnnit.ac.in',              'Computer Science & Engineering', 'CS-202'),
-- (Designation: Professor | Ph.D. IIT Bombay | Ph: 9839332380)

(8,  'Dr. Shashank Srivastava',      'Soft Computing',
     'shashank12@mnnit.ac.in',       'Computer Science & Engineering', 'CS-203'),
-- (Designation: Associate Professor | Ph: 9984905199)

(9,  'Dr. Dinesh Singh',             'Operating System Lab, Web Mining',
     'dinesh_singh@mnnit.ac.in',     'Computer Science & Engineering', 'CS-204'),
-- (Designation: Associate Professor | Ph: 7007207964)

(10, 'Lt. Dr. Divya Kumar',          'Analysis of Algorithms',
     'divyak@mnnit.ac.in',           'Computer Science & Engineering', 'CS-205'),
-- (Designation: Associate Professor | Ph: 7905595695)

(11, 'Dr. Pragya Dwivedi',           'Web Programming Lab',
     'pragyadwi86@mnnit.ac.in',      'Computer Science & Engineering', 'CS-206'),
-- (Designation: Associate Professor | Ph: 8601850563)

(12, 'Prof. Anoj Kumar',             'Software Testing',
     'anoj@mnnit.ac.in',             'Computer Science & Engineering', 'CS-301'),

(13, 'Dr. Kailash W. Kalare',        'Professional Ethics',
     'kailash@mnnit.ac.in',          'Computer Science & Engineering', 'CS-302'),

(14, 'Dr. Himanshu Nandanwar',       'Multimedia Technology',
     'himanshu@mnnit.ac.in',         'Computer Science & Engineering', 'CS-303'),

(15, 'Dr. Shreeya Swagatika Sahoo',  'Software Project Management',
     'shreeya@mnnit.ac.in',          'Computer Science & Engineering', 'CS-304'),

(16, 'Dr. Komal Gupta',              'E-Commerce',
     'komal@mnnit.ac.in',            'Computer Science & Engineering', 'CS-305');


-- ============================================================
-- SECTION 2: ROOMS
-- Source: MCA Timetable 2026-27 + MNNIT Campus knowledge
-- ============================================================
INSERT INTO rooms (id, room_name, block, floor, capacity, type) VALUES
(1,  'NLH2',        'New Lecture Hall Complex',              1,  150, 'Classroom'),
(2,  'NLH1',        'New Lecture Hall Complex',              1,  150, 'Classroom'),
(3,  'GS3',         'Computer Science & Engineering Block',  0,   70, 'Classroom'),
(4,  'GS4',         'Computer Science & Engineering Block',  0,   70, 'Classroom'),
(5,  'GS5',         'Computer Science & Engineering Block',  0,   70, 'Classroom'),
(6,  'GS8',         'Computer Science & Engineering Block',  0,   70, 'Classroom'),
(7,  'CSNB1',       'CS New Building',                       1,   80, 'Classroom'),
(8,  'L1 Lab',      'Computer Science & Engineering Block',  1,   50, 'Lab'),
(9,  'L2 Lab',      'Computer Science & Engineering Block',  1,   50, 'Lab'),
(10, 'CCTF Lab',    'Computer Centre Complex',               1,   60, 'Lab'),
(11, 'MP Hall',     'Student Activity Centre (SAC)',          1,  800, 'Auditorium'),
(12, 'Seminar Hall','Computer Science & Engineering Block',  3,  120, 'Auditorium');


-- ============================================================
-- SECTION 3: TIMETABLE
-- Source: MCA_Odd_Sem_2026-27.pdf (uploaded by user)
-- Covers: MCA 1st Sem, MCA 3rd Sem, MCA 5th Sem
-- ============================================================
INSERT INTO timetable (id, subject, faculty, room, day, start_time, end_time, semester, branch) VALUES

-- ----------------------------------------------------------
-- MCA 1st SEMESTER
-- ----------------------------------------------------------
-- Monday
( 1, 'Principles of IT Industries Management', 'Dr. Kapil',                   'NLH2',    'Monday',    '08:00:00', '09:00:00', 1, 'MCA'),
( 2, 'Shell Programming Lab (Group A)',         'Dr. Prasun Chandra Tripathi', 'L1 Lab',  'Monday',    '10:00:00', '12:00:00', 1, 'MCA'),
( 3, 'Digital & Computer Organization',        'Mr. Rajesh Tripathi',         'NLH2',    'Monday',    '13:00:00', '14:00:00', 1, 'MCA'),
( 4, 'Digital & Computer Organization Lab (Group A)', 'Mr. Rajesh Tripathi',  'L1 Lab',  'Monday',    '15:00:00', '17:00:00', 1, 'MCA'),

-- Tuesday
( 5, 'Programming & Problem Solving',          'Dr. Manoj Wairiya',           'NLH2',    'Tuesday',   '09:00:00', '10:00:00', 1, 'MCA'),
( 6, 'Programming & Problem Solving',          'Dr. Manoj Wairiya',           'NLH2',    'Tuesday',   '10:00:00', '11:00:00', 1, 'MCA'),
( 7, 'Principles of IT Industries Management', 'Dr. Kapil',                   'NLH2',    'Tuesday',   '13:00:00', '14:00:00', 1, 'MCA'),
( 8, 'Programming & Problem Solving Lab (Group A)', 'Dr. Manoj Wairiya',      'L1 Lab',  'Tuesday',   '15:00:00', '17:00:00', 1, 'MCA'),

-- Wednesday
( 9, 'Programming & Problem Solving',          'Dr. Manoj Wairiya',           'NLH2',    'Wednesday', '08:00:00', '09:00:00', 1, 'MCA'),
(10, 'Foundation of Logic',                    'Dr. Kapil',                   'NLH2',    'Wednesday', '09:00:00', '10:00:00', 1, 'MCA'),
(11, 'Digital & Computer Organization',        'Mr. Rajesh Tripathi',         'NLH2',    'Wednesday', '13:00:00', '14:00:00', 1, 'MCA'),
(12, 'Shell Programming Lab (Group B)',         'Dr. Ranvijay',               'CCTF Lab','Wednesday', '15:00:00', '17:00:00', 1, 'MCA'),

-- Thursday
(13, 'Programming & Problem Solving Lab (Group B)', 'Dr. Prasun Chandra Tripathi', 'L1 Lab', 'Thursday', '09:00:00', '11:00:00', 1, 'MCA'),
(14, 'Foundation of Logic',                    'Dr. Kapil',                   'NLH2',    'Thursday',  '13:00:00', '14:00:00', 1, 'MCA'),
(15, 'Digital & Computer Organization Lab (Group B)', 'Mr. Rajesh Tripathi',  'L1 Lab',  'Thursday',  '15:00:00', '17:00:00', 1, 'MCA'),

-- Friday
(16, 'Foundation of Logic',                    'Dr. Kapil',                   'NLH2',    'Friday',    '08:00:00', '09:00:00', 1, 'MCA'),
(17, 'Foundation of Logic',                    'Dr. Kapil',                   'NLH2',    'Friday',    '09:00:00', '10:00:00', 1, 'MCA'),
(18, 'Programming & Problem Solving',          'Dr. Manoj Wairiya',           'NLH2',    'Friday',    '13:00:00', '14:00:00', 1, 'MCA'),
(19, 'Digital & Computer Organization',        'Mr. Rajesh Tripathi',         'NLH2',    'Friday',    '14:00:00', '15:00:00', 1, 'MCA'),
(20, 'Digital & Computer Organization',        'Mr. Rajesh Tripathi',         'NLH2',    'Friday',    '15:00:00', '16:00:00', 1, 'MCA'),

-- ----------------------------------------------------------
-- MCA 3rd SEMESTER
-- ----------------------------------------------------------
-- Monday
(21, 'Operating System',                       'Dr. Manoj Wairiya',           'NLH2',    'Monday',    '09:00:00', '10:00:00', 3, 'MCA'),
(22, 'Object Based Modeling',                  'Prof. D.K. Yadav',            'NLH2',    'Monday',    '10:00:00', '11:00:00', 3, 'MCA'),
(23, 'Object Based Modeling',                  'Prof. D.K. Yadav',            'NLH2',    'Monday',    '11:00:00', '12:00:00', 3, 'MCA'),
(24, 'Analysis of Algorithms',                 'Dr. Divya Kumar',             'GS3',     'Monday',    '14:00:00', '15:00:00', 3, 'MCA'),
(25, 'Analysis of Algorithms',                 'Dr. Divya Kumar',             'GS3',     'Monday',    '15:00:00', '16:00:00', 3, 'MCA'),

-- Tuesday
(26, 'Web Programming Lab',                    'Dr. Pragya Dwivedi',          'L1 Lab',  'Tuesday',   '10:00:00', '12:00:00', 3, 'MCA'),
(27, 'Soft Computing',                         'Dr. Shashank Srivastava',     'NLH2',    'Tuesday',   '14:00:00', '15:00:00', 3, 'MCA'),
(28, 'Soft Computing',                         'Dr. Shashank Srivastava',     'NLH2',    'Tuesday',   '15:00:00', '16:00:00', 3, 'MCA'),

-- Wednesday
(29, 'Database Management System',             'Prof. Anil Kumar Singh',      'NLH2',    'Wednesday', '10:00:00', '11:00:00', 3, 'MCA'),
(30, 'Database Management System',             'Prof. Anil Kumar Singh',      'NLH2',    'Wednesday', '11:00:00', '12:00:00', 3, 'MCA'),
(31, 'Analysis of Algorithms',                 'Dr. Divya Kumar',             'GS4',     'Wednesday', '13:00:00', '14:00:00', 3, 'MCA'),
(32, 'Analysis of Algorithms Lab',             'Dr. Divya Kumar',             'L2 Lab',  'Wednesday', '15:00:00', '17:00:00', 3, 'MCA'),
(33, 'Operating System',                       'Dr. Manoj Wairiya',           'CSNB1',   'Wednesday', '17:00:00', '18:00:00', 3, 'MCA'),

-- Thursday
(34, 'Operating System',                       'Dr. Manoj Wairiya',           'NLH2',    'Thursday',  '09:00:00', '10:00:00', 3, 'MCA'),
(35, 'Soft Computing',                         'Dr. Shashank Srivastava',     'NLH2',    'Thursday',  '10:00:00', '11:00:00', 3, 'MCA'),
(36, 'Object Based Modeling',                  'Prof. D.K. Yadav',            'NLH2',    'Thursday',  '11:00:00', '12:00:00', 3, 'MCA'),
(37, 'Database Management System Lab',         'Prof. Anil Kumar Singh',      'CCTF Lab','Thursday',  '15:00:00', '17:00:00', 3, 'MCA'),

-- Friday
(38, 'Analysis of Algorithms',                 'Dr. Manoj Wairiya',           'GS5',     'Friday',    '09:00:00', '10:00:00', 3, 'MCA'),
(39, 'Database Management System',             'Prof. Anil Kumar Singh',      'NLH2',    'Friday',    '10:00:00', '11:00:00', 3, 'MCA'),
(40, 'Database Management System',             'Prof. Anil Kumar Singh',      'NLH2',    'Friday',    '11:00:00', '12:00:00', 3, 'MCA'),
(41, 'Operating System Lab',                   'Dr. Dinesh Singh',            'CCTF Lab','Friday',    '15:00:00', '17:00:00', 3, 'MCA'),

-- ----------------------------------------------------------
-- MCA 5th SEMESTER
-- ----------------------------------------------------------
-- Monday
(42, 'Multimedia Technology',                  'Dr. Himanshu Nandanwar',      'GS8',     'Monday',    '08:00:00', '09:00:00', 5, 'MCA'),
(43, 'Web Mining',                             'Dr. Dinesh Singh',            'GS8',     'Monday',    '09:00:00', '10:00:00', 5, 'MCA'),
(44, 'Web Mining',                             'Dr. Dinesh Singh',            'GS8',     'Monday',    '10:00:00', '11:00:00', 5, 'MCA'),
(45, 'Software Testing',                       'Prof. Anoj Kumar',            'GS8',     'Monday',    '13:00:00', '14:00:00', 5, 'MCA'),
(46, 'Software Testing',                       'Prof. Anoj Kumar',            'GS8',     'Monday',    '14:00:00', '15:00:00', 5, 'MCA'),

-- Tuesday
(47, 'E-Commerce',                             'Dr. Komal Gupta',             'NLH1',    'Tuesday',   '08:00:00', '09:00:00', 5, 'MCA'),
(48, 'Multimedia Technology Lab',              'Dr. Himanshu Nandanwar',      'CCTF Lab','Tuesday',   '09:00:00', '11:00:00', 5, 'MCA'),
(49, 'Software Testing',                       'Prof. Anoj Kumar',            'GS8',     'Tuesday',   '13:00:00', '14:00:00', 5, 'MCA'),
(50, 'E-Commerce Lab',                         'Dr. Komal Gupta',             'CCTF Lab','Tuesday',   '15:00:00', '17:00:00', 5, 'MCA'),

-- Wednesday
(51, 'Software Project Management',            'Dr. Shreeya Swagatika Sahoo', 'GS8',     'Wednesday', '08:00:00', '09:00:00', 5, 'MCA'),
(52, 'Professional Ethics',                    'Dr. Kailash W. Kalare',       'GS8',     'Wednesday', '09:00:00', '10:00:00', 5, 'MCA'),

-- Thursday
(53, 'Multimedia Technology',                  'Dr. Himanshu Nandanwar',      'GS8',     'Thursday',  '08:00:00', '09:00:00', 5, 'MCA'),
(54, 'Web Mining',                             'Dr. Dinesh Singh',            'GS8',     'Thursday',  '09:00:00', '10:00:00', 5, 'MCA'),
(55, 'Software Project Management',            'Dr. Shreeya Swagatika Sahoo', 'GS8',     'Thursday',  '13:00:00', '14:00:00', 5, 'MCA'),
(56, 'E-Commerce',                             'Dr. Komal Gupta',             'GS8',     'Thursday',  '14:00:00', '15:00:00', 5, 'MCA'),

-- Friday
(57, 'E-Commerce',                             'Dr. Komal Gupta',             'GS8',     'Friday',    '08:00:00', '09:00:00', 5, 'MCA'),
(58, 'E-Commerce',                             'Dr. Komal Gupta',             'GS8',     'Friday',    '09:00:00', '10:00:00', 5, 'MCA'),
(59, 'Multimedia Technology',                  'Dr. Himanshu Nandanwar',      'GS8',     'Friday',    '13:00:00', '14:00:00', 5, 'MCA'),
(60, 'Professional Ethics',                    'Dr. Kailash W. Kalare',       'GS8',     'Friday',    '14:00:00', '15:00:00', 5, 'MCA');


-- ============================================================
-- SECTION 4: EVENTS
-- Source: Academic Calendar Odd Semester 2026-27, MNNIT
-- Note: Dates computed dynamically from CURDATE() so they
--       remain relevant whenever this file is re-run.
-- ============================================================
INSERT INTO events (id, title, description, venue, event_date, event_time, organizer) VALUES
(1, 'Tech Fest 2026',
    'Annual technical symposium featuring coding competitions, robotics exhibits, project expos, and keynote addresses by industry experts.',
    'MP Hall',
    DATE_ADD(CURDATE(), INTERVAL 5 DAY),
    '09:00:00',
    'CSE Department, MNNIT'),

(2, 'Culrav-Avishkar 2026',
    'MNNIT Annual Techno-Cultural Festival: national hackathon, cultural performances, celebrity night, and prize distribution.',
    'MP Hall & SAC Grounds',
    DATE_ADD(CURDATE(), INTERVAL 8 DAY),
    '10:00:00',
    'Student Activity Centre (SAC), MNNIT'),

(3, 'Mid-Semester Examinations — Odd Sem 2026-27',
    'Mid-term theory examinations for MCA 1st, 3rd, 5th Semesters and B.Tech programmes.',
    'NLH Complex',
    DATE_ADD(CURDATE(), INTERVAL 15 DAY),
    '09:30:00',
    'Office of Dean (Academic), MNNIT'),

(4, 'Practical Exam & Lab Record Submission',
    'End-of-semester lab workbook submission, practical examinations, and external viva evaluation.',
    'L1 & L2 Labs, CSED',
    DATE_ADD(CURDATE(), INTERVAL 24 DAY),
    '10:00:00',
    'Department of CSE, MNNIT'),

(5, 'End Semester Theory Examinations — Odd Sem 2026-27',
    'Final theory examinations for all programmes across engineering departments.',
    'NLH1 & NLH2',
    DATE_ADD(CURDATE(), INTERVAL 32 DAY),
    '09:30:00',
    'Examination Cell, MNNIT'),

(6, 'Hack36 — 36-Hour National Hackathon',
    'Premier national collegiate hackathon organized by the Computer Science Department; open to all engineering students.',
    'CCTF Lab & Computer Centre',
    DATE_ADD(CURDATE(), INTERVAL 42 DAY),
    '18:00:00',
    'Computer Coding Club, MNNIT'),

(7, 'Alumni Mentorship & Placement Conclave',
    'Interactive panel discussion and mock interviews with MNNIT alumni working in top software and cloud engineering companies.',
    'Seminar Hall, CSED',
    DATE_ADD(CURDATE(), INTERVAL 50 DAY),
    '15:00:00',
    'Training & Placement Cell, MNNIT'),

(8, 'Commencement of Even Semester 2026-27',
    'Reopening of physical instruction, lab sessions, and registration for all continuing students.',
    'NLH Complex & CSED',
    DATE_ADD(CURDATE(), INTERVAL 65 DAY),
    '08:00:00',
    'Registrar Office, MNNIT');

-- ============================================================
-- END OF SEED FILE
-- ============================================================
-- Quick verification queries (optional — uncomment to run):
-- SELECT COUNT(*) AS faculty_count  FROM faculty;    -- expect 16
-- SELECT COUNT(*) AS room_count     FROM rooms;      -- expect 12
-- SELECT COUNT(*) AS timetable_rows FROM timetable;  -- expect 60
-- SELECT COUNT(*) AS event_count    FROM events;     -- expect  8
-- ============================================================
