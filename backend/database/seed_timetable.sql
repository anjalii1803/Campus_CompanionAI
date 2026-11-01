-- ========================================================
-- Seed Data: timetable
-- CSE Department Schedule
-- ========================================================

USE campus_companion_db;

DELETE FROM timetable;

INSERT INTO timetable (id, subject, faculty, room, day, start_time, end_time, semester, branch) VALUES
(1, 'DBMS', 'Dr. Sharma', '204', 'Monday', '10:00:00', '11:00:00', 5, 'CSE'),
(2, 'Data Structures & Algorithms', 'Prof. Rajesh Nair', '201', 'Monday', '09:00:00', '10:00:00', 3, 'CSE'),
(3, 'Computer Networks', 'Dr. Ananya Iyer', '204', 'Monday', '11:15:00', '12:15:00', 5, 'CSE'),
(4, 'Operating Systems Lab', 'Prof. Verma', 'Lab3', 'Monday', '13:00:00', '15:00:00', 5, 'CSE'),
(5, 'Theory of Computation', 'Dr. Priya Patel', '204', 'Tuesday', '09:00:00', '10:00:00', 5, 'CSE'),
(6, 'Software Engineering', 'Prof. Amit Kulkarni', '204', 'Tuesday', '10:00:00', '11:00:00', 5, 'CSE'),
(7, 'DBMS Lab', 'Dr. Sharma', 'Lab2', 'Tuesday', '11:15:00', '13:15:00', 5, 'CSE'),
(8, 'Artificial Intelligence', 'Dr. Sneha Reddy', '305', 'Wednesday', '09:00:00', '10:00:00', 7, 'CSE'),
(9, 'Operating Systems', 'Prof. Verma', '204', 'Wednesday', '10:00:00', '11:00:00', 5, 'CSE'),
(10, 'Web Development', 'Prof. Vikram Malhotra', 'Lab1', 'Wednesday', '11:15:00', '12:15:00', 5, 'CSE'),
(11, 'Cloud Computing', 'Dr. Sneha Reddy', '305', 'Thursday', '09:00:00', '10:00:00', 7, 'CSE'),
(12, 'Computer Networks', 'Dr. Ananya Iyer', '204', 'Thursday', '10:00:00', '11:00:00', 5, 'CSE'),
(13, 'Network Programming Lab', 'Dr. Ananya Iyer', 'Lab3', 'Thursday', '14:00:00', '16:00:00', 5, 'CSE'),
(14, 'Cyber Security', 'Prof. Vikram Malhotra', '204', 'Friday', '09:00:00', '10:00:00', 5, 'CSE'),
(15, 'Machine Learning', 'Dr. Sneha Reddy', '305', 'Friday', '10:00:00', '11:00:00', 7, 'CSE'),
(16, 'DBMS', 'Dr. Sharma', '204', 'Friday', '11:15:00', '12:15:00', 5, 'CSE'),
(17, 'Project Mentorship & Seminar', 'Dr. Sharma', 'Seminar Hall', 'Saturday', '10:00:00', '12:00:00', 7, 'CSE');
