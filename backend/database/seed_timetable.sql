-- ========================================================
-- Seed Data: timetable
-- Motilal Nehru National Institute of Technology Allahabad (MNNIT)
-- Department of Computer Science & Engineering
-- MCA Timetable: 1st, 3rd, and 5th Semesters (Odd Semester 2026-27)
-- ========================================================

USE campus_companion_db;

DELETE FROM timetable;

INSERT INTO timetable (id, subject, faculty, room, day, start_time, end_time, semester, branch) VALUES
-- --------------------------------------------------------
-- MCA 1st Semester
-- --------------------------------------------------------
-- Monday
(1, 'Principles of IT Industries Management', 'Dr. Kapil', 'NLH2', 'Monday', '08:00:00', '09:00:00', 1, 'MCA'),
(2, 'Shell Programming Lab (Group A)', 'Dr. Prasun Chandra Tripathi', 'L1 Lab', 'Monday', '10:00:00', '12:00:00', 1, 'MCA'),
(3, 'Digital Computer Organization', 'Mr. Rajesh Tripathi', 'NLH2', 'Monday', '13:00:00', '14:00:00', 1, 'MCA'),
(4, 'Digital Computer Organization Lab (Group A)', 'Mr. Rajesh Tripathi', 'L1 Lab', 'Monday', '15:00:00', '17:00:00', 1, 'MCA'),

-- Tuesday
(5, 'Programming & Problem Solving', 'Dr. Manoj Wairiya', 'NLH2', 'Tuesday', '09:00:00', '10:00:00', 1, 'MCA'),
(6, 'Programming & Problem Solving', 'Dr. Manoj Wairiya', 'NLH2', 'Tuesday', '10:00:00', '11:00:00', 1, 'MCA'),
(7, 'Principles of IT Industries Management', 'Dr. Kapil', 'NLH2', 'Tuesday', '13:00:00', '14:00:00', 1, 'MCA'),
(8, 'Programming & Problem Solving Lab (Group A)', 'Dr. Manoj Wairiya', 'L1 Lab', 'Tuesday', '15:00:00', '17:00:00', 1, 'MCA'),

-- Wednesday
(9, 'Programming & Problem Solving', 'Dr. Manoj Wairiya', 'NLH2', 'Wednesday', '08:00:00', '09:00:00', 1, 'MCA'),
(10, 'Foundation of Logic', 'Dr. Kapil', 'NLH2', 'Wednesday', '09:00:00', '10:00:00', 1, 'MCA'),
(11, 'Digital Computer Organization', 'Mr. Rajesh Tripathi', 'NLH2', 'Wednesday', '13:00:00', '14:00:00', 1, 'MCA'),
(12, 'Shell Programming Lab (Group B)', 'Dr. Ranvijay', 'CCTF Lab', 'Wednesday', '15:00:00', '17:00:00', 1, 'MCA'),

-- Thursday
(13, 'Programming & Problem Solving Lab (Group B)', 'Dr. Prasun Chandra Tripathi', 'L1 Lab', 'Thursday', '09:00:00', '11:00:00', 1, 'MCA'),
(14, 'Foundation of Logic', 'Dr. Kapil', 'NLH2', 'Thursday', '13:00:00', '14:00:00', 1, 'MCA'),
(15, 'Digital Computer Organization Lab (Group B)', 'Mr. Rajesh Tripathi', 'L1 Lab', 'Thursday', '15:00:00', '17:00:00', 1, 'MCA'),

-- Friday
(16, 'Foundation of Logic', 'Dr. Kapil', 'NLH2', 'Friday', '08:00:00', '09:00:00', 1, 'MCA'),
(17, 'Foundation of Logic', 'Dr. Kapil', 'NLH2', 'Friday', '09:00:00', '10:00:00', 1, 'MCA'),
(18, 'Programming & Problem Solving', 'Dr. Manoj Wairiya', 'NLH2', 'Friday', '13:00:00', '14:00:00', 1, 'MCA'),
(19, 'Digital Computer Organization', 'Mr. Rajesh Tripathi', 'NLH2', 'Friday', '14:00:00', '15:00:00', 1, 'MCA'),
(20, 'Digital Computer Organization', 'Mr. Rajesh Tripathi', 'NLH2', 'Friday', '15:00:00', '16:00:00', 1, 'MCA'),

-- --------------------------------------------------------
-- MCA 3rd Semester
-- --------------------------------------------------------
-- Monday
(21, 'Operating System', 'Dr. Manoj Wairiya', 'NLH2', 'Monday', '09:00:00', '10:00:00', 3, 'MCA'),
(22, 'Object Based Modeling', 'Prof. D.K. Yadav', 'NLH2', 'Monday', '10:00:00', '11:00:00', 3, 'MCA'),
(23, 'Object Based Modeling', 'Prof. D.K. Yadav', 'NLH2', 'Monday', '11:00:00', '12:00:00', 3, 'MCA'),
(24, 'Analysis of Algorithms', 'Dr. Divya Kumar', 'GS3', 'Monday', '14:00:00', '15:00:00', 3, 'MCA'),
(25, 'Analysis of Algorithms', 'Dr. Divya Kumar', 'GS3', 'Monday', '15:00:00', '16:00:00', 3, 'MCA'),

-- Tuesday
(26, 'Web Programming Lab', 'Dr. Pragya Dwivedi', 'L1 Lab', 'Tuesday', '10:00:00', '12:00:00', 3, 'MCA'),
(27, 'Soft Computing', 'Dr. Shashank Srivastava', 'NLH2', 'Tuesday', '14:00:00', '15:00:00', 3, 'MCA'),
(28, 'Soft Computing', 'Dr. Shashank Srivastava', 'NLH2', 'Tuesday', '15:00:00', '16:00:00', 3, 'MCA'),

-- Wednesday
(29, 'Database Management System', 'Prof. Anil Kumar Singh', 'NLH2', 'Wednesday', '10:00:00', '11:00:00', 3, 'MCA'),
(30, 'Database Management System', 'Prof. Anil Kumar Singh', 'NLH2', 'Wednesday', '11:00:00', '12:00:00', 3, 'MCA'),
(31, 'Analysis of Algorithms', 'Dr. Divya Kumar', 'GS4', 'Wednesday', '13:00:00', '14:00:00', 3, 'MCA'),
(32, 'Analysis of Algorithms Lab', 'Dr. Divya Kumar', 'L2 Lab', 'Wednesday', '15:00:00', '17:00:00', 3, 'MCA'),
(33, 'Operating System', 'Dr. Manoj Wairiya', 'CSNB1', 'Wednesday', '17:00:00', '18:00:00', 3, 'MCA'),

-- Thursday
(34, 'Operating System', 'Dr. Manoj Wairiya', 'NLH2', 'Thursday', '09:00:00', '10:00:00', 3, 'MCA'),
(35, 'Soft Computing', 'Dr. Shashank Srivastava', 'NLH2', 'Thursday', '10:00:00', '11:00:00', 3, 'MCA'),
(36, 'Object Based Modeling', 'Prof. D.K. Yadav', 'NLH2', 'Thursday', '11:00:00', '12:00:00', 3, 'MCA'),
(37, 'Database Management System Lab', 'Prof. Anil Kumar Singh', 'CCTF Lab', 'Thursday', '15:00:00', '17:00:00', 3, 'MCA'),

-- Friday
(38, 'Analysis of Algorithms', 'Dr. Manoj Wairiya', 'GS5', 'Friday', '09:00:00', '10:00:00', 3, 'MCA'),
(39, 'Database Management System', 'Prof. Anil Kumar Singh', 'NLH2', 'Friday', '10:00:00', '11:00:00', 3, 'MCA'),
(40, 'Database Management System', 'Prof. Anil Kumar Singh', 'NLH2', 'Friday', '11:00:00', '12:00:00', 3, 'MCA'),
(41, 'Operating System Lab', 'Dr. Dinesh Singh', 'CCTF Lab', 'Friday', '15:00:00', '17:00:00', 3, 'MCA'),

-- --------------------------------------------------------
-- MCA 5th Semester
-- --------------------------------------------------------
-- Monday
(42, 'Multimedia Technology', 'Dr. Himanshu Nandanwar', 'GS8', 'Monday', '08:00:00', '09:00:00', 5, 'MCA'),
(43, 'Web Mining', 'Dr. Dinesh Singh', 'GS8', 'Monday', '09:00:00', '10:00:00', 5, 'MCA'),
(44, 'Web Mining', 'Dr. Dinesh Singh', 'GS8', 'Monday', '10:00:00', '11:00:00', 5, 'MCA'),
(45, 'Software Testing', 'Prof. Anoj Kumar', 'GS8', 'Monday', '13:00:00', '14:00:00', 5, 'MCA'),
(46, 'Software Testing', 'Prof. Anoj Kumar', 'GS8', 'Monday', '14:00:00', '15:00:00', 5, 'MCA'),

-- Tuesday
(47, 'E-Commerce', 'Dr. Komal Gupta', 'NLH1', 'Tuesday', '08:00:00', '09:00:00', 5, 'MCA'),
(48, 'Multimedia Technology Lab', 'Dr. Himanshu Nandanwar', 'CCTF Lab', 'Tuesday', '09:00:00', '11:00:00', 5, 'MCA'),
(49, 'Software Testing', 'Prof. Anoj Kumar', 'GS8', 'Tuesday', '13:00:00', '14:00:00', 5, 'MCA'),
(50, 'E-Commerce Lab', 'Dr. Komal Gupta', 'CCTF Lab', 'Tuesday', '15:00:00', '17:00:00', 5, 'MCA'),

-- Wednesday
(51, 'Software Project Management', 'Dr. Shreeya Swagatika Sahoo', 'GS8', 'Wednesday', '08:00:00', '09:00:00', 5, 'MCA'),
(52, 'Professional Ethics', 'Dr. Kailash W. Kalare', 'GS8', 'Wednesday', '09:00:00', '10:00:00', 5, 'MCA'),

-- Thursday
(53, 'Multimedia Technology', 'Dr. Himanshu Nandanwar', 'GS8', 'Thursday', '08:00:00', '09:00:00', 5, 'MCA'),
(54, 'Web Mining', 'Dr. Dinesh Singh', 'GS8', 'Thursday', '09:00:00', '10:00:00', 5, 'MCA'),
(55, 'Software Project Management', 'Dr. Shreeya Swagatika Sahoo', 'GS8', 'Thursday', '13:00:00', '14:00:00', 5, 'MCA'),
(56, 'E-Commerce', 'Dr. Komal Gupta', 'GS8', 'Thursday', '14:00:00', '15:00:00', 5, 'MCA'),

-- Friday
(57, 'E-Commerce', 'Dr. Komal Gupta', 'GS8', 'Friday', '08:00:00', '09:00:00', 5, 'MCA'),
(58, 'E-Commerce', 'Dr. Komal Gupta', 'GS8', 'Friday', '09:00:00', '10:00:00', 5, 'MCA'),
(59, 'Multimedia Technology', 'Dr. Himanshu Nandanwar', 'GS8', 'Friday', '13:00:00', '14:00:00', 5, 'MCA'),
(60, 'Professional Ethics', 'Dr. Kailash W. Kalare', 'GS8', 'Friday', '14:00:00', '15:00:00', 5, 'MCA'),

-- --------------------------------------------------------
-- CSE Branch entries (compatible with project requirements)
-- --------------------------------------------------------
(61, 'DBMS', 'Dr. Sharma', '204', 'Monday', '10:00:00', '11:00:00', 5, 'CSE'),
(62, 'Operating Systems', 'Prof. Verma', '204', 'Monday', '11:15:00', '12:15:00', 5, 'CSE'),
(63, 'Data Structures & Algorithms', 'Prof. Rajesh Nair', '201', 'Tuesday', '09:00:00', '10:00:00', 3, 'CSE'),
(64, 'Theory of Computation', 'Dr. Priya Patel', '204', 'Wednesday', '10:00:00', '11:00:00', 5, 'CSE'),
(65, 'Artificial Intelligence', 'Dr. Sneha Reddy', '305', 'Thursday', '11:15:00', '12:15:00', 7, 'CSE');
