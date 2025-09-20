import React, { useState } from 'react';
import './DashboardHeader.css';

const DashboardHeader = ({ title = "Dashboard", onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="dashboard-header">
      <h2>{title}</h2>
      <div className="profile-menu">
        <div className="profile-icon" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
          S
        </div>
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <button onClick={onLogout} className="dropdown-item">
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;