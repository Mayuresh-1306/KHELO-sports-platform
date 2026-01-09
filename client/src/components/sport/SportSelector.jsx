import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaFutbol, 
  FaBasketballBall, 
  FaBaseballBall, 
  FaTableTennis,
  FaFootballBall,
  FaHockeyPuck,
  FaSwimmer,
  FaRunning,
  FaVolleyballBall,
  FaGolfBall,
  FaPlus,
  FaCheck,
  FaTimes,
  FaFilter,
  FaSearch
} from 'react-icons/fa';
import SportCard from './SportCard';
import { sportService } from '../../services/sportService';
import { showError } from '../common/Toast';
import "../../styles/components/sportSelector.css";

const SportSelector = ({ onSelect, selectedSports = [], maxSelections = 5 }) => {
  const [sports, setSports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selected, setSelected] = useState(selectedSports);

  const categories = [
    { id: 'all', label: 'All Sports' },
    { id: 'team', label: 'Team Sports' },
    { id: 'individual', label: 'Individual Sports' },
    { id: 'water', label: 'Water Sports' },
    { id: 'winter', label: 'Winter Sports' },
    { id: 'combat', label: 'Combat Sports' }
  ];

  const defaultSports = [
    {
      id: 'football',
      name: 'Football',
      icon: <FaFutbol />,
      color: '#4361ee',
      category: 'team',
      description: 'Association football/soccer',
      popularity: 95,
      hasStats: true
    },
    {
      id: 'basketball',
      name: 'Basketball',
      icon: <FaBasketballBall />,
      color: '#f72585',
      category: 'team',
      description: 'Basketball court sport',
      popularity: 85,
      hasStats: true
    },
    {
      id: 'tennis',
      name: 'Tennis',
      icon: <FaTableTennis />,
      color: '#4cc9f0',
      category: 'individual',
      description: 'Racquet sport',
      popularity: 75,
      hasStats: true
    },
    {
      id: 'cricket',
      name: 'Cricket',
      icon: <FaBaseballBall />,
      color: '#7209b7',
      category: 'team',
      description: 'Bat and ball game',
      popularity: 90,
      hasStats: true
    },
    {
      id: 'swimming',
      name: 'Swimming',
      icon: <FaSwimmer />,
      color: '#2ecc71',
      category: 'individual',
      description: 'Water-based sport',
      popularity: 70,
      hasStats: true
    },
    {
      id: 'athletics',
      name: 'Athletics',
      icon: <FaRunning />,
      color: '#f39c12',
      category: 'individual',
      description: 'Track and field events',
      popularity: 80,
      hasStats: true
    },
    {
      id: 'hockey',
      name: 'Hockey',
      icon: <FaHockeyPuck />,
      color: '#9b59b6',
      category: 'team',
      description: 'Field and ice hockey',
      popularity: 65,
      hasStats: true
    },
    {
      id: 'volleyball',
      name: 'Volleyball',
      icon: <FaVolleyballBall />,
      color: '#e74c3c',
      category: 'team',
      description: 'Net sport',
      popularity: 60,
      hasStats: true
    },
    {
      id: 'rugby',
      name: 'Rugby',
      icon: <FaFootballBall />,
      color: '#1abc9c',
      category: 'team',
      description: 'Contact team sport',
      popularity: 55,
      hasStats: true
    },
    {
      id: 'golf',
      name: 'Golf',
      icon: <FaGolfBall />,
      color: '#34495e',
      category: 'individual',
      description: 'Club and ball sport',
      popularity: 50,
      hasStats: true
    }
  ];

  useEffect(() => {
    fetchSports();
  }, []);

  useEffect(() => {
    if (onSelect) {
      onSelect(selected);
    }
  }, [selected, onSelect]);

  const fetchSports = async () => {
    setLoading(true);
    try {
      const data = await sportService.getSports();
      if (data.length > 0) {
        setSports(data);
      } else {
        setSports(defaultSports);
      }
    } catch (error) {
      showError('Failed to load sports');
      setSports(defaultSports);
    } finally {
      setLoading(false);
    }
  };

  const handleSportToggle = (sportId) => {
    setSelected(prev => {
      if (prev.includes(sportId)) {
        return prev.filter(id => id !== sportId);
      } else if (prev.length < maxSelections) {
        return [...prev, sportId];
      }
      return prev;
    });
  };

  const handleAddCustomSport = () => {
    const customSportName = prompt('Enter custom sport name:');
    if (customSportName && customSportName.trim()) {
      const customSport = {
        id: `custom-${Date.now()}`,
        name: customSportName.trim(),
        icon: <FaPlus />,
        color: '#95a5a6',
        category: 'custom',
        description: 'Custom sport',
        popularity: 10,
        hasStats: false,
        isCustom: true
      };
      setSports(prev => [...prev, customSport]);
      if (selected.length < maxSelections) {
        setSelected(prev => [...prev, customSport.id]);
      }
    }
  };

  const handleRemoveCustomSport = (sportId, e) => {
    e.stopPropagation();
    setSports(prev => prev.filter(sport => sport.id !== sportId));
    setSelected(prev => prev.filter(id => id !== sportId));
  };

  const filteredSports = sports.filter(sport => {
    const matchesSearch = sport.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sport.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || sport.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getSelectedCount = () => {
    return selected.length;
  };

  const getSelectedSports = () => {
    return sports.filter(sport => selected.includes(sport.id));
  };

  if (loading) {
    return (
      <div className="sport-selector-loading">
        <div className="loading-spinner"></div>
        <p>Loading sports...</p>
      </div>
    );
  }

  return (
    <div className="sport-selector">
      <div className="selector-header">
        <h2>Select Your Sports</h2>
        <p>Choose up to {maxSelections} sports to create your profile</p>
        
        <div className="selection-info">
          <div className="selection-counter">
            <span className="counter-number">{getSelectedCount()}</span>
            <span className="counter-label">/{maxSelections} selected</span>
          </div>
          
          {getSelectedCount() > 0 && (
            <div className="selected-preview">
              {getSelectedSports().slice(0, 3).map(sport => (
                <div 
                  key={sport.id}
                  className="preview-item"
                  style={{ backgroundColor: sport.color }}
                  title={sport.name}
                >
                  {sport.icon}
                </div>
              ))}
              {getSelectedCount() > 3 && (
                <div className="preview-more">+{getSelectedCount() - 3}</div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="selector-controls">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search sports..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button 
              className="clear-search"
              onClick={() => setSearchTerm('')}
            >
              <FaTimes />
            </button>
          )}
        </div>

        <div className="category-filters">
          <FaFilter />
          {categories.map(category => (
            <button
              key={category.id}
              className={`category-btn ${categoryFilter === category.id ? 'active' : ''}`}
              onClick={() => setCategoryFilter(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="sports-grid-container">
        <div className="sports-grid">
          <AnimatePresence>
            {filteredSports.map((sport) => (
              <motion.div
                key={sport.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                <SportCard
                  sport={sport}
                  isSelected={selected.includes(sport.id)}
                  onClick={() => handleSportToggle(sport.id)}
                  onRemove={(e) => sport.isCustom && handleRemoveCustomSport(sport.id, e)}
                  disabled={!selected.includes(sport.id) && selected.length >= maxSelections}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.div
            className="add-custom-sport"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <button onClick={handleAddCustomSport}>
              <FaPlus className="add-icon" />
              <span>Add Custom Sport</span>
              <p>Not listed? Add your own</p>
            </button>
          </motion.div>
        </div>
      </div>

      <div className="selection-summary">
        <div className="summary-content">
          <h3>Selected Sports ({getSelectedCount()}/{maxSelections})</h3>
          {getSelectedCount() === 0 ? (
            <p className="empty-selection">No sports selected yet. Select at least one sport.</p>
          ) : (
            <div className="selected-list">
              {getSelectedSports().map(sport => (
                <div key={sport.id} className="selected-item">
                  <div 
                    className="item-icon"
                    style={{ backgroundColor: sport.color }}
                  >
                    {sport.icon}
                  </div>
                  <div className="item-details">
                    <h4>{sport.name}</h4>
                    <p>{sport.description}</p>
                  </div>
                  <button 
                    className="remove-selected"
                    onClick={() => handleSportToggle(sport.id)}
                  >
                    <FaTimes />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="selection-actions">
          <button 
            className="clear-all-btn"
            onClick={() => setSelected([])}
            disabled={getSelectedCount() === 0}
          >
            Clear All
          </button>
          <button 
            className="confirm-btn"
            onClick={() => onSelect && onSelect(selected)}
            disabled={getSelectedCount() === 0}
          >
            <FaCheck /> Confirm Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default SportSelector;