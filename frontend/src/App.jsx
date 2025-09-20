import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';

// Layout Component
import MainLayout from './components/MainLayout';

// Page Components
import LandingPage from './pages/landingpage';
import Dashboard from './pages/shared/Dashboard';
import Settings from './pages/shared/Settings';
import CreateDataset from './pages/contributor/CreateDataset';
import Explore from './pages/developer/Explore';
import NotFound from './pages/NotFound';

function App() {
  const [role, setRole] = useState('contributor'); // Default role
  const navigate = useNavigate();

  // This function will be called from the landing page
  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole === 'contributor') {
      navigate('/create'); // Navigate to the contributor's starting page
    } else if (selectedRole === 'developer') {
      navigate('/explore'); // Navigate to the developer's starting page
    }
  };

  return (
    <Routes>
      {/* Pass the role selection handler to the LandingPage */}
      <Route path="/" element={<LandingPage onRoleSelect={handleRoleSelect} />} />

      {/* Application Routes */}
      <Route element={<MainLayout role={role} />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/create" element={<CreateDataset />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      {/* Catch-all for any other route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
