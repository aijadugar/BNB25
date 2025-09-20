import React from 'react';
import './DashboardHeader.css';

const DashboardHeader = ({ title = "Contributor Dashboard" }) => {
  return (
    <header className="dashboard-header">
      <h2>{title}</h2>
      <div className="profile-menu">
        <div className="profile-icon">S</div>
      </div>
    </header>
  );
};

export default DashboardHeader;