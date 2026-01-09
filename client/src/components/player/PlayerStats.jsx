import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Bar, 
  Radar, 
  Line,
  Doughnut 
} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement
} from 'chart.js';
import { 
  FaFire, 
  FaBolt, 
  FaHeart, 
  FaBrain, 
  FaBullseye,
  FaUsers,
  FaStar,
  FaChartLine,
  FaFutbol,
  FaBasketballBall,
  FaTennisBall,
  FaSwimmer,
  FaRunning,
  FaTrophy,
  FaMedal,
  FaAward,
  FaCalendarAlt,
  FaFilter,
  FaDownload,
  FaShare,
  FaChartBar,
  FaRadar,
  FaLineChart,
  FaPieChart
} from 'react-icons/fa';
import { playerService } from '../../services/playerService';
import { showError } from '../common/Toast';
import LoadingSpinner from '../common/LoadingSpinner';
import "../../styles/components/playerStats.css";

// Register ChartJS components
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ArcElement
);

const PlayerStats = ({ playerId: propPlayerId }) => {
  const { id } = useParams();
  const playerId = propPlayerId || id;
  
  const [loading, setLoading] = useState(true);
  const [playerData, setPlayerData] = useState(null);
  const [activeTab, setActiveTab] = useState('overall');
  const [selectedSport, setSelectedSport] = useState('football');
  const [chartType, setChartType] = useState('radar');
  const [timeRange, setTimeRange] = useState('month');

  useEffect(() => {
    fetchPlayerStats();
  }, [playerId]);

  const fetchPlayerStats = async () => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      // For now, using mock data
      const mockData = {
        _id: playerId,
        name: 'Alex Johnson',
        sports: ['football', 'basketball', 'tennis'],
        stats: {
          overall: {
            skills: [
              { name: 'Speed', value: 85, icon: <FaBolt />, color: '#4cc9f0' },
              { name: 'Strength', value: 75, icon: <FaFire />, color: '#f72585' },
              { name: 'Stamina', value: 80, icon: <FaHeart />, color: '#2ecc71' },
              { name: 'Technique', value: 90, icon: <FaBrain />, color: '#7209b7' },
              { name: 'Accuracy', value: 88, icon: <FaBullseye />, color: '#4361ee' },
              { name: 'Teamwork', value: 82, icon: <FaUsers />, color: '#f39c12' },
            ],
            performance: {
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              data: [65, 72, 80, 85, 88, 90, 92, 88, 85, 87, 90, 92]
            },
            matches: {
              total: 45,
              wins: 34,
              draws: 6,
              losses: 5,
              winRate: 75
            },
            achievements: {
              total: 18,
              recent: [
                { title: 'Tournament Winner', date: '2024-01-15', points: 50 },
                { title: 'Player of the Month', date: '2024-01-10', points: 30 },
                { title: 'Top Scorer', date: '2024-01-05', points: 25 }
              ]
            }
          },
          football: {
            stats: [
              { label: 'Goals', value: 28, avg: '0.62/match', trend: '+12%' },
              { label: 'Assists', value: 15, avg: '0.33/match', trend: '+8%' },
              { label: 'Pass Accuracy', value: '87%', avg: 'Top 15%', trend: '+3%' },
              { label: 'Tackles', value: 112, avg: '2.5/match', trend: '+5%' },
              { label: 'Shots on Target', value: '68%', avg: 'Top 20%', trend: '+4%' },
              { label: 'Distance Covered', value: '412km', avg: '9.2km/match', trend: '+6%' },
            ],
            positions: ['Forward', 'Midfielder'],
            preferredFoot: 'Right',
            jerseyNumber: 7,
            recentMatches: [
              { opponent: 'Team A', result: 'W', score: '3-1', goals: 2, assists: 1, rating: 8.5 },
              { opponent: 'Team B', result: 'W', score: '2-0', goals: 1, assists: 1, rating: 8.0 },
              { opponent: 'Team C', result: 'D', score: '1-1', goals: 0, assists: 1, rating: 7.0 },
              { opponent: 'Team D', result: 'W', score: '4-2', goals: 3, assists: 0, rating: 9.0 },
            ]
          },
          basketball: {
            stats: [
              { label: 'Points', value: 345, avg: '15.0/game', trend: '+8%' },
              { label: 'Assists', value: 128, avg: '5.6/game', trend: '+12%' },
              { label: 'Rebounds', value: 156, avg: '6.8/game', trend: '+5%' },
              { label: 'Steals', value: 45, avg: '2.0/game', trend: '+15%' },
              { label: 'Blocks', value: 28, avg: '1.2/game', trend: '+10%' },
              { label: '3PT %', value: '38%', avg: 'Above Avg', trend: '+2%' },
            ],
            positions: ['Point Guard', 'Shooting Guard'],
            preferredHand: 'Right',
            jerseyNumber: 23,
            recentGames: [
              { opponent: 'Team X', result: 'W', score: '95-88', points: 25, assists: 8, rebounds: 6, rating: 8.8 },
              { opponent: 'Team Y', result: 'L', score: '82-90', points: 18, assists: 5, rebounds: 4, rating: 7.2 },
              { opponent: 'Team Z', result: 'W', score: '101-95', points: 32, assists: 10, rebounds: 8, rating: 9.2 },
            ]
          },
          tennis: {
            stats: [
              { label: 'Aces', value: 45, avg: '3.2/match', trend: '+10%' },
              { label: 'Double Faults', value: 28, avg: '2.0/match', trend: '-5%' },
              { label: '1st Serve %', value: '65%', avg: 'Good', trend: '+3%' },
              { label: 'Winners', value: 120, avg: '8.6/match', trend: '+12%' },
              { label: 'Unforced Errors', value: 85, avg: '6.1/match', trend: '-8%' },
              { label: 'Break Points Saved', value: '72%', avg: 'Excellent', trend: '+4%' },
            ],
            positions: ['Singles', 'Doubles'],
            preferredHand: 'Right',
            recentMatches: [
              { opponent: 'Player A', result: 'W', score: '6-4, 6-3', aces: 5, winners: 18, rating: 8.5 },
              { opponent: 'Player B', result: 'L', score: '4-6, 7-6, 4-6', aces: 3, winners: 12, rating: 7.0 },
              { opponent: 'Player C', result: 'W', score: '6-2, 6-1', aces: 8, winners: 25, rating: 9.0 },
            ]
          }
        }
      };
      
      setPlayerData(mockData);
    } catch (error) {
      showError('Failed to load player statistics');
    } finally {
      setLoading(false);
    }
  };

  const sportOptions = [
    { id: 'football', label: 'Football', icon: <FaFutbol />, color: '#4361ee' },
    { id: 'basketball', label: 'Basketball', icon: <FaBasketballBall />, color: '#f72585' },
    { id: 'tennis', label: 'Tennis', icon: <FaTennisBall />, color: '#4cc9f0' },
    { id: 'swimming', label: 'Swimming', icon: <FaSwimmer />, color: '#7209b7' },
    { id: 'athletics', label: 'Athletics', icon: <FaRunning />, color: '#2ecc71' }
  ];

  const chartOptions = [
    { id: 'radar', label: 'Radar Chart', icon: <FaRadar /> },
    { id: 'bar', label: 'Bar Chart', icon: <FaChartBar /> },
    { id: 'line', label: 'Line Chart', icon: <FaLineChart /> },
    { id: 'doughnut', label: 'Doughnut Chart', icon: <FaPieChart /> }
  ];

  const timeRanges = [
    { id: 'week', label: 'Last Week' },
    { id: 'month', label: 'Last Month' },
    { id: 'quarter', label: 'Last Quarter' },
    { id: 'year', label: 'Last Year' },
    { id: 'all', label: 'All Time' }
  ];

  // Prepare data for charts
  const getRadarData = () => {
    if (!playerData || activeTab === 'sport') return null;
    
    const skills = playerData.stats.overall.skills;
    return {
      labels: skills.map(skill => skill.name),
      datasets: [
        {
          label: 'Player Skills',
          data: skills.map(skill => skill.value),
          backgroundColor: 'rgba(67, 97, 238, 0.2)',
          borderColor: 'rgba(67, 97, 238, 1)',
          borderWidth: 2,
          pointBackgroundColor: 'rgba(67, 97, 238, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(67, 97, 238, 1)'
        },
        {
          label: 'League Average',
          data: [70, 65, 75, 80, 78, 72],
          backgroundColor: 'rgba(155, 155, 155, 0.2)',
          borderColor: 'rgba(155, 155, 155, 1)',
          borderWidth: 1,
          borderDash: [5, 5]
        }
      ]
    };
  };

  const getBarData = () => {
    if (!playerData) return null;
    
    if (activeTab === 'overall') {
      const performance = playerData.stats.overall.performance;
      return {
        labels: performance.labels.slice(0, 6), // Last 6 months
        datasets: [
          {
            label: 'Performance Score',
            data: performance.data.slice(0, 6),
            backgroundColor: 'rgba(67, 97, 238, 0.7)',
            borderColor: 'rgba(67, 97, 238, 1)',
            borderWidth: 1,
            borderRadius: 6,
          }
        ]
      };
    } else {
      const sportStats = playerData.stats[selectedSport];
      if (!sportStats) return null;
      
      return {
        labels: sportStats.stats.map(stat => stat.label),
        datasets: [
          {
            label: 'Current Stats',
            data: sportStats.stats.map(stat => {
              const numValue = parseFloat(stat.value);
              return isNaN(numValue) ? 0 : numValue;
            }),
            backgroundColor: sportOptions.find(s => s.id === selectedSport)?.color + '80',
            borderColor: sportOptions.find(s => s.id === selectedSport)?.color,
            borderWidth: 1,
            borderRadius: 4,
          }
        ]
      };
    }
  };

  const getLineData = () => {
    if (!playerData) return null;
    
    const performance = playerData.stats.overall.performance;
    return {
      labels: performance.labels,
      datasets: [
        {
          label: 'Performance Trend',
          data: performance.data,
          borderColor: 'rgba(67, 97, 238, 1)',
          backgroundColor: 'rgba(67, 97, 238, 0.1)',
          borderWidth: 3,
          tension: 0.4,
          fill: true,
          pointBackgroundColor: 'rgba(67, 97, 238, 1)',
          pointBorderColor: '#fff',
          pointRadius: 5,
          pointHoverRadius: 8
        }
      ]
    };
  };

  const getDoughnutData = () => {
    if (!playerData || activeTab === 'sport') return null;
    
    const matches = playerData.stats.overall.matches;
    return {
      labels: ['Wins', 'Draws', 'Losses'],
      datasets: [
        {
          data: [matches.wins, matches.draws, matches.losses],
          backgroundColor: [
            'rgba(46, 204, 113, 0.8)',
            'rgba(243, 156, 18, 0.8)',
            'rgba(231, 76, 60, 0.8)'
          ],
          borderColor: [
            'rgb(46, 204, 113)',
            'rgb(243, 156, 18)',
            'rgb(231, 76, 60)'
          ],
          borderWidth: 2,
        }
      ]
    };
  };

  const getCurrentChartData = () => {
    switch (chartType) {
      case 'radar': return getRadarData();
      case 'bar': return getBarData();
      case 'line': return getLineData();
      case 'doughnut': return getDoughnutData();
      default: return getRadarData();
    }
  };

  const getChartOptions = () => {
    const baseOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 12
            },
            padding: 20
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          titleFont: {
            size: 14
          },
          bodyFont: {
            size: 13
          },
          padding: 12,
          cornerRadius: 6
        }
      }
    };

    if (chartType === 'radar') {
      return {
        ...baseOptions,
        scales: {
          r: {
            angleLines: {
              display: true,
              color: 'rgba(0, 0, 0, 0.1)'
            },
            suggestedMin: 0,
            suggestedMax: 100,
            ticks: {
              stepSize: 20,
              backdropColor: 'transparent'
            },
            pointLabels: {
              font: {
                size: 11,
                weight: '600'
              },
              color: '#2c3e50'
            }
          }
        }
      };
    }

    if (chartType === 'bar' || chartType === 'line') {
      return {
        ...baseOptions,
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.05)'
            },
            ticks: {
              font: {
                size: 11
              }
            }
          },
          x: {
            grid: {
              display: false
            },
            ticks: {
              font: {
                size: 11
              }
            }
          }
        }
      };
    }

    return baseOptions;
  };

  const renderOverallStats = () => {
    if (!playerData) return null;
    
    const { skills, matches, achievements } = playerData.stats.overall;

    return (
      <div className="overall-stats-section">
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className="skill-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className="skill-icon"
                style={{ color: skill.color }}
              >
                {skill.icon}
              </div>
              <div className="skill-content">
                <div className="skill-header">
                  <h4>{skill.name}</h4>
                  <span className="skill-value">{skill.value}/100</span>
                </div>
                <div className="skill-bar">
                  <div 
                    className="skill-progress"
                    style={{ 
                      width: `${skill.value}%`,
                      backgroundColor: skill.color
                    }}
                  />
                </div>
                <div className="skill-trend">
                  <span className={`trend ${skill.value > 80 ? 'up' : skill.value < 60 ? 'down' : 'neutral'}`}>
                    {skill.value > 80 ? 'Excellent' : skill.value < 60 ? 'Needs Work' : 'Good'}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="stats-summary">
          <div className="summary-card">
            <div className="summary-icon trophy">
              <FaTrophy />
            </div>
            <div className="summary-content">
              <h3>{matches.wins}</h3>
              <p>Wins</p>
              <span className="win-rate">{matches.winRate}% Win Rate</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon matches">
              <FaCalendarAlt />
            </div>
            <div className="summary-content">
              <h3>{matches.total}</h3>
              <p>Total Matches</p>
              <span className="match-stats">
                {matches.draws} Draws • {matches.losses} Losses
              </span>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon achievements">
              <FaMedal />
            </div>
            <div className="summary-content">
              <h3>{achievements.total}</h3>
              <p>Achievements</p>
              <span className="recent-achievements">
                {achievements.recent.length} Recent
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSportStats = () => {
    if (!playerData || !playerData.stats[selectedSport]) return null;
    
    const sportStats = playerData.stats[selectedSport];
    const sportInfo = sportOptions.find(s => s.id === selectedSport);

    return (
      <div className="sport-stats-section">
        <div className="sport-header">
          <div 
            className="sport-icon-large"
            style={{ backgroundColor: sportInfo?.color }}
          >
            {sportInfo?.icon}
          </div>
          <div className="sport-info">
            <h3>{sportInfo?.label} Statistics</h3>
            <div className="sport-meta">
              {sportStats.positions && (
                <span className="positions">
                  Positions: {sportStats.positions.join(', ')}
                </span>
              )}
              {sportStats.preferredFoot && (
                <span className="preferred-foot">
                  Preferred Foot: {sportStats.preferredFoot}
                </span>
              )}
              {sportStats.preferredHand && (
                <span className="preferred-hand">
                  Preferred Hand: {sportStats.preferredHand}
                </span>
              )}
              {sportStats.jerseyNumber && (
                <span className="jersey-number">
                  Jersey: #{sportStats.jerseyNumber}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="sport-stats-grid">
          {sportStats.stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="stat-item-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="stat-header">
                <h4>{stat.label}</h4>
                <span className={`trend ${stat.trend?.startsWith('+') ? 'up' : 'down'}`}>
                  {stat.trend}
                </span>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-average">{stat.avg}</div>
              {typeof stat.value === 'number' && (
                <div className="stat-bar">
                  <div 
                    className="bar-fill"
                    style={{ 
                      width: `${Math.min((stat.value / 100) * 100, 100)}%`,
                      backgroundColor: sportInfo?.color
                    }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {sportStats.recentMatches && (
          <div className="recent-matches">
            <h4>Recent Matches</h4>
            <div className="matches-list">
              {sportStats.recentMatches.map((match, index) => (
                <div key={index} className="match-item">
                  <div className="match-info">
                    <div className={`match-result ${match.result.toLowerCase()}`}>
                      {match.result}
                    </div>
                    <div className="match-details">
                      <div className="match-teams">
                        <span className="team-name">vs {match.opponent}</span>
                        <span className="match-score">{match.score}</span>
                      </div>
                      <div className="match-stats">
                        {match.goals !== undefined && <span>⚽ {match.goals} Goals</span>}
                        {match.assists !== undefined && <span>🎯 {match.assists} Assists</span>}
                        {match.points !== undefined && <span>🏀 {match.points} Points</span>}
                        {match.rebounds !== undefined && <span>📊 {match.rebounds} Rebounds</span>}
                        {match.aces !== undefined && <span>🎾 {match.aces} Aces</span>}
                        {match.winners !== undefined && <span>🌟 {match.winners} Winners</span>}
                      </div>
                    </div>
                  </div>
                  <div className="match-rating">
                    <div className="rating-circle">
                      {match.rating}
                    </div>
                    <span>Rating</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const handleExportData = () => {
    // Implement export functionality
    console.log('Exporting stats data...');
  };

  const handleShareStats = () => {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: `${playerData?.name}'s Statistics`,
        text: `Check out ${playerData?.name}'s performance statistics!`,
        url: window.location.href
      });
    }
  };

  if (loading) {
    return <LoadingSpinner size="large" text="Loading statistics..." />;
  }

  if (!playerData) {
    return (
      <div className="no-stats">
        <div className="empty-state">
          <div className="empty-icon">📊</div>
          <h3>No Statistics Available</h3>
          <p>Player statistics are not available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="player-stats-container">
      <div className="stats-header">
        <div className="header-content">
          <h2>Player Statistics</h2>
          <p>Detailed performance analysis and metrics</p>
        </div>
        
        <div className="header-actions">
          <button className="action-btn export" onClick={handleExportData}>
            <FaDownload /> Export
          </button>
          <button className="action-btn share" onClick={handleShareStats}>
            <FaShare /> Share
          </button>
        </div>
      </div>

      <div className="stats-navigation">
        <div className="stats-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overall' ? 'active' : ''}`}
            onClick={() => setActiveTab('overall')}
          >
            <FaChartLine /> Overall Stats
          </button>
          <button 
            className={`tab-btn ${activeTab === 'sport' ? 'active' : ''}`}
            onClick={() => setActiveTab('sport')}
          >
            <FaFutbol /> Sport Specific
          </button>
        </div>

        <div className="stats-controls">
          {activeTab === 'sport' && (
            <div className="sport-selector">
              <FaFilter />
              {sportOptions
                .filter(sport => playerData.sports.includes(sport.id))
                .map(sport => (
                  <button
                    key={sport.id}
                    className={`sport-btn ${selectedSport === sport.id ? 'active' : ''}`}
                    onClick={() => setSelectedSport(sport.id)}
                    style={{
                      borderColor: sport.color,
                      color: selectedSport === sport.id ? 'white' : sport.color,
                      backgroundColor: selectedSport === sport.id ? sport.color : 'transparent'
                    }}
                  >
                    {sport.icon}
                    {sport.label}
                  </button>
                ))
              }
            </div>
          )}

          <div className="chart-controls">
            <div className="chart-type-selector">
              {chartOptions.map(chart => (
                <button
                  key={chart.id}
                  className={`chart-type-btn ${chartType === chart.id ? 'active' : ''}`}
                  onClick={() => setChartType(chart.id)}
                >
                  {chart.icon}
                  <span>{chart.label}</span>
                </button>
              ))}
            </div>

            <div className="time-range-selector">
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="time-select"
              >
                {timeRanges.map(range => (
                  <option key={range.id} value={range.id}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="stats-content">
        {/* Chart Section */}
        <div className="chart-section">
          <div className="chart-container">
            <div className="chart-header">
              <h3>
                {activeTab === 'overall' ? 'Performance Overview' : `${sportOptions.find(s => s.id === selectedSport)?.label} Statistics`}
              </h3>
              <p>Visual representation of performance metrics</p>
            </div>
            <div className="chart-wrapper">
              {chartType === 'radar' && getRadarData() && (
                <Radar data={getRadarData()} options={getChartOptions()} />
              )}
              {chartType === 'bar' && getBarData() && (
                <Bar data={getBarData()} options={getChartOptions()} />
              )}
              {chartType === 'line' && getLineData() && (
                <Line data={getLineData()} options={getChartOptions()} />
              )}
              {chartType === 'doughnut' && getDoughnutData() && (
                <Doughnut data={getDoughnutData()} options={getChartOptions()} />
              )}
            </div>
            <div className="chart-footer">
              <div className="chart-legend">
                {chartType === 'radar' && (
                  <>
                    <div className="legend-item">
                      <div className="legend-color player"></div>
                      <span>Player Skills</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color average"></div>
                      <span>League Average</span>
                    </div>
                  </>
                )}
                {chartType === 'doughnut' && (
                  <>
                    <div className="legend-item">
                      <div className="legend-color win"></div>
                      <span>Wins</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color draw"></div>
                      <span>Draws</span>
                    </div>
                    <div className="legend-item">
                      <div className="legend-color loss"></div>
                      <span>Losses</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats Details Section */}
        <div className="stats-details-section">
          {activeTab === 'overall' ? renderOverallStats() : renderSportStats()}
        </div>

        {/* Insights Section */}
        <div className="insights-section">
          <h3>Performance Insights</h3>
          <div className="insights-grid">
            <div className="insight-card">
              <div className="insight-icon positive">
                <FaStar />
              </div>
              <div className="insight-content">
                <h4>Top Strength</h4>
                <p>Your technique score of 90 is in the top 10% of players</p>
              </div>
            </div>
            <div className="insight-card">
              <div className="insight-icon warning">
                <FaFire />
              </div>
              <div className="insight-content">
                <h4>Area for Improvement</h4>
                <p>Consider strength training to improve your 75 strength score</p>
              </div>
            </div>
            <div className="insight-card">
              <div className="insight-icon trend">
                <FaChartLine />
              </div>
              <div className="insight-content">
                <h4>Positive Trend</h4>
                <p>Performance has improved by 15% over the last 3 months</p>
              </div>
            </div>
            <div className="insight-card">
              <div className="insight-icon achievement">
                <FaAward />
              </div>
              <div className="insight-content">
                <h4>Achievement Milestone</h4>
                <p>You're 2 achievements away from reaching the next level</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerStats;