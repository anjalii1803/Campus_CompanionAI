-- ========================================================
-- Seed Data: events
-- Motilal Nehru National Institute of Technology Allahabad (MNNIT)
-- Official Upcoming Events & Academic Milestones (Session 2026–27)
-- ========================================================

USE campus_companion_db;

DELETE FROM events;

INSERT INTO events (id, title, description, venue, event_date, event_time, organizer) VALUES
(1, 'Odd Semester Practical Exams', 'Practical examinations and lab evaluation across respective CSED labs.', '2026-11-03', '09:00:00', 'Academic Section'),
(2, 'End Semester Theory Exams', 'Odd Semester final theory examinations for all semesters across lecture halls.', '2026-11-16', '09:00:00', 'Dean (Academic)'),
(3, 'Culrav-Avishkar 2026', 'MNNIT Annual Techno-Cultural Festival featuring national hackathons, cultural performances, and celebrity night.', '2026-12-04', '10:00:00', 'SAC MNNIT'),
(4, 'Grades Submission & Even Sem Reg.', 'Submission of final grades and online registration for Even Semester 2026-27.', '2026-12-14', '10:00:00', 'Dean (Academic)'),
(5, 'Declaration of Odd Sem Results', 'Official declaration of Odd Semester 2026-27 results on institute portal.', '2026-12-21', '17:00:00', 'Examination Cell'),
(6, 'Winter Vacation', 'Winter break for all undergraduate and postgraduate students.', '2026-12-21', '00:00:00', 'Institute Administration'),
(7, 'Even Semester Classes Start', 'Commencement of instructional physical classes for Even Semester 2026-27.', '2027-01-04', '08:00:00', 'Academic Section');
