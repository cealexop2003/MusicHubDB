import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  getTeachers, 
  getConcerts, 
  getMyRequests,
  requestLesson,
  cancelLessonRequest,
  showConcertInterest,
  removeConcertInterest
} from '../services/api';

function StudentDashboard() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('teachers');
  const [teachers, setTeachers] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [myRequests, setMyRequests] = useState({ lessons: [], concerts: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const fetchData = async () => {
    try {
      const [teachersRes, concertsRes, requestsRes] = await Promise.all([
        getTeachers(),
        getConcerts(),
        getMyRequests(currentUser.id)
      ]);
      
      setTeachers(teachersRes.data);
      setConcerts(concertsRes.data);
      setMyRequests(requestsRes.data);
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
    if (type === 'teacher') {
      return myRequests.lessons?.some(r => r.teacher_id === id && r.status === 'pending') || false;
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

      {/* Teachers Tab */}
      {activeTab === 'teachers' && (
        <div className="card-grid">
          {teachers.map(teacher => (
            <div key={teacher.teacher_id} className="card">
              <h3>{teacher.name}</h3>
              <p><strong>Age:</strong> {teacher.age}</p>
              <p><strong>Experience:</strong> {teacher.experience} years</p>
              <p><strong>Certification:</strong> {teacher.certification === 1 ? 'Certified' : 'Not Certified'}</p>
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
          
          {myRequests.lessons.length > 0 && (
            <>
              <h3 style={{ marginTop: '30px', color: 'white' }}>Lesson Requests</h3>
              <div className="card-grid">
                {myRequests.lessons.map(req => (
                  <div key={req.request_id} className="card">
                    <h4>Teacher: {req.teacher?.name}</h4>
                    <p><strong>Requested on:</strong> {req.created_at}</p>
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

          {myRequests.lessons.length === 0 && myRequests.concerts.length === 0 && (
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', marginTop: '80px', fontSize: '18px' }}>You haven't made any requests yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default StudentDashboard;
