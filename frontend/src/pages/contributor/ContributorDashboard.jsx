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



const handleWithdraw2 = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/contributor/withdraw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet: walletId }) // replace with actual wallet
    });
    const data = await res.json();
    if (data.success) {
      alert(`Successfully withdrawn: $${data.withdrawn}`);
      // fetchContributions();  <-- remove or replace with proper refresh
    } else {
      alert("Withdrawal failed: " + data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Error processing withdrawal.");
  }
};




const ContributorDashboard = ({ walletId: propWalletId }) => {
  const context = useOutletContext();
  const walletId = propWalletId || (context && context.walletId);
  const onLogout = context && context.onLogout;

  const [walletBalance, setWalletBalance] = useState("$0.00");
  const handleWithdraw = async (walletId) => {
    if (!walletId) return;
  
    try {
      const res = await fetch("http://localhost:5000/api/contributor/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ wallet: walletId })
      });
      const data = await res.json();
      if (data.success) {
        alert(`Successfully withdrawn: $${data.withdrawn}`);
        // Optionally, refresh contributions to reset earnings display
        fetchContributions();
      } else {
        alert("Withdrawal failed: " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error processing withdrawal.");
    }
  };
  
  // --- DEBUGGING LINE ---
  console.log("ContributorDashboard - Received walletId:", walletId);

  useEffect(() => {
    if (!walletId) {
      setWalletBalance("$0.00");
      return;
    }

    const fetchWalletBalance = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/wallet/${walletId}`);
        
        // Check if the response is ok before trying to parse JSON
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();

        // --- FIX: Check for success AND a valid balance property ---
        if (data.success && (data.balance !== undefined && data.balance !== null)) {
          // Ensure balance is a number and format it to two decimal places
          setWalletBalance(`$${Number(data.balance).toFixed(2)}`);
        } else {
          // If success is false or balance is missing, default to $0.00
          setWalletBalance("$0.00");
        }
      } catch (err) {
        console.error("Error fetching wallet balance:", err);
        setWalletBalance("$0.00"); // Set to default on any error
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
          <button className="withdraw-btn" onClick={() => handleWithdraw(walletId)}>
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
