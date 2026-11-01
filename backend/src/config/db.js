const mysql = require("mysql2/promise");
const dotenv = require("dotenv");

dotenv.config();

/**
 * MySQL connection pool with promise support.
 * All controllers should import this pool and call pool.query() / pool.execute().
 */
const pool = mysql.createPool({
  host:              process.env.DB_HOST     || "localhost",
  user:              process.env.DB_USER     || "root",
  password:          process.env.DB_PASSWORD || "",
  database:          process.env.DB_NAME     || "campus_companion_db",
  waitForConnections: true,
  connectionLimit:   10,
  queueLimit:        0,
});

// Smoke-test the connection on startup (non-fatal).
pool
  .getConnection()
  .then((conn) => {
    console.log("✅  MySQL connected to database:", process.env.DB_NAME || "campus_companion_db");
    conn.release();
  })
  .catch((err) => {
    console.error("❌  MySQL connection failed:", err.message);
    console.warn("    Server will still start; DB-dependent routes will return errors until MySQL is available.");
  });

module.exports = pool;
