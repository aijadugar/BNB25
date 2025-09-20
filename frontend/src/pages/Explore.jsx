import React from 'react';
import Sidebar from '../components/Sidebar';
import DatasetCard from '../components/DatasetCard';
import './Explore.css';

// Sample data for the datasets
const sampleData = [
  {
    id: 1,
    title: 'Corporate Bond Data Q1 2023',
    category: 'Financial Data',
    dataType: 'Structured',
    size: '1.2 GB',
    contributors: 25,
    price: '500 SYN',
  },
  {
    id: 2,
    title: 'Clinical Trial Patient Demographics',
    category: 'Healthcare Data',
    dataType: 'Anonymized PII',
    size: '800 MB',
    contributors: 12,
    price: '750 SYN',
  },
  {
    id: 3,
    title: 'E-commerce Product Reviews Analysis',
    category: 'Retail Data',
    dataType: 'Text',
    size: '2.5 GB',
    contributors: '150+',
    price: '300 SYN',
  },
];

const Explore = () => {
  return (
    <div className="explore-container">
      <Sidebar />
      <main className="main-content">
        <h1 className="page-title">Explore Data Pools</h1>

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
      </main>
    </div>
  );
};

export default Explore;