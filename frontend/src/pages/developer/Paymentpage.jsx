import React, { useState } from "react";
import "./Paymentpage.css";
import { useNavigate } from 'react-router-dom';

const Paymentpage = () => {
  const [wallet, setWallet] = useState("");
  const [method, setMethod] = useState("");
  const navigate = useNavigate();

  return (
    <div className="payment-root">
      {/* Navbar */}
      <nav className="payment-navbar">
        <div className="payment-logo-area">
          <div className="payment-logo-square">S</div>
          <span className="payment-logo-text">Synapse Ledger</span>
        </div>
        {/* <div className="payment-nav-links">
          <a href="#" className="payment-nav-link">Datasets</a>
          <a href="#" className="payment-nav-link">Models</a>
          <a href="#" className="payment-nav-link">Docs</a>
          <a href="#" className="payment-nav-link">Community</a>
        </div> */}
        <div className="payment-nav-actions">
          {/* <button className="payment-upload-btn">Upload</button> */}
          {/* <div className="payment-profile-circle"> */}
            {/* <span>🧑‍💻</span> */}
          {/* </div> */}
        </div>  
      </nav>

      {/* Main Content */}
      <main className="payment-main">
        <h1 className="payment-title">Pay & Access Dataset</h1>
        <p className="payment-subtitle">
          To access this dataset, please complete the payment process below.
        </p>

        <div className="payment-card">
          <h2 className="payment-card-title">Dataset Summary</h2>
          <div className="payment-summary-row">
            <div>
              <span className="payment-summary-label">Name:</span>
              <span className="payment-summary-value">Financial Transactions</span>
            </div>
            <div>
              <span className="payment-summary-label">Category:</span>
              <span className="payment-summary-value">Finance</span>
            </div>
          </div>
          <div className="payment-summary-row">
            <div>
              <span className="payment-summary-label">Type:</span>
              <span className="payment-summary-value">CSV</span>
            </div>
            <div>
              <span className="payment-summary-label">Size:</span>
              <span className="payment-summary-value">100MB</span>
            </div>
          </div>
          <div className="payment-summary-row">
            <div>
              <span className="payment-summary-label">Contributors:</span>
              <span className="payment-summary-value">5</span>
            </div>
            <div>
              <span className="payment-summary-label">Price:</span>
              <span className="payment-summary-value payment-price">$20 USD</span>
            </div>
          </div>
        </div>

        <div className="payment-card">
          <h2 className="payment-card-title">Confirm Payment</h2>
          <form>
                    
                     
      onSubmit={e => {
        e.preventDefault();
        navigate("/developer/order-success");
      }}
   

            <label className="payment-label">Wallet No.</label>
            <input
              type="text"
              className="payment-input"
              placeholder="Enter your wallet No."
              value={wallet}
              onChange={e => setWallet(e.target.value)}
            />
            <label className="payment-label">Payment Method</label>
            <select
              className="payment-input"
              value={method}
              onChange={e => setMethod(e.target.value)}
            >
              <option value="">Select Payment Method</option>
              <option value="crypto">Crypto</option>
           
            </select>
           
      

  {/* ...form fields... */}
  <button type="submit" className="payment-btn">Pay Now</button>

          </form>
        </div>
      </main>
    </div>
  );
};

export default Paymentpage;