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
import DeveloperLoginPage from './pages/DeveloperLoginPage';
import ContributorDashboard from './pages/contributor/ContributorDashboard';

function App() {
  const [role, setRole] = useState('contributor');
  const [walletId, setWalletId] = useState("");
  const navigate = useNavigate();

  const handleRoleSelect = (selectedRole) => {
    if (selectedRole === 'contributor') {
      navigate('/login');
    } else if (selectedRole === 'developer') {
      navigate('/developer-login');
    }
  };

  // Accept walletId from login page
  const handleLoginSuccess = (loggedInRole, walletId) => {
    setRole(loggedInRole);
    setWalletId(walletId);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setRole('contributor');
    navigate('/');
  };

  const DashboardSelector = () =>
    role === 'developer' ? <Dashboard /> : <ContributorDashboard />;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage onRoleSelect={handleRoleSelect} />} />
      <Route path="/login" element={<LoginPage onLoginSuccess={setWalletId} />} />
      <Route path="/dashboard" element={<ContributorDashboard walletId={walletId} />} />
      <Route
        path="/developer-login"
        element={
          <DeveloperLoginPage
            onLoginSuccess={() => handleLoginSuccess('developer')}
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
