const db = require('../config/db.js');

/**
 * Retrieve all upcoming events (event_date >= today), ordered by event_date ASC.
 * @returns {Promise<Array>} List of upcoming events
 */
async function getUpcomingEvents() {
  const sql = `
    SELECT id, title, description, venue, event_date, event_time, organizer
    FROM events
    WHERE event_date >= CURDATE()
    ORDER BY event_date ASC, event_time ASC
  `;
  const [rows] = await db.query(sql);
  return rows;
}

module.exports = { getUpcomingEvents };
