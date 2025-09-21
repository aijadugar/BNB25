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
  const { onLogout } = useOutletContext(); // Get onLogout from context

  return (
    <>
      <DashboardHeader title="Explore Data Pools" onLogout={onLogout} />

      <section className="explore-section">
        {pools.length > 0 ? (
          <div className="explore-table">
            <div className="table-header">
              <div>Pool ID</div>
              <div>Dataset Name</div>
              <div>Category</div>
              <div>Type</div>
              <div>Size</div>
              <div>Price</div>
              <div>Description</div>
              <div>Action</div>
            </div>

            {pools.map((pool) => (
              <div className="table-row" key={pool.poolId}>
                <div>#{pool.poolId}</div>
                <div>{pool.datasetName}</div>
                <div>{pool.category}</div>
                <div>{pool.type}</div>
                <div>{pool.totalSize} MB</div>
                <div className="price">${pool.price}</div>
                <div>{pool.description}</div>
                <div>
                  <button
                    className="preview-btn"
                    onClick={() => handlePreview(pool.poolId)}
                  >
                    Preview
                  </button>
                  <button
                    className="pay-btn"
                    onClick={() => handlePayAndAccess(pool.poolId)}
                  >
                    Pay & Access
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-data">
            <p>No datasets found.</p>
          </div>
        )}
      </section>
    </>
  );
};

export default DeveloperExplore;
