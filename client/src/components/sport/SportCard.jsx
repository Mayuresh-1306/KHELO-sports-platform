import React from 'react';

function SportCard({ sport }) {
  return (
    <div className="sport-card">
      <h3>{sport.name}</h3>
      <p>{sport.description}</p>
    </div>
  );
}

export default SportCard;