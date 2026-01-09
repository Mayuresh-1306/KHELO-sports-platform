// client/src/services/sportService.js
import { get, post, put, del } from './api';

const SPORT_ENDPOINTS = {
  SPORTS: '/sports',
  SPORT_BY_ID: (id) => `/sports/${id}`,
  POPULAR: '/sports/popular',
  SEARCH: '/sports/search',
};

export const sportService = {
  // Get all sports
  getAllSports: async (params = {}) => {
    try {
      const response = await get(SPORT_ENDPOINTS.SPORTS, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching sports:', error);
      // Return mock data for development
      return [
        { id: 1, name: 'Football', icon: '⚽', description: 'Association football' },
        { id: 2, name: 'Basketball', icon: '🏀', description: 'Basketball' },
        { id: 3, name: 'Cricket', icon: '🏏', description: 'Cricket' },
        { id: 4, name: 'Tennis', icon: '🎾', description: 'Tennis' },
        { id: 5, name: 'Swimming', icon: '🏊', description: 'Swimming' },
      ];
    }
  },

  // Get sport by ID
  getSportById: async (id) => {
    try {
      const response = await get(SPORT_ENDPOINTS.SPORT_BY_ID(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching sport ${id}:`, error);
      // Return mock data for development
      const sports = {
        1: { id: 1, name: 'Football', icon: '⚽', description: 'Association football' },
        2: { id: 2, name: 'Basketball', icon: '🏀', description: 'Basketball' },
        3: { id: 3, name: 'Cricket', icon: '🏏', description: 'Cricket' },
      };
      return sports[id] || sports[1];
    }
  },

  // Get popular sports
  getPopularSports: async (limit = 5) => {
    try {
      const response = await get(SPORT_ENDPOINTS.POPULAR, { params: { limit } });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular sports:', error);
      return [
        { id: 1, name: 'Football', icon: '⚽' },
        { id: 2, name: 'Basketball', icon: '🏀' },
        { id: 3, name: 'Cricket', icon: '🏏' },
      ];
    }
  },

  // Search sports
  searchSports: async (query, params = {}) => {
    try {
      const response = await get(SPORT_ENDPOINTS.SEARCH, {
        params: { q: query, ...params }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching sports:', error);
      return [];
    }
  },

  // Create sport (admin only)
  createSport: async (sportData) => {
    try {
      const response = await post(SPORT_ENDPOINTS.SPORTS, sportData);
      return response.data;
    } catch (error) {
      console.error('Error creating sport:', error);
      throw error.response?.data || { message: 'Failed to create sport' };
    }
  },

  // Update sport (admin only)
  updateSport: async (id, sportData) => {
    try {
      const response = await put(SPORT_ENDPOINTS.SPORT_BY_ID(id), sportData);
      return response.data;
    } catch (error) {
      console.error(`Error updating sport ${id}:`, error);
      throw error.response?.data || { message: `Failed to update sport ${id}` };
    }
  },

  // Delete sport (admin only)
  deleteSport: async (id) => {
    try {
      const response = await del(SPORT_ENDPOINTS.SPORT_BY_ID(id));
      return response.data;
    } catch (error) {
      console.error(`Error deleting sport ${id}:`, error);
      throw error.response?.data || { message: `Failed to delete sport ${id}` };
    }
  }
};

export default sportService;