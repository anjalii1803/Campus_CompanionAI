-- ========================================================
-- Seed Data: rooms
-- Campus Rooms & Laboratories
-- ========================================================

USE campus_companion_db;

DELETE FROM rooms;

INSERT INTO rooms (id, room_name, block, floor, capacity, type) VALUES
(1, 'Lab3', 'CS Block', 2, 40, 'Lab'),
(2, 'Lab1', 'CS Block', 1, 35, 'Lab'),
(3, 'Lab2', 'CS Block', 1, 40, 'Lab'),
(4, '204', 'CS Block', 2, 60, 'Classroom'),
(5, '201', 'CS Block', 2, 60, 'Classroom'),
(6, '305', 'Academic Block A', 3, 65, 'Classroom'),
(7, 'LH-101', 'Main Building', 1, 120, 'Classroom'),
(8, 'LH-201', 'Main Building', 2, 120, 'Classroom'),
(9, 'Auditorium', 'Main Building', 1, 500, 'Auditorium'),
(10, 'Seminar Hall', 'CS Block', 3, 150, 'Auditorium');
