import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Navbar() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          🎵 MusicHubDB
        </Link>
        <ul className="navbar-links">
          <li><Link to="/" className={isActive('/')}>Home</Link></li>
          <li><Link to="/musicians" className={isActive('/musicians')}>Musicians</Link></li>
          <li><Link to="/bands" className={isActive('/bands')}>Bands</Link></li>
          <li><Link to="/concerts" className={isActive('/concerts')}>Concerts</Link></li>
          <li><Link to="/jam-sessions" className={isActive('/jam-sessions')}>Jam Sessions</Link></li>
          <li><Link to="/teachers" className={isActive('/teachers')}>Teachers</Link></li>
          <li><Link to="/students" className={isActive('/students')}>Students</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
