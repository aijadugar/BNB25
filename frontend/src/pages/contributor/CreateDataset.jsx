import React, { useState, useRef } from 'react';
import { useOutletContext } from 'react-router-dom'; // Import hook
import DashboardHeader from '../../components/DashboardHeader';
import './CreateDataset.css';

function CreateDataset() {
  const { onLogout } = useOutletContext(); // Get onLogout from context
  const [datasetName, setDatasetName] = useState('');
  const [dataType, setDataType] = useState('CSV');
  const [category, setCategory] = useState('Finance');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false); // State for drag-over effect
  const fileInputRef = useRef(null); // Ref for the file input

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      setError('Please upload a file.');
      return;
    }
    // Handle form submission logic here
  };

  // Trigger the hidden file input click
  const onBoxClick = () => {
    fileInputRef.current.click();
  };

  // Drag and drop event handlers
  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default behavior (opening file)
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
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
          <p className="form-description">Share your valuable data with the community and earn royalties.</p>
          <form className="upload-dataset-form" onSubmit={handleSubmit}>
            <label>Dataset Name</label>
            <input
              type="text"
              value={datasetName}
              onChange={e => setDatasetName(e.target.value)}
              placeholder="e.g., Financial Market Trends 2023"
            />

            <div className="form-row">
              <div className="form-group">
                <label>Data Type</label>
                <select value={dataType} onChange={e => setDataType(e.target.value)}>
                  <option>CSV</option>
                  <option>Image</option>
                  <option>Text</option>
                  <option>Audio</option>
                </select>
              </div>
              <div className="form-group">
                <label>Category</label>
                <select value={category} onChange={e => setCategory(e.target.value)}>
                  <option>Finance</option>
                  <option>Healthcare</option>
                  <option>Retail</option>
                </select>
              </div>
            </div>

            <label>File Upload</label>
            <div
              className={`file-upload-box ${isDragging ? 'dragging-over' : ''}`}
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
                style={{ display: 'none' }} // Keep the input but hide it
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

            <label>Tags / Description</label>
            <textarea
              value={tags}
              onChange={e => setTags(e.target.value)}
              placeholder="Add a brief description and comma-separated tags..."
              rows="4"
            />

            <button type="submit" className="submit-btn">Submit Dataset</button>
          </form>
        </div>
      </section>
    </>
  );
}

export default CreateDataset;