import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBand } from '../services/api';

function BandDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [band, setBand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBand();
  }, [id]);

  const fetchBand = async () => {
    try {
      setLoading(true);
      const response = await getBand(id);
      setBand(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load band details.');
      console.error('Error fetching band:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading band details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!band) {
    return <div className="error">Band not found</div>;
  }

  return (
    <div>
      <button className="btn btn-back" onClick={() => navigate('/bands')}>
        ← Back to Bands
      </button>

      <div className="detail-container">
        <div className="detail-section">
          <h2>{band.name}</h2>
          <div className="detail-info">
            <div className="detail-info-item">
              <label>Genre</label>
              <span>{band.genre}</span>
            </div>
            <div className="detail-info-item">
              <label>Formation Date</label>
              <span>{band.creation_date}</span>
            </div>
            <div className="detail-info-item">
              <label>Number of Members</label>
              <span>{band.members_count}</span>
            </div>
          </div>
        </div>

        {band.members && band.members.length > 0 && (
          <div className="detail-section">
            <h2>Band Members</h2>
            <div className="list-container">
              {band.members.map((member, index) => (
                <div key={index} className="list-item">
                  <strong>{member.name}</strong>
                  <p style={{ margin: '0.25rem 0', color: '#666' }}>
                    {member.experience} years experience • {member.genre}
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

export default BandDetail;
