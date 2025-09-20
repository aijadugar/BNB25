import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './MainLayout.css';

const MainLayout = ({ role }) => { // Removed toggleRole from props
  return (
    <div className="layout-container">
      <Sidebar role={role} />
      <main className="layout-main-content">
        <Outlet context={{ role }} />
      </main>
      {/* The button element has been removed from here */}
    </div>
  );
};

export default MainLayout;