import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  getJamSessions,
  getJamSession,
  getBands, 
  getConcerts, 
  getMyRequests,
  requestJamSession,
  cancelJamSessionRequest,
  requestBand,
  cancelBandRequest,
  showConcertInterest,
  removeConcertInterest
} from '../services/api';

function MusicianDashboard() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('jam-sessions');
  const [jamSessions, setJamSessions] = useState([]);
  const [bands, setBands] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [myRequests, setMyRequests] = useState({ jamSessions: [], bands: [], concerts: [] });
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedJamSession, setSelectedJamSession] = useState(null);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const fetchData = async () => {
    try {
      const [jamRes, bandsRes, concertsRes, requestsRes] = await Promise.all([
        getJamSessions(),
        getBands(),
        getConcerts(),
        getMyRequests(currentUser.id)
      ]);
      
      setJamSessions(jamRes.data);
      setBands(bandsRes.data);
      setConcerts(concertsRes.data);
      setMyRequests(requestsRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinJamSession = async (jamId) => {
    try {
      const hasRequest = hasRequested('jam-session', jamId);
      if (hasRequest) {
        await cancelJamSessionRequest(currentUser.id, jamId);
      } else {
        await requestJamSession({ jam_id: jamId, musician_id: currentUser.id });
      }
      await fetchData(); // Refresh data
    } catch (err) {
      console.error('Failed to toggle request:', err);
      // Still refresh to get current state
      await fetchData();
    }
  };

  const handleJoinBand = async (bandId) => {
    try {
      const hasRequest = hasRequested('band', bandId);
      if (hasRequest) {
        await cancelBandRequest(currentUser.id, bandId);
      } else {
        await requestBand({ band_id: bandId, musician_id: currentUser.id });
      }
      await fetchData();
    } catch (err) {
      console.error('Failed to toggle request:', err);
      await fetchData();
    }
  };

  // Concert interests not supported (no tracking table in database)

  const hasRequested = (type, id) => {
    if (type === 'jam-session' || type === 'jam') {
      return myRequests.jamSessions?.some(r => r.jam_id === id) || false;
    } else if (type === 'band') {
      return myRequests.bands?.some(r => r.band_id === id) || false;
    }
    return false; // No concert or lesson tracking
  };

  const handleViewJamSession = async (jamId) => {
    try {
      const response = await getJamSession(jamId);
      setSelectedJamSession(response.data);
      setShowModal(true);
    } catch (err) {
      console.error('Failed to fetch jam session details:', err);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedJamSession(null);
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Welcome, {currentUser.name}!</h1>
        <p>Your Musician Dashboard</p>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '30px', borderBottom: '3px solid rgba(255,255,255,0.2)' }}>
        <button
          onClick={() => setActiveTab('jam-sessions')}
          style={{
            padding: '15px 30px',
            border: 'none',
            backgroundColor: 'transparent',
            color: 'white',
            fontWeight: activeTab === 'jam-sessions' ? 'bold' : 'normal',
            cursor: 'pointer',
            borderBottom: activeTab === 'jam-sessions' ? '3px solid white' : '3px solid transparent',
            marginBottom: '-3px'
          }}
        >
          Jam Sessions
        </button>
        <button
          onClick={() => setActiveTab('bands')}
          style={{
            padding: '15px 30px',
            border: 'none',
            backgroundColor: 'transparent',
            color: activeTab === 'bands' ? 'white' : 'rgba(255,255,255,0.6)',
            fontWeight: activeTab === 'bands' ? 'bold' : 'normal',
            cursor: 'pointer',
            borderBottom: activeTab === 'bands' ? '3px solid white' : '3px solid transparent',
            marginBottom: '-3px'
          }}
        >
          Bands
        </button>
        <button
          onClick={() => setActiveTab('concerts')}
          style={{
            padding: '15px 30px',
            border: 'none',
            backgroundColor: 'transparent',
            color: activeTab === 'concerts' ? 'white' : 'rgba(255,255,255,0.6)',
            fontWeight: activeTab === 'concerts' ? 'bold' : 'normal',
            cursor: 'pointer',
            borderBottom: activeTab === 'concerts' ? '3px solid white' : '3px solid transparent',
            marginBottom: '-3px'
          }}
        >
          Concerts
        </button>
      </div>

      {/* Jam Sessions Tab */}
      {activeTab === 'jam-sessions' && (
        <div className="card-grid">
          {jamSessions.map(session => (
            <div 
              key={session.jam_id} 
              className="card"
              style={{ cursor: 'pointer', position: 'relative' }}
              onClick={() => handleViewJamSession(session.jam_id)}
            >
              <div style={{ position: 'absolute', top: '2px', right: '5px', fontSize: '32px', color: '#667eea', fontWeight: 'bold' }}>
                ⤢
              </div>
              <h3>{session.genre} Jam Session</h3>
              <p><strong>Date:</strong> {session.date}</p>
              <p><strong>Time:</strong> {session.start_time} - {session.end_time}</p>
              <p><strong>Location:</strong> {session.address}</p>
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleJoinJamSession(session.jam_id);
                }}
                style={{ 
                  backgroundColor: hasRequested('jam-session', session.jam_id) ? '#ccc' : '#667eea', 
                  color: 'white', 
                  padding: '10px', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer', 
                  width: '100%', 
                  fontWeight: 'bold' 
                }}
              >
                {hasRequested('jam-session', session.jam_id) ? 'Leave Jam' : 'Join Jam'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Bands Tab */}
      {activeTab === 'bands' && (
        <div className="card-grid">
          {bands.map(band => (
            <div key={band.band_id} className="card">
              <h3>{band.name}</h3>
              <p><strong>Genre:</strong> {band.genre}</p>
              <p><strong>Formed:</strong> {band.creation_date}</p>
              <p><strong>Members:</strong> {band['members#']}</p>
              <button 
                onClick={() => handleJoinBand(band.band_id)}
                style={{ 
                  backgroundColor: hasRequested('band', band.band_id) ? '#ccc' : '#667eea', 
                  color: 'white', 
                  padding: '10px', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer', 
                  width: '100%', 
                  fontWeight: 'bold' 
                }}
              >
                {hasRequested('band', band.band_id) ? 'Leave Band' : 'Join Band'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Concerts Tab */}
      {activeTab === 'concerts' && (
        <div className="card-grid">
          {concerts.map(concert => (
            <div key={concert.concert_id} className="card">
              <h3>{concert.name}</h3>
              <p><strong>Artist:</strong> {concert.artist}</p>
              <p><strong>Date:</strong> {concert.date}</p>
              <p><strong>Time:</strong> {concert.start_time} - {concert.end_time}</p>
              <p><strong>Location:</strong> {concert.address}</p>
              <p><strong>Price:</strong> €{concert.price}</p>
              <span className="badge">{concert.genre}</span>
            </div>
          ))}
        </div>
      )}

      {/* My Requests Tab */}
      {activeTab === 'my-requests' && (
        <div>
          <h2 style={{ color: 'white', marginBottom: '20px' }}>My Requests</h2>
          
          {myRequests.jamSessions.length > 0 && (
            <>
              <h3 style={{ marginTop: '30px', color: 'white' }}>Jam Session Requests</h3>
              <div className="card-grid">
                {myRequests.jamSessions.map(req => (
                  <div key={req.request_id} className="card">
                    <h4>{req.details?.genre} Jam Session</h4>
                    <p><strong>Date:</strong> {req.details?.date}</p>
                    <p><strong>Location:</strong> {req.details?.address}</p>
                    <span className={`badge ${req.status === 'pending' ? 'badge-pending' : req.status === 'approved' ? 'badge-approved' : 'badge-rejected'}`}>
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {myRequests.bands.length > 0 && (
            <>
              <h3 style={{ marginTop: '30px', color: 'white' }}>Band Requests</h3>
              <div className="card-grid">
                {myRequests.bands.map(req => (
                  <div key={req.request_id} className="card">
                    <h4>{req.details?.name}</h4>
                    <p><strong>Genre:</strong> {req.details?.genre}</p>
                    <span className={`badge ${req.status === 'pending' ? 'badge-pending' : req.status === 'approved' ? 'badge-approved' : 'badge-rejected'}`}>
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}

          {myRequests.concerts.length > 0 && (
            <>
              <h3 style={{ marginTop: '30px', color: 'white' }}>Concert Interests</h3>
              <div className="card-grid">
                {myRequests.concerts.map(req => (
                  <div key={req.interest_id} className="card">
                    <h4>{req.details?.name}</h4>
                    <p><strong>Date:</strong> {req.details?.date}</p>
                    <p><strong>Artist:</strong> {req.details?.artist}</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {myRequests.jamSessions.length === 0 && myRequests.bands.length === 0 && myRequests.concerts.length === 0 && (
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', marginTop: '80px', fontSize: '18px' }}>You haven't made any requests yet.</p>
          )}
        </div>
      )}

      {/* Modal for Jam Session Participants */}
      {showModal && selectedJamSession && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
          }}
          onClick={closeModal}
        >
          <div 
            style={{
              backgroundColor: 'white',
              borderRadius: '10px',
              padding: '30px',
              maxWidth: '600px',
              width: '90%',
              maxHeight: '80vh',
              overflow: 'auto',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              style={{
                position: 'absolute',
                top: '15px',
                right: '15px',
                background: 'transparent',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#333'
              }}
            >
              ×
            </button>
            
            <h2 style={{ color: '#333', marginBottom: '20px' }}>
              {selectedJamSession.genre} Jam Session
            </h2>
            
            <div style={{ marginBottom: '20px', color: '#666' }}>
              <p><strong>Date:</strong> {selectedJamSession.date}</p>
              <p><strong>Time:</strong> {selectedJamSession.start_time} - {selectedJamSession.end_time}</p>
              <p><strong>Location:</strong> {selectedJamSession.address}</p>
            </div>

            <h3 style={{ color: '#333', marginBottom: '15px' }}>
              Participants ({selectedJamSession.participants?.length || 0})
            </h3>

            {selectedJamSession.participants && selectedJamSession.participants.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedJamSession.participants.map(participant => (
                  <div 
                    key={participant.user_id}
                    style={{
                      padding: '15px',
                      backgroundColor: '#f5f5f5',
                      borderRadius: '8px',
                      borderLeft: '4px solid #667eea'
                    }}
                  >
                    <h4 style={{ margin: '0 0 5px 0', color: '#333' }}>
                      {participant.name}
                    </h4>
                    <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
                      <strong>Age:</strong> {participant.age}
                    </p>
                    <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
                      <strong>Experience:</strong> {participant.experience} years
                    </p>
                    <p style={{ margin: '5px 0', color: '#666', fontSize: '14px' }}>
                      <strong>Genre:</strong> {participant.genre}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ color: '#666', textAlign: 'center' }}>No participants yet</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MusicianDashboard;
