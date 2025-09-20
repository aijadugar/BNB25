import React, { useState } from 'react';
import Sidebar from '../components/Sidebar'; // Import the Sidebar component
import './CreateDataset.css';

function CreateDataset() {
  const [datasetName, setDatasetName] = useState('');
  const [dataType, setDataType] = useState('Image');
  const [category, setCategory] = useState('Nature');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size exceeds 10MB.');
        setFile(null);
      } else {
        setError('');
        setFile(selectedFile);
      }
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

  return (
    <div className="dashboard-container">
      <Sidebar /> {/* Use the Sidebar component */}

      <main className="main-content">
        <header className="dashboard-header">
          <h2>Create Dataset</h2>
          <div className="profile-menu">
            <div className="profile-icon">S</div>
          </div>
        </header>

        <section className="create-dataset-section">
          <div className="create-dataset-container">
            <form className="upload-dataset-form" onSubmit={handleSubmit}>
              <label>Dataset Name</label>
              <input
                type="text"
                value={datasetName}
                onChange={e => setDatasetName(e.target.value)}
                placeholder="Enter dataset name"
              />

              <div className="form-row">
                <div>
                  <label>Select Data Type</label>
                  <select value={dataType} onChange={e => setDataType(e.target.value)}>
                    <option>Image</option>
                    <option>Text</option>
                    <option>CSV</option>
                  </select>
                </div>
                <div>
                  <label>Select Category</label>
                  <select value={category} onChange={e => setCategory(e.target.value)}>
                    <option>Nature</option>
                    <option>Technology</option>
                    <option>People</option>
                  </select>
                </div>
              </div>

              <label>File Upload</label>
              <div className="file-upload-box">
                <input
                  type="file"
                  accept=".zip,.jpg,.jpeg,.png,.txt,.csv"
                  onChange={handleFileChange}
                />
                <span>Upload a file or drag and drop<br />ZIP, JPG, TXT, CSV up to 10MB</span>
              </div>
              {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

              <label>Tags / Description</label>
              <textarea
                value={tags}
                onChange={e => setTags(e.target.value)}
                placeholder="Enter tags or a brief description..."
              />

              <button type="submit" className="submit-btn">Submit Dataset</button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CreateDataset;