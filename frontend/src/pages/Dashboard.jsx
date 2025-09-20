import React from 'react';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import ContributionsTable from '../components/ContributionsTable';
import './Dashboard.css';

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <main className="main-content">
        <DashboardHeader />
        <ContributionsTable />
      </main>
    </div>
  );
};

export default Dashboard;