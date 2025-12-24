import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getJamSession } from '../services/api';

function JamSessionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSession();
  }, [id]);

  const fetchSession = async () => {
    try {
      setLoading(true);
      const response = await getJamSession(id);
      setSession(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load jam session details.');
      console.error('Error fetching jam session:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading jam session details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!session) {
    return <div className="error">Jam session not found</div>;
  }

  return (
    <div>
      <button className="btn btn-back" onClick={() => navigate('/jam-sessions')}>
        ← Back to Jam Sessions
      </button>

      <div className="detail-container">
        <div className="detail-section">
          <h2>{session.genre} Jam Session</h2>
          <div className="detail-info">
            <div className="detail-info-item">
              <label>Genre</label>
              <span>{session.genre}</span>
            </div>
            <div className="detail-info-item">
              <label>Date</label>
              <span>{session.date}</span>
            </div>
            <div className="detail-info-item">
              <label>Start Time</label>
              <span>{session.start_time}</span>
            </div>
            <div className="detail-info-item">
              <label>End Time</label>
              <span>{session.end_time}</span>
            </div>
            <div className="detail-info-item">
              <label>Location</label>
              <span>{session.address}</span>
            </div>
            <div className="detail-info-item">
              <label>Total Participants</label>
              <span>{session.participants?.length || 0}</span>
            </div>
          </div>
        </div>

        {session.participants && session.participants.length > 0 && (
          <div className="detail-section">
            <h2>Participating Musicians</h2>
            <div className="list-container">
              {session.participants.map((participant, index) => (
                <div key={index} className="list-item">
                  <strong>{participant.name || 'Unknown Musician'}</strong>
                  <p style={{ margin: '0.25rem 0', color: '#666' }}>
                    {participant.genre || 'N/A'} • {participant.experience || 0} years experience
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default JamSessionDetail;
