import React, { useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom';
import DashboardHeader from '../../components/DashboardHeader';
import './CreateDataset.css';

function CreateDataset() {
  const { onLogout } = useOutletContext();
  const [datasetName, setDatasetName] = useState('');
  const [dataType, setDataType] = useState('CSV');
  const [category, setCategory] = useState('Finance');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const [price, setPrice] = useState(100); // default dataset price
  const [size, setSize] = useState(10);   // default size in MB

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!file) {
      setError('Please upload a file.');
      return;
    }

    try {
      setLoading(true);

      // Build payload (backend expects JSON, not FormData in your case)
      const payload = {
        contributorWallet: "cosmos7abc", // later: replace with logged-in user wallet
        datasetName,
        category,
        type: dataType,
        size,
        filename: file.name,
        description: tags,
        price
      };
      console.log(payload);

      const res = await fetch("http://localhost:5000/api/pool/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (data.success) {
        setSuccess("Dataset uploaded successfully!");
        setDatasetName('');
        setTags('');
        setFile(null);
        setPrice(100);
        setSize(10);
      } else {
        setError(data.message || "Failed to upload dataset.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong while uploading.");
    } finally {
      setLoading(false);
    }
  };

  const onBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleDragOver = (e) => e.preventDefault();
  const handleDragEnter = (e) => {
    e.preventDefault();
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setFile(droppedFile);
      setError('');
    }
  };

  return (
    <>
      <DashboardHeader title="Upload Dataset" onLogout={onLogout} />
      <section className="form-section">
        <div className="form-container">
          <p className="form-description">
            Share your valuable data with the community and earn royalties.
          </p>
          <form className="upload-dataset-form" onSubmit={handleSubmit}>
            <label>Dataset Name</label>
            <input
              type="text"
              value={datasetName}
              onChange={(e) => setDatasetName(e.target.value)}
              placeholder="e.g., Financial Market Trends 2023"
              required
            />

            <div className="form-row">
              <div className="form-group">
                <label>Data Type</label>
                <select value={dataType} onChange={(e) => setDataType(e.target.value)}>
                  <option>CSV</option>
                  <option>Image</option>
                  <option>Text</option>
                  <option>Audio</option>
                </select>
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                  <option>Finance</option>
                  <option>Healthcare</option>
                  <option>Retail</option>
                </select>
              </div>
            </div>

            <label>File Upload</label>
            <div
              className="file-upload-box"
              onClick={onBoxClick}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <input
                type="file"
                ref={fileInputRef}
                accept=".zip,.jpg,.jpeg,.png,.txt,.csv"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              {file ? (
                <span>Selected file: {file.name}</span>
              ) : (
                <span>
                  <strong>Click to browse</strong> or drag and drop
                  <br/>
                  (ZIP, RAR, etc)
                  <br/>
                  Keep Your Dataset Consistent
                </span>
              )}
            </div>
            {error && <div style={{ color: '#ff6b6b', marginBottom: '10px' }}>{error}</div>}
            {success && <div style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}

            <label>Tags / Description</label>
            <textarea
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Add a brief description and comma-separated tags..."
              rows="4"
            />

            <label>Price (in tokens)</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              min="1"
            />

            <label>Size (in MB)</label>
            <input
              type="number"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              min="1"
            />

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Uploading..." : "Submit Dataset"}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default CreateDataset;
