import React from 'react';
import { BookOpen, User, MapPin, Clock, CalendarX } from 'lucide-react';

/**
 * Format 24-hour time "10:00:00" to readable "10:00 AM" if applicable
 */
const formatTime = (timeStr) => {
  if (!timeStr) return '-';
  const parts = timeStr.split(':');
  if (parts.length >= 2) {
    let hour = parseInt(parts[0], 10);
    const minute = parts[1];
    if (!isNaN(hour)) {
      const ampm = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12 || 12;
      return `${hour}:${minute} ${ampm}`;
    }
  }
  return timeStr;
};

const Timetable = ({ data = [] }) => {
  if (!data || data.length === 0) {
    return (
      <div className="timetable-empty-state">
        <CalendarX size={44} className="empty-icon" />
        <h4>No classes found</h4>
        <p>There are no classes scheduled for the selected day and branch.</p>
      </div>
    );
  }

  return (
    <div className="timetable-wrapper">
      <div className="timetable-table-container">
        <table className="timetable-table">
          <thead>
            <tr>
              <th>
                <div className="th-content">
                  <BookOpen size={16} />
                  <span>Subject</span>
                </div>
              </th>
              <th>
                <div className="th-content">
                  <User size={16} />
                  <span>Faculty</span>
                </div>
              </th>
              <th>
                <div className="th-content">
                  <MapPin size={16} />
                  <span>Room</span>
                </div>
              </th>
              <th>
                <div className="th-content">
                  <Clock size={16} />
                  <span>Start Time</span>
                </div>
              </th>
              <th>
                <div className="th-content">
                  <Clock size={16} />
                  <span>End Time</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="timetable-row">
                <td className="subject-cell">
                  <span className="subject-badge">{row.subject || 'N/A'}</span>
                </td>
                <td className="faculty-cell">
                  <span className="faculty-name">{row.faculty || 'TBA'}</span>
                </td>
                <td className="room-cell">
                  <span className="room-pill">
                    <MapPin size={12} />
                    {row.room || '-'}
                  </span>
                </td>
                <td className="time-cell start-time">
                  {formatTime(row.start_time)}
                </td>
                <td className="time-cell end-time">
                  {formatTime(row.end_time)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;
