import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Context
import { AuthProvider, useAuth } from './context/AuthContext'; // <--- FIXED: Import from Context, not hooks

// Components - Layout
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ProtectedRoute from './components/common/ProtectedRoute';

// Components - Auth
import Login from './components/auth/Login';
import Signup from './components/auth/Signup'; // <--- FIXED: Importing Signup, not Register

// Pages
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import PlayerProfilePage from './pages/PlayerProfilePage';
import CreateProfilePage from './pages/CreateProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import SearchPage from './pages/SearchPage';
import DocumentsPage from './pages/DocumentsPage';
import AchievementsPage from './pages/AchievementsPage';

// Styles
import "./App.css";

// Layout Wrapper to conditionally show Navbar/Footer
const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} /> {/* <--- FIXED: Using Signup component */}
            <Route path="/search" element={<SearchPage />} />

            {/* Protected Routes - Require Login */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/profile/:id" 
              element={
                <ProtectedRoute>
                  <PlayerProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/create-profile" 
              element={
                <ProtectedRoute>
                  <CreateProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/edit-profile/:id" 
              element={
                <ProtectedRoute>
                  <EditProfilePage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/documents" 
              element={
                <ProtectedRoute>
                  <DocumentsPage />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/achievements" 
              element={
                <ProtectedRoute>
                  <AchievementsPage />
                </ProtectedRoute>
              } 
            />

            {/* Catch all - Redirect to Home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
        
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </AuthProvider>
  );
};

export default App;