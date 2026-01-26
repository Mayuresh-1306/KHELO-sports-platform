// client/src/pages/AchievementsPage.jsx
import React, { useState } from 'react';
import { FaTrophy, FaMedal, FaAward, FaStar, FaPlus, FaFilter, FaImage, FaTimes } from 'react-icons/fa';
import ImageUpload from '../components/common/ImageUpload';
import ImagePreview from '../components/common/ImagePreview';
import "../styles/pages/achievements.css";

const AchievementsPage = () => {
  const [achievements, setAchievements] = useState([
    { id: 1, title: 'Top Scorer 2024', sport: 'Football', date: '2024-12-01', type: 'gold', description: 'Scored most goals in the season', certificate: null },
    { id: 2, title: 'Player of the Month', sport: 'Football', date: '2024-11-01', type: 'silver', description: 'Awarded best player of November', certificate: null },
    { id: 3, title: 'MVP Tournament', sport: 'Basketball', date: '2024-10-15', type: 'gold', description: 'Most Valuable Player in Regional Tournament', certificate: null },
    { id: 4, title: 'Best Defender', sport: 'Football', date: '2024-09-20', type: 'bronze', description: 'Awarded best defensive player', certificate: null },
    { id: 5, title: 'Sportsmanship Award', sport: 'Tennis', date: '2024-08-10', type: 'silver', description: 'Award for fair play and sportsmanship', certificate: null },
    { id: 6, title: 'Fastest Runner', sport: 'Athletics', date: '2024-07-05', type: 'gold', description: 'Won 100m dash championship', certificate: null },
  ]);
  const [filter, setFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'gallery'
  const [showAddForm, setShowAddForm] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [previewAlt, setPreviewAlt] = useState('');
  const [newAchievement, setNewAchievement] = useState({
    title: '',
    sport: '',
    date: '',
    type: 'bronze',
    description: '',
    certificate: null
  });

  const sports = ['Football', 'Basketball', 'Tennis', 'Cricket', 'Swimming', 'Athletics'];

  const filteredAchievements = filter === 'all'
    ? achievements
    : achievements.filter(ach => ach.type === filter);

  const getAchievementIcon = (type) => {
    switch (type) {
      case 'gold': return <FaTrophy className="trophy gold" />;
      case 'silver': return <FaMedal className="trophy silver" />;
      case 'bronze': return <FaAward className="trophy bronze" />;
      default: return <FaStar className="trophy" />;
    }
  };

  const handleAddAchievement = (e) => {
    e.preventDefault();
    const newAch = {
      id: achievements.length + 1,
      ...newAchievement
    };
    setAchievements([newAch, ...achievements]);
    setNewAchievement({ title: '', sport: '', date: '', type: 'bronze', description: '', certificate: null });
    setShowAddForm(false);
  };

  const handleDeleteAchievement = (id) => {
    if (window.confirm('Are you sure you want to delete this achievement?')) {
      setAchievements(achievements.filter(ach => ach.id !== id));
    }
  };

  const handleCertificateUpload = (file, preview) => {
    setNewAchievement({ ...newAchievement, certificate: preview });
  };

  const handleAddCertificateToExisting = (id, file, preview) => {
    setAchievements(achievements.map(ach =>
      ach.id === id ? { ...ach, certificate: preview } : ach
    ));
  };

  const handleImagePreview = (image, title) => {
    setPreviewImage(image);
    setPreviewAlt(title);
  };

  return (
    <div className="achievements-page">
      <div className="page-header">
        <div className="header-content">
          <h1>Achievements</h1>
          <p>Track and manage player achievements across all sports</p>
        </div>
        <div className="header-actions">
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Grid View"
            >
              Grid
            </button>
            <button
              className={`toggle-btn ${viewMode === 'gallery' ? 'active' : ''}`}
              onClick={() => setViewMode('gallery')}
              title="Gallery View"
            >
              Gallery
            </button>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-primary"
          >
            <FaPlus /> Add Achievement
          </button>
        </div>
      </div>

      {/* Add Achievement Form */}
      {showAddForm && (
        <div className="add-achievement-modal animate-fadeIn">
          <div className="modal-backdrop" onClick={() => setShowAddForm(false)}></div>
          <div className="modal-content animate-scaleIn">
            <div className="form-header">
              <h3>Add New Achievement</h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="close-form"
              >
                ×
              </button>
            </div>
            <form onSubmit={handleAddAchievement}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Title *</label>
                  <input
                    type="text"
                    value={newAchievement.title}
                    onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                    required
                    placeholder="e.g., Top Scorer 2024"
                  />
                </div>
                <div className="form-group">
                  <label>Sport *</label>
                  <select
                    value={newAchievement.sport}
                    onChange={(e) => setNewAchievement({ ...newAchievement, sport: e.target.value })}
                    required
                  >
                    <option value="">Select Sport</option>
                    {sports.map(sport => (
                      <option key={sport} value={sport}>{sport}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label>Date *</label>
                  <input
                    type="date"
                    value={newAchievement.date}
                    onChange={(e) => setNewAchievement({ ...newAchievement, date: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Award Type</label>
                  <select
                    value={newAchievement.type}
                    onChange={(e) => setNewAchievement({ ...newAchievement, type: e.target.value })}
                  >
                    <option value="gold">Gold Trophy</option>
                    <option value="silver">Silver Medal</option>
                    <option value="bronze">Bronze Award</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newAchievement.description}
                  onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                  rows="3"
                  placeholder="Describe the achievement..."
                />
              </div>
              <div className="form-group">
                <ImageUpload
                  label="Certificate / Achievement Image (Optional)"
                  onImageSelect={handleCertificateUpload}
                  currentImage={newAchievement.certificate}
                  maxSize={5}
                />
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Add Achievement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="filter-bar animate-fadeInDown">
        <div className="filter-options">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            <FaFilter /> All
          </button>
          <button
            className={`filter-btn ${filter === 'gold' ? 'active' : ''}`}
            onClick={() => setFilter('gold')}
          >
            <FaTrophy /> Gold
          </button>
          <button
            className={`filter-btn ${filter === 'silver' ? 'active' : ''}`}
            onClick={() => setFilter('silver')}
          >
            <FaMedal /> Silver
          </button>
          <button
            className={`filter-btn ${filter === 'bronze' ? 'active' : ''}`}
            onClick={() => setFilter('bronze')}
          >
            <FaAward /> Bronze
          </button>
        </div>
        <div className="stats-summary">
          <span className="stat badge-primary">
            <FaTrophy className="gold" /> {achievements.filter(a => a.type === 'gold').length}
          </span>
          <span className="stat badge-primary">
            <FaMedal className="silver" /> {achievements.filter(a => a.type === 'silver').length}
          </span>
          <span className="stat badge-primary">
            <FaAward className="bronze" /> {achievements.filter(a => a.type === 'bronze').length}
          </span>
        </div>
      </div>

      {/* Achievements Display */}
      {filteredAchievements.length > 0 ? (
        <div className={`achievements-${viewMode} animate-fadeInUp`}>
          {filteredAchievements.map((achievement, index) => (
            <div
              key={achievement.id}
              className={`achievement-card card-hover hover-shine`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="achievement-header">
                <div className="trophy-container">
                  {getAchievementIcon(achievement.type)}
                </div>
                <div className="achievement-info">
                  <h3>{achievement.title}</h3>
                  <div className="achievement-meta">
                    <span className="sport-badge badge-primary">{achievement.sport}</span>
                    <span className="date">{achievement.date}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteAchievement(achievement.id)}
                  className="delete-btn"
                  title="Delete"
                >
                  <FaTimes />
                </button>
              </div>
              <p className="achievement-description">{achievement.description}</p>

              {/* Certificate Section */}
              {achievement.certificate ? (
                <div className="certificate-preview">
                  <img
                    src={achievement.certificate}
                    alt={achievement.title}
                    onClick={() => handleImagePreview(achievement.certificate, achievement.title)}
                    className="certificate-thumbnail"
                  />
                  <button
                    className="view-certificate-btn btn-small btn-outline"
                    onClick={() => handleImagePreview(achievement.certificate, achievement.title)}
                  >
                    <FaImage /> View Certificate
                  </button>
                </div>
              ) : (
                <div className="add-certificate-section">
                  <ImageUpload
                    label=""
                    onImageSelect={(file, preview) => handleAddCertificateToExisting(achievement.id, file, preview)}
                    currentImage={null}
                    maxSize={5}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state animate-scaleIn">
          <FaTrophy size={64} />
          <h3>No achievements found</h3>
          <p>Add your first achievement or try a different filter</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-primary"
          >
            <FaPlus /> Add Achievement
          </button>
        </div>
      )}

      {/* Summary Section */}
      <div className="achievements-summary animate-fadeInUp">
        <div className="summary-card card glass">
          <h3>Total Achievements</h3>
          <p className="total-count text-gradient">{achievements.length}</p>
          <p className="text-muted">Across all sports</p>
        </div>
        <div className="summary-card card glass">
          <h3>Most Achieved Sport</h3>
          <p className="sport-name text-gradient">Football</p>
          <p className="text-muted">{achievements.filter(a => a.sport === 'Football').length} achievements</p>
        </div>
        <div className="summary-card card glass">
          <h3>Recent Achievement</h3>
          <p className="recent-title text-gradient">Top Scorer 2024</p>
          <p className="text-muted">Football • 2024-12-01</p>
        </div>
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <ImagePreview
          image={previewImage}
          alt={previewAlt}
          onClose={() => setPreviewImage(null)}
        />
      )}
    </div>
  );
};

export default AchievementsPage;
