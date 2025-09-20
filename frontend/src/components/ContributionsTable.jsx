import React from 'react';
import './ContributionsTable.css';

const contributions = [
  { id: '#12345', name: 'Financial Data', category: 'Finance', cid: 'QmWx123...', royalties: '$500.00', ratings: '★★★★☆' },
  { id: '#67890', name: 'Medical Records', category: 'Healthcare', cid: 'QmYt456...', royalties: '$750.00', ratings: '★★★★★' },
  { id: '#11223', name: 'Retail Sales Data', category: 'Retail', cid: 'QmZp789...', royalties: '$300.00', ratings: '★★★☆☆' },
  { id: '#44556', name: 'Transportation Logs', category: 'Logistics', cid: 'QmAv812...', royalties: '$400.00', ratings: '★★★★☆' },
  { id: '#77889', name: 'Energy Consumption', category: 'Energy', cid: 'QmBq345...', royalties: '$600.00', ratings: '★★★★★' },
];
// To test the empty state, comment the line above and uncomment the line below
// const contributions = [];

const ContributionsTable = () => {
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