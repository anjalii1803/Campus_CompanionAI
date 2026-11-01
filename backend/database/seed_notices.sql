-- ========================================================
-- Seed Data: notices
-- Official Campus & Department Notices
-- ========================================================

USE campus_companion_db;

DELETE FROM notices;

INSERT INTO notices (id, title, file_path, extracted_text, uploaded_at) VALUES
(1, 'End Semester Examination Schedule - Autumn 2026', '/uploads/notices/exam_schedule_autumn2026.pdf', 'The End Semester Examinations for all B.Tech CSE students will commence from December 1st, 2026. Students must carry their valid student ID cards and printed hall tickets. No electronic devices are allowed inside examination halls.', NOW()),
(2, 'Registration Open: Campus Hackathon 2026', '/uploads/notices/hackathon_brochure.pdf', 'Registration is now officially open for the Annual Campus Hackathon. Teams comprising 2-4 members can register via the student portal before Friday. Exciting cash prizes and incubation opportunities await the winning teams.', NOW()),
(3, 'Placement Drive Schedule - Tech Giants', '/uploads/notices/placement_schedule.pdf', 'Campus recruitment drives for 7th semester students will begin next week. Pre-placement talks will be hosted in the Main Auditorium at 10:00 AM. Eligible registered students must attend in formal attire.', NOW()),
(4, 'Library Notice: Book Renewal & Semester Clearance', '/uploads/notices/library_circular.pdf', 'All undergraduate students must return or renew borrowed books by the end of this month. Clearance certificates for graduating seniors will be issued only upon settlement of pending library dues.', NOW()),
(5, 'Call for Research Papers: IEEE International Conference', '/uploads/notices/ieee_call_for_papers.pdf', 'Submissions are invited from faculty and student researchers for the upcoming IEEE International Conference on Intelligent Distributed Systems. Accepted papers will be published in the IEEE Xplore digital library.', NOW());
