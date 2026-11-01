const express = require("express");
const cors    = require("cors");
require("dotenv").config();

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ─────────────────────────────────────────────────────────────────
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── AI & Notice Routes ─────────────────────────────────────────────────────────
const chatRoutes   = require("./routes/chatRoutes");
const noticeRoutes = require("./routes/noticeRoutes");

app.use("/api/chat",    chatRoutes);
app.use("/api/notices", noticeRoutes);

// ── Data API Routes (Prachi's Routes) ──────────────────────────────────────────
const timetableRoutes = require("./routes/timetableRoutes");
const roomRoutes      = require("./routes/roomRoutes");
const eventRoutes     = require("./routes/eventRoutes");
const facultyRoutes   = require("./routes/facultyRoutes");

app.use("/api/timetable", timetableRoutes);
app.use("/api/rooms",     roomRoutes);
app.use("/api/events",    eventRoutes);
app.use("/api/faculty",   facultyRoutes);

// ── Health Check ───────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ success: true, message: "Campus Companion AI Server is running! 🚀" });
});

// ── Global Error Handler ───────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ success: false, message: err.message || "Internal server error" });
});

// ── Start Server ───────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🎓  Campus Companion AI server running on http://localhost:${PORT}`);
});

module.exports = app;
