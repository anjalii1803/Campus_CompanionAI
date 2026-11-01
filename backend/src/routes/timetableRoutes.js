const express    = require('express');
const router     = express.Router();
const timetableController = require('../controllers/timetableController');

// GET /api/timetable?day=Monday&branch=CSE
router.get('/', timetableController.getTimetable);

module.exports = router;
