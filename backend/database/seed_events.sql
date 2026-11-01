-- ========================================================
-- Seed Data: events
-- Motilal Nehru National Institute of Technology Allahabad (MNNIT)
-- Academic Calendar, Examinations, Technical & Cultural Events
-- ========================================================

USE campus_companion_db;

DELETE FROM events;

INSERT INTO events (id, title, description, venue, event_date, event_time, organizer) VALUES
(1, 'Tech Fest', 'Annual technical symposium featuring coding competitions, robotics exhibits, and keynote addresses.', 'MP Hall', DATE_ADD(CURDATE(), INTERVAL 5 DAY), '09:00:00', 'CSE Dept'),
(2, 'Culrav-Avishkar 2026', 'MNNIT Annual Techno-Cultural Festival featuring national hackathons, cultural performances, and celebrity night.', 'MP Hall & SAC Grounds', DATE_ADD(CURDATE(), INTERVAL 8 DAY), '10:00:00', 'Student Activity Centre (SAC) MNNIT'),
(3, 'Mid-Semester Examinations', 'Odd Semester mid-term evaluation examinations for MCA and B.Tech programmes.', 'NLH Complex', DATE_ADD(CURDATE(), INTERVAL 15 DAY), '09:30:00', 'Office of Dean (Academic)'),
(4, 'Practical Exam & Lab Record Evaluation', 'End of classes, submission of laboratory workbooks, and external viva evaluation.', 'L1 & L2 Labs CSED', DATE_ADD(CURDATE(), INTERVAL 24 DAY), '10:00:00', 'Department of CSE'),
(5, 'End Semester Theory Examinations', 'End Semester final examinations for Odd Semester 2026-27 across all engineering departments.', 'NLH1 & NLH2', DATE_ADD(CURDATE(), INTERVAL 32 DAY), '09:30:00', 'Examination Cell MNNIT'),
(6, 'Hack36 - 36-Hour National Hackathon', 'Premier national collegiate hackathon organized by Computer Science Department.', 'CCTF Lab & Computer Centre', DATE_ADD(CURDATE(), INTERVAL 42 DAY), '18:00:00', 'Computer Coding Club MNNIT'),
(7, 'Alumni Mentorship & Placement Conclave', 'Interactive panel discussion with MNNIT alumni in software and cloud engineering roles.', 'Seminar Hall CSED', DATE_ADD(CURDATE(), INTERVAL 50 DAY), '15:00:00', 'Training & Placement Cell'),
(8, 'Commencement of Even Semester 2026-27', 'Reopening of physical instruction classes and lab sessions for all continuing students.', 'NLH Complex & CSED', DATE_ADD(CURDATE(), INTERVAL 65 DAY), '08:00:00', 'Registrar Office MNNIT');
