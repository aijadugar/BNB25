import React from "react";
import { Link } from "react-router-dom";
import { FaDatabase, FaCoins, FaShieldAlt, FaFingerprint, FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import "./LandingPage.css";

// Accept the onRoleSelect function as a prop
const LandingPage = ({ onRoleSelect }) => (
  <div className="landing-root">
    {/* Navbar */}
    <nav className="landing-header">
      <div className="logo-area">
        <div className="logo-square">S</div>
        <span className="logo-text">Synapse Ledger</span>
      </div>
     <div className="nav-links">
  {/* Other links... */}
  <button
    className="nav-link"
    onClick={() => {
      document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
    }}
  >
    Features
  </button>
  <button
    className="nav-link"
    onClick={() => {
      document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
    }}
  >
    Contact us
  </button>
</div>
      {/* The nav-actions section with the "Sign in" button has been removed */}
    </nav>

    {/* Hero Section */}
    <section className="hero-section">
      <div className="hero-content">
        <h1>Decentralized Data Staking for the Future</h1>
        <p>
          Synapse Ledger is a decentralized project that enables contributors to stake their data and earn rewards, while developers can access high-quality, verified data for their applications.
        </p>
        <div className="hero-buttons">
          {/* Changed from Link to button with onClick handler */}
          <button onClick={() => onRoleSelect('contributor')} className="primary-btn">Contribute Data</button>
          <button onClick={() => onRoleSelect('developer')} className="secondary-btn">Explore Pools</button>
        </div>
      </div>
      <div className="hero-image">
        <img
          src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80"
          alt="Dataset Illustration"
        />
      </div>
    </section>

    {/* Contributor Section */}
    <section className="section">
      <h2>For Contributors</h2>
      <p className="section-subtext">
        Contribute your data to Synapse Ledger and become part of a growing community. Your data helps power innovative applications, and you earn rewards for your contributions.
      </p>
      <div className="cards-row">
        <div className="card">
          <FaDatabase className="card-icon" />
          <span>1. Contribute Data</span>
        </div>
        <div className="card">
          <FaCoins className="card-icon" />
          <span>2. Earn Rewards</span>
        </div>
        <div className="card">
          <FaShieldAlt className="card-icon" />
          <span>3. Verified Impact</span>
        </div>
      </div>
    </section>

    {/* Developer Section */}
    <section className="section">
      <h2>For Developers</h2>
      <p className="section-subtext">
        Access high-quality, verified data pools on Synapse Ledger to build innovative applications. Our decentralized approach ensures data integrity and provenance.
      </p>
      <div className="cards-row">
        <div className="card">
          <FaDatabase className="card-icon" />
          <span>1. Explore Data Pools</span>
        </div>
        <div className="card">
          <FaShieldAlt className="card-icon" />
          <span>2. Integrate with Your App</span>
        </div>
        <div className="card">
          <FaCoins className="card-icon" />
          <span>3. Build the Future</span>
        </div>
      </div>
    </section>

    {/* Key Features Section */}
   
<section className="section" id="features">
  {/* ...features content... */}
</section>

    <section className="section">
      <h2>Key Features</h2>
      <div className="features-row">
        <div className="feature-card">
          <FaDatabase className="feature-icon" />
          <h3>Decentralized Data Staking</h3>
          <p>Stake your data securely and earn rewards for contributing to the ecosystem.</p>
        </div>
        <div className="feature-card">
          <FaCoins className="feature-icon" />
          <h3>Smart Royalties</h3>
          <p>Automated royalty payments for data usage, powered by smart contracts.</p>
        </div>
        <div className="feature-card">
          <FaFingerprint className="feature-icon" />
          <h3>Immutable Provenance</h3>
          <p>Track the usage and history of all data with blockchain technology.</p>
        </div>
      </div>
    </section>

    {/* Call-to-Action Section */}
    <section className="cta-section">
      <h3>Join the Synapse Ledger Community</h3>
      <p>
        Be part of the future of decentralized data. Contribute your data or explore data pools to build innovative applications.
      </p>
      <div className="cta-buttons">
        {/* Changed from Link to button with onClick handler */}
        <button onClick={() => onRoleSelect('contributor')} className="cta-btn">Contribute Data</button>
        <button onClick={() => onRoleSelect('developer')} className="cta-btn cta-btn-alt">Explore Pools</button>
      </div>
    </section>

    {/* Footer */}
    // Footer Section
<footer className="landing-footer" id="footer">
  {/* ...footer content... */}
</footer>
    <footer className="landing-footer">
      <div className="footer-links">
        <Link to="/overview">Overview</Link>
        <Link to="/features">Features</Link>
        <Link to="/resources">Resources</Link>
        <Link to="/community">Community</Link>
      </div>
      <div className="footer-social">
        <a href="#"><FaGithub /></a>
        <a href="#"><FaTwitter /></a>
        <a href="#"><FaLinkedin /></a>
      </div>
      <div className="footer-copy">
        © 2025 Synapse Ledger. All rights reserved.
      </div>
    </footer>
  </div>
);

export default LandingPage;