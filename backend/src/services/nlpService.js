
/**
 * nlpService.js
 * Campus Companion AI - Gemini integration
 * Uses the new @google/genai SDK
 */

const { GEMINI_API_KEY } = require("../config/env");

let genAI = null;

async function getAI() {
  const apiKey = process.env.GEMINI_API_KEY || GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is missing from .env");
  }

  if (!genAI) {
    const { GoogleGenAI } = await import("@google/genai");
    genAI = new GoogleGenAI({ apiKey });
  }

  return genAI;
}

async function generateAIResponse(prompt) {
  const ai = await getAI();

  const response = await ai.models.generateContent({
    model: process.env.GEMINI_MODEL || "gemini-3.5-flash-lite",
    contents: prompt
  });

  return response.text.trim();
}

// Answer student questions using campus database records
async function getAIAnswer(userMessage, contextData = "") {
  const prompt = `You are MNNIT Campus Companion AI, an accurate, friendly and helpful assistant for college students.

Use the following official campus database records to answer the student's question accurately.

Campus Database Records:
${contextData}

Student Question:
"${userMessage}"

Guidelines:
1. For timetable questions, organize classes by subject, time, room and faculty.
2. For room or lab locations, specify building/block and floor.
3. For professor questions, provide subject, cabin and email if available.
4. Never invent information missing from the database.
5. Use clear, friendly language and Markdown formatting.`;

  try {
    return await generateAIResponse(prompt);
  } catch (err) {
    console.error("Gemini API error:", err.message);
    throw err;
  }
}

// Answer questions about uploaded college notices/PDFs
async function getAIAnswerFromPDF(question, extractedText = "") {
  const prompt = `You are Campus Companion AI.

A student has uploaded an official college notice/PDF.

Notice content:
"""
${extractedText}
"""

Student question:
${question}

Answer based only on the notice content.
Be concise and specific.
If the answer is not present, clearly say so.`;

  try {
    return await generateAIResponse(prompt);
  } catch (err) {
    console.error("Gemini PDF Q&A error:", err.message);
    throw new Error("AI service could not process the notice.");
  }
}

module.exports = {
  getAIAnswer,
  getAIAnswerFromPDF
};
