const express    = require('express');
const router     = express.Router();
const facultyController = require('../controllers/facultyController');

// GET /api/faculty
router.get('/', facultyController.getAllFaculty);

// GET /api/faculty/:name
router.get('/:name', facultyController.getFacultyByName);

module.exports = router;
