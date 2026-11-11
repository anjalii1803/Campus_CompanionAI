/**
 * intentParser.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Robust intent detection with smart prioritization.
 * Returns one of: "faculty" | "timetable" | "room" | "event" | "notice" | "general"
 */

/**
 * parseIntent(message)
 * @param {string} message — raw user message
 * @returns {"faculty"|"timetable"|"room"|"event"|"notice"|"general"}
 */
function parseIntent(message) {
  if (!message || typeof message !== "string") return "general";

  const lower = message.toLowerCase();

  // 1. High Priority: Faculty & Teachers
  // Catches "who teaches", "who is taking", "where is Dr. X", "cabin", "professor", etc.
  const facultyPatterns = [
    /\b(who\s+teaches|who\s+teach|who\s+is\s+teaching|who\s+takes|who\s+is\s+taking)\b/,
    /\b(teach|teaches|teaching|teacher|teachers)\b/,
    /\b(faculty|faculties|professor|professors|prof|instructor|instructors|lecturer|lecturers)\b/,
    /\b(cabin|office\s+of|hod|head\s+of\s+department)\b/,
    /\b(dr\.|dr\s+|prof\.|prof\s+)/,
  ];

  if (facultyPatterns.some((pattern) => pattern.test(lower))) {
    return "faculty";
  }

  // 2. High Priority: Timetable & Classes
  const timetablePatterns = [
    /\b(timetable|time\s*table|schedule|routine)\b/,
    /\b(class|classes|lecture|lectures|period|periods|slot|slots|timing|timings)\b/,
    /\b(what\s+class|which\s+class|classes\s+today|classes\s+tomorrow)\b/,
  ];

  if (timetablePatterns.some((pattern) => pattern.test(lower))) {
    return "timetable";
  }

  // 3. Rooms & Locations (Only if not already matched as faculty cabin)
  const roomPatterns = [
    /\b(room|rooms|classroom|classrooms|lab|labs|laboratory|laboratories)\b/,
    /\b(hall|seminar\s+hall|auditorium|nlh|nlh1|nlh2|cctf|gs[0-9]|csnb[0-9])\b/,
    /\b(where\s+is|location\s+of|which\s+floor|which\s+block|which\s+building)\b/,
  ];

  if (roomPatterns.some((pattern) => pattern.test(lower))) {
    return "room";
  }

  // 4. Events & Fests
  const eventPatterns = [
    /\b(event|events|fest|festival|contest|competition|workshop|hackathon|culrav|avishkar|hack36)\b/,
  ];

  if (eventPatterns.some((pattern) => pattern.test(lower))) {
    return "event";
  }

  // 5. Notices & Official Announcements
  const noticePatterns = [
    /\b(notice|notices|circular|circulars|announcement|announcements|notification|exam\s+schedule|academic\s+calendar)\b/,
  ];

  if (noticePatterns.some((pattern) => pattern.test(lower))) {
    return "notice";
  }

  // 6. Direct Subject Fallback: If user asks about a subject directly (e.g. "DBMS", "Operating System", "Soft Computing")
  const commonSubjects = [
    "dbms", "database", "operating system", "soft computing", "algorithm",
    "algorithms", "object based", "object oriented", "web programming",
    "shell", "multimedia", "e-commerce", "computer organization", "logic"
  ];

  if (commonSubjects.some((sub) => lower.includes(sub))) {
    // If it asks "who", it's faculty
    if (lower.includes("who")) return "faculty";
    // Otherwise check timetable
    return "timetable";
  }

  return "general";
}

module.exports = { parseIntent };
