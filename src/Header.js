/* src/Header.js */
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';


function Header() {
  return (
    <div className="navbar">
      <div className="logo"><Link to="/">HDR</Link></div>
      <div className="menu">
        <Link to="/">Home</Link>
        <Link to="/about">About Us</Link>
        <Link to="/post">Discussion</Link>
        <Link to="/mypage">My Page</Link>
      </div>
      <div className="auth-buttons">
        <Link to="/login">
          <button className="login-button">Log In</button>
        </Link>
        <Link to="/signup">
          <button className="signup-button">Sign Up</button>
        </Link>
      </div>
    </div>
  );
}

export default Header;
