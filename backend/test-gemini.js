
require("dotenv").config();

async function testGemini() {
  try {
    const { GoogleGenAI } = await import("@google/genai");

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing from .env");
    }

    const ai = new GoogleGenAI({ apiKey });

    console.log("Connecting to Gemini...");

    const response = await ai.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-3.8-flash",
      contents: "Say hello and confirm that the Gemini API is working."
    });

    console.log("\nGemini Response:");
    console.log(response.text);

    console.log("\nSUCCESS: New Gemini SDK is working!");

  } catch (error) {
    console.error("\nGemini Test Failed:");
    console.error(error.message);
    process.exitCode = 1;
  }
}

testGemini();
