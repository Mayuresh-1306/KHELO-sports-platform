import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/pages/home.css';

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            <span className="gradient-text">KHELO</span>
            <br />
            Showcase Your Multi-Sport Talent
          </h1>
          <p className="hero-subtitle">
            Create professional player profiles, track statistics, and connect with teams across multiple sports
          </p>
          <div className="hero-actions">
            <Link to="/register" className="btn btn-primary btn-lg">
              Get Started Free
            </Link>
            <Link to="/login" className="btn btn-outline btn-lg">
              Sign In
            </Link>
          </div>
        </div>
        
        <div className="hero-image">
          <div className="floating-card">
            <div className="player-avatar-lg">
              <div className="avatar-badge">🏆</div>
            </div>
            <div className="player-stats-preview">
              <div className="stat-item">
                <span className="stat-value">15</span>
                <span className="stat-label">Matches</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">24</span>
                <span className="stat-label">Goals</span>
              </div>
              <div className="stat-item">
                <span className="stat-value">92%</span>
                <span className="stat-label">Success</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="section-header">
          <h2 className="section-title">Why Choose KHELO?</h2>
          <p className="section-subtitle">Everything you need to elevate your athletic career</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Advanced Analytics</h3>
            <p>Track performance metrics with detailed insights and visual reports</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Team Connections</h3>
            <p>Connect with scouts and teams across different sports disciplines</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Achievement Portfolio</h3>
            <p>Showcase your accomplishments with verified digital badges</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Mobile Ready</h3>
            <p>Access your profile and stats anytime, anywhere on any device</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section bg-gradient-primary">
        <div className="cta-content">
          <h2>Ready to Elevate Your Game?</h2>
          <p>Join thousands of athletes who trust KHELO for their professional journey</p>
          <div className="cta-actions">
            <Link to="/register" className="btn btn-white btn-lg">
              Create Your Profile
            </Link>
            <Link to="/search" className="btn btn-transparent btn-lg">
              Search Players
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;