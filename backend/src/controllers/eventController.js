const eventModel = require('../models/eventModel');

/**
 * GET /api/events
 * Returns only upcoming events (event_date >= today), ordered by event_date ASC.
 */
async function getUpcomingEvents(req, res) {
  try {
    const events = await eventModel.getUpcomingEvents();
    return res.status(200).json({
      success: true,
      data: events
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = {
  getUpcomingEvents,
  getEvents: getUpcomingEvents
};
