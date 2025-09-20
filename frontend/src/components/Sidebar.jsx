import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h1 className="logo">Synapse Ledger</h1>
      <nav className="sidebar-nav">
        <NavLink to="/home">Home</NavLink>
        <NavLink to="/explore">Explore</NavLink>
        <NavLink to="/create">Create</NavLink>
        <NavLink to="/dashboard">Dashboard</NavLink>
        <NavLink to="/settings">Settings</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;