const express = require('express');
const router = express.Router();
const timetableController = require('../controllers/timetableController');

// GET /api/timetable?day=Monday&branch=CSE
router.get('/', timetableController.getTimetable);

// Export router instance and named property
router.timetableRoutes = router;
module.exports = router;
