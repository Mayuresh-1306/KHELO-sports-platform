import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub, FaHeart } from 'react-icons/fa';
import '../../styles/components/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <h2>Player<span>Profile</span></h2>
              <p className="footer-tagline">Elevating athletes across all sports</p>
            </div>
            <p className="footer-description">
              A comprehensive platform for athletes to showcase their talents, 
              track performance, and connect with opportunities worldwide.
            </p>
            <div className="social-links">
              <a href="#" className="social-link"><FaFacebook /></a>
              <a href="#" className="social-link"><FaTwitter /></a>
              <a href="#" className="social-link"><FaInstagram /></a>
              <a href="#" className="social-link"><FaLinkedin /></a>
              <a href="#" className="social-link"><FaGithub /></a>
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/features">Features</Link></li>
              <li><Link to="/pricing">Pricing</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Sports</h3>
            <ul className="footer-links">
              <li><Link to="/sports/football">Football</Link></li>
              <li><Link to="/sports/basketball">Basketball</Link></li>
              <li><Link to="/sports/cricket">Cricket</Link></li>
              <li><Link to="/sports/tennis">Tennis</Link></li>
              <li><Link to="/sports/swimming">Swimming</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Legal</h3>
            <ul className="footer-links">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
              <li><Link to="/cookies">Cookie Policy</Link></li>
              <li><Link to="/gdpr">GDPR Compliance</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="copyright">
            <p>&copy; {currentYear} PlayerProfile. All rights reserved.</p>
            <p className="made-with">
              Made with <FaHeart className="heart-icon" /> for athletes worldwide
            </p>
          </div>
          
          <div className="footer-extra">
            <p>Version 1.0.0 | Build 2024.01</p>
            <div className="footer-actions">
              <Link to="/support" className="support-link">Support Center</Link>
              <Link to="/feedback" className="feedback-link">Give Feedback</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;