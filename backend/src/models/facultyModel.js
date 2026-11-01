const db = require('../../config/db.js');

/**
 * Search faculty by name using a LIKE query so partial names work.
 * Results are prioritized by exact match first, prefix match second, then general substring match.
 *
 * @param {string} name - Faculty name or partial name (e.g. 'Dr. Sharma' or 'Sharma')
 * @returns {Promise<Array>} List of matching faculty members
 */
async function getFacultyByName(name) {
  const sql = `
    SELECT id, name, subject, email, department, cabin_no
    FROM faculty
    WHERE name LIKE ?
    ORDER BY
      CASE
        WHEN LOWER(name) = LOWER(?) THEN 1
        WHEN LOWER(name) LIKE LOWER(?) THEN 2
        ELSE 3
      END,
      id ASC
  `;
  const searchPattern = `%${name}%`;
  const prefixPattern = `${name}%`;
  const [rows] = await db.query(sql, [searchPattern, name, prefixPattern]);
  return rows;
}

/**
 * Retrieve all faculty records.
 *
 * @returns {Promise<Array>} List of all faculty members
 */
async function getAllFaculty() {
  const sql = 'SELECT id, name, subject, email, department, cabin_no FROM faculty ORDER BY name ASC';
  const [rows] = await db.query(sql);
  return rows;
}

module.exports = {
  getFacultyByName,
  getAllFaculty
};
