const roomModel = require('../models/roomModel');

/**
 * GET /api/rooms/:room_name
 * Retrieves room details by room_name param.
 */
async function getRoomByName(req, res) {
  try {
    const { room_name } = req.params;
    const room = await roomModel.getRoomByName(room_name);

    if (!room) {
      return res.status(404).json({ success: false, message: 'Room not found' });
    }

    return res.status(200).json({ success: true, data: room });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

/**
 * GET /api/rooms
 * Retrieves all rooms.
 */
async function getAllRooms(req, res) {
  try {
    const rooms = await roomModel.getAllRooms();
    return res.status(200).json({ success: true, data: rooms });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = { getRoomByName, getAllRooms };
