import React, { useState, useEffect } from 'react';
import { Calendar, Filter, Loader2, AlertCircle, RefreshCw, Layers, Clock } from 'lucide-react';
import Timetable from '../components/Timetable';
import { getTimetable } from '../services/api';

const DAYS_OF_WEEK = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const BRANCHES = ['CSE', 'IT', 'ECE', 'ME', 'CE', 'AIDS'];

const TimetablePage = () => {
  // Default day based on current day of week (fallback Monday)
  const todayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const initialDay = DAYS_OF_WEEK.includes(todayName) ? todayName : 'Monday';

  const [selectedDay, setSelectedDay] = useState(initialDay);
  const [selectedBranch, setSelectedBranch] = useState('CSE');
  const [timetableData, setTimetableData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchTimetableData = async (day, branch) => {
    setIsLoading(true);
    setError(null);
    try {
      // Call GET /api/timetable?day=...&branch=...
      const res = await getTimetable(day, branch);
      if (res && res.data && Array.isArray(res.data)) {
        setTimetableData(res.data);
      } else if (Array.isArray(res)) {
        setTimetableData(res);
      } else {
        setTimetableData([]);
      }
    } catch (err) {
      console.error('Timetable fetch error:', err);
      const msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Failed to fetch timetable. Ensure backend server is reachable at http://localhost:5000/api.';
      setError(msg);
      setTimetableData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTimetableData(selectedDay, selectedBranch);
  }, [selectedDay, selectedBranch]);

  return (
    <div className="page-container">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <div className="page-badge">
            <Calendar size={14} />
            <span>Academic Schedule</span>
          </div>
          <h1 className="page-title">Class Timetable</h1>
          <p className="page-description">
            View daily lecture schedules, faculty details, and classroom assignments.
          </p>
        </div>
        <button
          type="button"
          onClick={() => fetchTimetableData(selectedDay, selectedBranch)}
          className="refresh-btn"
          disabled={isLoading}
          title="Refresh timetable"
        >
          <RefreshCw size={16} className={isLoading ? 'spinner' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Filter Bar: Days & Branches */}
      <div className="filter-card">
        <div className="filter-section">
          <label className="filter-label">
            <Clock size={16} />
            <span>Select Day:</span>
          </label>
          <div className="day-pill-selector">
            {DAYS_OF_WEEK.map((day) => (
              <button
                key={day}
                type="button"
                className={`day-pill ${selectedDay === day ? 'active' : ''}`}
                onClick={() => setSelectedDay(day)}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-section branch-section">
          <label className="filter-label">
            <Layers size={16} />
            <span>Branch:</span>
          </label>
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="branch-select"
          >
            {BRANCHES.map((b) => (
              <option key={b} value={b}>
                {b} Department
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Timetable content display */}
      <div className="timetable-content-card">
        <div className="table-header-meta">
          <div className="meta-info">
            <span className="current-selection-badge">
              {selectedBranch} • {selectedDay}
            </span>
            <span className="total-classes-text">
              {!isLoading && `${timetableData.length} ${timetableData.length === 1 ? 'class' : 'classes'} scheduled`}
            </span>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="loading-state-container">
            <Loader2 size={32} className="spinner" />
            <p>Loading schedule for {selectedBranch} on {selectedDay}...</p>
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="error-banner">
            <AlertCircle size={20} className="error-icon" />
            <div className="error-content">
              <strong>Error fetching timetable:</strong>
              <p>{error}</p>
            </div>
            <button
              type="button"
              className="retry-btn"
              onClick={() => fetchTimetableData(selectedDay, selectedBranch)}
            >
              Try Again
            </button>
          </div>
        )}

        {/* Timetable Table */}
        {!isLoading && !error && (
          <Timetable data={timetableData} />
        )}
      </div>
    </div>
  );
};

export default TimetablePage;
