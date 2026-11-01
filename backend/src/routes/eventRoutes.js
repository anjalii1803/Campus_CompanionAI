const express    = require('express');
const router     = express.Router();
const eventController = require('../controllers/eventController');

// GET /api/events
router.get('/', eventController.getUpcomingEvents);

module.exports = router;
