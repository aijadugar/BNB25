import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./loginpage.css";

// Accept the onLoginSuccess function as a prop
const DeveloperLoginPage = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState("login");

  const handleSubmit = (e) => {
    e.preventDefault();
    // On a real app, you'd validate and call an API here.
    // On success, call the function from App.jsx.
    onLoginSuccess();
  };

  const loginForm = (
    <>
      <label className="login-label">Email</label>
      <input type="email" className="login-input" placeholder="Email" />
      <label className="login-label">Password</label>
      <input type="password" className="login-input" placeholder="Password" />
      <button type="submit" className="login-submit-btn">Login</button>
    </>
  );

  const signupForm = (
    <>
      <label className="login-label">Company Name</label>
      <input type="text" className="login-input" placeholder="Enter your full name" />
      <label className="login-label">Company Email</label>
      <input type="email" className="login-input" placeholder="you@example.com" />
      <label className="login-label">Password</label>
      <input type="password" className="login-input" placeholder="Create a strong password" />
      <button type="submit" className="login-submit-btn">Create Account</button>
    </>
  );

  return (
    <div className="login-root">
      {/* Navbar */}
      <nav className="login-header">
        <div className="login-logo-area">
          <div className="login-logo-square">S</div>
          <span className="login-logo-text">Synapse Ledger</span>
        </div>
        <div className="login-nav-links">
          <Link to="/" className="login-nav-link">Overview</Link>
          <Link to="/docs" className="login-nav-link">Documentation</Link>
          <Link to="/ai" className="login-nav-link">AI Reference</Link>
          <Link to="/community" className="login-nav-link">Community</Link>
          <Link to="/support" className="login-nav-link">Support</Link>
        </div>
        {/* The "Sign in" button has been removed from the navbar */}
      </nav>

      {/* Centered Login Box */}
      <div className="login-center-box">
        <h2 className="login-title">Developer Login</h2>
        <div className="login-tabs">
          <button
            className={`login-tab-btn ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`login-tab-btn ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => setActiveTab("signup")}
          >
            Signup
          </button>
        </div>
        {/* Add the onSubmit handler to the form */}
        <form className="login-form" onSubmit={handleSubmit}>
          {activeTab === "login" ? loginForm : signupForm}
        </form>
        {activeTab === "login" && (
          <Link to="/forgot" className="login-forgot-link">Forgot Password?</Link>
        )}
      </div>
    </div>
  );
};

export default DeveloperLoginPage;