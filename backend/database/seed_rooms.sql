-- ========================================================
-- Seed Data: rooms
-- Motilal Nehru National Institute of Technology Allahabad (MNNIT)
-- Official CSED Room & Lab Directory
-- ========================================================

USE campus_companion_db;

DELETE FROM rooms;

INSERT INTO rooms (id, room_name, block, floor, capacity, type) VALUES
(1, 'NLH1', 'New Lecture Hall Complex', 0, 150, 'Classroom'),
(2, 'NLH2', 'New Lecture Hall Complex', 1, 150, 'Classroom'),
(3, 'L1 Lab', 'CS Engineering Block (CSED)', 1, 50, 'Lab'),
(4, 'L2 Lab', 'CS Engineering Block (CSED)', 2, 50, 'Lab'),
(5, 'CCTF Lab', 'Computer Centre Complex', 1, 60, 'Lab'),
(6, 'GS3', 'Ganga Seminar Hall Complex', 0, 80, 'Classroom'),
(7, 'GS4', 'Ganga Seminar Hall Complex', 1, 80, 'Classroom'),
(8, 'GS5', 'Ganga Seminar Hall Complex', 1, 80, 'Classroom'),
(9, 'GS8', 'Ganga Seminar Hall Complex', 2, 80, 'Classroom'),
(10, 'CSNB1', 'Computer Science New Building', 1, 90, 'Classroom');
