import React, { useState, useEffect } from 'react';
import { Sparkles, Calendar, Search, Loader2, AlertCircle, RefreshCw, PartyPopper } from 'lucide-react';
import EventCard from '../components/EventCard';
import { getEvents } from '../services/api';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchFilter, setSearchFilter] = useState('');

  const fetchEvents = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await getEvents();
      if (res && res.data && Array.isArray(res.data)) {
        setEvents(res.data);
      } else if (Array.isArray(res)) {
        setEvents(res);
      } else {
        setEvents([]);
      }
    } catch (err) {
      console.error('Events fetch error:', err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Failed to fetch campus events. Please verify backend connection.';
      setError(msg);
      setEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((ev) => {
    const term = searchFilter.toLowerCase();
    const titleMatch = (ev.title || '').toLowerCase().includes(term);
    const venueMatch = (ev.venue || '').toLowerCase().includes(term);
    const organizerMatch = (ev.organizer || '').toLowerCase().includes(term);
    return titleMatch || venueMatch || organizerMatch;
  });

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="page-badge">
            <Sparkles size={14} />
            <span>What's Happening</span>
          </div>
          <h1 className="page-title">Campus Events & Activities</h1>
          <p className="page-description">
            Discover upcoming hackathons, guest lectures, cultural fests, and club workshops.
          </p>
        </div>
        <button
          type="button"
          onClick={fetchEvents}
          className="refresh-btn"
          disabled={isLoading}
          title="Refresh events"
        >
          <RefreshCw size={16} className={isLoading ? 'spinner' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Search and Summary bar */}
      <div className="events-control-bar">
        <div className="search-input-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by event title, venue, or department..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="events-search-input"
          />
        </div>
        <div className="events-counter">
          <span>
            Showing <strong>{filteredEvents.length}</strong> of {events.length} events
          </span>
        </div>
      </div>

      {/* Loading state */}
      {isLoading && (
        <div className="loading-state-container">
          <Loader2 size={32} className="spinner" />
          <p>Loading upcoming campus events...</p>
        </div>
      )}

      {/* Error state */}
      {!isLoading && error && (
        <div className="error-banner">
          <AlertCircle size={20} className="error-icon" />
          <div className="error-content">
            <strong>Error loading events:</strong>
            <p>{error}</p>
          </div>
          <button type="button" className="retry-btn" onClick={fetchEvents}>
            Try Again
          </button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && filteredEvents.length === 0 && (
        <div className="events-empty-state">
          <PartyPopper size={48} className="empty-icon" />
          <h3>No events found</h3>
          <p>
            {searchFilter
              ? `No events matching "${searchFilter}". Try adjusting your keywords.`
              : 'There are currently no scheduled events in the campus calendar.'}
          </p>
          {searchFilter && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchFilter('')}
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Events Grid */}
      {!isLoading && !error && filteredEvents.length > 0 && (
        <div className="events-grid">
          {filteredEvents.map((event, index) => (
            <EventCard
              key={index}
              title={event.title}
              venue={event.venue}
              event_date={event.event_date}
              event_time={event.event_time}
              organizer={event.organizer}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default EventsPage;
