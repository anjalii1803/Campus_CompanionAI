-- ========================================================
-- Seed Data: notices
-- Motilal Nehru National Institute of Technology Allahabad (MNNIT)
-- Official Academic Notifications & Circulars (Session 2026–27)
-- ========================================================

USE campus_companion_db;

DELETE FROM notices;

INSERT INTO notices (id, title, file_path, extracted_text, uploaded_at) VALUES
(1, 'Senate Academic Calendar Approval 2026-27', '/uploads/notices/senate_calendar_2026_27.pdf', '87th Senate meeting held on March 30, 2026 approved the Academic Calendar for session 2026-27 under Item No. 87.12. (Ref: 121/Acad./Senate/2026).', NOW()),
(2, 'End Semester Exam Schedule 2026-27', '/uploads/notices/end_sem_schedule_2026_27.pdf', 'Practical exams conclude on 14 Nov 2026. Theory End Semester examinations run from 16 Nov to 30 Nov 2026. Result declaration on 21 Dec 2026.', NOW()),
(3, 'MCA 3rd Sem Mini Project Evaluation', '/uploads/notices/mca_mini_project_eval.pdf', 'Evaluation sheets prepared for Teams 1 to 29 covering SRS, Design, and implementations across AI, Web, and Cloud domains.', NOW()),
(4, 'Even Semester Registration & Commencement', '/uploads/notices/even_sem_registration.pdf', 'Online registration for Even Semester (2026-27) starts on 14 Dec 2026; instructional classes commence on 04 Jan 2027.', NOW());
