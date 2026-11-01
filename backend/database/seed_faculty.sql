-- ========================================================
-- Seed Data: faculty
-- Motilal Nehru National Institute of Technology Allahabad (MNNIT)
-- Department of Computer Science & Engineering Faculty
-- ========================================================

USE campus_companion_db;

DELETE FROM faculty;

INSERT INTO faculty (id, name, subject, email, department, cabin_no) VALUES
(1, 'Dr. Manoj Wairiya', 'Programming & Problem Solving, Operating System', 'manoj@mnnit.ac.in', 'Computer Science & Engineering', 'CS-101'),
(2, 'Mr. Rajesh Tripathi', 'Digital Computer Organization', 'rtripathi@mnnit.ac.in', 'Computer Science & Engineering', 'CS-102'),
(3, 'Dr. Ranvijay', 'Shell Programming', 'ranvijay@mnnit.ac.in', 'Computer Science & Engineering', 'CS-103'),
(4, 'Dr. Kapil', 'Foundation of Logic, IT Management', 'kapil@mnnit.ac.in', 'Computer Science & Engineering', 'CS-104'),
(5, 'Dr. Prasun Chandra Tripathi', 'Programming & Problem Solving Lab', 'pctripathi@mnnit.ac.in', 'Computer Science & Engineering', 'CS-105'),
(6, 'Prof. Anil Kumar Singh', 'Database Management System', 'aks@mnnit.ac.in', 'Computer Science & Engineering', 'CS-201'),
(7, 'Prof. D.K. Yadav', 'Object Based Modeling', 'dky@mnnit.ac.in', 'Computer Science & Engineering', 'CS-202'),
(8, 'Dr. Shashank Srivastava', 'Soft Computing', 'shashank@mnnit.ac.in', 'Computer Science & Engineering', 'CS-203'),
(9, 'Dr. Dinesh Singh', 'Operating System Lab, Web Mining', 'dinesh@mnnit.ac.in', 'Computer Science & Engineering', 'CS-204'),
(10, 'Dr. Divya Kumar', 'Analysis of Algorithms', 'divyak@mnnit.ac.in', 'Computer Science & Engineering', 'CS-205'),
(11, 'Dr. Pragya Dwivedi', 'Web Programming Lab', 'pragya@mnnit.ac.in', 'Computer Science & Engineering', 'CS-206'),
(12, 'Prof. Anoj Kumar', 'Software Testing', 'anoj@mnnit.ac.in', 'Computer Science & Engineering', 'CS-301'),
(13, 'Dr. Kailash W. Kalare', 'Professional Ethics', 'kailash@mnnit.ac.in', 'Computer Science & Engineering', 'CS-302'),
(14, 'Dr. Himanshu Nandanwar', 'Multimedia Technology', 'himanshu@mnnit.ac.in', 'Computer Science & Engineering', 'CS-303'),
(15, 'Dr. Shreeya Swagatika Sahoo', 'Software Project Management', 'shreeya@mnnit.ac.in', 'Computer Science & Engineering', 'CS-304'),
(16, 'Dr. Komal Gupta', 'E-Commerce', 'komal@mnnit.ac.in', 'Computer Science & Engineering', 'CS-305'),
(17, 'Dr. Sharma', 'DBMS', 'sharma@college.edu', 'Computer Science & Engineering', 'C-12');
