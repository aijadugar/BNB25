import React from "react";
import "./ContributionsTable.css";

const contributions = [
  { id: '#12345', name: 'Financial Data', category: 'Finance', cid: 'QmWx123...', royalties: '$500.00' },
  { id: '#67890', name: 'Medical Records', category: 'Healthcare', cid: 'QmYt456...', royalties: '$750.00' },
  { id: '#11223', name: 'Retail Sales Data', category: 'Retail', cid: 'QmZp789...', royalties: '$300.00' },
  { id: '#44556', name: 'Transportation Logs', category: 'Logistics', cid: 'QmAv812...', royalties: '$400.00' },
  { id: '#77889', name: 'Energy Consumption', category: 'Energy', cid: 'QmBq345...', royalties: '$600.00' },
];

// Example stats data
const stats = {
  totalEarnings: "$2,550.00",
  datasetsContributed: 5,
  walletBalance: "$1,200.00"
};

const handleWithdraw = () => {
  alert("Withdraw functionality coming soon!");
};

const ContributionsTable = ({ walletId }) => {
  return (
    <div className="contributor-dashboard">
      <h2>Contributor Dashboard</h2>
      <p className="subtext">
        Welcome back, Alex! Here's an overview of your contributions and earnings.
      </p>
      {/* Show walletId if present */}
      {walletId && (
        <div className="wallet-id-box">
          <strong>Wallet ID:</strong> <span className="wallet-id">{walletId}</span>
        </div>
      )}

      {/* Stats Section */}
      <div className="stats-cards">
        <div className="stat-card">
          <h4>Total Earnings</h4>
          <p className="value">{stats.totalEarnings}</p>
          <p className="change">+15% from last month</p>
        </div>
        <div className="stat-card">
          <h4>Datasets Contributed</h4>
          <p className="value">{stats.datasetsContributed}</p>
          <p className="change">+5 from last month</p>
        </div>
        <div className="stat-card">
          <h4>Contributor Wallet</h4>
          <p className="value">{stats.walletBalance}</p>
          <button className="withdraw-btn" onClick={handleWithdraw}>
            Withdraw
          </button>
        </div>
      </div>

      {/* Contributions Table */}
      <div className="contributions-section">
        <h3>My Contributed Data Pools</h3>
        <div className="contributions-table">
          <div className="table-header">
            <div>Pool ID</div>
            <div>Dataset Name</div>
            <div>Category</div>
            <div>CID</div>
            <div>Royalties Earned</div>
          </div>
          {contributions.map((item, idx) => (
            <div className="table-row" key={idx}>
              <div>{item.id}</div>
              <div>{item.name}</div>
              <div>{item.category}</div>
              <div>{item.cid}</div>
              <div className="royalties">{item.royalties}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContributionsTable;