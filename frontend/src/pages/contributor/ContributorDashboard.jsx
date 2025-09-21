import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import DashboardHeader from '../../components/DashboardHeader';
import ContributionsTable from '../../components/ContributionsTable';
import './ContributorDashboard.css';

// Placeholder stats data. In a real app, these would be fetched from an API.
const staticStats = {
  totalEarnings: "$2,550.00",
  datasetsContributed: 5,
};

const handleWithdraw = () => {
  alert("Withdraw functionality coming soon!");
};

const ContributorDashboard = ({ walletId: propWalletId }) => {
  const context = useOutletContext();
  const walletId = propWalletId || (context && context.walletId);
  const onLogout = context && context.onLogout;

  // State for dynamic wallet balance
  const [walletBalance, setWalletBalance] = useState("$0.00");

  // --- DEBUGGING LINE ---
  console.log("ContributorDashboard - Received walletId:", walletId);

  useEffect(() => {
    if (!walletId) {
      setWalletBalance("$0.00");
      return;
    }

    // Fetch wallet balance from backend API
    const fetchWalletBalance = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/wallet/${walletId}`);
        const data = await res.json();

        if (data.success) {
          setWalletBalance(`$${data.balance}`);
        } else {
          setWalletBalance("$0.00");
        }
      } catch (err) {
        console.error("Error fetching wallet balance:", err);
        setWalletBalance("$0.00");
      }
    };

    fetchWalletBalance();
  }, [walletId]);

  return (
    <>
      <DashboardHeader title="Contributor Dashboard" onLogout={onLogout} />

      <div className="stats-cards">
        <div className="stat-card">
          <h4>Total Earnings</h4>
          <p className="value">{staticStats.totalEarnings}</p>
          <p className="change">+15% from last month</p>
        </div>

        <div className="stat-card">
          <h4>Datasets Contributed</h4>
          <p className="value">{staticStats.datasetsContributed}</p>
          <p className="change">+5 from last month</p>
        </div>

        <div className="stat-card">
          <h4>Contributor Wallet</h4>
          <p className="value">{walletBalance}</p> {/* Dynamic balance */}
          {walletId && (
            <p className="wallet-id-display">
              ID: <span className="wallet-id-value">{walletId}</span>
            </p>
          )}
          <button className="withdraw-btn" onClick={handleWithdraw}>
            Withdraw
          </button>
        </div>
      </div>

      {/* Contributions Table */}
      <ContributionsTable walletId={walletId} />
    </>
  );
};

export default ContributorDashboard;
