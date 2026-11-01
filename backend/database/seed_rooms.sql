-- ========================================================
-- Seed Data: rooms
-- Motilal Nehru National Institute of Technology Allahabad (MNNIT)
-- Classrooms, Lecture Halls, Laboratories & Auditoriums
-- ========================================================

USE campus_companion_db;

DELETE FROM rooms;

INSERT INTO rooms (id, room_name, block, floor, capacity, type) VALUES
(1, 'NLH2', 'New Lecture Hall Complex', 1, 150, 'Classroom'),
(2, 'NLH1', 'New Lecture Hall Complex', 1, 150, 'Classroom'),
(3, 'GS3', 'Computer Science & Engineering Block', 0, 70, 'Classroom'),
(4, 'GS4', 'Computer Science & Engineering Block', 0, 70, 'Classroom'),
(5, 'GS5', 'Computer Science & Engineering Block', 0, 70, 'Classroom'),
(6, 'GS8', 'Computer Science & Engineering Block', 0, 70, 'Classroom'),
(7, 'CSNB1', 'CS New Building', 1, 80, 'Classroom'),
(8, 'L1 Lab', 'Computer Science & Engineering Block', 1, 50, 'Lab'),
(9, 'L2 Lab', 'Computer Science & Engineering Block', 1, 50, 'Lab'),
(10, 'CCTF Lab', 'Computer Centre Complex', 1, 60, 'Lab'),
(11, 'Lab3', 'Computer Science & Engineering Block', 2, 40, 'Lab'),
(12, '204', 'Academic Block A', 2, 60, 'Classroom'),
(13, 'MP Hall', 'Student Activity Centre (SAC)', 1, 800, 'Auditorium'),
(14, 'Seminar Hall', 'Computer Science & Engineering Block', 3, 120, 'Auditorium');
