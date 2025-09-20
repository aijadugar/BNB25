import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

// Layout Component
import MainLayout from './components/MainLayout';

// Page Components
import LandingPage from './pages/landingpage';
import Dashboard from './pages/shared/Dashboard';
import CreateDataset from './pages/contributor/CreateDataset';
import Explore from './pages/developer/Explore';
import NotFound from './pages/NotFound';
import LoginPage from './pages/loginpage';
import DeveloperLoginPage from './pages/DeveloperLoginPage'; // Import the new developer login page

function App() {
  const [role, setRole] = useState('contributor');
  const navigate = useNavigate();

  // Navigates from landing page to the correct login page
  const handleRoleSelect = (selectedRole) => {
    if (selectedRole === 'contributor') {
      navigate('/login');
    } else if (selectedRole === 'developer') {
      navigate('/developer-login');
    }
  };

  // Sets the role and navigates to the dashboard after a successful login/signup
  const handleLoginSuccess = (loggedInRole) => {
    setRole(loggedInRole);
    navigate('/dashboard');
  };

  // Add this function to handle the logout action
  const handleLogout = () => {
    // In a real app, you would clear authentication tokens here
    navigate('/');
  };

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage onRoleSelect={handleRoleSelect} />} />
      <Route path="/login" element={<LoginPage onLoginSuccess={() => handleLoginSuccess('contributor')} />} />
      <Route path="/developer-login" element={<DeveloperLoginPage onLoginSuccess={() => handleLoginSuccess('developer')} />} />

      {/* Pass the handleLogout function to the MainLayout */}
      <Route element={<MainLayout role={role} onLogout={handleLogout} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create" element={<CreateDataset />} />
      </Route>

      {/* Catch-all for any other route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
