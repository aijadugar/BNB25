import React from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = ({ role }) => {
  const developerLinks = (
    <>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/explore">Explore</NavLink>
      <NavLink to="/settings">Settings</NavLink>
    </>
  );

  const contributorLinks = (
    <>
      <NavLink to="/dashboard">Dashboard</NavLink>
      <NavLink to="/create">Create</NavLink>
      <NavLink to="/settings">Settings</NavLink>
    </>
  );

  return (
    <aside className="sidebar">
      <h1 className="logo">Synapse Ledger</h1>
      <nav className="sidebar-nav">
        {role === 'developer' ? developerLinks : contributorLinks}
      </nav>
    </aside>
  );
};

export default Sidebar;