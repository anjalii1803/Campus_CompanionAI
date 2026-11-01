/**
 * nlpService.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Wraps the Google Gemini API (gemini-1.5-flash).
 * Falls back to a graceful error message if the API key is missing.
 */

const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GEMINI_API_KEY }     = require("../config/env");

// Initialise the client once and reuse across requests.
let genAI  = null;
let model  = null;

function getModel() {
  if (!model) {
    if (!GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in your .env file.");
    }
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  }
  return model;
}

/**
 * getAIAnswer(userMessage, contextData)
 * ─────────────────────────────────────
 * @param {string} userMessage  — the student's original question
 * @param {string} contextData  — JSON-stringified DB result / PDF text used as context
 * @returns {Promise<string>}   — Gemini's natural-language answer
 */
async function getAIAnswer(userMessage, contextData = "") {
  const prompt = `You are Campus Companion AI, a helpful and friendly assistant for college students.
Based on this campus data:
${contextData}

Answer this student question concisely and clearly:
${userMessage}

If the campus data is empty or not relevant, answer from your general knowledge about college life. Keep the response brief (2-4 sentences).`;

  try {
    const geminiModel = getModel();
    const result      = await geminiModel.generateContent(prompt);
    const response    = await result.response;
    return response.text().trim();
  } catch (err) {
    console.error("Gemini API error:", err.message);
    throw new Error("AI service is temporarily unavailable. Please try again later.");
  }
}

/**
 * getAIAnswerFromPDF(question, extractedText)
 * ────────────────────────────────────────────
 * Specialised wrapper for notice/PDF Q&A.
 * @param {string} question      — student's question about the notice
 * @param {string} extractedText — full text extracted from the uploaded PDF
 * @returns {Promise<string>}
 */
async function getAIAnswerFromPDF(question, extractedText = "") {
  const prompt = `You are Campus Companion AI. A student has uploaded an official college notice/PDF and has a question about it.

Notice content:
"""
${extractedText}
"""

Student question: ${question}

Answer the question based only on the notice content above. Be concise and specific. If the answer is not in the notice, say so clearly.`;

  try {
    const geminiModel = getModel();
    const result      = await geminiModel.generateContent(prompt);
    const response    = await result.response;
    return response.text().trim();
  } catch (err) {
    console.error("Gemini PDF Q&A error:", err.message);
    throw new Error("AI service is temporarily unavailable. Please try again later.");
  }
}

module.exports = { getAIAnswer, getAIAnswerFromPDF };
