import React from 'react';
import './PurchasesTable.css';

// Sample data based on the JSON object provided
const purchasedData = [
  {
    "poolId": "1758373074420",
    "cids": [ "Qme0n3xttv", "Qmqvsfwi5x" ],
    "tendermintResponse": {
      "result": {
        "hash": "C4ADFCAFD017578A7F79F5FE479AFBBACD6AFE79AB540DA753964025B23DC9D1",
        "height": "1325"
      }
    }
  },
  {
    "poolId": "1758373074421",
    "cids": [ "QmYt456abc" ],
    "tendermintResponse": {
      "result": {
        "hash": "A1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6E7F8A9B0C1D2E3F4A5B6C7D8E9F0A1B2",
        "height": "1328"
      }
    }
  }
];

const PurchasesTable = () => {
  return (
    <section className="purchases-section">
      <h3>My Purchased Data Pools</h3>
      <div className="purchases-table">
        <div className="table-header">
          <div>Pool ID</div>
          <div>CIDs</div>
          <div>Transaction Hash</div>
          <div>Block Height</div>
        </div>
        {purchasedData.map((item) => (
          <div className="table-row" key={item.poolId}>
            <div>{item.poolId}</div>
            {/* Displaying the count of CIDs for brevity */}
            <div>{item.cids.length} CID(s)</div>
            <div className="hash-cell">{item.tendermintResponse.result.hash}</div>
            <div className="height-cell">{item.tendermintResponse.result.height}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PurchasesTable;