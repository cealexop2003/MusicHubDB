import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>🎵 Welcome to MusicHubDB</h1>
        <p>Your Complete Music Community Platform</p>
      </div>

      <div className="feature-grid">
        <Link to="/musicians" style={{ textDecoration: 'none' }}>
          <div className="feature-card">
            <h3>🎸 Musicians</h3>
            <p>Browse talented musicians, view their profiles, instruments, and bands they're part of.</p>
          </div>
        </Link>

        <Link to="/bands" style={{ textDecoration: 'none' }}>
          <div className="feature-card">
            <h3>🎤 Bands</h3>
            <p>Discover bands of all genres and explore their members and music styles.</p>
          </div>
        </Link>

        <Link to="/concerts" style={{ textDecoration: 'none' }}>
          <div className="feature-card">
            <h3>🎪 Concerts</h3>
            <p>Check out upcoming concerts, venues, and ticket information.</p>
          </div>
        </Link>

        <Link to="/jam-sessions" style={{ textDecoration: 'none' }}>
          <div className="feature-card">
            <h3>🎹 Jam Sessions</h3>
            <p>Find local jam sessions to participate in and meet fellow musicians.</p>
          </div>
        </Link>

        <Link to="/teachers" style={{ textDecoration: 'none' }}>
          <div className="feature-card">
            <h3>👨‍🏫 Teachers</h3>
            <p>Connect with experienced music teachers for lessons and guidance.</p>
          </div>
        </Link>

        <Link to="/students" style={{ textDecoration: 'none' }}>
          <div className="feature-card">
            <h3>🎓 Students</h3>
            <p>View students learning music and their lesson progress.</p>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Home;
