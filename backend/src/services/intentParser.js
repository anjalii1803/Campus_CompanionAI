/**
 * intentParser.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Keyword-based intent detection.
 * Returns one of: "timetable" | "room" | "event" | "faculty" | "notice" | "general"
 */

const INTENT_MAP = [
  {
    intent: "timetable",
    keywords: ["class", "classes", "timetable", "schedule", "lecture", "period", "slot", "timing", "timings"],
  },
  {
    intent: "room",
    keywords: ["room", "lab", "laboratory", "where is", "location", "block", "floor", "building", "hall", "classroom"],
  },
  {
    intent: "event",
    keywords: ["event", "fest", "festival", "contest", "competition", "workshop", "seminar", "hackathon", "cultural", "technical", "activity"],
  },
  {
    intent: "faculty",
    keywords: ["faculty", "professor", "teacher", "lecturer", "sir", "ma'am", "madam", "instructor", "staff", "hod", "head of department"],
  },
  {
    intent: "notice",
    keywords: ["notice", "pdf", "circular", "announcement", "notification", "bulletin", "memo", "official"],
  },
];

/**
 * parseIntent(message)
 * @param {string} message — raw user message
 * @returns {"timetable"|"room"|"event"|"faculty"|"notice"|"general"}
 */
function parseIntent(message) {
  if (!message || typeof message !== "string") return "general";

  const lower = message.toLowerCase();

  for (const { intent, keywords } of INTENT_MAP) {
    if (keywords.some((kw) => lower.includes(kw))) {
      return intent;
    }
  }

  return "general";
}

module.exports = { parseIntent };
