/* src/Header.js */
import React from 'react';
import './Header.css';

function Header() {
  return (
    <div>
      <div className="header">
        <button>Home</button>
        <button>About Us</button>
        <button>Discussion</button>
        <button>My Page</button>
        <button>Log In</button>
        <button>Sign Up</button>
      </div>
    </div>
  );
}

export default Header;
