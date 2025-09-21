import React, { useEffect, useState } from 'react';
import './PreviewModal.css';

const PreviewModal = ({ onClose, isPaymentConfirmed = false }) => {
  const poolId = "1758407645572"; // Hardcoded for now
  const [poolData, setPoolData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPoolData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:5000/api/pools/${poolId}`);
        const result = await res.json();
        if (result.success) setPoolData(result);
        else setError('Failed to fetch pool details.');
      } catch (err) {
        console.error(err);
        setError('Error fetching pool details.');
      } finally {
        setLoading(false);
      }
    };

    fetchPoolData();
  }, [poolId]);

  // Generate demo block height and txHash if not present
  const blockHeight = poolData?.height || Math.floor(Math.random() * 10000);
  const txHash = poolData?.tendermintResponse?.hash || Math.random().toString(36).substring(2, 18).toUpperCase();
  const timestamp = new Date().toLocaleString();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Info & Transaction Preview</h2>
          <button className="close-button" onClick={onClose}>&times;</button>
        </div>

        <div className="modal-body">
          {loading && <p>Loading pool details...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {poolData && (
            <>
              <div className="data-row">
                <span className="data-key">Pool ID:</span>
                <span className="data-value">{poolData.poolId || 'N/A'}</span>
              </div>
              <div className="data-row">
                <span className="data-key">Block Height:</span>
                <span className="data-value">{blockHeight}</span>
              </div>
              <div className="data-row">
                <span className="data-key">Transaction Hash:</span>
                <span className="data-value">{txHash}</span>
              </div>
              <div className="data-row">
                <span className="data-key">Timestamp:</span>
                <span className="data-value">{timestamp}</span>
              </div>
              <div className="data-row">
                <span className="data-key">Total CIDs:</span>
                <span className="data-value">{poolData.cids?.length || 0}</span>
              </div>

              {isPaymentConfirmed ? (
                <div className="access-dataset">
                  <a href={`/access-dataset/${poolData.poolId}`} className="btn-access-dataset">
                    Access Dataset
                  </a>
                </div>
              ) : (
                <p style={{ color: 'gray' }}>Payment required to access dataset.</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;
