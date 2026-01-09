// client/src/pages/EditProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaSave, FaTrash, FaArrowLeft } from 'react-icons/fa';
import "../styles/pages/editProfile.css";

const EditProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    sport: '',
    position: '',
    height: '',
    weight: '',
    nationality: '',
    team: '',
    bio: '',
    skills: []
  });

  useEffect(() => {
    fetchProfileData();
  }, [id]);

  const fetchProfileData = async () => {
    // Mock data - in real app, fetch from API
    setTimeout(() => {
      setFormData({
        name: 'Alex Johnson',
        age: '24',
        sport: 'Football',
        position: 'Forward',
        height: "6'2\"",
        weight: '185 lbs',
        nationality: 'USA',
        team: 'Red Devils FC',
        bio: 'Versatile forward with excellent ball control and scoring ability. Strong team player with leadership qualities.',
        skills: ['Speed', 'Shooting', 'Dribbling', 'Leadership', 'Team Play']
      });
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Profile updated:', formData);
      setSaving(false);
      navigate(`/profile/${id}`);
    }, 1500);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this profile? This action cannot be undone.')) {
      // Delete logic here
      navigate('/dashboard');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="edit-profile-page">
      <div className="page-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <FaArrowLeft /> Back
        </button>
        <h1>Edit Player Profile</h1>
        <p>Update the details for {formData.name}</p>
      </div>

      <form onSubmit={handleSubmit} className="edit-form">
        <div className="form-section">
          <h3>Basic Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="age">Age *</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                min="10"
                max="60"
              />
            </div>

            <div className="form-group">
              <label htmlFor="sport">Primary Sport *</label>
              <input
                type="text"
                id="sport"
                name="sport"
                value={formData.sport}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="position">Position *</label>
              <input
                type="text"
                id="position"
                name="position"
                value={formData.position}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Physical Attributes</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="height">Height</label>
              <input
                type="text"
                id="height"
                name="height"
                value={formData.height}
                onChange={handleChange}
                placeholder="e.g., 6'2\"
              />
            </div>

            <div className="form-group">
              <label htmlFor="weight">Weight</label>
              <input
                type="text"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                placeholder="e.g., 185 lbs or 84 kg"
              />
            </div>

            <div className="form-group">
              <label htmlFor="nationality">Nationality</label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h3>Additional Information</h3>
          <div className="form-group">
            <label htmlFor="team">Team/Club</label>
            <input
              type="text"
              id="team"
              name="team"
              value={formData.team}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="bio">Biography</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="6"
              placeholder="Tell us about the player's background, achievements, and playing style..."
            />
          </div>
        </div>

        <div className="form-section">
          <h3>Skills</h3>
          <div className="skills-display">
            {formData.skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate(`/profile/${id}`)}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <div className="action-buttons">
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-danger"
            >
              <FaTrash /> Delete Profile
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              {saving ? (
                <>
                  <div className="spinner"></div>
                  Saving...
                </>
              ) : (
                <>
                  <FaSave /> Save Changes
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;