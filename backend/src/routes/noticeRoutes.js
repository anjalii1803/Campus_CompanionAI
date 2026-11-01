const express   = require("express");
const router    = express.Router();
const upload    = require("../middleware/upload");
const {
  uploadNotice,
  askNotice,
  getAllNotices,
} = require("../controllers/noticeController");

// GET  /api/notices           — list all notices
router.get("/", getAllNotices);

// POST /api/notices/upload    — upload a PDF (field name must be "notice")
router.post(
  "/upload",
  (req, res, next) => {
    // Run multer and convert its errors into the standard response shape
    upload.single("notice")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      next();
    });
  },
  uploadNotice
);

// POST /api/notices/ask       — Q&A on an uploaded notice
router.post("/ask", askNotice);

module.exports = router;
