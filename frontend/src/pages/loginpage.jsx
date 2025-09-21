import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./loginpage.css";

const LoginPage = ({ onLoginSuccess }) => {
  const [activeTab, setActiveTab] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const res = await axios.post("http://localhost:5000/api/login", {
        email,
        password
      });
  
      const data = res.data; // this contains {success, email, walletId}
  
      if (data.success) {
        console.log("Logged in user walletId:", data.walletId);
  
        // 1. Pass walletId to parent
        onLoginSuccess(data.walletId);
  
        // 2. Navigate to dashboard
        navigate('/dashboard'); 
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };
  
  

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

        <form className="login-form" onSubmit={handleSubmit}>
          {activeTab === "login" ? (
            <>
              <label className="login-label">Email</label>
              <input
                type="email"
                className="login-input"
                placeholder="Email"
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
              <button type="submit" className="login-submit-btn" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </>
          ) : (
            <>
              <label className="login-label">Full Name</label>
              <input
                type="text"
                className="login-input"
                placeholder="Enter your full name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <label className="login-label">Email</label>
              <input
                type="email"
                className="login-input"
                placeholder="you@example.com"
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
              <button type="submit" className="login-submit-btn" disabled={loading}>
                {loading ? "Creating..." : "Create Account"}
              </button>
            </>
          )}
        </form>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {activeTab === "login" && (
          <Link to="/forgot" className="login-forgot-link">Forgot Password?</Link>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
