import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaHome,
  FaUser,
  FaPlus,
  FaSearch,
  FaTrophy,
  FaFileAlt,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaChartLine,
  FaBolt
} from 'react-icons/fa';
import "../../styles/components/navbar.css";
import "../../styles/components/navbar-mobile.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path ? 'active' : '';

  const navLinks = [
    { to: '/', label: 'Home', icon: <FaHome /> },
    { to: '/dashboard', label: 'Dashboard', icon: <FaChartLine /> },
    { to: '/search', label: 'Players', icon: <FaSearch /> },
    { to: '/create-profile', label: 'Create', icon: <FaPlus /> },
    { to: '/documents', label: 'Docs', icon: <FaFileAlt /> },
    { to: '/achievements', label: 'Awards', icon: <FaTrophy /> },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        
        {/* === LOGO === */}
        <Link to="/" className="navbar-logo">
          <div className="logo-icon-box">
            <FaBolt />
          </div>
          <span className="logo-text">KHELO<span className="logo-highlight">SPORTS</span></span>
        </Link>

        {/* === DESKTOP NAVIGATION === */}
        <div className="nav-menu">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${isActive(link.to)}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* === USER ACTION SECTION === */}
        <div className="nav-user-section">
          {isAuthenticated ? (
            <>
              <Link to={`/profile/${user?._id}`} className="user-pill">
                <div className="user-avatar">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user?.name?.split(' ')[0]}</span>
              </Link>
              
              <button onClick={handleLogout} className="logout-button" title="Logout">
                <FaSignOutAlt />
              </button>
            </>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="nav-link-auth">
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-primary btn-sm">
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* === MOBILE MENU (Slide Down) === */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="mobile-menu-content">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`mobile-nav-link ${isActive(link.to)}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="mobile-icon">{link.icon}</span>
                  {link.label}
                </Link>
              ))}
              
              <div className="mobile-divider"></div>

              {isAuthenticated ? (
                <button onClick={handleLogout} className="mobile-nav-link logout">
                  <span className="mobile-icon"><FaSignOutAlt /></span>
                  Logout
                </button>
              ) : (
                <div className="mobile-auth-actions">
                  <Link to="/login" className="btn btn-outline full-width" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign In
                  </Link>
                  <Link to="/signup" className="btn btn-primary full-width" onClick={() => setIsMobileMenuOpen(false)}>
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;