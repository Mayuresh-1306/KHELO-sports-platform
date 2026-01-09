import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHome, 
  FaUser, 
  FaChartLine, 
  FaTrophy, 
  FaFileAlt, 
  FaSearch, 
  FaCog, 
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import "../../styles/components/sidebar.css";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/dashboard', icon: <FaHome />, label: 'Dashboard' },
    { path: `/profile/${user?._id}`, icon: <FaUser />, label: 'My Profile' },
    { path: '/create-profile', icon: <FaUser />, label: 'Create Profile' },
    { path: '/search', icon: <FaSearch />, label: 'Search Players' },
    { path: '/achievements', icon: <FaTrophy />, label: 'Achievements' },
    { path: '/documents', icon: <FaFileAlt />, label: 'Documents' },
    { path: '/dashboard/stats', icon: <FaChartLine />, label: 'Statistics' },
    { path: '/dashboard/settings', icon: <FaCog />, label: 'Settings' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.aside 
      className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="sidebar-header">
        {!isCollapsed && (
          <div className="user-info">
            <div className="user-avatar">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div className="user-details">
              <h3 className="user-name">{user?.name}</h3>
              <p className="user-email">{user?.email}</p>
            </div>
          </div>
        )}
        <button 
          className="collapse-toggle"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
        </button>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `menu-item ${isActive ? 'active' : ''}`
            }
          >
            <span className="menu-icon">{item.icon}</span>
            {!isCollapsed && <span className="menu-label">{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button 
          className="logout-button"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </motion.aside>
  );
};

export default Sidebar;