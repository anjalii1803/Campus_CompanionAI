const timetableModel = require('../models/timetableModel');

/**
 * GET /api/timetable
 * Query parameters: ?day=Monday&branch=CSE
 * Returns filtered or full timetable list.
 */
async function getTimetable(req, res) {
  try {
    const { day, branch } = req.query;
    const timetable = await timetableModel.getTimetable(day, branch);
    return res.status(200).json({
      success: true,
      data: timetable
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message
    });
  }
}

module.exports = {
  getTimetable
};
