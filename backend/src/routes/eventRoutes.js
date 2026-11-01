const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// GET /api/events
router.get('/', eventController.getUpcomingEvents);

// Export router instance and named property
router.eventRoutes = router;
module.exports = router;
