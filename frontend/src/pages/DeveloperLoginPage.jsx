import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./loginpage.css";

// A list of common public email domains to block
const blockedDomains = [
  'gmail.com',
  'yahoo.com',
  'hotmail.com',
  'aol.com',
  'outlook.com',
  'icloud.com',
  'live.com',
  'msn.com',
  'mail.com',
  'proton.me',
  'protonmail.com',
  'zoho.com',
  'yandex.com',
  'gmx.com',
  'gmx.us',
  'mail.ru',
  'hey.com',
  'me.com',
  'mac.com',
  'fastmail.com',
  'inbox.com',
  'yahoo.co.uk',
  'yahoo.ca',
  'yahoo.in',
  'yahoo.fr',
  'yahoo.de',
  'seznam.cz',
  'web.de',
  't-online.de',
  'posteo.de',
  'naver.com',
  'tutanota.com',
  'ymail.com', // Part of Yahoo Mail
  'rocketmail.com' // Part of Yahoo Mail
];

// Accept the onLoginSuccess function as a prop
const DeveloperLoginPage = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState("login");
  
  // State for form inputs and errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState("");

  // Clear form fields and errors when switching tabs
  useEffect(() => {
    setEmail("");
    setPassword("");
    setCompanyName("");
    setError("");
  }, [activeTab]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    // Basic validation
    if (!email) {
      setError("Email address is required.");
      return;
    }

    // Domain validation logic
    const domain = email.split('@')[1];
    if (blockedDomains.includes(domain)) {
      setError("Please use a company email address. Public domains (Gmail, Yahoo, etc.) are not allowed.");
      return;
    }

    // If validation passes, proceed with login/signup
    // In a real app, you'd call an API here.
    // For now, we'll just call the success function.
    // Note: This should pass a walletId from the API response in a real app.
    onLoginSuccess();
  };

  const loginForm = (
    <>
      <label className="login-label">Email</label>
      <input 
        type="email" 
        className="login-input" 
        placeholder="company.email@example.com" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label className="login-label">Password</label>
      <input 
        type="password" 
        className="login-input" 
        placeholder="Password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="login-submit-btn">Login</button>
    </>
  );

  const signupForm = (
    <>
      <label className="login-label">Company Name</label>
      <input 
        type="text" 
        className="login-input" 
        placeholder="Enter your company name" 
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        required
      />
      <label className="login-label">Company Email</label>
      <input 
        type="email" 
        className="login-input" 
        placeholder="you@company.com" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label className="login-label">Password</label>
      <input 
        type="password" 
        className="login-input" 
        placeholder="Create a strong password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
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
        
        {/* Display error message if it exists */}
        {error && <p className="login-error-message">{error}</p>}

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