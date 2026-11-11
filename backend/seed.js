/**
 * seed.js — Runs all seed SQL scripts into MySQL database
 * Usage: npm run seed  (or node seed.js)
 */

const fs = require("fs");
const path = require("path");
const mysql = require("mysql2/promise");
require("dotenv").config();

const SEED_FILES = [
  "seed_rooms.sql",
  "seed_faculty.sql",
  "seed_timetable.sql",
  "seed_events.sql",
  "seed_notices.sql",
];

async function runSeed() {
  console.log("🚀 Starting database update with official MNNIT data...");

  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "root",
      password: process.env.DB_PASSWORD || "",
      database: process.env.DB_NAME || "campus_companion_db",
      multipleStatements: true,
    });
    console.log("✅ Connected to MySQL database successfully.");
  } catch (err) {
    console.error("❌ Could not connect to MySQL:", err.message);
    process.exit(1);
  }

  try {
    for (const fileName of SEED_FILES) {
      const filePath = path.join(__dirname, "database", fileName);
      if (!fs.existsSync(filePath)) {
        console.warn(`⚠️ File not found: ${filePath}`);
        continue;
      }

      console.log(`⏳ Importing ${fileName}...`);
      const sqlContent = fs.readFileSync(filePath, "utf-8");
      await connection.query(sqlContent);
      console.log(`✅ ${fileName} imported successfully!`);
    }

    console.log("\n🎉 All database tables have been successfully populated with official MNNIT data!");
  } catch (err) {
    console.error("❌ Error executing seed queries:", err.message);
  } finally {
    if (connection) await connection.end();
    process.exit(0);
  }
}

runSeed();
