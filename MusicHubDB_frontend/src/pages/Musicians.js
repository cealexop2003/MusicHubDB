import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getMusicians } from '../services/api';

function Musicians() {
  const [musicians, setMusicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMusicians();
  }, []);

  const fetchMusicians = async () => {
    try {
      setLoading(true);
      const response = await getMusicians();
      setMusicians(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load musicians. Please make sure the backend server is running.');
      console.error('Error fetching musicians:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading musicians...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1>Musicians</h1>
        <p>Browse our talented musicians</p>
      </div>

      <div className="card-grid">
        {musicians.map((musician) => (
          <Link 
            key={musician.musician_id} 
            to={`/musicians/${musician.musician_id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="card">
              <h3>{musician.name}</h3>
              <p><strong>Genre:</strong> {musician.genre}</p>
              <p><strong>Experience:</strong> {musician.experience} years</p>
              <p><strong>Age:</strong> {musician.age}</p>
              {musician.range && <p><strong>Vocal Range:</strong> {musician.range}</p>}
              <span className="badge">
                {musician.band_status ? 'In Band' : 'Solo Artist'}
              </span>
              {musician.instruments && musician.instruments.length > 0 && (
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Instruments:</strong> {musician.instruments.map(i => i.name).join(', ')}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Musicians;
