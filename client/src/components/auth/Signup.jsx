// client/src/components/auth/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios'; // We use axios directly to ensure it hits the right URL
import { FaUser, FaEnvelope, FaLock, FaRunning } from 'react-icons/fa';
import "../../styles/components/auth.css";

const Signup = () => {
  // 1. Updated State to match YOUR Backend exactly
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    sport: 'Cricket' // Default sport
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // 2. FIXED: Send specific data the backend expects
      const backendData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        sport: formData.sport
      };

      // 3. FIXED URL: Points directly to your working backend route
      const response = await axios.post('/api/users', backendData);

      if (response.data.token) {
        // Save token to keep user logged in
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data));
        
        // Redirect to dashboard
        navigate('/dashboard'); 
      }

    } catch (err) {
      console.error(err);
      setErrors({ 
        form: err.response?.data?.message || 'Signup failed. Please try again.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="auth-container">
      <motion.div
        className="auth-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="auth-header">
          <h2>Create Your Account</h2>
          <p>Join the KHELO sports community</p>
        </div>

        {errors.form && <div className="error-message" style={{textAlign: 'center', marginBottom: '10px'}}>{errors.form}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {/* NAME FIELD */}
          <div className="form-group">
            <div className="input-icon">
              <FaUser />
            </div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          {/* EMAIL FIELD */}
          <div className="form-group">
            <div className="input-icon">
              <FaEnvelope />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          {/* PASSWORD FIELD */}
          <div className="form-row">
            <div className="form-group">
              <div className="input-icon">
                <FaLock />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
              {errors.password && <span className="error-message">{errors.password}</span>}
            </div>

            <div className="form-group">
              <div className="input-icon">
                <FaLock />
              </div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
              {errors.confirmPassword && (
                <span className="error-message">{errors.confirmPassword}</span>
              )}
            </div>
          </div>

          {/* NEW SPORT FIELD (Required by Backend) */}
          <div className="form-group">
            <div className="input-icon">
              <FaRunning />
            </div>
            <select
              name="sport"
              value={formData.sport}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px 10px 10px 40px', border: '1px solid #ddd', borderRadius: '8px' }}
            >
              <option value="Cricket">Cricket</option>
              <option value="Football">Football</option>
              <option value="Basketball">Basketball</option>
              <option value="Tennis">Tennis</option>
              <option value="Badminton">Badminton</option>
            </select>
          </div>

          <div className="terms-checkbox">
            <input type="checkbox" id="terms" required />
            <label htmlFor="terms">
              I agree to the <Link to="/terms">Terms of Service</Link> and{' '}
              <Link to="/privacy">Privacy Policy</Link>
            </label>
          </div>

          <button
            type="submit"
            className="auth-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </button>

          <div className="auth-footer">
            <p>
              Already have an account? <Link to="/login">Log In</Link>
            </p>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Signup;