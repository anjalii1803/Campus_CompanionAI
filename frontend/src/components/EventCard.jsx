import React from 'react';
import { Clock, MapPin, Users, Sparkles } from 'lucide-react';

/**
 * Parse date string "2025-11-10" to readable parts
 */
const parseDateParts = (dateStr) => {
  if (!dateStr) return { month: 'TBA', day: '--', year: '', full: 'Date TBA' };
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      const month = d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
      const day = d.getDate();
      const year = d.getFullYear();
      const full = d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
      return { month, day, year, full };
    }
  } catch (e) {
    // fallback
  }
  return { month: 'DATE', day: '1', year: '', full: dateStr };
};

/**
 * Format time string "09:00:00" to readable "9:00 AM"
 */
const formatTime = (timeStr) => {
  if (!timeStr) return '';
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

const EventCard = ({
  title = 'Untitled Event',
  venue = 'Auditorium',
  event_date = '',
  event_time = '',
  organizer = 'Campus Community',
}) => {
  const { month, day, full } = parseDateParts(event_date);
  const formattedTime = formatTime(event_time);

  return (
    <div className="event-card">
      <div className="event-card-top">
        {/* Realistic calendar date tile */}
        <div className="event-date-tile">
          <span className="tile-month">{month}</span>
          <span className="tile-day">{day}</span>
        </div>

        <div className="event-header-info">
          <div className="event-meta-tags">
            {event_time && (
              <span className="event-time-badge">
                <Clock size={12} />
                <span>{formattedTime}</span>
              </span>
            )}
            <span className="event-badge">
              <Sparkles size={11} />
              <span>Campus Activity</span>
            </span>
          </div>
          <h3 className="event-title" title={title}>{title}</h3>
        </div>
      </div>

      <div className="event-card-body">
        <div className="event-details-list">
          <div className="event-detail-item">
            <MapPin size={14} className="detail-icon venue-icon" />
            <span className="detail-text">{venue}</span>
          </div>
          <div className="event-detail-item">
            <Users size={14} className="detail-icon organizer-icon" />
            <span className="detail-text">
              Organized by <strong className="organizer-name">{organizer}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
