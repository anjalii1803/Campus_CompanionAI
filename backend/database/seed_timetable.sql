-- ========================================================
-- Seed Data: timetable
-- Motilal Nehru National Institute of Technology Allahabad (MNNIT)
-- Department of Computer Science & Engineering
-- Official Timetable (Odd Semester 2026–27)
-- ========================================================

USE campus_companion_db;

DELETE FROM timetable;

INSERT INTO timetable (id, subject, faculty, room, day, start_time, end_time, semester, branch) VALUES
-- --------------------------------------------------------
-- MCA 3rd Semester (Official MNNIT CSED Master Record)
-- --------------------------------------------------------
-- Monday
(1, 'Object Based Modeling', 'Prof. D. K. Yadav', 'NLH2', 'Monday', '08:00:00', '10:00:00', 3, 'MCA'),
(2, 'Web Programming Lab', 'Dr. Pragya Dwivedi', 'L1 Lab', 'Monday', '10:00:00', '11:00:00', 3, 'MCA'),
(3, 'Operating System', 'Dr. Manoj Wairiya', 'NLH2', 'Monday', '11:00:00', '12:00:00', 3, 'MCA'),
(4, 'Analysis of Algorithms', 'Dr. Divya Kumar', 'GS3', 'Monday', '14:00:00', '16:00:00', 3, 'MCA'),
(5, 'Soft Computing', 'Dr. Shashank Srivastava', 'NLH2', 'Monday', '16:00:00', '17:00:00', 3, 'MCA'),

-- Tuesday
(6, 'Soft Computing', 'Dr. Shashank Srivastava', 'NLH2', 'Tuesday', '16:00:00', '17:00:00', 3, 'MCA'),

-- Wednesday
(7, 'Data Management System', 'Prof. Anil Kumar Singh', 'NLH2', 'Wednesday', '09:00:00', '11:00:00', 3, 'MCA'),
(8, 'Analysis of Algorithms', 'Dr. Divya Kumar', 'GS4', 'Wednesday', '13:00:00', '14:00:00', 3, 'MCA'),
(9, 'Analysis of Algorithms Lab', 'Dr. Divya Kumar', 'L2 Lab', 'Wednesday', '14:00:00', '16:00:00', 3, 'MCA'),
(10, 'Operating System', 'Dr. Manoj Wairiya', 'CSNB1', 'Wednesday', '16:00:00', '17:00:00', 3, 'MCA'),

-- Thursday
(11, 'Soft Computing', 'Dr. Shashank Srivastava', 'NLH2', 'Thursday', '09:00:00', '10:00:00', 3, 'MCA'),
(12, 'Operating System', 'Dr. Manoj Wairiya', 'NLH2', 'Thursday', '10:00:00', '11:00:00', 3, 'MCA'),
(13, 'Object Based Modeling', 'Prof. D. K. Yadav', 'NLH2', 'Thursday', '11:00:00', '12:00:00', 3, 'MCA'),
(14, 'Data Management System Lab', 'Prof. Anil Kumar Singh', 'CCTF Lab', 'Thursday', '14:00:00', '16:00:00', 3, 'MCA'),

-- Friday
(15, 'Data Management System', 'Prof. Anil Kumar Singh', 'NLH2', 'Friday', '09:00:00', '10:00:00', 3, 'MCA'),
(16, 'Analysis of Algorithms', 'Dr. Manoj Wairiya', 'GS5', 'Friday', '10:00:00', '11:00:00', 3, 'MCA'),
(17, 'Data Management System', 'Prof. Anil Kumar Singh', 'NLH2', 'Friday', '11:00:00', '12:00:00', 3, 'MCA'),
(18, 'Operating System Lab', 'Dr. Dinesh Singh', 'CCTF Lab', 'Friday', '14:00:00', '16:00:00', 3, 'MCA'),

-- --------------------------------------------------------
-- MCA 1st Semester
-- --------------------------------------------------------
-- Monday
(19, 'Principles of IT Industries Management', 'Dr. Kapil', 'NLH2', 'Monday', '08:00:00', '09:00:00', 1, 'MCA'),
(20, 'Shell Programming Lab (Group A)', 'Dr. Prasun Chandra Tripathi', 'L1 Lab', 'Monday', '10:00:00', '11:00:00', 1, 'MCA'),
(21, 'Digital Computer Organization', 'Mr. Rajesh Tripathi', 'NLH2', 'Monday', '13:00:00', '14:00:00', 1, 'MCA'),
(22, 'Digital Computer Organization Lab (Group A)', 'Mr. Rajesh Tripathi', 'L1 Lab', 'Monday', '15:00:00', '17:00:00', 1, 'MCA'),

-- Tuesday
(23, 'Programming & Problem Solving', 'Dr. Manoj Wairiya', 'NLH2', 'Tuesday', '09:00:00', '11:00:00', 1, 'MCA'),
(24, 'Principles of IT Industries Management', 'Dr. Kapil', 'NLH2', 'Tuesday', '13:00:00', '14:00:00', 1, 'MCA'),
(25, 'Programming & Problem Solving Lab (Group A)', 'Dr. Manoj Wairiya', 'L1 Lab', 'Tuesday', '15:00:00', '17:00:00', 1, 'MCA'),

-- Wednesday
(26, 'Programming & Problem Solving', 'Dr. Manoj Wairiya', 'NLH2', 'Wednesday', '08:00:00', '09:00:00', 1, 'MCA'),
(27, 'Foundation of Logic', 'Dr. Kapil', 'NLH2', 'Wednesday', '09:00:00', '10:00:00', 1, 'MCA'),
(28, 'Digital Computer Organization', 'Mr. Rajesh Tripathi', 'NLH2', 'Wednesday', '13:00:00', '14:00:00', 1, 'MCA'),
(29, 'Shell Programming Lab (Group B)', 'Dr. Ranvijay', 'CCTF Lab', 'Wednesday', '15:00:00', '17:00:00', 1, 'MCA'),

-- Thursday
(30, 'Programming & Problem Solving Lab (Group B)', 'Dr. Prasun Chandra Tripathi', 'L1 Lab', 'Thursday', '09:00:00', '11:00:00', 1, 'MCA'),
(31, 'Foundation of Logic', 'Dr. Kapil', 'NLH2', 'Thursday', '14:00:00', '15:00:00', 1, 'MCA'),
(32, 'Digital Computer Organization Lab (Group B)', 'Mr. Rajesh Tripathi', 'L1 Lab', 'Thursday', '16:00:00', '18:00:00', 1, 'MCA'),

-- Friday
(33, 'Foundation of Logic', 'Dr. Kapil', 'NLH2', 'Friday', '08:00:00', '10:00:00', 1, 'MCA'),
(34, 'Programming & Problem Solving', 'Dr. Manoj Wairiya', 'NLH2', 'Friday', '14:00:00', '15:00:00', 1, 'MCA'),
(35, 'Digital Computer Organization', 'Mr. Rajesh Tripathi', 'NLH2', 'Friday', '15:00:00', '17:00:00', 1, 'MCA'),

-- --------------------------------------------------------
-- MCA 5th Semester
-- --------------------------------------------------------
-- Monday
(36, 'Multimedia Technology', 'Dr. Himanshu Nandanwar', 'GS8', 'Monday', '08:00:00', '09:00:00', 5, 'MCA'),
(37, 'PE-II (Web Mining)', 'Dr. Dinesh Singh', 'GS8', 'Monday', '09:00:00', '11:00:00', 5, 'MCA'),
(38, 'PE-III (SW Testing)', 'Prof. Anoj Kumar', 'GS8', 'Monday', '13:00:00', '15:00:00', 5, 'MCA'),

-- Tuesday
(39, 'E-Commerce', 'Dr. Komal Gupta', 'NLH1', 'Tuesday', '08:00:00', '09:00:00', 5, 'MCA'),
(40, 'Multimedia Technology Lab', 'Dr. Himanshu Nandanwar', 'CCTF Lab', 'Tuesday', '09:00:00', '11:00:00', 5, 'MCA'),
(41, 'PE-III (SW Testing)', 'Prof. Anoj Kumar', 'GS8', 'Tuesday', '13:00:00', '14:00:00', 5, 'MCA'),
(42, 'E-Commerce Lab', 'Dr. Komal Gupta', 'CCTF Lab', 'Tuesday', '14:00:00', '16:00:00', 5, 'MCA'),

-- Wednesday
(43, 'Software Project Management', 'Dr. Shreeya Swagatika Sahoo', 'GS8', 'Wednesday', '08:00:00', '09:00:00', 5, 'MCA'),
(44, 'Professional Ethics', 'Dr. Kailash W. Kalare', 'GS8', 'Wednesday', '09:00:00', '10:00:00', 5, 'MCA'),
(45, 'PE-II (Web Mining)', 'Dr. Dinesh Singh', 'GS8', 'Wednesday', '10:00:00', '11:00:00', 5, 'MCA'),
(46, 'Software Project Management', 'Dr. Shreeya Swagatika Sahoo', 'GS8', 'Wednesday', '14:00:00', '15:00:00', 5, 'MCA'),

-- Thursday
(47, 'Multimedia Technology', 'Dr. Himanshu Nandanwar', 'GS8', 'Thursday', '08:00:00', '09:00:00', 5, 'MCA'),
(48, 'E-Commerce', 'Dr. Komal Gupta', 'GS8', 'Thursday', '15:00:00', '16:00:00', 5, 'MCA'),

-- Friday
(49, 'E-Commerce', 'Dr. Komal Gupta', 'GS8', 'Friday', '08:00:00', '10:00:00', 5, 'MCA'),
(50, 'Multimedia Technology', 'Dr. Himanshu Nandanwar', 'GS8', 'Friday', '14:00:00', '15:00:00', 5, 'MCA'),
(51, 'Professional Ethics', 'Dr. Kailash W. Kalare', 'GS8', 'Friday', '15:00:00', '16:00:00', 5, 'MCA');
