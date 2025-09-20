import React from 'react';
import './Sidebar.css';

const Sidebar = () => {
  return (
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
  );
};

export default Sidebar;