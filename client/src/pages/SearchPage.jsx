// client/src/pages/SearchPage.jsx
import React, { useState, useEffect } from 'react';
import { FaSearch, FaFilter, FaTimes, FaUser, FaTrophy, FaChartLine } from 'react-icons/fa';
import PlayerCard from '../components/player/PlayerCard';
import "../styles/pages/search.css";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [players, setPlayers] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    sport: '',
    minAge: '',
    maxAge: '',
    minRating: '',
    position: ''
  });
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => {
    filterPlayers();
  }, [searchQuery, filters, players]);

  const fetchPlayers = async () => {
    setLoading(true);
    // Mock data
    setTimeout(() => {
      const mockPlayers = [
        { id: 1, name: 'Alex Johnson', sports: ['Football', 'Basketball'], age: 24, position: 'Forward', rating: 4.8, achievements: 15 },
        { id: 2, name: 'Sarah Williams', sports: ['Tennis', 'Badminton'], age: 22, position: 'Singles Player', rating: 4.9, achievements: 12 },
        { id: 3, name: 'Michael Chen', sports: ['Swimming', 'Athletics'], age: 26, position: 'Sprinter', rating: 4.7, achievements: 18 },
        { id: 4, name: 'David Miller', sports: ['Cricket', 'Football'], age: 28, position: 'Batsman', rating: 4.6, achievements: 20 },
        { id: 5, name: 'Emma Wilson', sports: ['Basketball', 'Volleyball'], age: 23, position: 'Center', rating: 4.8, achievements: 14 },
        { id: 6, name: 'James Brown', sports: ['Football', 'Rugby'], age: 25, position: 'Midfielder', rating: 4.5, achievements: 10 },
        { id: 7, name: 'Lisa Taylor', sports: ['Tennis', 'Squash'], age: 21, position: 'Doubles Player', rating: 4.7, achievements: 11 },
        { id: 8, name: 'Robert Garcia', sports: ['Baseball', 'Cricket'], age: 27, position: 'Pitcher', rating: 4.4, achievements: 9 },
      ];
      setPlayers(mockPlayers);
      setFilteredPlayers(mockPlayers);
      setLoading(false);
    }, 1000);
  };

  const filterPlayers = () => {
    let result = [...players];

    // Search by name
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(player => 
        player.name.toLowerCase().includes(query) ||
        player.position.toLowerCase().includes(query) ||
        player.sports.some(sport => sport.toLowerCase().includes(query))
      );
    }

    // Apply filters
    if (filters.sport) {
      result = result.filter(player => 
        player.sports.some(sport => sport.toLowerCase() === filters.sport.toLowerCase())
      );
    }
    if (filters.minAge) {
      result = result.filter(player => player.age >= parseInt(filters.minAge));
    }
    if (filters.maxAge) {
      result = result.filter(player => player.age <= parseInt(filters.maxAge));
    }
    if (filters.minRating) {
      result = result.filter(player => player.rating >= parseFloat(filters.minRating));
    }
    if (filters.position) {
      result = result.filter(player => 
        player.position.toLowerCase().includes(filters.position.toLowerCase())
      );
    }

    setFilteredPlayers(result);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      sport: '',
      minAge: '',
      maxAge: '',
      minRating: '',
      position: ''
    });
    setSearchQuery('');
  };

  const sports = [
    'Football', 'Basketball', 'Tennis', 'Cricket', 'Swimming',
    'Athletics', 'Badminton', 'Volleyball', 'Rugby', 'Hockey',
    'Baseball', 'Squash'
  ];

  return (
    <div className="search-page">
      <div className="page-header">
        <h1>Search Players</h1>
        <p>Find athletes by name, sport, or skills</p>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search players by name, sport, or position..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`filter-toggle ${showFilters ? 'active' : ''}`}
          >
            <FaFilter /> Filters
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="filters-panel">
            <div className="filters-header">
              <h3>Filter Players</h3>
              <button 
                onClick={() => setShowFilters(false)}
                className="close-filters"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="filters-grid">
              <div className="filter-group">
                <label>Sport</label>
                <select
                  value={filters.sport}
                  onChange={(e) => handleFilterChange('sport', e.target.value)}
                >
                  <option value="">All Sports</option>
                  {sports.map(sport => (
                    <option key={sport} value={sport}>{sport}</option>
                  ))}
                </select>
              </div>

              <div className="filter-group">
                <label>Position</label>
                <input
                  type="text"
                  value={filters.position}
                  onChange={(e) => handleFilterChange('position', e.target.value)}
                  placeholder="e.g., Forward, Goalkeeper"
                />
              </div>

              <div className="filter-group">
                <label>Age Range</label>
                <div className="age-range">
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.minAge}
                    onChange={(e) => handleFilterChange('minAge', e.target.value)}
                    min="10"
                    max="60"
                  />
                  <span>to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.maxAge}
                    onChange={(e) => handleFilterChange('maxAge', e.target.value)}
                    min="10"
                    max="60"
                  />
                </div>
              </div>

              <div className="filter-group">
                <label>Minimum Rating</label>
                <select
                  value={filters.minRating}
                  onChange={(e) => handleFilterChange('minRating', e.target.value)}
                >
                  <option value="">Any Rating</option>
                  <option value="4.5">4.5+</option>
                  <option value="4.0">4.0+</option>
                  <option value="3.5">3.5+</option>
                  <option value="3.0">3.0+</option>
                </select>
              </div>
            </div>

            <div className="filters-actions">
              <button onClick={clearFilters} className="btn btn-outline">
                Clear All Filters
              </button>
              <button onClick={() => setShowFilters(false)} className="btn btn-primary">
                Apply Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="results-header">
        <h3>
          {loading ? 'Loading players...' : 
           filteredPlayers.length === players.length ? 
           `All Players (${players.length})` : 
           `Search Results (${filteredPlayers.length} of ${players.length})`}
        </h3>
        {(searchQuery || Object.values(filters).some(f => f)) && (
          <div className="active-filters">
            {searchQuery && (
              <span className="active-filter">
                Search: "{searchQuery}" <FaTimes onClick={() => setSearchQuery('')} />
              </span>
            )}
            {filters.sport && (
              <span className="active-filter">
                Sport: {filters.sport} <FaTimes onClick={() => handleFilterChange('sport', '')} />
              </span>
            )}
            <button onClick={clearFilters} className="clear-all">
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Players Grid */}
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading players...</p>
        </div>
      ) : filteredPlayers.length > 0 ? (
        <div className="players-grid">
          {filteredPlayers.map(player => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <div className="no-results-icon">
            <FaSearch size={64} />
          </div>
          <h3>No players found</h3>
          <p>Try adjusting your search or filters</p>
          <button onClick={clearFilters} className="btn btn-primary">
            Clear All Filters
          </button>
        </div>
      )}

      {/* Search Stats */}
      {!loading && filteredPlayers.length > 0 && (
        <div className="search-stats">
          <div className="stat-card">
            <FaUser />
            <div>
              <h4>{filteredPlayers.length}</h4>
              <p>Players Found</p>
            </div>
          </div>
          <div className="stat-card">
            <FaTrophy />
            <div>
              <h4>{Math.round(filteredPlayers.reduce((acc, p) => acc + p.rating, 0) / filteredPlayers.length * 10) / 10}</h4>
              <p>Average Rating</p>
            </div>
          </div>
          <div className="stat-card">
            <FaChartLine />
            <div>
              <h4>{Math.round(filteredPlayers.reduce((acc, p) => acc + p.age, 0) / filteredPlayers.length)}</h4>
              <p>Average Age</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;