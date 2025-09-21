import React from 'react';
import './ContributionsTable.css';

const ContributionsTable = ({ contributions, loading, error }) => {
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
              <div className="royalties">{`$${(item.royalties || 0).toFixed(2)}`}</div>
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
