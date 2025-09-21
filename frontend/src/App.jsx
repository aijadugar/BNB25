import React, { useState, useEffect } from 'react'; // Import useEffect
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
import DeveloperDashboard from './pages/developer/DeveloperDashboard'; // Ensure this is imported

function App() {
  // Initialize state from localStorage or default
  const [role, setRole] = useState(localStorage.getItem('userRole') || 'contributor');
  const [walletId, setWalletId] = useState(localStorage.getItem('walletId') || "");
  const navigate = useNavigate();

  console.log("App.jsx - Current Role:", role, "Current Wallet ID:", walletId);

  // Effect to update localStorage when role or walletId changes
  useEffect(() => {
    if (role) {
      localStorage.setItem('userRole', role);
    } else {
      localStorage.removeItem('userRole');
    }
    if (walletId) {
      localStorage.setItem('walletId', walletId);
    } else {
      localStorage.removeItem('walletId');
    }
  }, [role, walletId]);


  const handleRoleSelect = (selectedRole) => {
    if (selectedRole === 'contributor') {
      navigate('/login');
    } else if (selectedRole === 'developer') {
      navigate('/developer-login');
    }
  };

  const handleLoginSuccess = (loggedInRole, receivedWalletId) => {
    setRole(loggedInRole);
    setWalletId(receivedWalletId);
    console.log("App.jsx - Login Success, new role:", loggedInRole, "Wallet ID:", receivedWalletId);
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setRole('contributor'); // Reset role
    setWalletId(""); // Clear walletId
    localStorage.removeItem('userRole'); // Clear from localStorage
    localStorage.removeItem('walletId'); // Clear from localStorage
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
            onLoginSuccess={(wallet) => handleLoginSuccess('contributor', wallet)}
          />
        }
      />
      <Route
        path="/developer-login"
        element={
          <DeveloperLoginPage
            onLoginSuccess={(wallet) => handleLoginSuccess('developer', wallet)}
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
