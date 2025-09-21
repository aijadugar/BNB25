import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

// Layout Component
import MainLayout from './components/MainLayout';

// Page Components
import LandingPage from './pages/landingpage';
import CreateDataset from './pages/contributor/CreateDataset';
import Explore from './pages/developer/Explore';
import NotFound from './pages/NotFound';
import LoginPage from './pages/loginpage';
import DeveloperLoginPage from './pages/DeveloperLoginPage';
import ContributorDashboard from './pages/contributor/ContributorDashboard';
import DeveloperDashboard from './pages/developer/DeveloperDashboard'; // Add this import

function App() {
  const [role, setRole] = useState('contributor');
  const [walletId, setWalletId] = useState("");
  const navigate = useNavigate();

  console.log("App.jsx - Current Role:", role);

  const handleRoleSelect = (selectedRole) => {
    if (selectedRole === 'contributor') {
      navigate('/login');
    } else if (selectedRole === 'developer') {
      navigate('/developer-login');
    }
  };

  // Accept walletId from login page
  const handleLoginSuccess = (loggedInRole, receivedWalletId) => { // Renamed for clarity
    setRole(loggedInRole);
    setWalletId(receivedWalletId); // Set the received walletId
    console.log("App.jsx - Login Success, new role:", loggedInRole, "Wallet ID:", receivedWalletId); // Added walletId to log
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setRole('contributor');
    setWalletId(""); // Clear walletId on logout
    navigate('/');
  };

  const DashboardSelector = () =>
    role === 'developer'
      ? <DeveloperDashboard walletId={walletId} />
      : <ContributorDashboard walletId={walletId} />;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage onRoleSelect={handleRoleSelect} />} />
      <Route
        path="/login"
        element={
          <LoginPage
            onLoginSuccess={(wallet) => handleLoginSuccess('contributor', wallet)} // <-- Pass wallet here
          />
        }
      />
      <Route
        path="/developer-login"
        element={
          <DeveloperLoginPage
            onLoginSuccess={(wallet) => handleLoginSuccess('developer', wallet)} // <-- Pass wallet here
          />
        }
      />

      {/* Main Application Routes */}
      <Route element={<MainLayout role={role} onLogout={handleLogout} />}>
        <Route path="/dashboard" element={<DashboardSelector />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create" element={<CreateDataset />} />
      </Route>

      {/* Catch-all for any other route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
