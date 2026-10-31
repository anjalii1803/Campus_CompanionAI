import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { MessageSquare, Calendar, Sparkles, FileText, Menu, X } from 'lucide-react';
import Logo from './Logo';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Campus AI Chat', icon: MessageSquare },
    { to: '/timetable', label: 'Class Timetable', icon: Calendar },
    { to: '/events', label: 'Campus Events', icon: Sparkles },
    { to: '/notices', label: 'Notice Assistant', icon: FileText },
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="brand-logo" onClick={() => setMobileMenuOpen(false)}>
          <Logo size="md" />
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links desktop-menu">
          {navLinks.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <IconComponent size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>

        {/* Online Status Badge */}
        <div className="nav-actions">
          <div className="status-pill" title="MNNIT Campus Companion AI status">
            <span className="status-dot"></span>
            <span className="status-text">AI Online</span>
          </div>

          {/* Mobile menu toggle button */}
          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-menu-dropdown">
          {navLinks.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
              >
                <IconComponent size={20} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
