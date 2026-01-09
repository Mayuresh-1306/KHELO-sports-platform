import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { 
  FaUser, 
  FaCalendar, 
  FaVenusMars, 
  FaRulerVertical, 
  FaWeight, 
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaFutbol,
  FaBasketballBall,
  FaTennisBall,
  FaSwimmer,
  FaRunning,
  FaPlus,
  FaTimes
} from 'react-icons/fa';
import { playerService } from '../../services/playerService';
import { showSuccess, showError } from '../common/Toast';
import '../../styles/components/playerForm.css';

const sportsOptions = [
  { id: 'football', label: 'Football', icon: <FaFutbol />, color: '#4361ee' },
  { id: 'basketball', label: 'Basketball', icon: <FaBasketballBall />, color: '#f72585' },
  { id: 'tennis', label: 'Tennis', icon: <FaTennisBall />, color: '#4cc9f0' },
  { id: 'swimming', label: 'Swimming', icon: <FaSwimmer />, color: '#7209b7' },
  { id: 'athletics', label: 'Athletics', icon: <FaRunning />, color: '#2ecc71' },
  { id: 'cricket', label: 'Cricket', icon: <FaTennisBall />, color: '#f39c12' },
  { id: 'hockey', label: 'Hockey', icon: <FaRunning />, color: '#9b59b6' },
  { id: 'volleyball', label: 'Volleyball', icon: <FaRunning />, color: '#e74c3c' },
];

const validationSchema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  dateOfBirth: yup.date().required('Date of birth is required'),
  gender: yup.string().required('Gender is required'),
  height: yup.number().positive('Height must be positive').required('Height is required'),
  weight: yup.number().positive('Weight must be positive').required('Weight is required'),
  country: yup.string().required('Country is required'),
  city: yup.string().required('City is required'),
  phone: yup.string().matches(/^[0-9+\-\s()]*$/, 'Invalid phone number'),
  bio: yup.string().max(500, 'Bio must be less than 500 characters'),
  sports: yup.array().min(1, 'Select at least one sport').required('Sports are required'),
  positions: yup.array().min(1, 'Select at least one position'),
  experienceLevel: yup.string().required('Experience level is required'),
  preferredFoot: yup.string().when('sports', {
    is: (sports) => sports?.includes('football'),
    then: () => yup.string().required('Preferred foot is required for football'),
  }),
  jerseyNumber: yup.number().positive().integer(),
  socialLinks: yup.object({
    instagram: yup.string().url('Must be a valid URL'),
    twitter: yup.string().url('Must be a valid URL'),
    facebook: yup.string().url('Must be a valid URL'),
  }),
});

const PlayerForm = ({ isEdit = false }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedSports, setSelectedSports] = useState([]);
  const [positions, setPositions] = useState([]);
  const [customPosition, setCustomPosition] = useState('');

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: '',
      dateOfBirth: '',
      gender: '',
      height: '',
      weight: '',
      country: '',
      city: '',
      phone: '',
      bio: '',
      sports: [],
      positions: [],
      experienceLevel: '',
      preferredFoot: '',
      jerseyNumber: '',
      socialLinks: {
        instagram: '',
        twitter: '',
        facebook: ''
      }
    }
  });

  const watchedSports = watch('sports');

  useEffect(() => {
    if (isEdit && id) {
      fetchPlayerData();
    }
  }, [isEdit, id]);

  const fetchPlayerData = async () => {
    try {
      const player = await playerService.getPlayerById(id);
      if (player) {
        Object.keys(player).forEach(key => {
          if (key !== '_id') {
            setValue(key, player[key]);
          }
        });
        setSelectedSports(player.sports || []);
        setPositions(player.positions || []);
      }
    } catch (error) {
      showError('Failed to load player data');
    }
  };

  const handleSportToggle = (sportId) => {
    const newSports = selectedSports.includes(sportId)
      ? selectedSports.filter(id => id !== sportId)
      : [...selectedSports, sportId];
    
    setSelectedSports(newSports);
    setValue('sports', newSports);
  };

  const handleAddPosition = () => {
    if (customPosition.trim() && !positions.includes(customPosition.trim())) {
      const newPositions = [...positions, customPosition.trim()];
      setPositions(newPositions);
      setValue('positions', newPositions);
      setCustomPosition('');
    }
  };

  const handleRemovePosition = (positionToRemove) => {
    const newPositions = positions.filter(pos => pos !== positionToRemove);
    setPositions(newPositions);
    setValue('positions', newPositions);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddPosition();
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if (isEdit) {
        await playerService.updatePlayer(id, data);
        showSuccess('Profile updated successfully!');
      } else {
        await playerService.createPlayer(data);
        showSuccess('Profile created successfully!');
      }
      navigate('/dashboard');
    } catch (error) {
      showError(error.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const sportsForSelected = sportsOptions.filter(sport => 
    selectedSports.includes(sport.id)
  );

  return (
    <div className="player-form-container">
      <motion.div
        className="player-form-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="form-header">
          <h2>{isEdit ? 'Edit Player Profile' : 'Create Player Profile'}</h2>
          <p>Fill in your details to create a professional player profile</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="player-form">
          {/* Personal Information Section */}
          <div className="form-section">
            <h3 className="section-title">Personal Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>
                  <FaUser /> Full Name *
                </label>
                <input
                  type="text"
                  {...register('name')}
                  placeholder="Enter your full name"
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name.message}</span>}
              </div>

              <div className="form-group">
                <label>
                  <FaCalendar /> Date of Birth *
                </label>
                <input
                  type="date"
                  {...register('dateOfBirth')}
                  className={errors.dateOfBirth ? 'error' : ''}
                />
                {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth.message}</span>}
              </div>

              <div className="form-group">
                <label>
                  <FaVenusMars /> Gender *
                </label>
                <select {...register('gender')} className={errors.gender ? 'error' : ''}>
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <span className="error-message">{errors.gender.message}</span>}
              </div>

              <div className="form-group">
                <label>
                  <FaRulerVertical /> Height (cm) *
                </label>
                <input
                  type="number"
                  {...register('height')}
                  placeholder="Enter height in cm"
                  className={errors.height ? 'error' : ''}
                />
                {errors.height && <span className="error-message">{errors.height.message}</span>}
              </div>

              <div className="form-group">
                <label>
                  <FaWeight /> Weight (kg) *
                </label>
                <input
                  type="number"
                  {...register('weight')}
                  placeholder="Enter weight in kg"
                  className={errors.weight ? 'error' : ''}
                />
                {errors.weight && <span className="error-message">{errors.weight.message}</span>}
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="form-section">
            <h3 className="section-title">Contact Information</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>
                  <FaMapMarkerAlt /> Country *
                </label>
                <input
                  type="text"
                  {...register('country')}
                  placeholder="Enter your country"
                  className={errors.country ? 'error' : ''}
                />
                {errors.country && <span className="error-message">{errors.country.message}</span>}
              </div>

              <div className="form-group">
                <label>
                  <FaMapMarkerAlt /> City *
                </label>
                <input
                  type="text"
                  {...register('city')}
                  placeholder="Enter your city"
                  className={errors.city ? 'error' : ''}
                />
                {errors.city && <span className="error-message">{errors.city.message}</span>}
              </div>

              <div className="form-group">
                <label>
                  <FaPhone /> Phone Number
                </label>
                <input
                  type="tel"
                  {...register('phone')}
                  placeholder="Enter phone number"
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-message">{errors.phone.message}</span>}
              </div>
            </div>
          </div>

          {/* Sports Section */}
          <div className="form-section">
            <h3 className="section-title">Sports & Positions *</h3>
            <p className="section-subtitle">Select the sports you participate in and your positions</p>
            
            <div className="sports-selection">
              <div className="sports-grid">
                {sportsOptions.map(sport => (
                  <div
                    key={sport.id}
                    className={`sport-option ${selectedSports.includes(sport.id) ? 'selected' : ''}`}
                    onClick={() => handleSportToggle(sport.id)}
                    style={{
                      borderColor: sport.color,
                      color: selectedSports.includes(sport.id) ? 'white' : sport.color,
                      backgroundColor: selectedSports.includes(sport.id) ? sport.color : 'white'
                    }}
                  >
                    <span className="sport-icon">{sport.icon}</span>
                    <span className="sport-label">{sport.label}</span>
                  </div>
                ))}
              </div>
              {errors.sports && <span className="error-message">{errors.sports.message}</span>}
            </div>

            {/* Positions Input */}
            <div className="positions-section">
              <label>Positions</label>
              <div className="positions-input-group">
                <input
                  type="text"
                  value={customPosition}
                  onChange={(e) => setCustomPosition(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Add a position (e.g., Striker, Point Guard)"
                  className="positions-input"
                />
                <button
                  type="button"
                  onClick={handleAddPosition}
                  className="add-position-btn"
                  disabled={!customPosition.trim()}
                >
                  <FaPlus /> Add
                </button>
              </div>
              
              {/* Selected Positions */}
              <div className="selected-positions">
                {positions.map((position, index) => (
                  <div key={index} className="position-tag">
                    {position}
                    <button
                      type="button"
                      onClick={() => handleRemovePosition(position)}
                      className="remove-position"
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
                {positions.length === 0 && (
                  <p className="no-positions">No positions added yet</p>
                )}
              </div>
              {errors.positions && <span className="error-message">{errors.positions.message}</span>}
            </div>

            {/* Sport-specific fields */}
            {selectedSports.includes('football') && (
              <div className="sport-specific-fields">
                <div className="form-group">
                  <label>Preferred Foot *</label>
                  <select {...register('preferredFoot')} className={errors.preferredFoot ? 'error' : ''}>
                    <option value="">Select preferred foot</option>
                    <option value="right">Right</option>
                    <option value="left">Left</option>
                    <option value="both">Both</option>
                  </select>
                  {errors.preferredFoot && <span className="error-message">{errors.preferredFoot.message}</span>}
                </div>

                <div className="form-group">
                  <label>Jersey Number</label>
                  <input
                    type="number"
                    {...register('jerseyNumber')}
                    placeholder="Enter jersey number"
                    min="1"
                    max="99"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Additional Information */}
          <div className="form-section">
            <h3 className="section-title">Additional Information</h3>
            <div className="form-group">
              <label>Experience Level *</label>
              <select {...register('experienceLevel')} className={errors.experienceLevel ? 'error' : ''}>
                <option value="">Select experience level</option>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
                <option value="professional">Professional</option>
              </select>
              {errors.experienceLevel && <span className="error-message">{errors.experienceLevel.message}</span>}
            </div>

            <div className="form-group">
              <label>Bio</label>
              <textarea
                {...register('bio')}
                placeholder="Tell us about yourself, your achievements, and goals..."
                rows="4"
                maxLength="500"
                className={errors.bio ? 'error' : ''}
              />
              <div className="char-count">
                {watch('bio')?.length || 0}/500 characters
              </div>
              {errors.bio && <span className="error-message">{errors.bio.message}</span>}
            </div>
          </div>

          {/* Social Links */}
          <div className="form-section">
            <h3 className="section-title">Social Links</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Instagram</label>
                <input
                  type="url"
                  {...register('socialLinks.instagram')}
                  placeholder="https://instagram.com/username"
                  className={errors.socialLinks?.instagram ? 'error' : ''}
                />
              </div>

              <div className="form-group">
                <label>Twitter</label>
                <input
                  type="url"
                  {...register('socialLinks.twitter')}
                  placeholder="https://twitter.com/username"
                  className={errors.socialLinks?.twitter ? 'error' : ''}
                />
              </div>

              <div className="form-group">
                <label>Facebook</label>
                <input
                  type="url"
                  {...register('socialLinks.facebook')}
                  placeholder="https://facebook.com/username"
                  className={errors.socialLinks?.facebook ? 'error' : ''}
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="cancel-btn"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? 'Saving...' : (isEdit ? 'Update Profile' : 'Create Profile')}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default PlayerForm;