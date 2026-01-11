import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaTrophy, FaChartLine, FaCalendarAlt, FaMapMarkerAlt, FaEdit, FaTrash, FaShare, FaFlag, FaWeight, FaRuler } from 'react-icons/fa';
import "../styles/pages/playerProfile.css";

const PlayerProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchPlayerData();
  }, [id]);

  const fetchPlayerData = async () => {
    setPlayer({
      id: id || '1',
      name: 'Alex Johnson',
      age: 24,
      sports: ['Football', 'Basketball'],
      primarySport: 'Football',
      position: 'Forward',
      height: "6'2\"",
      weight: '185 lbs',
      nationality: 'USA',
      team: 'Red Devils FC',
      rating: 4.8,
      totalAchievements: 15, 
      matches: 42,
      goals: 28,
      assists: 12,
      description: 'Versatile forward with excellent ball control and scoring ability. Strong team player with leadership qualities.',
      stats: {
        speed: 85,
        shooting: 88,
        passing: 82,
        dribbling: 87,
        defense: 75,
        physical: 83
      },
      recentMatches: [
        { id: 1, opponent: 'Blue Eagles', result: 'W 3-1', date: '2024-11-15', goals: 2 },
        { id: 2, opponent: 'Tigers FC', result: 'D 1-1', date: '2024-11-08', goals: 1 },
        { id: 3, opponent: 'Lions United', result: 'W 2-0', date: '2024-11-01', goals: 1 },
      ],
      achievements: [
        { id: 3, title: 'MVP Tournament', sport: 'Basketball', date: '2024-10-15' },
      ]
    });
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading player profile...</p>
      </div>
    );
  }

  if (!player) {
    return (
      <div className="not-found">
        <h2>Player not found</h2>
        <p>The player profile you're looking for doesn't exist.</p>
        <button onClick={() => navigate('/search')} className="btn btn-primary">
          Browse Players
        </button>
      </div>
    );
  }

  return (
    <div className="player-profile-page">
      <div className="profile-header">
        <div className="profile-image">
          <div className="avatar-large">
            {player.name.charAt(0)}
          </div>
          <div className="rating-badge">
            <FaTrophy /> {player.rating}
          </div>
        </div>
        
        <div className="profile-info">
          <h1>{player.name}</h1>
          <div className="profile-meta">
            <span className="sport-badge">{player.primarySport}</span>
            <span>Age: {player.age}</span>
            <span>Position: {player.position}</span>
          </div>
          <p className="profile-description">{player.description}</p>
          
          <div className="profile-stats">
            <div className="stat">
              <FaTrophy />
              <div>
                <h3>{player.totalAchievements}</h3>
                <p>Achievements</p>
              </div>
            </div>
            <div className="stat">
              <FaCalendarAlt />
              <div>
                <h3>{player.matches}</h3>
                <p>Matches</p>
              </div>
            </div>
            <div className="stat">
              <FaChartLine />
              <div>
                <h3>{player.goals}</h3>
                <p>Goals</p>
              </div>
            </div>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn btn-primary">
            <FaEdit /> Edit Profile
          </button>
          <button className="btn btn-outline">
            <FaShare /> Share
          </button>
          <button className="btn btn-danger">
            <FaTrash /> Delete
          </button>
        </div>
      </div>

      <div className="profile-tabs">
        <button 
          className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`tab ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Statistics
        </button>
        <button 
          className={`tab ${activeTab === 'matches' ? 'active' : ''}`}
          onClick={() => setActiveTab('matches')}
        >
          Matches
        </button>
        <button 
          className={`tab ${activeTab === 'achievements' ? 'active' : ''}`}
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'overview' && (
          <div className="overview-content">
            <div className="player-details">
              <h3>Player Details</h3>
              <div className="details-grid">
                <div className="detail">
                  <FaFlag />
                  <div>
                    <label>Nationality</label>
                    <p>{player.nationality}</p>
                  </div>
                </div>
                <div className="detail">
                  <FaRuler />
                  <div>
                    <label>Height</label>
                    <p>{player.height}</p>
                  </div>
                </div>
                <div className="detail">
                  <FaWeight />
                  <div>
                    <label>Weight</label>
                    <p>{player.weight}</p>
                  </div>
                </div>
                <div className="detail">
                  <FaMapMarkerAlt />
                  <div>
                    <label>Team</label>
                    <p>{player.team}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="skills-radar">
              <h3>Skills Radar</h3>
              <div className="radar-chart">
                <div className="radar-placeholder">
                  {Object.entries(player.stats).map(([skill, value]) => (
                    <div key={skill} className="skill-bar">
                      <label>{skill}</label>
                      <div className="bar-container">
                        <div 
                          className="bar-fill"
                          style={{ width: `${value}%` }}
                        ></div>
                      </div>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="stats-content">
            <h3>Detailed Statistics</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <h4>Goals</h4>
                <p className="stat-value">{player.goals}</p>
                <p className="stat-label">Total Goals</p>
              </div>
              <div className="stat-card">
                <h4>Assists</h4>
                <p className="stat-value">{player.assists}</p>
                <p className="stat-label">Total Assists</p>
              </div>
              <div className="stat-card">
                <h4>Matches</h4>
                <p className="stat-value">{player.matches}</p>
                <p className="stat-label">Games Played</p>
              </div>
              <div className="stat-card">
                <h4>Rating</h4>
                <p className="stat-value">{player.rating}/5</p>
                <p className="stat-label">Average Rating</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'matches' && (
          <div className="matches-content">
            <h3>Recent Matches</h3>
            <div className="matches-list">
              {player.recentMatches.map(match => (
                <div key={match.id} className="match-item">
                  <div className="match-info">
                    <div className="match-teams">
                      <span className="team-name">{player.team}</span>
                      <span className="vs">vs</span>
                      <span className="team-name">{match.opponent}</span>
                    </div>
                    <div className="match-result">
                      <span className="result">{match.result}</span>
                      <span className="goals">Goals: {match.goals}</span>
                    </div>
                  </div>
                  <div className="match-date">
                    <FaCalendarAlt /> {match.date}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="achievements-content">
            <h3>Achievements & Awards</h3>
            <div className="achievements-grid">
              {player.achievements.map(achievement => (
                <div key={achievement.id} className="achievement-item">
                  <div className="achievement-icon">
                    <FaTrophy />
                  </div>
                  <div className="achievement-info">
                    <h4>{achievement.title}</h4>
                    <p>{achievement.sport} • {achievement.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayerProfilePage;