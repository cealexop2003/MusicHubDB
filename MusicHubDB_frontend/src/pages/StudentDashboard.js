import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  getTeachers, 
  getConcerts, 
  getMyRequests,
  requestLesson,
  cancelLessonRequest,
  getUserInstrument,
  updateUserInstrument
} from '../services/api';

function StudentDashboard() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('teachers');
  const [teachers, setTeachers] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [myRequests, setMyRequests] = useState({ lessons: [], concerts: [] });
  const [loading, setLoading] = useState(true);
  const [instrument, setInstrument] = useState({ type: '', name: '' });
  const [originalInstrument, setOriginalInstrument] = useState({ type: '', name: '' });
  const [profileSaved, setProfileSaved] = useState(false);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const fetchData = async () => {
    try {
      const [teachersRes, concertsRes, requestsRes, instrumentRes] = await Promise.all([
        getTeachers(),
        getConcerts(),
        getMyRequests(currentUser.id),
        getUserInstrument(currentUser.id)
      ]);
      
      setTeachers(teachersRes.data);
      setConcerts(concertsRes.data);
      setMyRequests(requestsRes.data);
      
      if (instrumentRes.data) {
        setInstrument({ type: instrumentRes.data.type || '', name: instrumentRes.data.name || '' });
        setOriginalInstrument({ type: instrumentRes.data.type || '', name: instrumentRes.data.name || '' });
      }
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRequestLesson = async (teacherId) => {
    try {
      const hasRequest = hasRequested('lesson', teacherId);
      if (hasRequest) {
        await cancelLessonRequest(currentUser.id, teacherId);
      } else {
        await requestLesson({ teacher_id: teacherId, student_id: currentUser.id });
      }
      await fetchData();
    } catch (err) {
      console.error('Failed to toggle request:', err);
      await fetchData();
    }
  };

  const hasRequested = (type, id) => {
    if (type === 'lesson' || type === 'teacher') {
      return myRequests.lessons?.some(r => r.teacher_id === id) || false;
    }
    return false;
  };

  const handleSaveProfile = async () => {
    try {
      await updateUserInstrument(currentUser.id, { type: instrument.type, name: instrument.name });
      setOriginalInstrument({ ...instrument });
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 2000);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const instrumentTypes = ['strings', 'brass', 'woodwinds', 'percussion'];
  
  const instrumentsByType = {
    strings: ['classical_guitar', 'acoustic_guitar', 'electric_guitar', 'bass', 'violin', 'viola', 'cello', 'double_bass', 'harp', 'banjo', 'lyre', 'piano'],
    brass: ['trumpet', 'french_horn', 'tuba', 'trombone'],
    woodwinds: ['bassoon', 'clarinet', 'flute', 'recorder', 'piccolo', 'oboe', 'saxophone'],
    percussion: ['drums', 'xylophone', 'metallophone', 'accordion']
  };
  
  const availableInstruments = instrument.type ? instrumentsByType[instrument.type] : [];

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Welcome, {currentUser.name}!</h1>
        <p>Your Student Dashboard</p>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '30px', borderBottom: '3px solid rgba(255,255,255,0.2)' }}>
        <button
          onClick={() => setActiveTab('teachers')}
          style={{
            padding: '15px 30px',
            border: 'none',
            backgroundColor: 'transparent',
            color: activeTab === 'teachers' ? 'white' : 'rgba(255,255,255,0.6)',
            fontWeight: activeTab === 'teachers' ? 'bold' : 'normal',
            cursor: 'pointer',
            borderBottom: activeTab === 'teachers' ? '3px solid white' : '3px solid transparent',
            marginBottom: '-3px'
          }}
        >
          Find Teachers
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
          onClick={() => setActiveTab('profile')}
          style={{
            padding: '15px 30px',
            border: 'none',
            backgroundColor: 'transparent',
            color: activeTab === 'profile' ? 'white' : 'rgba(255,255,255,0.6)',
            fontWeight: activeTab === 'profile' ? 'bold' : 'normal',
            cursor: 'pointer',
            borderBottom: activeTab === 'profile' ? '3px solid white' : '3px solid transparent',
            marginBottom: '-3px'
          }}
        >
          Edit Profile
        </button>
      </div>

      {/* Teachers Tab */}
      {activeTab === 'teachers' && (
        <div className="card-grid">
          {teachers.map(teacher => (
            <div key={teacher.teacher_id} className="card">
              <h3>{teacher.name}</h3>
              <p><strong>Age:</strong> {teacher.age}</p>
              <p><strong>Experience:</strong> {teacher.experience} years</p>
              <p><strong>Certification:</strong> {teacher.certification === 1 ? 'Certified' : 'Not Certified'}</p>
              <p><strong>Instrument:</strong> {teacher.instrument_name ? teacher.instrument_name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : 'N/A'}</p>
              <p><strong>Format:</strong> {teacher.lesson_format}</p>
              <p><strong>Hourly Rate:</strong> €{teacher.hourly_wage}</p>
              <button 
                onClick={() => handleRequestLesson(teacher.teacher_id)}
                style={{ 
                  backgroundColor: hasRequested('lesson', teacher.teacher_id) ? '#ccc' : '#667eea', 
                  color: 'white', 
                  padding: '10px', 
                  border: 'none', 
                  borderRadius: '5px', 
                  cursor: 'pointer', 
                  width: '100%', 
                  fontWeight: 'bold' 
                }}
              >
                {hasRequested('lesson', teacher.teacher_id) ? 'Request Sent' : 'Request Lesson'}
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

      {/* Edit Profile Tab */}
      {activeTab === 'profile' && (
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div className="card">
            <h2>Edit Your Instrument Profile</h2>
            <div style={{ marginTop: '20px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Instrument Type:
                </label>
                <select
                  value={instrument.type}
                  onChange={(e) => setInstrument({ type: e.target.value, name: '' })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '2px solid #000',
                    backgroundColor: 'white',
                    color: '#000'
                  }}
                >
                  <option value="">Select Type</option>
                  {instrumentTypes.map(type => (
                    <option key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                  Instrument Name:
                </label>
                <input
                  type="text"
                  value={instrument.name}
                  onChange={(e) => setInstrument({ ...instrument, name: e.target.value })}
                  disabled={!instrument.type}
                  placeholder="Enter instrument name"
                  style={{
                    width: '100%',
                    padding: '10px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '2px solid #000',
                    backgroundColor: !instrument.type ? '#e0e0e0' : 'white',
                    color: !instrument.type ? '#999' : '#000',
                    cursor: !instrument.type ? 'not-allowed' : 'text'
                  }}
                />
              </div>

              <button
                onClick={handleSaveProfile}
                disabled={!instrument.type || !instrument.name || profileSaved}
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: profileSaved ? '#ccc' : (!instrument.type || !instrument.name) ? '#ccc' : '#667eea',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: (!instrument.type || !instrument.name || profileSaved) ? 'not-allowed' : 'pointer'
                }}
              >
                {profileSaved ? 'Profile Saved' : 'Save Profile'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
