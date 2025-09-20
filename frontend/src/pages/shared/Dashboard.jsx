import React from 'react';
import { useOutletContext } from 'react-router-dom'; // Import the hook
import DashboardHeader from '../../components/DashboardHeader';
import ContributionsTable from '../../components/ContributionsTable';

const Dashboard = () => {
  const { role } = useOutletContext(); // Access the role from the layout
  const title = role === 'developer' ? 'Developer Dashboard' : 'Contributor Dashboard';

  return (
    <>
      <DashboardHeader title={title} />

      {/* Only show the contributions table for the contributor role */}
      {role === 'contributor' ? (
        <ContributionsTable />
      ) : (
        <div className="placeholder-content">
          <h3>Welcome, Developer!</h3>
          <p>This is the developer dashboard. Analytics and system status will be shown here.</p>
        </div>
      )}
    </>
  );
};

export default Dashboard;