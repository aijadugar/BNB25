import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./loginppage.css";

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("login");

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
        <Link to="/signin" className="login-signin-btn">Sign in</Link>
      </nav>

      {/* Centered Login Box */}
      <div className="login-center-box">
        <h2 className="login-title">Contributor Page</h2>
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
        <form className="login-form">
          <label className="login-label">Email</label>
          <input type="email" className="login-input" placeholder="Email" />
          <label className="login-label">Password</label>
          <input type="password" className="login-input" placeholder="Password" />
          <button type="submit" className="login-submit-btn">Login</button>
        </form>
        <Link to="/forgot" className="login-forgot-link">Forgot Password?</Link>
      </div>
    </div>
  );
};

export default LoginPage;