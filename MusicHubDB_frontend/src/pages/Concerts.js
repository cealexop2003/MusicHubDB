import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getConcerts } from '../services/api';

function Concerts() {
  const [concerts, setConcerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchConcerts();
  }, []);

  const fetchConcerts = async () => {
    try {
      setLoading(true);
      const response = await getConcerts();
      setConcerts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load concerts. Please make sure the backend server is running.');
      console.error('Error fetching concerts:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading concerts...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1>Concerts</h1>
        <p>Upcoming concerts and live performances</p>
      </div>

      <div className="card-grid">
        {concerts.map((concert) => (
          <Link 
            key={concert.concert_id} 
            to={`/concerts/${concert.concert_id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            <div className="card">
              <h3>{concert.name}</h3>
              <p><strong>Artist:</strong> {concert.artist}</p>
              <p><strong>Date:</strong> {concert.date}</p>
              <p><strong>Time:</strong> {concert.start_time} - {concert.end_time}</p>
              <p><strong>Venue:</strong> {concert.address}</p>
              <p><strong>Price:</strong> €{concert.price}</p>
              <span className="badge">{concert.genre}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Concerts;
