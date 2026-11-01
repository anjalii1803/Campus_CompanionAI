-- ========================================================
-- Seed Data: notices
-- Motilal Nehru National Institute of Technology Allahabad (MNNIT)
-- Official Academic Notifications & Circulars
-- ========================================================

USE campus_companion_db;

DELETE FROM notices;

INSERT INTO notices (id, title, file_path, extracted_text, uploaded_at) VALUES
(1, 'Academic Calendar for Session 2026-27 (Senate Resolution No. 121)', '/uploads/notices/academic_calendar_2026_27.pdf', 'As approved in the 87th meeting of the Senate held on March 30, 2026, the Academic Calendar for Odd and Even Semesters 2026-27 is notified for all undergraduate and postgraduate students. Strict attendance criteria of 75% will be enforced.', NOW()),
(2, 'Mid-Semester Examinations Instructions - Odd Semester', '/uploads/notices/mid_sem_instructions.pdf', 'Mid-semester examinations will commence from next week. Students must occupy seats 15 minutes prior to commencement with institute ID cards. Mobile phones and programmable calculators are strictly prohibited in the examination halls.', NOW()),
(3, 'Registration Circular: Culrav-Avishkar 2026', '/uploads/notices/culrav_avishkar_circular.pdf', 'Student Activity Centre (SAC) invites entries for competitive coding, robotics challenges, and creative arts in the annual techno-cultural festival. Team registrations can be submitted through the student gymkhana portal.', NOW()),
(4, 'Guidelines for Submission of MCA Capstone Project & Lab Records', '/uploads/notices/mca_lab_evaluation.pdf', 'All MCA 1st, 3rd, and 5th semester students must submit their complete signed lab records and software project reports to their respective faculty coordinators before the practical evaluation deadline.', NOW()),
(5, 'Library Book Renewal & Winter Clearance Deadline', '/uploads/notices/central_library_notice.pdf', 'All students are requested to renew their borrowed course books and clear pending library dues at the Central Library circulation counter before the commencement of end-semester examinations.', NOW());
