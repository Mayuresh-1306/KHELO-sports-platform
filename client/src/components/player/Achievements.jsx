import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FaTrophy, 
  FaMedal, 
  FaAward, 
  FaStar, 
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPlus,
  FaEdit,
  FaTrash,
  FaFilter,
  FaSortAmountDown,
  FaSortAmountUp
} from 'react-icons/fa';
import { format } from 'date-fns';
import { playerService } from '../../services/playerService';
import { showSuccess, showError } from '../common/Toast';
import '../../styles/components/achievements.css';

const Achievements = ({ playerId, isEditable = false }) => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'tournament',
    level: 'local',
    date: '',
    location: '',
    award: 'gold',
    points: 0,
    evidence: ''
  });

  useEffect(() => {
    fetchAchievements();
  }, [playerId]);

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const data = await playerService.getAchievements(playerId);
      setAchievements(data);
    } catch (error) {
      showError('Failed to load achievements');
    } finally {
      setLoading(false);
    }
  };

  const achievementTypes = [
    { id: 'tournament', label: 'Tournament', icon: <FaTrophy />, color: '#f39c12' },
    { id: 'league', label: 'League', icon: <FaMedal />, color: '#3498db' },
    { id: 'award', label: 'Award', icon: <FaAward />, color: '#9b59b6' },
    { id: 'milestone', label: 'Milestone', icon: <FaStar />, color: '#2ecc71' }
  ];

  const achievementLevels = [
    { id: 'local', label: 'Local', color: '#95a5a6' },
    { id: 'regional', label: 'Regional', color: '#3498db' },
    { id: 'national', label: 'National', color: '#2ecc71' },
    { id: 'international', label: 'International', color: '#e74c3c' }
  ];

  const awards = [
    { id: 'gold', label: 'Gold', color: '#f39c12' },
    { id: 'silver', label: 'Silver', color: '#95a5a6' },
    { id: 'bronze', label: 'Bronze', color: '#d35400' },
    { id: 'participation', label: 'Participation', color: '#3498db' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await playerService.updateAchievement(editingId, formData);
        showSuccess('Achievement updated successfully!');
      } else {
        await playerService.addAchievement(playerId, formData);
        showSuccess('Achievement added successfully!');
      }
      fetchAchievements();
      resetForm();
    } catch (error) {
      showError(error.message || 'Failed to save achievement');
    }
  };

  const handleEdit = (achievement) => {
    setFormData(achievement);
    setEditingId(achievement._id);
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      try {
        await playerService.deleteAchievement(id);
        showSuccess('Achievement deleted successfully!');
        fetchAchievements();
      } catch (error) {
        showError('Failed to delete achievement');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'tournament',
      level: 'local',
      date: '',
      location: '',
      award: 'gold',
      points: 0,
      evidence: ''
    });
    setEditingId(null);
    setShowAddForm(false);
  };

  const filteredAchievements = achievements.filter(achievement => {
    if (filter === 'all') return true;
    return achievement.type === filter;
  });

  const sortedAchievements = [...filteredAchievements].sort((a, b) => {
    const multiplier = sortOrder === 'desc' ? -1 : 1;
    
    switch (sortBy) {
      case 'date':
        return multiplier * (new Date(b.date) - new Date(a.date));
      case 'points':
        return multiplier * (b.points - a.points);
      case 'level':
        const levelOrder = { international: 4, national: 3, regional: 2, local: 1 };
        return multiplier * (levelOrder[b.level] - levelOrder[a.level]);
      default:
        return 0;
    }
  });

  const getIconForType = (type) => {
    const found = achievementTypes.find(t => t.id === type);
    return found ? found.icon : <FaTrophy />;
  };

  const getColorForType = (type) => {
    const found = achievementTypes.find(t => t.id === type);
    return found ? found.color : '#f39c12';
  };

  const getLevelBadge = (level) => {
    const found = achievementLevels.find(l => l.id === level);
    return (
      <span 
        className="level-badge"
        style={{ backgroundColor: found?.color || '#95a5a6' }}
      >
        {found?.label || 'Local'}
      </span>
    );
  };

  const getAwardBadge = (award) => {
    const found = awards.find(a => a.id === award);
    return (
      <span 
        className="award-badge"
        style={{ 
          backgroundColor: found?.color || '#f39c12',
          color: award === 'gold' ? '#fff' : '#2c3e50'
        }}
      >
        {found?.label || 'Gold'}
      </span>
    );
  };

  const totalPoints = achievements.reduce((sum, achievement) => sum + (achievement.points || 0), 0);

  return (
    <div className="achievements-container">
      <div className="achievements-header">
        <div>
          <h2>Achievements & Awards</h2>
          <p>Track your accomplishments and milestones</p>
        </div>
        
        <div className="achievements-stats">
          <div className="stat-card">
            <div className="stat-icon trophy">
              <FaTrophy />
            </div>
            <div className="stat-content">
              <h3>{achievements.length}</h3>
              <p>Total Achievements</p>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon points">
              <FaStar />
            </div>
            <div className="stat-content">
              <h3>{totalPoints}</h3>
              <p>Total Points</p>
            </div>
          </div>
        </div>
      </div>

      {isEditable && (
        <div className="achievements-actions">
          <button 
            className="add-achievement-btn"
            onClick={() => setShowAddForm(true)}
          >
            <FaPlus /> Add Achievement
          </button>

          <div className="filter-sort-controls">
            <div className="filter-group">
              <FaFilter />
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Types</option>
                {achievementTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.label}</option>
                ))}
              </select>
            </div>

            <div className="sort-group">
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="date">Sort by Date</option>
                <option value="points">Sort by Points</option>
                <option value="level">Sort by Level</option>
              </select>
              <button 
                className="sort-order-btn"
                onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              >
                {sortOrder === 'desc' ? <FaSortAmountDown /> : <FaSortAmountUp />}
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddForm && (
        <motion.div 
          className="add-achievement-form"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="form-header">
            <h3>{editingId ? 'Edit Achievement' : 'Add New Achievement'}</h3>
            <button className="close-form" onClick={resetForm}>×</button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Title *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Enter achievement title"
                  required
                />
              </div>

              <div className="form-group">
                <label>Type *</label>
                <select 
                  value={formData.type}
                  onChange={(e) => setFormData({...formData, type: e.target.value})}
                  required
                >
                  {achievementTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Level *</label>
                <select 
                  value={formData.level}
                  onChange={(e) => setFormData({...formData, level: e.target.value})}
                  required
                >
                  {achievementLevels.map(level => (
                    <option key={level.id} value={level.id}>{level.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Award *</label>
                <select 
                  value={formData.award}
                  onChange={(e) => setFormData({...formData, award: e.target.value})}
                  required
                >
                  {awards.map(award => (
                    <option key={award.id} value={award.id}>{award.label}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Date *</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  required
                />
              </div>

              <div className="form-group">
                <label>Points</label>
                <input
                  type="number"
                  value={formData.points}
                  onChange={(e) => setFormData({...formData, points: parseInt(e.target.value) || 0})}
                  placeholder="Points earned"
                  min="0"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="Describe the achievement..."
                rows="3"
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                placeholder="Where did it happen?"
              />
            </div>

            <div className="form-group">
              <label>Evidence URL</label>
              <input
                type="url"
                value={formData.evidence}
                onChange={(e) => setFormData({...formData, evidence: e.target.value})}
                placeholder="Link to certificate, photo, etc."
              />
            </div>

            <div className="form-actions">
              <button type="button" onClick={resetForm} className="cancel-btn">
                Cancel
              </button>
              <button type="submit" className="submit-btn">
                {editingId ? 'Update' : 'Add'} Achievement
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {loading ? (
        <div className="loading-state">Loading achievements...</div>
      ) : sortedAchievements.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🏆</div>
          <h3>No achievements yet</h3>
          <p>Start adding your achievements to showcase your success!</p>
          {isEditable && (
            <button 
              className="add-first-btn"
              onClick={() => setShowAddForm(true)}
            >
              <FaPlus /> Add Your First Achievement
            </button>
          )}
        </div>
      ) : (
        <div className="achievements-grid">
          {sortedAchievements.map((achievement, index) => (
            <motion.div 
              key={achievement._id}
              className="achievement-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div 
                className="achievement-icon"
                style={{ color: getColorForType(achievement.type) }}
              >
                {getIconForType(achievement.type)}
              </div>

              <div className="achievement-content">
                <div className="achievement-header">
                  <h3>{achievement.title}</h3>
                  {isEditable && (
                    <div className="achievement-actions">
                      <button 
                        className="edit-btn"
                        onClick={() => handleEdit(achievement)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="delete-btn"
                        onClick={() => handleDelete(achievement._id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </div>

                <p className="achievement-description">{achievement.description}</p>

                <div className="achievement-meta">
                  <span className="meta-item">
                    <FaCalendarAlt /> {format(new Date(achievement.date), 'MMM dd, yyyy')}
                  </span>
                  {achievement.location && (
                    <span className="meta-item">
                      <FaMapMarkerAlt /> {achievement.location}
                    </span>
                  )}
                  <span className="meta-item points">
                    <FaStar /> {achievement.points || 0} points
                  </span>
                </div>

                <div className="achievement-tags">
                  {getLevelBadge(achievement.level)}
                  {getAwardBadge(achievement.award)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {sortedAchievements.length > 0 && (
        <div className="achievements-summary">
          <h3>Summary</h3>
          <div className="summary-grid">
            {achievementTypes.map(type => {
              const count = achievements.filter(a => a.type === type.id).length;
              const points = achievements
                .filter(a => a.type === type.id)
                .reduce((sum, a) => sum + (a.points || 0), 0);
              
              return count > 0 && (
                <div key={type.id} className="summary-item">
                  <div 
                    className="summary-icon"
                    style={{ backgroundColor: type.color }}
                  >
                    {type.icon}
                  </div>
                  <div className="summary-content">
                    <h4>{type.label}</h4>
                    <p>{count} achievements • {points} points</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default Achievements;