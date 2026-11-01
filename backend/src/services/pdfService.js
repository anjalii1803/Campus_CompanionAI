/**
 * pdfService.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Extracts plain text from a PDF file using pdf-parse.
 */

const pdfParse = require("pdf-parse");
const fs       = require("fs");
const path     = require("path");

/**
 * extractTextFromPDF(filePath)
 * @param {string} filePath — absolute path to the saved PDF file
 * @returns {Promise<string>} — extracted plain text
 */
async function extractTextFromPDF(filePath) {
  try {
    const absolutePath = path.resolve(filePath);
    const dataBuffer   = fs.readFileSync(absolutePath);
    const pdfData      = await pdfParse(dataBuffer);

    const text = pdfData.text.trim();

    if (!text) {
      throw new Error("PDF appears to be empty or image-only (no extractable text).");
    }

    return text;
  } catch (err) {
    console.error("PDF extraction error:", err.message);
    throw new Error(`Failed to extract text from PDF: ${err.message}`);
  }
}

module.exports = { extractTextFromPDF };
