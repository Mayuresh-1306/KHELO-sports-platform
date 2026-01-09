// client/src/components/player/PlayerCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar, FaTrophy, FaUser, FaBasketballBall, FaFutbol } from 'react-icons/fa';
import "../../styles/components/playerCard.css";

const PlayerCard = ({ player }) => {
  const getSportIcon = (sport) => {
    switch (sport.toLowerCase()) {
      case 'football': return <FaFutbol />;
      case 'basketball': return <FaBasketballBall />;
      default: return <FaUser />;
    }
  };

  return (
    <motion.div
      className="player-card"
      whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/profile/${player._id}`} className="player-card-link">
        <div className="player-card-header">
          <div className="player-avatar">
            {player.avatar ? (
              <img src={player.avatar} alt={player.name} />
            ) : (
              <div className="avatar-placeholder">
                {player.name.charAt(0)}
              </div>
            )}
          </div>
          <div className="player-rating">
            <FaStar className="star-icon" />
            <span>{player.rating}</span>
          </div>
        </div>

        <div className="player-card-body">
          <h3 className="player-name">{player.name}</h3>
          <p className="player-age">Age: {player.age}</p>
          
          <div className="player-position">
            <span className="position-badge">{player.position}</span>
          </div>

          <div className="player-sports">
            {player.sports.slice(0, 3).map((sport, index) => (
              <span key={index} className="sport-badge">
                {getSportIcon(sport)}
                {sport}
              </span>
            ))}
            {player.sports.length > 3 && (
              <span className="more-sports">+{player.sports.length - 3} more</span>
            )}
          </div>
        </div>

        <div className="player-card-footer">
          <div className="achievements-count">
            <FaTrophy className="trophy-icon" />
            <span>{player.achievements || 0} Achievements</span>
          </div>
          <div className="view-profile">
            View Profile →
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PlayerCard;