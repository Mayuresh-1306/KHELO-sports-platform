// client/src/pages/DashboardPage.jsx
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaUsers, FaTrophy, FaChartLine, FaCalendarAlt, FaMapMarkerAlt, FaStar, FaUserPlus, FaFileAlt, FaMedal } from 'react-icons/fa';
import "../styles/pages/dashboard.css";

const DashboardPage = () => {
  const { user } = useAuth();
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
    // Fetch dashboard data
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    // Mock data for now
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
      { id: 3, teamA: 'Sharks', teamB: 'Dolphins', date: '2024-12-20', location: 'Aquatic Center' },
    ]);

    setRecentActivity([
      { id: 1, type: 'added', text: 'New player added: Alex Johnson', time: '10 minutes ago' },
      { id: 2, type: 'updated', text: 'Profile updated: Sarah Williams', time: '2 hours ago' },
      { id: 3, type: 'achievement', text: 'New achievement unlocked: Top Scorer', time: '1 day ago' },
      { id: 4, type: 'added', text: 'Document uploaded: Medical Certificate', time: '2 days ago' },
    ]);
  };

  return (
    <div className="dashboard-page">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name || 'Athlete'}!</h1>
        <p>Here's what's happening with your player profiles</p>
        
        <div className="dashboard-welcome">
          <div className="profile-avatar">
            {user?.name?.charAt(0) || 'A'}
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
              {user?.name?.charAt(0) || 'A'}
            </div>
            <h3>{user?.name || 'Athlete'}</h3>
            <p>{user?.email || 'player@example.com'}</p>
          </div>

          <ul className="sidebar-menu">
            <li><Link to="/dashboard" className="active"><FaChartLine /> Dashboard</Link></li>
            <li><Link to="/create-profile"><FaUserPlus /> Create Profile</Link></li>
            <li><Link to="/search"><FaUsers /> Search Players</Link></li>
            <li><Link to="/documents"><FaFileAlt /> Documents</Link></li>
            <li><Link to="/achievements"><FaMedal /> Achievements</Link></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="dashboard-main">
          {/* Quick Stats */}
          <div className="dashboard-quick-stats">
            <div className="quick-stat-card">
              <div className="stat-icon players">
                <FaUsers />
              </div>
              <div className="stat-content">
                <h3>{stats.totalPlayers}</h3>
                <p>Players</p>
              </div>
            </div>
            <div className="quick-stat-card">
              <div className="stat-icon achievements">
                <FaTrophy />
              </div>
              <div className="stat-content">
                <h3>{stats.totalAchievements}</h3>
                <p>Achievements</p>
              </div>
            </div>
            <div className="quick-stat-card">
              <div className="stat-icon matches">
                <FaCalendarAlt />
              </div>
              <div className="stat-content">
                <h3>{stats.upcomingMatches}</h3>
                <p>Upcoming Matches</p>
              </div>
            </div>
            <div className="quick-stat-card">
              <div className="stat-icon documents">
                <FaFileAlt />
              </div>
              <div className="stat-content">
                <h3>{stats.pendingDocuments}</h3>
                <p>Documents</p>
              </div>
            </div>
          </div>

          {/* Recent Players */}
          <div className="dashboard-section recent-players">
            <div className="section-header">
              <h2>Recent Players</h2>
              <Link to="/search" className="view-all">View All</Link>
            </div>
            
            {recentPlayers.length > 0 ? (
              <table>
                <thead>
                  <tr>
                    <th>Player</th>
                    <th>Sport</th>
                    <th>Status</th>
                    <th>Last Updated</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPlayers.map(player => (
                    <tr key={player.id}>
                      <td>
                        <div className="player-info">
                          <div className="player-avatar">
                            {player.name.charAt(0)}
                          </div>
                          <span className="player-name">{player.name}</span>
                        </div>
                      </td>
                      <td><span className="player-sport">{player.sport}</span></td>
                      <td>
                        <span className={`status-badge ${player.status}`}>
                          {player.status}
                        </span>
                      </td>
                      <td>{player.lastUpdated}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="empty-state">
                <FaUsers size={48} />
                <h3>No players yet</h3>
                <p>Create your first player profile to get started</p>
                <Link to="/create-profile" className="btn btn-primary">
                  Create Profile
                </Link>
              </div>
            )}
          </div>

          {/* Upcoming Matches & Activity Feed */}
          <div className="dashboard-grid-2col">
            <div className="dashboard-section upcoming-matches">
              <div className="section-header">
                <h2>Upcoming Matches</h2>
                <Link to="/search" className="view-all">View All</Link>
              </div>
              
              {upcomingMatches.length > 0 ? (
                <div className="matches-list">
                  {upcomingMatches.map(match => (
                    <div key={match.id} className="match-card">
                      <div className="match-teams">
                        <div className="team">
                          <div className="team-logo">{match.teamA.charAt(0)}</div>
                          <span className="team-name">{match.teamA}</span>
                        </div>
                        <span className="match-vs">vs</span>
                        <div className="team">
                          <div className="team-logo">{match.teamB.charAt(0)}</div>
                          <span className="team-name">{match.teamB}</span>
                        </div>
                      </div>
                      <div className="match-details">
                        <div className="match-date">
                          <FaCalendarAlt /> {match.date}
                        </div>
                        <div className="match-location">
                          <FaMapMarkerAlt /> {match.location}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <FaCalendarAlt size={48} />
                  <h3>No upcoming matches</h3>
                  <p>Schedule matches to see them here</p>
                </div>
              )}
            </div>

            <div className="dashboard-section activity-feed">
              <div className="section-header">
                <h2>Recent Activity</h2>
              </div>
              
              {recentActivity.length > 0 ? (
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
              ) : (
                <div className="empty-state">
                  <FaStar size={48} />
                  <h3>No activity yet</h3>
                  <p>Start managing your profiles to see activity</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
