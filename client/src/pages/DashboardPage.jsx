import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUsers, FaTrophy, FaChartLine, FaCalendarAlt, FaFileAlt, FaMedal, FaSignOutAlt, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import "../styles/pages/dashboard.css";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [stats, setStats] = useState({
    totalPlayers: 0,
    totalAchievements: 0,
    upcomingMatches: 0,
    pendingDocuments: 0
  });
  
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate('/login');
    }
    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const fetchDashboardData = async () => {
    setStats({
      totalPlayers: 42,
      totalAchievements: 18,
      upcomingMatches: 5,
      pendingDocuments: 3
    });
    setRecentActivity([
      { id: 1, type: 'added', text: 'New player added: Alex Johnson', time: '10 minutes ago' },
      { id: 2, type: 'updated', text: 'Profile updated: Sarah Williams', time: '2 hours ago' },
    ]);
  };

  return (
    <div className="dashboard-page">
      {/* Mobile Toggle Button */}
      <button 
        className="mobile-menu-btn"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
      >
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      <div className="dashboard-grid">
        {/* === SIDEBAR === */}
        <div className={`dashboard-sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="user-profile">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase() || <FaUser />}
            </div>
            <h3>{user?.name || 'Athlete'}</h3>
            <p>{user?.email || 'player@example.com'}</p>
          </div>

          <ul className="sidebar-menu">
            <li>
                <Link to="/dashboard" className="active" onClick={() => setIsSidebarOpen(false)}>
                    <FaChartLine /> Dashboard
                </Link>
            </li>
            <li>
                <Link to="/profile/1" onClick={() => setIsSidebarOpen(false)}>
                    <FaUser /> My Profile
                </Link>
            </li>
            <li>
                <Link to="/search" onClick={() => setIsSidebarOpen(false)}>
                    <FaUsers /> Search Players
                </Link>
            </li>
            <li>
                <Link to="/documents" onClick={() => setIsSidebarOpen(false)}>
                    <FaFileAlt /> Documents
                </Link>
            </li>
            <li>
                <Link to="/achievements" onClick={() => setIsSidebarOpen(false)}>
                    <FaMedal /> Achievements
                </Link>
            </li>
            <li onClick={handleLogout} style={{cursor: 'pointer', marginTop: '20px', color: '#ff6b6b'}}>
                <span style={{display:'flex', alignItems:'center', gap:'10px', padding:'10px 15px'}}>
                    <FaSignOutAlt /> Logout
                </span>
            </li>
          </ul>
        </div>

        {/* Overlay for Mobile */}
        {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

        {/* === MAIN CONTENT === */}
        <div className="dashboard-main">
          {/* Header Moved INSIDE Main Content for proper alignment */}
          <div className="dashboard-header">
            <h1>Welcome back, {user?.name || 'Athlete'}!</h1>
            <p>Here's what's happening with your player profiles</p>
          </div>

          {/* Quick Stats */}
          <div className="dashboard-quick-stats">
            <div className="quick-stat-card">
              <div className="stat-icon players"><FaUsers /></div>
              <div className="stat-content">
                <h3>{stats.totalPlayers}</h3>
                <p>Players</p>
              </div>
            </div>
            <div className="quick-stat-card">
              <div className="stat-icon achievements"><FaTrophy /></div>
              <div className="stat-content">
                <h3>{stats.totalAchievements}</h3>
                <p>Awards</p>
              </div>
            </div>
            <div className="quick-stat-card">
              <div className="stat-icon matches"><FaCalendarAlt /></div>
              <div className="stat-content">
                <h3>{stats.upcomingMatches}</h3>
                <p>Matches</p>
              </div>
            </div>
            <div className="quick-stat-card">
              <div className="stat-icon documents"><FaFileAlt /></div>
              <div className="stat-content">
                <h3>{stats.pendingDocuments}</h3>
                <p>Docs</p>
              </div>
            </div>
          </div>

          {/* Activity Feed */}
          <div className="dashboard-section activity-feed">
            <div className="section-header">
              <h2>Recent Activity</h2>
            </div>
            <div className="activity-list">
                {recentActivity.map(activity => (
                <div key={activity.id} className="activity-item">
                    <div className={`activity-icon ${activity.type}`}>
                    {activity.type === 'added' && <FaUsers />}
                    {activity.type === 'updated' && <FaChartLine />}
                    </div>
                    <div className="activity-content">
                    <p>{activity.text}</p>
                    <span className="activity-time">{activity.time}</span>
                    </div>
                </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;