import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  getStudents, 
  getConcerts, 
  getMyRequests,
  getTeacherLessonRequests,
  approveLessonRequest,
  showConcertInterest,
  removeConcertInterest
} from '../services/api';

function TeacherDashboard() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('lesson-requests');
  const [students, setStudents] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [lessonRequests, setLessonRequests] = useState([]);
  const [myRequests, setMyRequests] = useState({ concerts: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const fetchData = async () => {
    try {
      const [studentsRes, concertsRes, requestsRes, lessonReqRes] = await Promise.all([
        getStudents(),
        getConcerts(),
        getMyRequests(currentUser.id),
        getTeacherLessonRequests(currentUser.id)
      ]);
      
      setStudents(studentsRes.data);
      setConcerts(concertsRes.data);
      setMyRequests(requestsRes.data);
      setLessonRequests(lessonReqRes.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveLesson = async (requestId, status) => {
    try {
      await approveLessonRequest(requestId, status);
      fetchData();
    } catch (err) {
      console.error('Failed to update request:', err);
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
      fetchData();
    } catch (err) {
      console.error('Failed to toggle interest:', err);
    }
  };

  const hasRequested = (type, id) => {
    if (type === 'concert') {
      return myRequests.concerts.some(r => r.concert_id === id);
    }
    return false;
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div>
      <div className="page-header">
        <h1>Welcome, {currentUser.name}!</h1>
        <p>Your Teacher Dashboard</p>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '30px', borderBottom: '3px solid rgba(255,255,255,0.2)' }}>
        <button
          onClick={() => setActiveTab('lesson-requests')}
          style={{
            padding: '15px 30px',
            border: 'none',
            backgroundColor: 'transparent',
            color: activeTab === 'lesson-requests' ? 'white' : 'rgba(255,255,255,0.6)',
            fontWeight: activeTab === 'lesson-requests' ? 'bold' : 'normal',
            cursor: 'pointer',
            borderBottom: activeTab === 'lesson-requests' ? '3px solid white' : '3px solid transparent',
            marginBottom: '-3px'
          }}
        >
          Lesson Requests ({lessonRequests.filter(r => r.status === 'pending').length})
        </button>
        <button
          onClick={() => setActiveTab('students')}
          style={{
            padding: '15px 30px',
            border: 'none',
            backgroundColor: 'transparent',
            color: activeTab === 'students' ? 'white' : 'rgba(255,255,255,0.6)',
            fontWeight: activeTab === 'students' ? 'bold' : 'normal',
            cursor: 'pointer',
            borderBottom: activeTab === 'students' ? '3px solid white' : '3px solid transparent',
            marginBottom: '-3px'
          }}
        >
          Browse Students
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

      {/* Lesson Requests Tab */}
      {activeTab === 'lesson-requests' && (
        <div>
          <h2 style={{ color: 'white', marginBottom: '20px' }}>Pending Lesson Requests</h2>
          {lessonRequests.filter(r => r.status === 'pending').length === 0 ? (
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', marginTop: '50px', fontSize: '16px' }}>No pending requests</p>
          ) : (
            <div className="card-grid">
              {lessonRequests.filter(r => r.status === 'pending').map(req => (
                <div key={req.request_id} className="card">
                  <h3>{req.student?.name}</h3>
                  <p><strong>Age:</strong> {req.student?.age}</p>
                  <p><strong>Preferred Format:</strong> {req.studentDetails?.lesson_format}</p>
                  <p><strong>Requested on:</strong> {req.created_at}</p>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                    <button 
                      onClick={() => handleApproveLesson(req.request_id, 'approved')}
                      style={{ flex: 1, backgroundColor: '#4CAF50', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleApproveLesson(req.request_id, 'rejected')}
                      style={{ flex: 1, backgroundColor: '#f44336', color: 'white', padding: '10px', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {lessonRequests.length > 0 && (
            <>
              <h2 style={{ marginTop: '50px', color: 'white', marginBottom: '20px' }}>All Requests</h2>
              <div className="card-grid">
                {lessonRequests.map(req => (
                  <div key={req.request_id} className="card">
                    <h3>{req.student?.name}</h3>
                    <p><strong>Age:</strong> {req.student?.age}</p>
                    <p><strong>Requested on:</strong> {req.created_at}</p>
                    <span className={`badge ${req.status === 'pending' ? 'badge-pending' : req.status === 'approved' ? 'badge-approved' : 'badge-rejected'}`}>
                      {req.status}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Students Tab */}
      {activeTab === 'students' && (
        <div className="card-grid">
          {students.map(student => (
            <div key={student.student_id} className="card">
              <h3>{student.name}</h3>
              <p><strong>Age:</strong> {student.age}</p>
              <p><strong>Preferred Format:</strong> {student.lesson_format}</p>
              <p><strong>Address:</strong> {student.address}</p>
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
    </div>
  );
}

export default TeacherDashboard;
