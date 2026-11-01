/**
 * chatController.js
 * ─────────────────────────────────────────────────────────────────────────────
 * POST /api/chat
 * Body: { "message": "Where is Lab 3?" }
 * Response: { "success": true, "data": { "reply": "..." } }
 */

const pool              = require("../config/db");
const { parseIntent }   = require("../services/intentParser");
const { getAIAnswer }   = require("../services/nlpService");

// ── Intent → SQL query mapping ────────────────────────────────────────────────
const INTENT_QUERIES = {
  timetable: "SELECT * FROM timetable LIMIT 20",
  room:      "SELECT * FROM rooms LIMIT 20",
  event:     "SELECT * FROM events ORDER BY event_date ASC LIMIT 10",
  faculty:   "SELECT * FROM faculty LIMIT 20",
  notice:    "SELECT id, title, uploaded_at FROM notices ORDER BY uploaded_at DESC LIMIT 5",
  general:   null, // No DB query needed; Gemini answers from general knowledge
};

/**
 * handleChat — controller for POST /api/chat
 */
const handleChat = async (req, res) => {
  const { message } = req.body;

  // ── Validation ──────────────────────────────────────────────────────────────
  if (!message || typeof message !== "string" || message.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "Request body must include a non-empty 'message' string.",
    });
  }

  const userMessage = message.trim();

  try {
    // ── Step 1: Detect intent ─────────────────────────────────────────────────
    const intent = parseIntent(userMessage);
    console.log(`[Chat] intent="${intent}" | message="${userMessage}"`);

    // ── Step 2: Query DB based on intent ──────────────────────────────────────
    let dbResult   = [];
    const sqlQuery = INTENT_QUERIES[intent];

    if (sqlQuery) {
      try {
        const [rows] = await pool.query(sqlQuery);
        dbResult = rows;
      } catch (dbErr) {
        // DB errors are non-fatal; Gemini will answer with empty context.
        console.warn(`[Chat] DB query failed for intent "${intent}":`, dbErr.message);
      }
    }

    // ── Step 3: Build context string for Gemini ───────────────────────────────
    const contextData =
      dbResult.length > 0
        ? JSON.stringify(dbResult, null, 2)
        : "No specific campus data found in the database for this query.";

    // ── Step 4: Get Gemini answer ─────────────────────────────────────────────
    const reply = await getAIAnswer(userMessage, contextData);

    // ── Step 5: Return response ───────────────────────────────────────────────
    return res.status(200).json({
      success: true,
      data: { reply },
    });
  } catch (err) {
    console.error("[Chat] Error:", err.message);
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong. Please try again.",
    });
  }
};

module.exports = { handleChat };
