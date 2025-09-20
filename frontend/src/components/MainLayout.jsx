import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './MainLayout.css';

const MainLayout = ({ role }) => {
  return (
    <div className="layout-container">
      <Sidebar role={role} />
      <main className="layout-main-content">
        {/* Pass the role down to nested components */}
        <Outlet context={{ role }} />
      </main>
    </div>
  );
};

export default MainLayout;