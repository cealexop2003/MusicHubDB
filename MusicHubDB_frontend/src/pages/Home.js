import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Home() {
  const { isAuthenticated, userRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && userRole) {
      // Redirect authenticated users to their dashboard
      if (userRole === 'musician') {
        navigate('/musician-dashboard');
      } else if (userRole === 'student') {
        navigate('/student-dashboard');
      } else if (userRole === 'teacher') {
        navigate('/teacher-dashboard');
      }
    }
  }, [isAuthenticated, userRole, navigate]);

  return (
    <div className="home-container">
      {!isAuthenticated && (
        <>
          <div className="home-hero">
            <h1>🎵 Welcome to MusicHubDB</h1>
            <p>Your Complete Music Community Platform</p>
          </div>

          <div style={{ 
            textAlign: 'center', 
            maxWidth: '600px', 
            margin: '50px auto',
            background: 'white',
            padding: '40px',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ color: '#667eea', marginBottom: '20px' }}>Join MusicHubDB Today</h2>
            <p style={{ color: '#666', marginBottom: '30px', lineHeight: '1.6' }}>
              Connect with musicians, find teachers, join bands, attend jam sessions, and discover concerts.
              Sign up or login to get started!
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <Link to="/signup">
                <button style={{ 
                  backgroundColor: '#667eea', 
                  color: 'white', 
                  border: 'none', 
                  padding: '15px 40px', 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  width: '100%'
                }}>
                  Create Account
                </button>
              </Link>
              <Link to="/login">
                <button style={{ 
                  backgroundColor: 'transparent', 
                  color: '#667eea', 
                  border: '2px solid #667eea', 
                  padding: '15px 40px', 
                  borderRadius: '8px', 
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  width: '100%'
                }}>
                  Login to Your Account
                </button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
