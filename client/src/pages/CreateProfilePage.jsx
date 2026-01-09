// client/src/pages/CreateProfilePage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSave, FaUpload, FaTimes } from 'react-icons/fa';
import "../styles/pages/createProfile.css";

const CreateProfilePage = () => {
  const navigate = useNavigate();
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
  const [currentSkill, setCurrentSkill] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddSkill = () => {
    if (currentSkill.trim() && !formData.skills.includes(currentSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, currentSkill.trim()]
      }));
      setCurrentSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Profile created:', formData);
      setLoading(false);
      navigate(`/profile/123`); // Redirect to new profile
    }, 1500);
  };

  const sports = [
    'Football', 'Basketball', 'Tennis', 'Cricket', 'Swimming', 
    'Athletics', 'Badminton', 'Volleyball', 'Rugby', 'Hockey'
  ];

  return (
    <div className="create-profile-page">
      <div className="page-header">
        <h1>Create New Player Profile</h1>
        <p>Fill in the details to create a new player profile</p>
      </div>

      <form onSubmit={handleSubmit} className="profile-form">
        {/* Basic Information */}
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
                placeholder="Enter player's full name"
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
                placeholder="Enter age"
              />
            </div>

            <div className="form-group">
              <label htmlFor="sport">Primary Sport *</label>
              <select
                id="sport"
                name="sport"
                value={formData.sport}
                onChange={handleChange}
                required
              >
                <option value="">Select a sport</option>
                {sports.map(sport => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
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
                placeholder="e.g., Forward, Goalkeeper, Point Guard"
              />
            </div>

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
          </div>
        </div>

        {/* Additional Information */}
        <div className="form-section">
          <h3>Additional Information</h3>
          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="nationality">Nationality</label>
              <input
                type="text"
                id="nationality"
                name="nationality"
                value={formData.nationality}
                onChange={handleChange}
                placeholder="Enter nationality"
              />
            </div>

            <div className="form-group">
              <label htmlFor="team">Team/Club</label>
              <input
                type="text"
                id="team"
                name="team"
                value={formData.team}
                onChange={handleChange}
                placeholder="Enter team or club name"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="bio">Biography</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows="4"
              placeholder="Tell us about the player's background, achievements, and playing style..."
            />
          </div>
        </div>

        {/* Skills */}
        <div className="form-section">
          <h3>Skills & Specialties</h3>
          <div className="skills-input">
            <input
              type="text"
              value={currentSkill}
              onChange={(e) => setCurrentSkill(e.target.value)}
              placeholder="Add a skill (e.g., Speed, Shooting, Leadership)"
              onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            />
            <button 
              type="button" 
              onClick={handleAddSkill}
              className="btn btn-primary"
            >
              Add Skill
            </button>
          </div>

          <div className="skills-list">
            {formData.skills.map((skill, index) => (
              <div key={index} className="skill-tag">
                {skill}
                <button 
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="remove-skill"
                >
                  <FaTimes />
                </button>
              </div>
            ))}
            {formData.skills.length === 0 && (
              <p className="no-skills">No skills added yet. Add some skills to showcase the player's abilities.</p>
            )}
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="btn btn-outline"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="spinner"></div>
                Creating...
              </>
            ) : (
              <>
                <FaSave /> Create Profile
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProfilePage;