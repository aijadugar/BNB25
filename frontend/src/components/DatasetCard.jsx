import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import PreviewModal from './PreviewModal';
import './DatasetCard.css';

const DatasetCard = ({ dataset }) => {
  const [showPreview, setShowPreview] = useState(false);

  // Assume dataset.rating is a number from 0 to 5
  const rating = dataset.rating || 0;

  return (
    <div className="dataset-card">
      <div className="dataset-image"></div>
      <div className="dataset-details">
        <h3>{dataset.title}</h3>
        <p className="meta-info">{dataset.category} • {dataset.dataType} • {dataset.size}</p>
        <p className="price">Price: <span>{dataset.price}</span></p>
      </div>

      <div className="card-actions-container">
        <div className="dataset-actions">
          <button className="btn-preview" onClick={() => setShowPreview(true)}>Preview</button>
          <button className="btn-access">Pay & Access</button>
        </div>

        {/* Display-only star rating */}
        <div className="rating-section">
          <div className="star-rating">
            {[...Array(5)].map((_, index) => (
              <FaStar
                key={index}
                className="star-icon"
                color={index < rating ? "#ffc107" : "#e4e5e9"}
                size={20}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <PreviewModal data={dataset} onClose={() => setShowPreview(false)} />
      )}
    </div>
  );
};

export default DatasetCard;