import React, { useState } from 'react';
import PreviewModal from './PreviewModal'; // Import the modal
import './DatasetCard.css';

// Using a placeholder image URL
const placeholderImageUrl = 'https://via.placeholder.com/150x100.png?text=Data+Viz';

// The sample JSON data for the preview
const previewData = {
    "success": true,
    "message": "File uploaded and grouped successfully",
    "poolId": "1758373074420",
    "cid": "Qme0n3xttv",
    "tendermintResponse": {
        "jsonrpc": "2.0",
        "id": -1,
        "result": {
            "check_tx": { "code": 0 },
            "deliver_tx": { "code": 0 },
            "hash": "BA54739723C3092C930CBBFB0872AA0419A7B019C802A52CAC5387B02307633F",
            "height": "2105"
        }
    }
};

const DatasetCard = ({ dataset }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePreviewClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="dataset-card">
        <img src={placeholderImageUrl} alt={dataset.title} className="dataset-image" />
        <div className="dataset-details">
          <h3>{dataset.title}</h3>
          <p className="meta-info">
            Category: {dataset.category} | Data Type: {dataset.dataType}
          </p>
          <p className="meta-info">
            Size: {dataset.size} | Contributors: {dataset.contributors}
          </p>
          <p className="price">Price: <span>{dataset.price}</span></p>
        </div>
        <div className="dataset-actions">
          <button className="btn-preview" onClick={handlePreviewClick}>Preview</button>
          <button className="btn-access">Pay & Access</button>
        </div>
      </div>
      {isModalOpen && <PreviewModal data={previewData} onClose={handleCloseModal} />}
    </>
  );
};

export default DatasetCard;