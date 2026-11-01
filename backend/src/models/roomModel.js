const db = require('../../config/db.js');

/**
 * Retrieve room details by room name.
 *
 * @param {string} roomName - The name/number of the room (e.g. 'Lab3')
 * @returns {Promise<Object|null>} The room record or null if not found
 */
async function getRoomByName(roomName) {
  const sql = 'SELECT id, room_name, block, floor, capacity, type FROM rooms WHERE room_name = ? LIMIT 1';
  const [rows] = await db.query(sql, [roomName]);
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Retrieve all rooms.
 *
 * @returns {Promise<Array>} List of all rooms
 */
async function getAllRooms() {
  const sql = 'SELECT id, room_name, block, floor, capacity, type FROM rooms ORDER BY block, floor, room_name';
  const [rows] = await db.query(sql);
  return rows;
}

module.exports = {
  getRoomByName,
  getAllRooms
};
