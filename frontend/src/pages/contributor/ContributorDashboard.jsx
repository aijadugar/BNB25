// import React, { useEffect, useState } from 'react';
// import './ContributorDashboard.css';

// const ContributionsTable = () => {
//   const demoWallet = "soham"; // replace with dynamic wallet later
//   const [contributions, setContributions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const ContributorDashboard = ({ walletId }) => {
//     return (
//       <div>
//         <h2>Welcome!</h2>
//         <p>Your wallet ID: {walletId}</p>
//         <ContributionsTable walletId={walletId} />
//       </div>
//     );
//   };
  
//   useEffect(() => {
//     const fetchContributions = async () => {
//       try {
//         setLoading(true);
//         setError('');
//         console.log('Fetching contributions for wallet:', demoWallet);

//         const res = await fetch(`http://localhost:5000/api/pool/purchases/${demoWallet}`);
//         const data = await res.json();

//         if (data.success && data.pools) {
//           const formatted = [];
//           const purchases = data.purchases || [];

//           // Pools where demoWallet is a contributor
//           data.pools.forEach((pool) => {
//             const contributor = pool.contributors.find(c => c.wallet === demoWallet);
//             if (contributor) {
//               formatted.push({
//                 id: pool.poolId,
//                 name: pool.datasetName,
//                 category: pool.category,
//                 cid: contributor.cid,
//                 royalties: `$${contributor.earnings || 0}`,
//                 ratings: "★★★★☆"
//               });
//             }
//           });

//           // Include purchases if not already added
//           purchases.forEach((purchase) => {
//             const pool = data.pools.find(p => p.poolId === purchase.poolId);
//             if (pool) {
//               const contributor = pool.contributors.find(c => c.wallet === demoWallet);
//               if (contributor && !formatted.some(f => f.id === pool.poolId)) {
//                 formatted.push({
//                   id: pool.poolId,
//                   name: pool.datasetName,
//                   category: pool.category,
//                   cid: contributor.cid,
//                   royalties: `$${contributor.earnings || 0}`,
//                   ratings: "★★★★☆"
//                 });
//               }
//             }
//           });

//           setContributions(formatted);
//         } else {
//           setContributions([]);
//         }
//       } catch (err) {
//         console.error('Error fetching contributions:', err);
//         setError('Failed to fetch contributions.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchContributions();
//   }, []);

//   if (loading) return <p>Loading contributions...</p>;
//   if (error) return <p style={{ color: 'red' }}>{error}</p>;

//   return (
//     <section className="contributions-section">
//       <h3>My Contributions</h3>
//       {contributions.length > 0 ? (
//         <div className="contributions-table">
//           <div className="table-header">
//             <div>Pool ID</div>
//             <div>Dataset Name</div>
//             <div>Category</div>
//             <div>CID</div>
//             <div>Royalties Earned</div>
//             <div>Ratings</div>
//           </div>
//           {contributions.map((item) => (
//             <div className="table-row" key={item.id}>
//               <div>{item.id}</div>
//               <div>{item.name}</div>
//               <div>{item.category}</div>
//               <div>{item.cid}</div>
//               <div className="royalties">{item.royalties}</div>
//               <div className="ratings">{item.ratings}</div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <div className="no-contributions">
//           <p>You haven't made any contributions yet.</p>
//           <p>Upload a dataset to start earning royalties!</p>
//         </div>
//       )}
//     </section>
//   );
// };

// export default ContributionsTable;
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

  // State for dynamic wallet balance, potentially fetched from an API
  const [walletBalance, setWalletBalance] = useState("$0.00"); // Initialize with a default

  // --- DEBUGGING LINE ---
  console.log("ContributorDashboard - Received walletId:", walletId);

  useEffect(() => {
    if (walletId) {
      // In a real application, you would fetch the actual wallet balance here
      // For now, using a static value or prop if available
      setWalletBalance("$1,200.00"); // Using a static value for demonstration
    } else {
      setWalletBalance("$0.00"); // Reset if no walletId
    }
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
          <p className="value">{walletBalance}</p> {/* Display dynamic/fetched balance */}
          {walletId && ( // This conditional rendering requires walletId to be truthy
            <p className="wallet-id-display">
              ID: <span className="wallet-id-value">{walletId}</span>
            </p>
          )}
          <button className="withdraw-btn" onClick={handleWithdraw}>Withdraw</button>
        </div>
      </div>
      <ContributionsTable walletId={walletId} /> {/* Pass walletId to the table */}
    </>
  );
};

export default ContributorDashboard;
