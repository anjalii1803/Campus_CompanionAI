const facultyModel = require('../models/facultyModel');

/**
 * GET /api/faculty/:name
 * Searches faculty by name (supporting partial LIKE match).
 */
async function getFacultyByName(req, res) {
  try {
    const { name } = req.params;
    const facultyList = await facultyModel.getFacultyByName(name);

    if (!facultyList || facultyList.length === 0) {
      return res.status(404).json({ success: false, message: 'Faculty not found' });
    }

    return res.status(200).json({ success: true, data: facultyList[0] });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

/**
 * GET /api/faculty
 * Retrieves all faculty members.
 */
async function getAllFaculty(req, res) {
  try {
    const faculty = await facultyModel.getAllFaculty();
    return res.status(200).json({ success: true, data: faculty });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

module.exports = { getFacultyByName, getAllFaculty };
