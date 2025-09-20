import React from 'react';
import './Dashboard.css';

// Sample data for the contributions table
const contributions = [
  { id: '#12345', name: 'Financial Data', category: 'Finance', cid: 'QmWx123...', royalties: '$500.00' },
  { id: '#67890', name: 'Medical Records', category: 'Healthcare', cid: 'QmYt456...', royalties: '$750.00' },
  { id: '#11223', name: 'Retail Sales Data', category: 'Retail', cid: 'QmZp789...', royalties: '$300.00' },
  { id: '#44556', name: 'Transportation Logs', category: 'Logistics', cid: 'QmAv812...', royalties: '$400.00' },
  { id: '#77889', name: 'Energy Consumption', category: 'Energy', cid: 'QmBq345...', royalties: '$600.00' },
];

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <h1 className="logo">Synapse Ledger</h1>
        <nav className="sidebar-nav">
          <a href="#">Home</a>
          <a href="#">Explore</a>
          <a href="#">Create</a>
          <a href="#" className="active">Dashboard</a>
          <a href="#">Settings</a>
        </nav>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h2>Contributor Dashboard</h2>
          <div className="profile-menu">
            {/* You can replace this with an icon or image */}
            <div className="profile-icon">S</div>
          </div>
        </header>

        <section className="contributions-section">
          <h3>My Contributions</h3>
          <div className="contributions-table">
            <div className="table-header">
              <div>Pool ID</div>
              <div>Dataset Name</div>
              <div>Category</div>
              <div>CID</div>
              <div>Royalties Earned</div>
            </div>
            {contributions.map((item) => (
              <div className="table-row" key={item.id}>
                <div>{item.id}</div>
                <div>{item.name}</div>
                <div>{item.category}</div>
                <div>{item.cid}</div>
                <div className="royalties">{item.royalties}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;