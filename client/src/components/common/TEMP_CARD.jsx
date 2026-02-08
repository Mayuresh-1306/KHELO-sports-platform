import React from 'react';
import { Link } from 'react-router-dom';
import { FaTrophy, FaMapMarkerAlt, FaRunning, FaArrowRight, FaStar, FaMedal } from 'react-icons/fa';
import "../../styles/components/playerCard.css";

const PlayerFlipCard = ({ player }) => {
  // Safe Fallback Data to prevent crashes
  const p = {
    _id: player?.id || player?._id || '1',
    name: player?.name || 'Unknown Athlete',
    sport: player?.sports?.[0] || player?.sport || 'Multi-Sport',
    age: player?.age || '20+',
    rating: player?.rating || '4.5',
    location: player?.location || 'Mumbai, India',
    achievements: player?.achievements || 0,
    position: player?.position || 'Athlete',
    image: player?.image // Optional if you have images
  };

  return (
    <div className="flip-card-container">
      <div className="flip-card-inner">
        
        {/* === FRONT SIDE (The Look) === */}
        <div className="flip-card-front">
          {/* Rating Badge */}
          <div className="card-rating">
            <FaStar /> {p.rating}
          </div>
          
          {/* Avatar Circle */}
          <div className="front-avatar-container">
            <div className="front-avatar">
              {p.image ? (
                <img src={p.image} alt={p.name} />
              ) : (
                p.name.charAt(0).toUpperCase()
              )}
            </div>
            <div className="avatar-glow"></div>
          </div>
          
          <div className="front-content">
            <h3 className="front-name">{p.name}</h3>
            <p className="front-details">Age: {p.age} • {p.position}</p>
            
            <div className="front-sport-pill">
              <FaRunning /> {p.sport}
            </div>
          </div>

          <div className="front-footer">
            <div className="footer-stat">
               <FaTrophy className="icon-gold" /> 
               <span>{p.achievements} Awards</span>
            </div>
            <span className="flip-hint">Hover to View</span>
          </div>
        </div>

        {/* === BACK SIDE (The Stats) === */}
        <div className="flip-card-back">
          <div className="back-header">
            <h3>Player Profile</h3>
            <div className="back-avatar-mini">
               {p.name.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="stats-grid">
            <div className="stat-box">
              <span className="stat-value">{p.achievements}</span>
              <span className="stat-label">Awards</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">{p.rating}</span>
              <span className="stat-label">Rating</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">{p.age}</span>
              <span className="stat-label">Age</span>
            </div>
          </div>

          <div className="back-details">
             <div className="detail-row">
                <FaMedal className="icon-gold" /> 
                <span>Top Rated {p.sport} Player</span>
             </div>
             <div className="detail-row">
                <FaMapMarkerAlt className="icon-blue" /> 
                <span>{p.location}</span>
             </div>
          </div>

          <Link to={`/profile/${p._id}`} className="view-profile-btn">
            View Full Profile <FaArrowRight />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default PlayerFlipCard;