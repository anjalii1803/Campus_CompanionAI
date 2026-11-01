/**
 * env.js — Central place to validate & export environment variables.
 * Import this module early (before any service uses the keys).
 */
const dotenv = require("dotenv");
dotenv.config();

const required = ["GEMINI_API_KEY", "DB_HOST", "DB_USER", "DB_NAME"];

required.forEach((key) => {
  if (!process.env[key]) {
    console.warn(`⚠️   Missing env variable: ${key} — check your .env file`);
  }
});

module.exports = {
  PORT:           process.env.PORT           || "5000",
  DB_HOST:        process.env.DB_HOST        || "localhost",
  DB_USER:        process.env.DB_USER        || "root",
  DB_PASSWORD:    process.env.DB_PASSWORD    || "",
  DB_NAME:        process.env.DB_NAME        || "campus_companion_db",
  GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
};
