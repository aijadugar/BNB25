import React from 'react';
import './PreviewModal.css';

const PreviewModal = ({ data, onClose }) => {
  if (!data) return null;

  // Extract the important points from the JSON
  const importantData = {
    'Pool ID': data.poolID,
    Contributors: data.contributors,
    'Transaction Hash': data.tendermintResponse?.hash,
    'Block Height': data.tendermintResponse?.height,
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Info & Transaction Preview</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>
        <div className="modal-body">
          {Object.entries(importantData).map(([key, value]) => (
            <div className="data-row" key={key}>
              <span className="data-key">{key}:</span>
              <span className="data-value">{value || 'N/A'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;