import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getConcert } from '../services/api';

function ConcertDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [concert, setConcert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchConcert();
  }, [id]);

  const fetchConcert = async () => {
    try {
      setLoading(true);
      const response = await getConcert(id);
      setConcert(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load concert details.');
      console.error('Error fetching concert:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading concert details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!concert) {
    return <div className="error">Concert not found</div>;
  }

  return (
    <div>
      <button className="btn btn-back" onClick={() => navigate('/concerts')}>
        ← Back to Concerts
      </button>

      <div className="detail-container">
        <div className="detail-section">
          <h2>{concert.name}</h2>
          <div className="detail-info">
            <div className="detail-info-item">
              <label>Artist/Band</label>
              <span>{concert.artist}</span>
            </div>
            <div className="detail-info-item">
              <label>Genre</label>
              <span>{concert.genre}</span>
            </div>
            <div className="detail-info-item">
              <label>Date</label>
              <span>{concert.date}</span>
            </div>
            <div className="detail-info-item">
              <label>Start Time</label>
              <span>{concert.start_time}</span>
            </div>
            <div className="detail-info-item">
              <label>End Time</label>
              <span>{concert.end_time}</span>
            </div>
            <div className="detail-info-item">
              <label>Venue</label>
              <span>{concert.address}</span>
            </div>
            <div className="detail-info-item">
              <label>Ticket Price</label>
              <span>€{concert.price}</span>
            </div>
            {concert.instruments && (
              <div className="detail-info-item">
                <label>Instruments Featured</label>
                <span>{concert.instruments}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConcertDetail;
