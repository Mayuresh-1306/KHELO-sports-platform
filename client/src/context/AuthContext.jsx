// client/src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
// We don't need the toast here if you handle it in the components, 
// but we'll keep the imports to prevent breaking changes if you use them.
import { toast } from 'react-toastify'; 

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. FIX: Load user from LocalStorage on refresh
    // This prevents the 404 error because we don't call the server for "/me"
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // 2. LOGIN FUNCTION
  const login = async (email, password) => {
    try {
      // Changed URL to match our Backend: /api/users/login
      const response = await axios.post('/api/users/login', { email, password });
      
      const { token, ...userData } = response.data; // Backend sends token and user data merged or separate
      
      // Save to storage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData)); // Save user details too
      
      setToken(token);
      setUser(userData);
      
      return { success: true };
    } catch (error) {
      console.error("Login Error:", error);
      const message = error.response?.data?.message || 'Login failed';
      // toast.error(message); // Uncomment if you have ToastContainer set up
      return { success: false, error: message };
    }
  };

  // 3. SIGNUP FUNCTION
  const signup = async (userData) => {
    try {
      // Changed URL to match our Backend: /api/users
      // Note: We send name, email, password, sport
      const response = await axios.post('/api/users', userData);
      
      const { token, ...newUserData } = response.data;
      
      // Save to storage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(newUserData));
      
      setToken(token);
      setUser(newUserData);
      
      return { success: true };
    } catch (error) {
      console.error("Signup Error:", error);
      const message = error.response?.data?.message || 'Signup failed';
      // toast.error(message);
      return { success: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    // toast.info('Logged out successfully');
  };

  const updateUser = (updatedData) => {
    setUser(prev => {
      const newUser = { ...prev, ...updatedData };
      localStorage.setItem('user', JSON.stringify(newUser));
      return newUser;
    });
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      loading,
      login,
      signup,
      logout,
      updateUser,
      isAuthenticated: !!token
    }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};