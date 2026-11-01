const express    = require('express');
const router     = express.Router();
const roomController = require('../controllers/roomController');

// GET /api/rooms
router.get('/', roomController.getAllRooms);

// GET /api/rooms/:room_name
router.get('/:room_name', roomController.getRoomByName);

module.exports = router;
