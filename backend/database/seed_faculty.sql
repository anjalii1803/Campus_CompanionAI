-- ========================================================
-- Seed Data: faculty
-- CSE Department Faculty Members
-- ========================================================

USE campus_companion_db;

DELETE FROM faculty;

INSERT INTO faculty (id, name, subject, email, department, cabin_no) VALUES
(1, 'Dr. Sharma', 'DBMS', 'sharma@college.edu', 'CSE', 'C-12'),
(2, 'Prof. Verma', 'Operating Systems', 'verma@college.edu', 'CSE', 'C-14'),
(3, 'Dr. Ananya Iyer', 'Computer Networks', 'ananya.iyer@college.edu', 'CSE', 'C-15'),
(4, 'Prof. Rajesh Nair', 'Data Structures & Algorithms', 'rajesh.nair@college.edu', 'CSE', 'C-08'),
(5, 'Dr. Priya Patel', 'Theory of Computation', 'priya.patel@college.edu', 'CSE', 'C-18'),
(6, 'Dr. Sneha Reddy', 'Artificial Intelligence', 'sneha.reddy@college.edu', 'CSE', 'C-20'),
(7, 'Prof. Amit Kulkarni', 'Software Engineering', 'amit.kulkarni@college.edu', 'CSE', 'C-11'),
(8, 'Prof. Vikram Malhotra', 'Cyber Security', 'vikram.malhotra@college.edu', 'CSE', 'C-09'),
(9, 'Dr. Meera Nambiar', 'Cloud Computing', 'meera.nambiar@college.edu', 'CSE', 'C-22'),
(10, 'Prof. Rohan Sen', 'Web Development', 'rohan.sen@college.edu', 'CSE', 'C-05');
