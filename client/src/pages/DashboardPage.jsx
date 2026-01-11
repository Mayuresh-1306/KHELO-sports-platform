// client/src/pages/DashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUsers, FaTrophy, FaChartLine, FaCalendarAlt, FaMapMarkerAlt, FaStar, FaUserPlus, FaFileAlt, FaMedal, FaSignOutAlt } from 'react-icons/fa';
import "../styles/pages/dashboard.css";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  
  // Stats State
  const [stats, setStats] = useState({
    totalPlayers: 0,
    totalAchievements: 0,
    upcomingMatches: 0,
    pendingDocuments: 0
  });
  
  const [recentPlayers, setRecentPlayers] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // 1. Get User from Local Storage (The bridge we built in Login.jsx)
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // If no user found, kick them back to login
      navigate('/login');
    }

    // 2. Fetch Data
    fetchDashboardData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const fetchDashboardData = async () => {
    // Mock data (This simulates backend data for now)
    setStats({
      totalPlayers: 42,
      totalAchievements: 18,
      upcomingMatches: 5,
      pendingDocuments: 3
    });

    setRecentPlayers([
      { id: 1, name: 'John Doe', sport: 'Football', status: 'active', lastUpdated: '2 hours ago' },
      { id: 2, name: 'Jane Smith', sport: 'Basketball', status: 'active', lastUpdated: '1 day ago' },
      { id: 3, name: 'Mike Johnson', sport: 'Tennis', status: 'inactive', lastUpdated: '3 days ago' },
      { id: 4, name: 'Sarah Wilson', sport: 'Swimming', status: 'active', lastUpdated: '5 hours ago' },
    ]);

    setUpcomingMatches([
      { id: 1, teamA: 'Red Devils', teamB: 'Blue Eagles', date: '2024-12-15', location: 'Main Stadium' },
      { id: 2, teamA: 'Tigers', teamB: 'Lions', date: '2024-12-18', location: 'City Arena' },
    ]);

    setRecentActivity([
      { id: 1, type: 'added', text: 'New player added: Alex Johnson', time: '10 minutes ago' },
      { id: 2, type: 'updated', text: 'Profile updated: Sarah Williams', time: '2 hours ago' },
    ]);
  };

  return (
    <div className="dashboard-page">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name || 'Athlete'}!</h1>
        <p>Here's what's happening with your player profiles</p>
        
        <div className="dashboard-welcome">
          <div className="profile-avatar-large">
            {user?.name?.charAt(0).toUpperCase() || 'A'}
          </div>
          <div className="welcome-text">
            <h3>Your Player Dashboard</h3>
            <p>Manage your profiles, track achievements, and stay updated</p>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* Sidebar */}
        <div className="dashboard-sidebar">
          <div className="user-profile">
            <div className="profile-avatar">
              {user?.name?.charAt(0).toUpperCase() || 'A'}
            </div>
            <h3>{user?.name || 'Athlete'}</h3>
            <p>{user?.email || 'player@example.com'}</p>
          </div>

          <ul className="sidebar-menu">
            <li><Link to="/dashboard" className="active"><FaChartLine /> Dashboard</Link></li>
            <li><Link to="/profile/1"><FaUserPlus /> My Profile</Link></li>
            <li><Link to="/search"><FaUsers /> Search Players</Link></li>
            <li><Link to="/documents"><FaFileAlt /> Documents</Link></li>
            <li><Link to="/achievements"><FaMedal /> Achievements</Link></li>
            {/* Added Logout Button */}
            <li onClick={handleLogout} style={{cursor: 'pointer', marginTop: '20px', color: '#ff6b6b'}}>
                <span style={{display:'flex', alignItems:'center', gap:'10px', padding:'10px 15px'}}>
                    <FaSignOutAlt /> Logout
                </span>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="dashboard-main">
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
                <p>Achievements</p>
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
                <p>Pending Docs</p>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="dashboard-section activity-feed">
            <div className="section-header">
              <h2>Recent Activity</h2>
            </div>
            
            <div className="activity-list">
                {recentActivity.map(activity => (
                <div key={activity.id} className="activity-item">
                    <div className={`activity-icon ${activity.type}`}>
                    {activity.type === 'added' && <FaUserPlus />}
                    {activity.type === 'updated' && <FaChartLine />}
                    {activity.type === 'achievement' && <FaTrophy />}
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