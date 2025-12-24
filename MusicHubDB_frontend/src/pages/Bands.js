import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBands } from '../services/api';

function Bands() {
  const [bands, setBands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBands();
  }, []);

  const fetchBands = async () => {
    try {
      setLoading(true);
      const response = await getBands();
      setBands(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load bands. Please make sure the backend server is running.');
      console.error('Error fetching bands:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading bands...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1>Bands</h1>
        <p>Discover amazing bands from all genres</p>
      </div>

      <div className="card-grid">
        {bands.map((band) => (
          <Link 
            key={band.band_id} 
            to={`/bands/${band.band_id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="card">
              <h3>{band.name}</h3>
              <p><strong>Genre:</strong> {band.genre}</p>
              <p><strong>Formed:</strong> {band.creation_date}</p>
              <p><strong>Members:</strong> {band.members_count}</p>
              <span className="badge">{band.genre}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Bands;
