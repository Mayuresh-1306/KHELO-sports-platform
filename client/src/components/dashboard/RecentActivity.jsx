import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTrophy, 
  FaMedal, 
  FaUserFriends, 
  FaChartLine, 
  FaCalendarAlt,
  FaArrowUp,
  FaRegClock
} from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import "../../styles/components/recentActivity.css";

const RecentActivity = () => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      type: 'achievement',
      title: 'Won Tournament Championship',
      description: 'First place in Regional Football Tournament',
      icon: <FaTrophy />,
      color: '#f39c12',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      value: '+50 pts'
    },
    {
      id: 2,
      type: 'match',
      title: 'New Match Record',
      description: 'Scored 3 goals in a single match',
      icon: <FaMedal />,
      color: '#2ecc71',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      value: '+25 pts'
    },
    {
      id: 3,
      type: 'connection',
      title: 'Team Invitation',
      description: 'Invited to join "Elite Warriors" team',
      icon: <FaUserFriends />,
      color: '#3498db',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      value: 'Pending'
    },
    {
      id: 4,
      type: 'stats',
      title: 'Skill Improved',
      description: 'Speed rating increased from 85 to 88',
      icon: <FaChartLine />,
      color: '#9b59b6',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      value: '+3 pts'
    },
    {
      id: 5,
      type: 'event',
      title: 'Upcoming Match',
      description: 'Championship Finals next weekend',
      icon: <FaCalendarAlt />,
      color: '#e74c3c',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      value: 'Soon'
    }
  ]);

  const [filter, setFilter] = useState('all');

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.type === filter);

  const getActivityTypeCount = (type) => {
    return activities.filter(activity => activity.type === type).length;
  };

  const activityTypes = [
    { id: 'all', label: 'All', count: activities.length, color: '#4361ee' },
    { id: 'achievement', label: 'Achievements', count: getActivityTypeCount('achievement'), color: '#f39c12' },
    { id: 'match', label: 'Matches', count: getActivityTypeCount('match'), color: '#2ecc71' },
    { id: 'connection', label: 'Connections', count: getActivityTypeCount('connection'), color: '#3498db' },
    { id: 'stats', label: 'Stats', count: getActivityTypeCount('stats'), color: '#9b59b6' },
    { id: 'event', label: 'Events', count: getActivityTypeCount('event'), color: '#e74c3c' }
  ];

  return (
    <div className="recent-activity">
      <div className="activity-header">
        <div>
          <h2>Recent Activity</h2>
          <p>Your latest updates and achievements</p>
        </div>
        <div className="activity-stats">
          <div className="stat-item">
            <FaRegClock />
            <span>{activities.length} Activities</span>
          </div>
          <div className="stat-item">
            <FaArrowUp />
            <span>+125 Points this week</span>
          </div>
        </div>
      </div>

      <div className="activity-filters">
        {activityTypes.map((type) => (
          <button
            key={type.id}
            className={`filter-btn ${filter === type.id ? 'active' : ''}`}
            onClick={() => setFilter(type.id)}
            style={{
              borderColor: type.color,
              color: filter === type.id ? 'white' : type.color,
              backgroundColor: filter === type.id ? type.color : 'transparent'
            }}
          >
            {type.label}
            <span className="filter-count">{type.count}</span>
          </button>
        ))}
      </div>

      <div className="activity-list">
        {filteredActivities.map((activity, index) => (
          <motion.div
            key={activity.id}
            className="activity-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div 
              className="activity-icon"
              style={{ backgroundColor: `${activity.color}20`, color: activity.color }}
            >
              {activity.icon}
            </div>
            <div className="activity-content">
              <div className="activity-header-row">
                <h3 className="activity-title">{activity.title}</h3>
                <span className="activity-value">{activity.value}</span>
              </div>
              <p className="activity-description">{activity.description}</p>
              <div className="activity-footer">
                <span className="activity-time">
                  {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
                </span>
                <span 
                  className="activity-type"
                  style={{ color: activity.color }}
                >
                  {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="no-activities">
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <h3>No activities found</h3>
            <p>No activities match your current filter</p>
          </div>
        </div>
      )}

      <div className="activity-footer">
        <button className="view-all-btn">
          View All Activities
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;