import React from 'react';
import { useOutletContext } from 'react-router-dom';
import DashboardHeader from '../../components/DashboardHeader';
import DeveloperStats from '../../components/DeveloperStats';
import PurchasesTable from '../../components/PurchasesTable';

const DeveloperDashboard = () => {
  const { onLogout } = useOutletContext();

  return (
    <>
      <DashboardHeader title="Developer Dashboard" onLogout={onLogout} />
      <DeveloperStats />
      <PurchasesTable />
    </>
  );
};

export default DeveloperDashboard;