import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getMusician } from '../services/api';

function MusicianDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [musician, setMusician] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMusician();
  }, [id]);

  const fetchMusician = async () => {
    try {
      setLoading(true);
      const response = await getMusician(id);
      setMusician(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load musician details.');
      console.error('Error fetching musician:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading musician details...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!musician) {
    return <div className="error">Musician not found</div>;
  }

  return (
    <div>
      <button className="btn btn-back" onClick={() => navigate('/musicians')}>
        ← Back to Musicians
      </button>

      <div className="detail-container">
        <div className="detail-section">
          <h2>{musician.name}</h2>
          <div className="detail-info">
            <div className="detail-info-item">
              <label>Genre</label>
              <span>{musician.genre}</span>
            </div>
            <div className="detail-info-item">
              <label>Experience</label>
              <span>{musician.experience} years</span>
            </div>
            <div className="detail-info-item">
              <label>Age</label>
              <span>{musician.age}</span>
            </div>
            <div className="detail-info-item">
              <label>Address</label>
              <span>{musician.address}</span>
            </div>
            {musician.range && (
              <div className="detail-info-item">
                <label>Vocal Range</label>
                <span>{musician.range}</span>
              </div>
            )}
            <div className="detail-info-item">
              <label>Status</label>
              <span>{musician.band_status ? 'In Band' : 'Solo Artist'}</span>
            </div>
          </div>
        </div>

        {musician.instruments && musician.instruments.length > 0 && (
          <div className="detail-section">
            <h2>Instruments</h2>
            <div className="list-container">
              {musician.instruments.map((instrument, index) => (
                <div key={index} className="list-item">
                  <strong>{instrument.name}</strong> ({instrument.type})
                </div>
              ))}
            </div>
          </div>
        )}

        {musician.bands && musician.bands.length > 0 && (
          <div className="detail-section">
            <h2>Bands</h2>
            <div className="list-container">
              {musician.bands.map((band, index) => (
                <div key={index} className="list-item">
                  <strong>{band.name}</strong> - {band.genre} ({band.members_count} members)
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MusicianDetail;
