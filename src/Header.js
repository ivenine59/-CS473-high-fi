/* src/Header.js */
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { useAuth } from './AuthContext';
import RankUpdater from './components/Rank';


function Header() {
  const { loggedInUser, loggedInEmail, logout } = useAuth();
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
        {loggedInUser && loggedInEmail
        ?<>
        {loggedInEmail !="admin@naver.com"
        ?<button className="invisible-button">Sign Up</button>
        :<button className="signup-button" onClick={()=>RankUpdater()}>Update</button>}
        <button className="signup-button" onClick={()=> logout()}>Log Out</button>
        </>
      :<>
        <Link to="/signup">
          <button className="signup-button">Sign Up</button>
        </Link>
        <Link to="/login">
          <button className="login-button">Log In</button>
        </Link>
      </>}
      </div>
    </div>
  );
}

export default Header;
