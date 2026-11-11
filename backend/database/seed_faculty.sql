-- ========================================================
-- Seed Data: faculty
-- Motilal Nehru National Institute of Technology Allahabad (MNNIT)
-- Department of Computer Science & Engineering
-- Official Faculty Directory (Session 2026–27)
-- ========================================================

USE campus_companion_db;

DELETE FROM faculty;

INSERT INTO faculty (id, name, subject, email, department, cabin_no) VALUES
(1, 'Dr. Manoj Wairiya', 'Operating System, Programming & Problem Solving, OS', 'wairya@mnnit.ac.in', 'Computer Science & Engineering', 'CS-101'),
(2, 'Prof. Anil Kumar Singh', 'Data Management System, DBMS, DBMS Lab, Database Systems', 'ak@mnnit.ac.in', 'Computer Science & Engineering', 'CS-201'),
(3, 'Dr. Shashank Srivastava', 'Soft Computing', 'shashank12@mnnit.ac.in', 'Computer Science & Engineering', 'CS-203'),
(4, 'Prof. D. K. Yadav', 'Object Based Modeling, OBM, OOPS', 'dky@mnnit.ac.in', 'Computer Science & Engineering', 'CS-202'),
(5, 'Dr. Divya Kumar', 'Analysis of Algorithms, Algorithms Lab, DAA', 'divyak@mnnit.ac.in', 'Computer Science & Engineering', 'CS-104'),
(6, 'Dr. Pragya Dwivedi', 'Web Programming Lab', 'pragya@mnnit.ac.in', 'Computer Science & Engineering', 'CS-105'),
(7, 'Dr. Dinesh Singh', 'Operating System Lab, Web Mining (PE-II), OS Lab', 'dinesh@mnnit.ac.in', 'Computer Science & Engineering', 'CS-106'),
(8, 'Mr. Rajesh Tripathi', 'Digital Computer Organization, DCO Lab, DCO', 'rtripathi@mnnit.ac.in', 'Computer Science & Engineering', 'CS-107'),
(9, 'Dr. Kapil', 'Foundation of Logic, Principles of IT Industries Management', 'kapil@mnnit.ac.in', 'Computer Science & Engineering', 'CS-108'),
(10, 'Dr. Ranvijay', 'Shell Programming Lab', 'ranvijay@mnnit.ac.in', 'Computer Science & Engineering', 'CS-204'),
(11, 'Dr. Prasun Chandra Tripathi', 'Shell Programming Lab, PPS Lab', 'pctripathi@mnnit.ac.in', 'Computer Science & Engineering', 'CS-109'),
(12, 'Dr. Himanshu Nandanwar', 'Multimedia Technology, Multimedia Lab', 'hnandanwar@mnnit.ac.in', 'Computer Science & Engineering', 'CS-110'),
(13, 'Dr. Komal Gupta', 'E-Commerce, E-Commerce Lab', 'komal@mnnit.ac.in', 'Computer Science & Engineering', 'CS-111'),
(14, 'Dr. Kailash W. Kalare', 'Professional Ethics', 'kwkalare@mnnit.ac.in', 'Computer Science & Engineering', 'CS-112'),
(15, 'Dr. Shreeya Swagatika Sahoo', 'Software Project Management, SPM', 'shreeya@mnnit.ac.in', 'Computer Science & Engineering', 'CS-113'),
(16, 'Prof. Anoj Kumar', 'Software Testing (PE-III)', 'anojk@mnnit.ac.in', 'Computer Science & Engineering', 'CS-205');
