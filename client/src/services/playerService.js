// client/src/services/playerService.js
import { get, post, put, del } from './api';

const PLAYER_ENDPOINTS = {
  PLAYERS: '/players',
  PLAYER_BY_ID: (id) => `/players/${id}`,
  SEARCH: '/players/search',
  STATS: (id) => `/players/${id}/stats`,
  UPLOAD_IMAGE: (id) => `/players/${id}/upload-image`,
};

export const playerService = {
  // Get all players
  getAllPlayers: async (params = {}) => {
    try {
      const response = await get(PLAYER_ENDPOINTS.PLAYERS, { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching players:', error);
      throw error.response?.data || { message: 'Failed to fetch players' };
    }
  },

  // Get player by ID
  getPlayerById: async (id) => {
    try {
      const response = await get(PLAYER_ENDPOINTS.PLAYER_BY_ID(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching player ${id}:`, error);
      throw error.response?.data || { message: `Failed to fetch player ${id}` };
    }
  },

  // Create player
  createPlayer: async (playerData) => {
    try {
      const response = await post(PLAYER_ENDPOINTS.PLAYERS, playerData);
      return response.data;
    } catch (error) {
      console.error('Error creating player:', error);
      throw error.response?.data || { message: 'Failed to create player' };
    }
  },

  // Update player
  updatePlayer: async (id, playerData) => {
    try {
      const response = await put(PLAYER_ENDPOINTS.PLAYER_BY_ID(id), playerData);
      return response.data;
    } catch (error) {
      console.error(`Error updating player ${id}:`, error);
      throw error.response?.data || { message: `Failed to update player ${id}` };
    }
  },

  // Delete player
  deletePlayer: async (id) => {
    try {
      const response = await del(PLAYER_ENDPOINTS.PLAYER_BY_ID(id));
      return response.data;
    } catch (error) {
      console.error(`Error deleting player ${id}:`, error);
      throw error.response?.data || { message: `Failed to delete player ${id}` };
    }
  },

  // Search players
  searchPlayers: async (query, params = {}) => {
    try {
      const response = await get(PLAYER_ENDPOINTS.SEARCH, {
        params: { q: query, ...params }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching players:', error);
      throw error.response?.data || { message: 'Search failed' };
    }
  },

  // Get player stats
  getPlayerStats: async (id) => {
    try {
      const response = await get(PLAYER_ENDPOINTS.STATS(id));
      return response.data;
    } catch (error) {
      console.error(`Error fetching stats for player ${id}:`, error);
      throw error.response?.data || { message: `Failed to fetch stats` };
    }
  },

  // Upload player image
  uploadPlayerImage: async (id, file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await post(
        PLAYER_ENDPOINTS.UPLOAD_IMAGE(id),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(`Error uploading image for player ${id}:`, error);
      throw error.response?.data || { message: 'Failed to upload image' };
    }
  }
};

export default playerService;