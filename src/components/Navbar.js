// src/components/Navbar.js
import React from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-title">#Vibe Page</div>
      <div className="navbar-icons">
        <a href="https://furrl.in/wishlist" className="navbar-icon">💖</a>
        <a href="https://furrl.in/cart" className="navbar-icon">🛒</a>
      </div>
    </div>
  );
};

export default Navbar;
