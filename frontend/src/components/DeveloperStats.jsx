import React from 'react';
import './DeveloperStats.css';

const DeveloperStats = () => {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <span className="stat-label">Total Spent</span>
        <h2 className="stat-value">$12,500</h2>
      </div>
      <div className="stat-card">
        <span className="stat-label">Datasets Purchased</span>
        <h2 className="stat-value">25</h2>
      </div>
      <div className="stat-card">
        <span className="stat-label">Developer Wallet</span>
        <div className="wallet-value-container">
          <h2 className="stat-value">$500</h2>
          <button className="add-money-btn">Add Money</button>
        </div>
      </div>
    </div>
  );
};

export default DeveloperStats;