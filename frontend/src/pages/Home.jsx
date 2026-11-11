import React, { useState } from 'react';
import {
  Sparkles,
  MapPin,
  UserCheck,
  Search,
  Loader2,
  AlertCircle,
  Building,
  Mail,
  DoorClosed,
  ChevronRight,
  Send,
} from 'lucide-react';
import ChatBox from '../components/ChatBox';
import SuggestedQuestions from '../components/SuggestedQuestions';
import { getRoomDetails, getFacultyDetails } from '../services/api';
import { useChat } from '../context/ChatContext';
import { LogoIcon } from '../components/Logo';

const Home = () => {
  const { sendMessage, setInputValue } = useChat();

  // Quick lookup states
  const [activeTab, setActiveTab] = useState('rooms'); // 'rooms' | 'faculty'

  // Room lookup state
  const [roomQuery, setRoomQuery] = useState('');
  const [roomResult, setRoomResult] = useState(null);
  const [roomLoading, setRoomLoading] = useState(false);
  const [roomError, setRoomError] = useState(null);

  // Faculty lookup state
  const [facultyQuery, setFacultyQuery] = useState('');
  const [facultyResult, setFacultyResult] = useState(null);
  const [facultyLoading, setFacultyLoading] = useState(false);
  const [facultyError, setFacultyError] = useState(null);

  const handleRoomSearch = async (e) => {
    e?.preventDefault();
    const query = roomQuery.trim();
    if (!query || roomLoading) return;

    setRoomLoading(true);
    setRoomError(null);
    setRoomResult(null);

    try {
      const res = await getRoomDetails(query);
      if (res && res.data) {
        setRoomResult(res.data);
      } else {
        setRoomError('Room not found or invalid response format.');
      }
    } catch (err) {
      console.error('Room lookup error:', err);
      setRoomError(
        err.response?.data?.message ||
        `Could not find room "${query}". Make sure the room exists in database.`
      );
    } finally {
      setRoomLoading(false);
    }
  };

  const handleFacultySearch = async (e) => {
    e?.preventDefault();
    const query = facultyQuery.trim();
    if (!query || facultyLoading) return;

    setFacultyLoading(true);
    setFacultyError(null);
    setFacultyResult(null);

    try {
      const res = await getFacultyDetails(query);
      if (res && res.data) {
        setFacultyResult(res.data);
      } else {
        setFacultyError('Faculty member not found.');
      }
    } catch (err) {
      console.error('Faculty lookup error:', err);
      setFacultyError(
        err.response?.data?.message ||
        `Could not find faculty "${query}". Make sure the name matches backend records.`
      );
    } finally {
      setFacultyLoading(false);
    }
  };

  const handleQuickRoomClick = (roomName) => {
    setRoomQuery(roomName);
    // Execute search immediately
    setRoomLoading(true);
    setRoomError(null);
    getRoomDetails(roomName)
      .then((res) => {
        if (res?.data) setRoomResult(res.data);
      })
      .catch((err) => {
        setRoomError(err.response?.data?.message || `Could not find room "${roomName}".`);
      })
      .finally(() => setRoomLoading(false));
  };

  const handleQuickFacultyClick = (facultyName) => {
    setFacultyQuery(facultyName);
    setFacultyLoading(true);
    setFacultyError(null);
    getFacultyDetails(facultyName)
      .then((res) => {
        if (res?.data) setFacultyResult(res.data);
      })
      .catch((err) => {
        setFacultyError(err.response?.data?.message || `Could not find faculty "${facultyName}".`);
      })
      .finally(() => setFacultyLoading(false));
  };

  return (
    <div className="home-page-container">
      {/* Hero / Greeting Banner */}
      <section className="home-hero">
        <div className="hero-content-wrapper">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={14} className="hero-badge-sparkle" />
              <span>Motilal Nehru National Institute of Technology Allahabad</span>
            </div>
            <h1 className="hero-title">
              Welcome to Campus Companion
            </h1>
            <p className="hero-subtitle">
              Your intelligent digital guide for MNNIT academic schedules, classroom locations, faculty directory, and campus notices.
            </p>
          </div>
          <div className="hero-logo-container">
            <LogoIcon size={84} />
          </div>
        </div>
      </section>

      {/* Main Grid: Chat Assistant & Quick Directory */}
      <div className="home-main-layout">
        {/* Left Column: Chat Area */}
        <div className="chat-section-col">
          <ChatBox />
          <div className="mt-4">
            <SuggestedQuestions />
          </div>
        </div>

        {/* Right Column: Quick Lookup & Campus Directory */}
        <aside className="quick-lookup-col">
          <div className="lookup-card">
            <div className="lookup-header">
              <h3>Quick Campus Lookup</h3>
              <p>Direct lookup for rooms and faculty directory</p>
            </div>

            {/* Tab switch */}
            <div className="lookup-tabs">
              <button
                type="button"
                className={`tab-btn ${activeTab === 'rooms' ? 'active' : ''}`}
                onClick={() => setActiveTab('rooms')}
              >
                <MapPin size={16} />
                <span>Room Locator</span>
              </button>
              <button
                type="button"
                className={`tab-btn ${activeTab === 'faculty' ? 'active' : ''}`}
                onClick={() => setActiveTab('faculty')}
              >
                <UserCheck size={16} />
                <span>Faculty Directory</span>
              </button>
            </div>

            {/* Room Lookup Tab */}
            {activeTab === 'rooms' && (
              <div className="tab-pane">
                <form onSubmit={handleRoomSearch} className="lookup-form">
                  <div className="lookup-input-wrapper">
                    <input
                      type="text"
                      placeholder="e.g. NLH2, L1 Lab, CCTF Lab"
                      value={roomQuery}
                      onChange={(e) => setRoomQuery(e.target.value)}
                      className="lookup-input"
                    />
                    <button
                      type="submit"
                      disabled={!roomQuery.trim() || roomLoading}
                      className="lookup-search-btn"
                    >
                      {roomLoading ? <Loader2 size={16} className="spinner" /> : <Search size={16} />}
                    </button>
                  </div>
                </form>

                {/* Quick pills */}
                <div className="quick-sample-pills">
                  <span>Try:</span>
                  {['NLH2', 'L1 Lab', 'CCTF Lab'].map((room) => (
                    <button
                      key={room}
                      type="button"
                      className="sample-pill"
                      onClick={() => handleQuickRoomClick(room)}
                    >
                      {room}
                    </button>
                  ))}
                </div>

                {/* Error */}
                {roomError && (
                  <div className="lookup-error">
                    <AlertCircle size={15} />
                    <span>{roomError}</span>
                  </div>
                )}

                {/* Result Card */}
                {roomResult && (
                  <div className="lookup-result-card room-result">
                    <div className="result-header">
                      <div className="result-avatar">
                        <DoorClosed size={20} />
                      </div>
                      <div>
                        <h4>{roomResult.room_name}</h4>
                        <span className="room-type-tag">{roomResult.type || 'Room'}</span>
                      </div>
                    </div>

                    <div className="result-details-grid">
                      <div className="detail-box">
                        <span className="label">Block:</span>
                        <span className="val">{roomResult.block}</span>
                      </div>
                      <div className="detail-box">
                        <span className="label">Floor:</span>
                        <span className="val">Floor {roomResult.floor}</span>
                      </div>
                      <div className="detail-box">
                        <span className="label">Capacity:</span>
                        <span className="val">{roomResult.capacity} Seats</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="ask-ai-link-btn"
                      onClick={() => {
                        const q = `Where is ${roomResult.room_name} located?`;
                        setInputValue(q);
                      }}
                    >
                      <span>Ask AI in Chat</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Faculty Lookup Tab */}
            {activeTab === 'faculty' && (
              <div className="tab-pane">
                <form onSubmit={handleFacultySearch} className="lookup-form">
                  <div className="lookup-input-wrapper">
                    <input
                      type="text"
                      placeholder="e.g. Prof. Anil Kumar Singh, Dr. Manoj Wairiya"
                      value={facultyQuery}
                      onChange={(e) => setFacultyQuery(e.target.value)}
                      className="lookup-input"
                    />
                    <button
                      type="submit"
                      disabled={!facultyQuery.trim() || facultyLoading}
                      className="lookup-search-btn"
                    >
                      {facultyLoading ? <Loader2 size={16} className="spinner" /> : <Search size={16} />}
                    </button>
                  </div>
                </form>

                {/* Quick pills */}
                <div className="quick-sample-pills">
                  <span>Try:</span>
                  {['Prof. Anil Kumar Singh', 'Dr. Manoj Wairiya', 'Dr. Shashank Srivastava'].map((fac) => (
                    <button
                      key={fac}
                      type="button"
                      className="sample-pill"
                      onClick={() => handleQuickFacultyClick(fac)}
                    >
                      {fac}
                    </button>
                  ))}
                </div>

                {/* Error */}
                {facultyError && (
                  <div className="lookup-error">
                    <AlertCircle size={15} />
                    <span>{facultyError}</span>
                  </div>
                )}

                {/* Result Card */}
                {facultyResult && (
                  <div className="lookup-result-card faculty-result">
                    <div className="result-header">
                      <div className="result-avatar faculty-avatar">
                        <UserCheck size={20} />
                      </div>
                      <div>
                        <h4>{facultyResult.name}</h4>
                        <span className="dept-tag">{facultyResult.department} Dept</span>
                      </div>
                    </div>

                    <div className="result-details-grid">
                      <div className="detail-box">
                        <span className="label">Subject:</span>
                        <span className="val">{facultyResult.subject || 'N/A'}</span>
                      </div>
                      <div className="detail-box">
                        <span className="label">Cabin No:</span>
                        <span className="val">{facultyResult.cabin_no || 'N/A'}</span>
                      </div>
                      <div className="detail-box full-width">
                        <span className="label">Email:</span>
                        <a href={`mailto:${facultyResult.email}`} className="email-link">
                          <Mail size={13} />
                          <span>{facultyResult.email || 'N/A'}</span>
                        </a>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="ask-ai-link-btn"
                      onClick={() => {
                        const q = `Where is ${facultyResult.name}'s cabin and what subject do they teach?`;
                        setInputValue(q);
                      }}
                    >
                      <span>Ask AI in Chat</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Home;
