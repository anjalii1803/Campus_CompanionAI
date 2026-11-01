import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import TimetablePage from './pages/TimetablePage';
import EventsPage from './pages/EventsPage';
import NoticesPage from './pages/NoticesPage';
import { ChatProvider } from './context/ChatContext';

function App() {
  return (
    <ChatProvider>
      <div className="app-shell">
        {/* Navigation Bar */}
        <Navbar />

        {/* Main Content View */}
        <main className="app-main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/timetable" element={<TimetablePage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/notices" element={<NoticesPage />} />
            {/* Catch-all redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="app-footer">
          <div className="footer-container">
            <div className="footer-left">
              <img src="/logo.png" alt="MNNIT Logo" className="footer-logo-img" />
              <div>
                <span className="footer-brand">Campus Companion</span>
                <span className="footer-tagline"> • Motilal Nehru National Institute of Technology Allahabad</span>
              </div>
            </div>
            <div className="footer-right">
              <span className="footer-status-pill">Backend: http://localhost:5000/api</span>
            </div>
          </div>
        </footer>
      </div>
    </ChatProvider>
  );
}

export default App;
