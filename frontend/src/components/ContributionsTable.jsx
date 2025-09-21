import React, { useState } from "react";
import "./ContributionsTable.css";

const ContributorDashboard = () => {
  // Dummy state (replace later with backend API data)
  const [stats] = useState({
    totalEarnings: "$1,250.00",
    datasetsContributed: 42,
    walletBalance: "$875.00",
  });

  const [contributions] = useState([
    { poolId: "#12345", cid: "QmXw...123", txHash: "0xabc...def", blockHeight: 123456 },
    { poolId: "#67890", cid: "QmYz...456", txHash: "0xghi...k1", blockHeight: 654321 },
    { poolId: "#11223", cid: "QmSt...789", txHash: "0xjmo...pqr", blockHeight: 987654 },
    { poolId: "#44556", cid: "QmUv...012", txHash: "0xstu...wx", blockHeight: 246810 },
    { poolId: "#77889", cid: "QmAb...345", txHash: "0xvza...bcd", blockHeight: 135792 },
  ]);

  const handleWithdraw = () => {
    console.log("Withdraw initiated...");
    alert("Withdraw request sent!");
  };

  return (
    <div className="contributor-dashboard">
      <h2>Contributor Dashboard</h2>
      <p className="subtext">
        Welcome back, Alex! Here's an overview of your contributions and earnings.
      </p>

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
            <div>CID(s)</div>
            <div>Transaction Hash</div>
            <div>Block Height</div>
          </div>
          {contributions.map((item, idx) => (
            <div className="table-row" key={idx}>
              <div>{item.poolId}</div>
              <div>{item.cid}</div>
              <div>{item.txHash}</div>
              <div>{item.blockHeight}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContributorDashboard;