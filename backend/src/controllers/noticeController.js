/**
 * noticeController.js
 * ─────────────────────────────────────────────────────────────────────────────
 * POST /api/notices/upload  — Upload a PDF notice & extract text
 * POST /api/notices/ask     — Ask a question about an uploaded notice
 * GET  /api/notices         — List all uploaded notices
 */

const pool                      = require("../config/db");
const { extractTextFromPDF }    = require("../services/pdfService");
const { getAIAnswerFromPDF }    = require("../services/nlpService");

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/notices/upload
// ─────────────────────────────────────────────────────────────────────────────
const uploadNotice = async (req, res) => {
  // Multer has already validated the file is a PDF and stored it.
  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "No PDF file uploaded. Use multipart/form-data with field name 'notice'.",
    });
  }

  const { originalname, path: filePath } = req.file;

  try {
    // ── Step 1: Extract text from PDF ─────────────────────────────────────────
    const extractedText = await extractTextFromPDF(filePath);

    // ── Step 2: Save to notices table ─────────────────────────────────────────
    const [result] = await pool.execute(
      `INSERT INTO notices (title, file_path, extracted_text, uploaded_at)
       VALUES (?, ?, ?, NOW())`,
      [originalname, filePath, extractedText]
    );

    const newId = result.insertId;

    return res.status(201).json({
      success: true,
      data: {
        id:      newId,
        title:   originalname,
        message: "Uploaded successfully",
      },
    });
  } catch (err) {
    console.error("[Notice Upload] Error:", err.message);
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to process the uploaded PDF.",
    });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// POST /api/notices/ask
// ─────────────────────────────────────────────────────────────────────────────
const askNotice = async (req, res) => {
  const { notice_id, question } = req.body;

  // ── Validation ──────────────────────────────────────────────────────────────
  if (!notice_id || !question) {
    return res.status(400).json({
      success: false,
      message: "Request body must include 'notice_id' and 'question'.",
    });
  }

  if (typeof question !== "string" || question.trim() === "") {
    return res.status(400).json({
      success: false,
      message: "'question' must be a non-empty string.",
    });
  }

  try {
    // ── Step 1: Fetch extracted_text from DB ──────────────────────────────────
    const [rows] = await pool.execute(
      "SELECT extracted_text FROM notices WHERE id = ?",
      [notice_id]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: `No notice found with id ${notice_id}.`,
      });
    }

    const extractedText = rows[0].extracted_text;

    if (!extractedText || extractedText.trim() === "") {
      return res.status(422).json({
        success: false,
        message: "This notice has no extracted text. It may be an image-only PDF.",
      });
    }

    // ── Step 2: Ask Gemini ────────────────────────────────────────────────────
    const answer = await getAIAnswerFromPDF(question.trim(), extractedText);

    return res.status(200).json({
      success: true,
      data: { answer },
    });
  } catch (err) {
    console.error("[Notice Ask] Error:", err.message);
    return res.status(500).json({
      success: false,
      message: err.message || "Something went wrong. Please try again.",
    });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/notices
// List all notices (useful for the frontend to show a dropdown of uploads)
// ─────────────────────────────────────────────────────────────────────────────
const getAllNotices = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id, title, file_path, uploaded_at FROM notices ORDER BY uploaded_at DESC"
    );
    return res.status(200).json({ success: true, data: rows });
  } catch (err) {
    console.error("[Notice List] Error:", err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { uploadNotice, askNotice, getAllNotices };
