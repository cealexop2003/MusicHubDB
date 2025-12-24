import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getJamSessions } from '../services/api';

function JamSessions() {
  const [jamSessions, setJamSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJamSessions();
  }, []);

  const fetchJamSessions = async () => {
    try {
      setLoading(true);
      const response = await getJamSessions();
      setJamSessions(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load jam sessions. Please make sure the backend server is running.');
      console.error('Error fetching jam sessions:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading jam sessions...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1>Jam Sessions</h1>
        <p>Join local musicians for collaborative jam sessions</p>
      </div>

      <div className="card-grid">
        {jamSessions.map((session) => (
          <Link 
            key={session.jam_id} 
            to={`/jam-sessions/${session.jam_id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="card">
              <h3>{session.genre} Jam Session</h3>
              <p><strong>Date:</strong> {session.date}</p>
              <p><strong>Time:</strong> {session.start_time} - {session.end_time}</p>
              <p><strong>Location:</strong> {session.address}</p>
              <p><strong>Participants:</strong> {session.participants?.length || 0} musicians</p>
              <span className="badge">{session.genre}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default JamSessions;
