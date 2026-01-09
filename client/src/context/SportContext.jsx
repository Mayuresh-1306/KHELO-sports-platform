// client/src/context/SportContext.jsx
import React, { createContext, useState, useContext } from 'react';
import sportService from '../services/sportService';

// Create context
const SportContext = createContext({});

export const useSport = () => useContext(SportContext);

export const SportProvider = ({ children }) => {
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all sports
  const fetchSports = async () => {
    setLoading(true);
    try {
      const response = await sportService.getAllSports();
      setSports(response.data || response);
      setError(null);
      return response.data || response;
    } catch (err) {
      setError(err.message || 'Failed to fetch sports');
      console.error('Error fetching sports:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Get sport by ID
  const getSportById = async (id) => {
    try {
      const response = await sportService.getSportById(id);
      return response.data || response;
    } catch (err) {
      console.error(`Error fetching sport ${id}:`, err);
      throw err;
    }
  };

  // Select a sport
  const handleSelectSport = (sport) => {
    setSelectedSport(sport);
    localStorage.setItem('selectedSport', JSON.stringify(sport));
  };

  // Clear selected sport
  const clearSelectedSport = () => {
    setSelectedSport(null);
    localStorage.removeItem('selectedSport');
  };

  // Initialize selected sport from localStorage
  React.useEffect(() => {
    const savedSport = localStorage.getItem('selectedSport');
    if (savedSport) {
      try {
        setSelectedSport(JSON.parse(savedSport));
      } catch (err) {
        console.error('Error parsing saved sport:', err);
        localStorage.removeItem('selectedSport');
      }
    }
  }, []);

  return (
    <SportContext.Provider value={{
      sports,
      selectedSport,
      loading,
      error,
      fetchSports,
      getSportById,
      selectSport: handleSelectSport,
      clearSelectedSport,
      setSports
    }}>
      {children}
    </SportContext.Provider>
  );
};

export default SportProvider;