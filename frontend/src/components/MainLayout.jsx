import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import './MainLayout.css';

const MainLayout = ({ role, onLogout }) => {
  return (
    <div className="layout-container">
      <Sidebar role={role} />
      <main className="layout-main-content">
        <Outlet context={{ role, onLogout }} />
      </main>
    </div>
  );
};

export default MainLayout;