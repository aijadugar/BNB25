import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import DashboardHeader from '../../components/DashboardHeader';
import ContributionsTable from '../../components/ContributionsTable';
import './ContributorDashboard.css';

const handleWithdraw = () => {
  alert("Withdraw functionality coming soon!");
};

const ContributorDashboard = ({ walletId: propWalletId }) => {
  const context = useOutletContext();
  const walletId = propWalletId || (context && context.walletId);
  const onLogout = context && context.onLogout;

  // State for data and calculations
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [walletBalance, setWalletBalance] = useState("$0.00");
  const [datasetsContributed, setDatasetsContributed] = useState(0);

  // --- DEBUGGING LINE ---
  console.log("ContributorDashboard - Received walletId:", walletId);

  // 1. Fetch contributions data
  useEffect(() => {
    if (!walletId) {
      setLoading(false);
      setContributions([]);
      return;
    }

    const fetchContributions = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await fetch(`http://localhost:5000/api/pool/purchases/${walletId}`);
        const data = await res.json();

        if (data.success && data.pools) {
          const formatted = data.pools
            .map(pool => {
              const contributor = pool.contributors.find(c => c.wallet === walletId);
              return contributor ? {
                id: pool.poolId,
                name: pool.datasetName,
                category: pool.category,
                cid: contributor.cid,
                royalties: contributor.earnings || 0, // Store as a number
                ratings: "★★★★☆" // Placeholder
              } : null;
            })
            .filter(Boolean); // Remove null entries

          setContributions(formatted);
        } else {
          setContributions([]);
        }
      } catch (err) {
        console.error("Error fetching contributions:", err);
        setError('Failed to fetch contributions.');
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [walletId]);

  // 2. Calculate wallet balance and other stats when contributions data changes
  useEffect(() => {
    if (contributions.length > 0) {
      const totalRoyalties = contributions.reduce((sum, contribution) => {
        return sum + (contribution.royalties || 0);
      }, 0);

      setWalletBalance(`$${totalRoyalties.toFixed(2)}`);
      setDatasetsContributed(contributions.length);
    } else {
      setWalletBalance("$0.00");
      setDatasetsContributed(0);
    }
  }, [contributions]);

  return (
    <>
      <DashboardHeader title="Contributor Dashboard" onLogout={onLogout} />

      <div className="stats-cards">
        <div className="stat-card">
          <h4>Total Earnings</h4>
          <p className="value">{walletBalance}</p> {/* Now dynamic */}
          <p className="change">+15% from last month</p>
        </div>

        <div className="stat-card">
          <h4>Datasets Contributed</h4>
          <p className="value">{datasetsContributed}</p> {/* Now dynamic */}
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

      {/* Pass data down to the table component */}
      <ContributionsTable
        contributions={contributions}
        loading={loading}
        error={error}
      />
    </>
  );
};

export default ContributorDashboard;
