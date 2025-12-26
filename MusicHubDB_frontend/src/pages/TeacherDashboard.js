import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  getStudents, 
  getConcerts, 
  getMyRequests
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
      const [studentsRes, concertsRes, requestsRes] = await Promise.all([
        getStudents(),
        getConcerts(),
        getMyRequests(currentUser.id)
      ]);
      
      setStudents(studentsRes.data);
      setConcerts(concertsRes.data);
      setMyRequests(requestsRes.data);
      setLessonRequests([]); // No lesson request tracking
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  // No concert or lesson request handling (no tracking tables)

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
          Lesson Requests (0)
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
        <button
          onClick={() => setActiveTab('my-interests')}
          style={{
            padding: '15px 30px',
            border: 'none',
            backgroundColor: 'transparent',
            color: activeTab === 'my-interests' ? 'white' : 'rgba(255,255,255,0.6)',
            fontWeight: activeTab === 'my-interests' ? 'bold' : 'normal',
            cursor: 'pointer',
            borderBottom: activeTab === 'my-interests' ? '3px solid white' : '3px solid transparent',
            marginBottom: '-3px'
          }}
        >
          My Concert Interests
        </button>
      </div>

      {/* Lesson Requests Tab */}
      {activeTab === 'lesson-requests' && (
        <div>
          <h2 style={{ color: 'white', marginBottom: '20px' }}>Pending Lesson Requests</h2>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', marginTop: '50px', fontSize: '16px' }}>
            No lesson request tracking system available
          </p>
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
            </div>
          ))}
        </div>
      )}

      {/* My Concert Interests Tab */}
      {activeTab === 'my-interests' && (
        <div>
          <h2 style={{ color: 'white', marginBottom: '20px' }}>My Concert Interests</h2>
          <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', marginTop: '80px', fontSize: '18px' }}>
            No concert interest tracking available
          </p>
        </div>
      )}
    </div>
  );
}

export default TeacherDashboard;
