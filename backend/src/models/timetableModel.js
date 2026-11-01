const db = require('../../config/db.js');

/**
 * Retrieve timetable entries filtered optionally by day and branch.
 * If no filters are provided, returns the entire timetable.
 *
 * @param {string} [day] - Day of the week (e.g., 'Monday')
 * @param {string} [branch] - Academic branch (e.g., 'CSE')
 * @returns {Promise<Array>} Array of timetable records
 */
async function getTimetable(day, branch) {
  let sql = 'SELECT id, subject, faculty, room, day, start_time, end_time, semester, branch FROM timetable';
  const conditions = [];
  const params = [];

  if (day) {
    conditions.push('day = ?');
    params.push(day);
  }

  if (branch) {
    conditions.push('branch = ?');
    params.push(branch);
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  sql += ' ORDER BY FIELD(day, "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"), start_time ASC';

  const [rows] = await db.query(sql, params);
  return rows;
}

module.exports = {
  getTimetable
};
