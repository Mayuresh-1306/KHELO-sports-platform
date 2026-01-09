import React from 'react';
import '../../styles/components/loadingSpinner.css';

const LoadingSpinner = ({ size = 'medium', color = 'primary', text = '' }) => {
  const sizeClass = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large',
    xlarge: 'spinner-xlarge'
  }[size];

  const colorClass = {
    primary: 'spinner-primary',
    secondary: 'spinner-secondary',
    white: 'spinner-white',
    dark: 'spinner-dark'
  }[color];

  return (
    <div className="loading-container">
      <div className={`loading-spinner ${sizeClass} ${colorClass}`}>
        <div className="spinner-ring"></div>
        {text && <div className="loading-text">{text}</div>}
      </div>
    </div>
  );
};

export const PageLoader = () => (
  <div className="page-loader">
    <LoadingSpinner size="xlarge" text="Loading..." />
  </div>
);

export const ButtonLoader = () => (
  <div className="button-loader">
    <div className="button-spinner"></div>
    <span>Loading...</span>
  </div>
);

export default LoadingSpinner;