import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  getJamSessions, 
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

  const handleShowConcertInterest = async (concertId) => {
    try {
      const hasInterest = hasRequested('concert', concertId);
      if (hasInterest) {
        await removeConcertInterest(currentUser.id, concertId);
      } else {
        await showConcertInterest({ concert_id: concertId, user_id: currentUser.id });
      }
      await fetchData();
    } catch (err) {
      console.error('Failed to toggle interest:', err);
      await fetchData();
    }
  };

  const hasRequested = (type, id) => {
    if (type === 'jam-session' || type === 'jam') {
      return myRequests.jamSessions?.some(r => r.jam_id === id && r.status === 'pending') || false;
    } else if (type === 'band') {
      return myRequests.bands?.some(r => r.band_id === id && r.status === 'pending') || false;
    } else if (type === 'concert') {
      return myRequests.concerts?.some(r => r.concert_id === id) || false;
    }
    return false;
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
        <button
          onClick={() => setActiveTab('my-requests')}
          style={{
            padding: '15px 30px',
            border: 'none',
            backgroundColor: 'transparent',
            color: activeTab === 'my-requests' ? 'white' : 'rgba(255,255,255,0.6)',
            fontWeight: activeTab === 'my-requests' ? 'bold' : 'normal',
            cursor: 'pointer',
            borderBottom: activeTab === 'my-requests' ? '3px solid white' : '3px solid transparent',
            marginBottom: '-3px'
          }}
        >
          My Requests
        </button>
      </div>

      {/* Jam Sessions Tab */}
      {activeTab === 'jam-sessions' && (
        <div className="card-grid">
          {jamSessions.map(session => (
            <div key={session.jam_id} className="card">
              <h3>{session.genre} Jam Session</h3>
              <p><strong>Date:</strong> {session.date}</p>
              <p><strong>Time:</strong> {session.start_time} - {session.end_time}</p>
              <p><strong>Location:</strong> {session.address}</p>
              <p><strong>Participants:</strong> {session.participants?.length || 0} musicians</p>
              <button 
                onClick={() => handleJoinJamSession(session.jam_id)}
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
                {hasRequested('jam-session', session.jam_id) ? 'Request Sent' : 'Request to Join'}
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
              <p><strong>Members:</strong> {band.members_count}</p>
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
                {hasRequested('band', band.band_id) ? 'Request Sent' : 'Request to Join'}
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
              <button 
                onClick={() => handleShowConcertInterest(concert.concert_id)}
                style={{ 
                  backgroundColor: hasRequested('concert', concert.concert_id) ? '#ccc' : '#667eea', 
                  color: 'white', 
                  padding: '10px', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer', 
                  width: '100%', 
                  fontWeight: 'bold', 
                  marginTop: '10px' 
                }}
              >
                {hasRequested('concert', concert.concert_id) ? 'Interest Shown' : 'Show Interest'}
              </button>
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
    </div>
  );
}

export default MusicianDashboard;
