import React, { useEffect, useState } from 'react';
import './ContributionsTable.css';

const ContributionsTable = ({ walletId }) => {
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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
        console.log('Fetching contributions for wallet:', walletId);

        // Call backend API to get pools by walletId
        const res = await fetch(`http://localhost:5000/api/wallet/${walletId}/pools`);
        const data = await res.json();
        console.log('Response data:', data);

        if (data.success && data.pools) {
          const formatted = data.pools.map(pool => {
            // Use optional chaining and default to empty array
            const contributor = (pool.contributors || []).find(c => c.wallet === walletId);
          
            return {
              id: pool.poolId || 'N/A',
              name: pool.datasetName || 'N/A',
              category: pool.category || 'N/A',
              cid: contributor?.cid || 'N/A',
              royalties: `$${contributor?.earnings || 0}`,
              ratings: pool.ratings || "★★★★☆",
            };
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

    // Optional: poll every 10 seconds to auto-refresh new uploads
    const interval = setInterval(fetchContributions, 10000);
    return () => clearInterval(interval);

  }, [walletId]);

  if (loading) return <p>Loading contributions...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <section className="contributions-section">
      <h3>My Contributed Data Pools</h3>
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
          {contributions.map((item) => (
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
