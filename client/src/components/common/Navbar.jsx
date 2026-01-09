// client/src/components/common/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { motion } from 'framer-motion';
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
  FaChartLine
} from 'react-icons/fa';
import "../../styles/components/navbar.css";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMobileMenuOpen(false);
  };

  const navLinks = [
    { to: '/', label: 'Home', icon: <FaHome /> },
    { to: '/dashboard', label: 'Dashboard', icon: <FaChartLine /> },
    { to: '/search', label: 'Search Players', icon: <FaSearch /> },
    { to: '/create-profile', label: 'Create Profile', icon: <FaPlus /> },
    { to: '/documents', label: 'Documents', icon: <FaFileAlt /> },
    { to: '/achievements', label: 'Achievements', icon: <FaTrophy /> },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <motion.div
            className="logo-icon"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.5 }}
          >
            <FaTrophy />
          </motion.div>
          <span className="logo-text">Player<span className="logo-highlight">Profile</span></span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-menu">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="nav-icon">{link.icon}</span>
              <span className="nav-text">{link.label}</span>
            </Link>
          ))}
        </div>

        {/* User Section */}
        <div className="nav-user-section">
          {isAuthenticated ? (
            <div className="user-menu">
              <Link to={`/profile/${user?._id}`} className="user-info">
                <div className="user-avatar">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
                <span className="user-name">{user?.name}</span>
              </Link>
              <button onClick={handleLogout} className="logout-button">
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline">
                Sign In
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="mobile-menu"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="mobile-nav-link"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="mobile-nav-icon">{link.icon}</span>
              <span className="mobile-nav-text">{link.label}</span>
            </Link>
          ))}
          
          {isAuthenticated ? (
            <>
              <Link
                to={`/profile/${user?._id}`}
                className="mobile-nav-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="mobile-nav-icon"><FaUser /></span>
                <span className="mobile-nav-text">My Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="mobile-logout-button"
              >
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <div className="mobile-auth-buttons">
              <Link
                to="/login"
                className="btn btn-outline"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="btn btn-primary"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;