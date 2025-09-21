// import React from 'react';
// import { useOutletContext } from 'react-router-dom'; // Import hook
// import DashboardHeader from '../../components/DashboardHeader';
// import DatasetCard from '../../components/DatasetCard';
// import './Explore.css';

// // Sample data for the datasets
// const sampleData = [
//   {
//     id: 1,
//     title: 'Corporate Bond Data Q1 2023',
//     category: 'Financial Data',
//     dataType: 'Structured',
//     size: '1.2 GB',
//     contributors: 25,
//     price: '500 SYN',
//   },
//   {
//     id: 2,
//     title: 'Clinical Trial Patient Demographics',
//     category: 'Healthcare Data',
//     dataType: 'Anonymized PII',
//     size: '800 MB',
//     contributors: 12,
//     price: '750 SYN',
//   },
//   {
//     id: 3,
//     title: 'E-commerce Product Reviews Analysis',
//     category: 'Retail Data',
//     dataType: 'Text',
//     size: '2.5 GB',
//     contributors: '150+',
//     price: '300 SYN',
//   },
// ];

// const Explore = () => {
//   const { onLogout } = useOutletContext(); // Get onLogout from context

//   return (
//     <>
//       <DashboardHeader title="Explore Data Pools" onLogout={onLogout} />

//       <section className="explore-section">
//         {pools.length > 0 ? (
//           <div className="explore-table">
//             <div className="table-header">
//               <div>Pool ID</div>
//               <div>Dataset Name</div>
//               <div>Category</div>
//               <div>Type</div>
//               <div>Size</div>
//               <div>Price</div>
//               <div>Description</div>
//               <div>Action</div>
//             </div>

//             {pools.map((pool) => (
//               <div className="table-row" key={pool.poolId}>
//                 <div>#{pool.poolId}</div>
//                 <div>{pool.datasetName}</div>
//                 <div>{pool.category}</div>
//                 <div>{pool.type}</div>
//                 <div>{pool.totalSize} MB</div>
//                 <div className="price">${pool.price}</div>
//                 <div>{pool.description}</div>
//                 <div>
//                   <button
//                     className="preview-btn"
//                     onClick={() => handlePreview(pool.poolId)}
//                   >
//                     Preview
//                   </button>
//                   <button
//                     className="pay-btn"
//                     onClick={() => handlePayAndAccess(pool.poolId)}
//                   >
//                     Pay & Access
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <div className="no-data">
//             <p>No datasets found.</p>
//           </div>
//         )}
//       </section>
//     </>
//   );
// };

// export default Explore;

import React, { useState } from 'react';
import DatasetCard from '../../components/DatasetCard';
import "./Explore.css";

// Example datasets array. Replace with your actual data source.
const datasets = [
  {
    poolID: 'pool1',
    title: 'Corporate Bond Data Q1 2023',
    category: 'Financial Data',
    dataType: 'Image',
    size: '1.2 GB',
    price: '$50',
    rating: 4,
    contributors: 10,
    tendermintResponse: { hash: 'abc123', height: 100 }
  },
  {
    poolID: 'pool2',
    title: 'Clinical Trial Patient Demographics',
    category: 'Healthcare Data',
    dataType: 'CSV',
    size: '800 MB',
    price: '$22.5',
    rating: 5,
    contributors: 8,
    tendermintResponse: { hash: 'def456', height: 101 }
  },
  {
    poolID: 'pool3',
    title: 'E-commerce Product Reviews Analysis',
    category: 'Retail Data',
    dataType: 'Text',
    size: '2.5 GB',
    price: '$80',
    rating: 3,
    contributors: 5,
    tendermintResponse: { hash: 'ghi789', height: 102 }
  }
];

const ExplorePools = () => {
  const [confirmingPoolId, setConfirmingPoolId] = useState(null);

  const handleConfirm = (poolId) => {
    alert(`Confirmed payment for pool: ${poolId}`);
    setConfirmingPoolId(null);
  };

  return (
    <div className="explore-container">
      <div className="main-content">
        <h1 className="page-title">Explore Data Pools</h1>
        {/* You can add a filter bar here if needed */}
        <div className="dataset-list">
          {datasets.map(dataset => (
            <DatasetCard
              key={dataset.poolID}
              dataset={dataset}
              confirmingPoolId={confirmingPoolId}
              setConfirmingPoolId={setConfirmingPoolId}
              handleConfirm={handleConfirm}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExplorePools;