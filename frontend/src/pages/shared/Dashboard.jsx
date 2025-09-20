import React from 'react';
import { useOutletContext } from 'react-router-dom';
import DashboardHeader from '../../components/DashboardHeader';
import ContributionsTable from '../../components/ContributionsTable';
import PurchasesTable from '../../components/PurchasesTable';
import DeveloperStats from '../../components/DeveloperStats'; // Import the new component

const Dashboard = () => {
  const { role, onLogout } = useOutletContext();
  const title = role === 'developer' ? 'Developer Dashboard' : 'Contributor Dashboard';

  return (
    <>
      <DashboardHeader title={title} onLogout={onLogout} />

      {role === 'contributor' ? (
        <ContributionsTable />
      ) : (
        <>
          <DeveloperStats />
          <PurchasesTable />
        </>
      )}
    </>
  );
};

export default Dashboard;