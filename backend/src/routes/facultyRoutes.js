const express = require('express');
const router = express.Router();
const facultyController = require('../controllers/facultyController');

// GET /api/faculty
router.get('/', facultyController.getAllFaculty);

// GET /api/faculty/:name
router.get('/:name', facultyController.getFacultyByName);

// Export router instance and named property
router.facultyRoutes = router;
module.exports = router;
