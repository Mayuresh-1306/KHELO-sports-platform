import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaChartLine, FaUsers, FaTrophy, FaMobileAlt, FaShieldAlt, FaBolt } from 'react-icons/fa';
import '../styles/pages/home.css';

const HomePage = () => {
  return (
    <div className="home-page">
      
      {/* === HERO SECTION === */}
      <section className="hero-section">
        {/* Glow Effect */}
        <div className="hero-glow"></div>

        <div className="hero-container">
          <div className="hero-content animate-fadeInUp">
            <div className="badge-pill">
              <span className="badge-dot"></span>
              v2.0 is now live
            </div>
            
            <h1 className="hero-title">
              The Operating System for <br />
              <span className="text-gradient">Modern Athletes</span>
            </h1>
            
            <p className="hero-subtitle">
              Build your digital athletic passport. Track professional statistics, 
              showcase verified achievements, and connect with scouts globally.
            </p>
            
            <div className="hero-actions">
              <Link to="/create-profile" className="btn btn-primary">
                Start for Free <FaArrowRight />
              </Link>
              <Link to="/search" className="btn btn-outline">
                Explore Talent
              </Link>
            </div>

            <div className="hero-stats-row">
              <div className="stat-item">
                <strong>10k+</strong> <span>Athletes</span>
              </div>
              <div className="stat-separator"></div>
              <div className="stat-item">
                <strong>500+</strong> <span>Teams</span>
              </div>
              <div className="stat-separator"></div>
              <div className="stat-item">
                <strong>98%</strong> <span>Success Rate</span>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="hero-visual animate-slideInRight">
            <div className="glass-card-profile">
              <div className="card-header">
                <div className="card-avatar">VK</div>
                <div className="card-info">
                  <h4>Virat Kohli</h4>
                  <p>Cricket • Batsman</p>
                </div>
                <div className="card-rank">TOP 1%</div>
              </div>
              
              <div className="card-stats-grid">
                <div className="mini-stat">
                  <span className="label">Matches</span>
                  <span className="value">254</span>
                </div>
                <div className="mini-stat">
                  <span className="label">Average</span>
                  <span className="value">58.9</span>
                </div>
                <div className="mini-stat">
                  <span className="label">Strike Rate</span>
                  <span className="value">138.5</span>
                </div>
              </div>

              <div className="card-chart-placeholder">
                <div className="chart-bar" style={{height: '40%'}}></div>
                <div className="chart-bar" style={{height: '70%'}}></div>
                <div className="chart-bar" style={{height: '50%'}}></div>
                <div className="chart-bar" style={{height: '100%'}}></div>
                <div className="chart-bar" style={{height: '80%'}}></div>
              </div>
            </div>
            
            <div className="floating-badge badge-1">
              <FaTrophy className="icon-gold" /> <span>MVP 2024</span>
            </div>
            <div className="floating-badge badge-2">
              <FaBolt className="icon-blue" /> <span>Trending</span>
            </div>
          </div>
        </div>
      </section>

      {/* === FEATURES SECTION === */}
      <section className="features-section">
        <div className="section-header">
          <h2>Everything you need to <span className="text-highlight">go pro</span></h2>
          <p>Powerful tools designed for serious athletes and scouts.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card card-large">
            <div className="feature-icon-wrapper"><FaChartLine /></div>
            <h3>Advanced Analytics</h3>
            <p>Visualize your performance growth with professional grade charts and historical data comparison.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper"><FaUsers /></div>
            <h3>Team Connections</h3>
            <p>Direct networking channels with verified scouts and club managers.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper"><FaShieldAlt /></div>
            <h3>Verified Data</h3>
            <p>Blockchain-backed achievement verification for absolute trust.</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper"><FaTrophy /></div>
            <h3>Digital Trophy Cabinet</h3>
            <p>Showcase awards, certificates, and media in high resolution.</p>
          </div>

          <div className="feature-card card-wide">
            <div className="feature-content">
              <div className="feature-icon-wrapper"><FaMobileAlt /></div>
              <h3>Mobile First Design</h3>
              <p>Update your stats from the sideline. Fully optimized for all devices.</p>
            </div>
          </div>
        </div>
      </section>

      {/* === CTA SECTION === */}
      <section className="cta-section">
        <div className="cta-container">
          <div className="cta-content">
            <h2>Ready to define your legacy?</h2>
            <p>Join the fastest growing sports network today.</p>
            <Link to="/register" className="btn btn-white">
              Create Free Profile
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;