// ContributionsTable.jsx
import React, { useEffect, useState } from 'react';
import './ContributorDashboard.css';

const ContributionsTable = ({ walletId }) => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!walletId) return; // wait until walletId is available

    const fetchContributions = async () => {
      try {
        setLoading(true);
        setError('');
        console.log('Fetching contributions for wallet:', walletId);

        const res = await fetch(`http://localhost:5000/api/pool/purchases/${walletId}`);
        const data = await res.json();

        if (data.success && data.pools) {
          const formatted = [];
          const purchases = data.purchases || [];

          // Pools where walletId is a contributor
          data.pools.forEach(pool => {
            const contributor = pool.contributors.find(c => c.wallet === walletId);
            if (contributor) {
              formatted.push({
                id: pool.poolId,
                name: pool.datasetName,
                category: pool.category,
                cid: contributor.cid,
                royalties: `$${contributor.earnings || 0}`,
                ratings: "★★★★☆"
              });
            }
          });

          // Include purchases if not already added
          purchases.forEach(purchase => {
            const pool = data.pools.find(p => p.poolId === purchase.poolId);
            if (pool) {
              const contributor = pool.contributors.find(c => c.wallet === walletId);
              if (contributor && !formatted.some(f => f.id === pool.poolId)) {
                formatted.push({
                  id: pool.poolId,
                  name: pool.datasetName,
                  category: pool.category,
                  cid: contributor.cid,
                  royalties: `$${contributor.earnings || 0}`,
                  ratings: "★★★★☆"
                });
              }
            }
          });

          setContributions(formatted);
        } else {
          setContributions([]);
        }
      } catch (err) {
        console.error('Error fetching contributions:', err);
        setError('Failed to fetch contributions.');
      } finally {
        setLoading(false);
      }
    };

    fetchContributions();
  }, [walletId]);

  if (loading) return <p>Loading contributions...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <section className="contributions-section">
      <h3>My Contributions</h3>
      {contributions.length > 0 ? (
        <div className="contributions-table">
          <div className="table-header">
            <div>Pool ID</div>
            <div>Dataset Name</div>
            <div>Category</div>
            <div>CID</div>
            <div>Royalties Earned</div>
            <div>Ratings</div>
          </div>
          {contributions.map(item => (
            <div className="table-row" key={item.id}>
              <div>{item.id}</div>
              <div>{item.name}</div>
              <div>{item.category}</div>
              <div>{item.cid}</div>
              <div className="royalties">{item.royalties}</div>
              <div className="ratings">{item.ratings}</div>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-contributions">
          <p>You haven't made any contributions yet.</p>
          <p>Upload a dataset to start earning royalties!</p>
        </div>
      )}
    </section>
  );
};

export default ContributionsTable;
