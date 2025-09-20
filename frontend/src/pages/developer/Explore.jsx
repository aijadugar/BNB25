import React from 'react';
import { useOutletContext } from 'react-router-dom'; // Import hook
import DashboardHeader from '../../components/DashboardHeader';
import DatasetCard from '../../components/DatasetCard';
import './Explore.css';

// Sample data for the datasets
const sampleData = [
  {
    id: 1,
    title: 'Corporate Bond Data Q1 2023',
    category: 'Financial Data',
    dataType: 'Image',
    size: '1.2 GB',
    contributors: 25,
    price: '$50',
    rating: 4,
    poolID: 2133252341,
    "tendermintResponse": {
    hash: "bdco8aboe8ycbowa8c7bao837cbo387wc",
    height: 3213
    }
  },
  {
    id: 2,
    title: 'Clinical Trial Patient Demographics',
    category: 'Healthcare Data',
    dataType: 'CSV',
    size: '800 MB',
    contributors: 12,
    price: '$22.5',
    rating: 5,
    poolID: 2133252341,
    "tendermintResponse": {
    hash: "bdco8aboe8ycbowa8c7bao837cbo387wc",
    height: 3213
    }
  },
  {
    id: 3,
    title: 'E-commerce Product Reviews Analysis',
    category: 'Retail Data',
    dataType: 'Text',
    size: '2.5 GB',
    contributors: '150+',
    price: '$80',
    rating: 2,
    poolID: 2133252341,
    "tendermintResponse": {
    hash: "bdco8aboe8ycbowa8c7bao837cbo387wc",
    height: 3213
    }
  },
];

const Explore = () => {
  const { onLogout } = useOutletContext(); // Get onLogout from context

  return (
    <>
      <DashboardHeader title="Explore Data Pools" onLogout={onLogout} />

      <div className="filter-bar">
        <input type="text" placeholder="Search for datasets..." className="search-input" />
        <div className="filter-dropdowns">
          <select name="dataType" className="dropdown">
            <option value="">Data Type</option>
            <option value="structured">Structured</option>
            <option value="text">Text</option>
          </select>
          <select name="category" className="dropdown">
            <option value="">Category</option>
            <option value="finance">Finance</option>
            <option value="healthcare">Healthcare</option>
          </select>
        </div>
      </div>

      <div className="dataset-list">
        {sampleData.map(dataset => (
          <DatasetCard key={dataset.id} dataset={dataset} />
        ))}
      </div>
    </>
  );
};

export default Explore;