import React, { useState } from 'react';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

// Layout Component
import MainLayout from './components/MainLayout';

// Page Components from their new locations
import Dashboard from './pages/shared/Dashboard';
import Settings from './pages/shared/Settings';
import CreateDataset from './pages/contributor/CreateDataset';
import Explore from './pages/developer/Explore';
import NotFound from './pages/NotFound';
import LandingPage from './pages/landingpage';

function App() {
  const [role, setRole] = useState('contributor');
  const location = useLocation();
  const navigate = useNavigate();

  const toggleRole = () => {
    const newRole = role === 'contributor' ? 'developer' : 'contributor';
    const currentPath = location.pathname;

    if (currentPath === '/create' && newRole === 'developer') {
      navigate('/dashboard');
    } else if (currentPath === '/explore' && newRole === 'contributor') {
      navigate('/dashboard');
    }

    setRole(newRole);
  };

  return (
    <>
      <button onClick={toggleRole} className="role-toggle-btn">
        Switch to {role === 'contributor' ? 'Developer' : 'Contributor'} View
      </button>

      <Routes>
        <Route path="/" element={<MainLayout role={role} />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="explore" element={<Explore />} />
          <Route path="create" element={<CreateDataset />} />
          <Route path="settings" element={<Settings />} />
          <Route path="landing" element={<LandingPage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
