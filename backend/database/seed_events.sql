-- ========================================================
-- Seed Data: events
-- CSE & Campus Events (Uses dynamic upcoming dates)
-- ========================================================

USE campus_companion_db;

DELETE FROM events;

INSERT INTO events (id, title, description, venue, event_date, event_time, organizer) VALUES
(1, 'Tech Fest', 'Annual technical symposium featuring coding marathons, robotics exhibits, and tech talks.', 'Auditorium', DATE_ADD(CURDATE(), INTERVAL 5 DAY), '09:00:00', 'CSE Dept'),
(2, 'Hackathon 2026', '24-hour national hackathon focused on Generative AI and Web3 solutions for social impact.', 'Auditorium', DATE_ADD(CURDATE(), INTERVAL 10 DAY), '10:00:00', 'CSE Dept & ACM Chapter'),
(3, 'AI & Cloud Computing Workshop', 'Hands-on bootcamp on fine-tuning LLMs and microservice deployment on Google Cloud.', 'Seminar Hall', DATE_ADD(CURDATE(), INTERVAL 14 DAY), '09:30:00', 'Google Developer Student Club'),
(4, 'CodeWars Coding Contest', 'Fast-paced algorithmic programming contest on advanced data structures and dynamic programming.', 'Lab3', DATE_ADD(CURDATE(), INTERVAL 20 DAY), '14:00:00', 'Coding Club'),
(5, 'Cyber Security & Ethical Hacking Summit', 'Expert guest lecture on modern threat intelligence, penetration testing, and zero trust architecture.', 'LH-101', DATE_ADD(CURDATE(), INTERVAL 25 DAY), '11:00:00', 'CSI Student Branch'),
(6, 'Alumni Career Mentorship Connect', 'Interactive panel discussion with CSE alumni working across top global tech companies.', 'Seminar Hall', DATE_ADD(CURDATE(), INTERVAL 32 DAY), '15:00:00', 'CSE Alumni Cell'),
(7, 'Annual Capstone Project Exhibition', 'Evaluation and public showcase of senior undergraduate engineering capstone research projects.', 'Main Lobby', DATE_ADD(CURDATE(), INTERVAL 45 DAY), '10:00:00', 'CSE Dept'),
(8, 'Open Source Day & Git Sprint', 'Collaborative sprint guiding junior students in making their first open source pull requests.', 'Lab1', DATE_ADD(CURDATE(), INTERVAL 52 DAY), '13:00:00', 'Open Source Society');
