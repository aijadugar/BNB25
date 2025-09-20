import React from "react";
import "./OrderSuccessPage.css";
import { FaCheckCircle, FaCopy } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const navigate = useNavigate();

  // Dummy data for illustration
  const dataset = {
    name: "Financial Transactions Dataset",
    category: "Finance",
    type: "CSV",
    size: "100 MB",
    contributors: 5,
    price: "$50",
    purchaseDate: "July 26, 2024",
    transactionId: "0x1234567890abcdef1234567890abcdef",
    cid: "Qmabcdef1234567890abcdef1234567890",
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="order-success-root">
      <div className="order-success-icon">
        <FaCheckCircle />
      </div>
      <h1 className="order-success-title">Order Placed Successfully</h1>
      <p className="order-success-subtitle">
        Your order has been confirmed. You can now download the dataset or explore more.
      </p>

      <div className="order-success-card">
        <h2 className="order-success-card-title">Dataset Details</h2>
        <div className="order-success-row">
          <div>
            <span className="order-success-label">Dataset Name</span>
            <span className="order-success-value bold">{dataset.name}</span>
          </div>
          <div>
            <span className="order-success-label">Category</span>
            <span className="order-success-value">{dataset.category}</span>
          </div>
        </div>
        <div className="order-success-row">
          <div>
            <span className="order-success-label">Type</span>
            <span className="order-success-value">{dataset.type}</span>
          </div>
          <div>
            <span className="order-success-label">Size</span>
            <span className="order-success-value">{dataset.size}</span>
          </div>
        </div>
        <div className="order-success-row">
          <div>
            <span className="order-success-label">Contributors</span>
            <span className="order-success-value">{dataset.contributors}</span>
          </div>
          <div>
            <span className="order-success-label">Price</span>
            <span className="order-success-value">{dataset.price}</span>
          </div>
        </div>
        <div className="order-success-row">
          <div>
            <span className="order-success-label">Purchase Date</span>
            <span className="order-success-value bold">{dataset.purchaseDate}</span>
          </div>
        </div>
        <div className="order-success-row">
          <div>
            <span className="order-success-label">Transaction ID</span>
            <span className="order-success-value mono">
              {dataset.transactionId}
              <FaCopy
                className="order-success-copy"
                title="Copy"
                onClick={() => handleCopy(dataset.transactionId)}
              />
            </span>
          </div>
        </div>
        <div className="order-success-row">
          <div>
            <span className="order-success-label">CID</span>
            <span className="order-success-value mono">
              {dataset.cid}
              <FaCopy
                className="order-success-copy"
                title="Copy"
                onClick={() => handleCopy(dataset.cid)}
              />
            </span>
          </div>
        </div>
      </div>

      <button className="order-success-download-btn">Download Dataset</button>
      <button
        className="order-success-back-btn"
        onClick={() => navigate("/developer/explore")}
      >
        Back to Explore
      </button>
    </div>
  );
};

export default OrderSuccessPage;