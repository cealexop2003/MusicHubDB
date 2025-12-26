import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  getStudents, 
  getConcerts, 
  getMyRequests,
  updateLessonDetails
} from '../services/api';

function TeacherDashboard() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('lesson-requests');
  const [students, setStudents] = useState([]);
  const [concerts, setConcerts] = useState([]);
  const [lessonRequests, setLessonRequests] = useState([]);
  const [myRequests, setMyRequests] = useState({ concerts: [] });
  const [loading, setLoading] = useState(true);
  const [editingLesson, setEditingLesson] = useState(null);
  const [editForm, setEditForm] = useState({
    lesson_format: '',
    address: '',
    instrument: '',
    start_time: '',
    end_time: '',
    date: '',
    price: ''
  });

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
      setLessonRequests(requestsRes.data.lessons || []);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEditLesson = (lesson) => {
    setEditingLesson(lesson.lesson_id);
    setEditForm({
      lesson_format: lesson.lesson_format || 'online',
      address: lesson.address || '',
      instrument: lesson.instrument || 'vocals',
      start_time: lesson.start_time || '',
      end_time: lesson.end_time || '',
      date: lesson.date || '',
      price: lesson.price || '0'
    });
  };

  const handleSaveLesson = async (lessonId) => {
    try {
      await updateLessonDetails(lessonId, editForm);
      setEditingLesson(null);
      await fetchData(); // Refresh data
    } catch (err) {
      console.error('Failed to update lesson:', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingLesson(null);
    setEditForm({
      lesson_format: '',
      address: '',
      instrument: '',
      start_time: '',
      end_time: '',
      date: '',
      price: ''
    });
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
          Lesson Requests ({lessonRequests.length})
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
          <h2 style={{ color: 'white', marginBottom: '20px' }}>Lesson Requests</h2>
          {lessonRequests.length > 0 ? (
            <div className="card-grid">
              {lessonRequests.map(lesson => (
                <div key={lesson.lesson_id} className="card">
                  <h3>Student: {lesson.student_name}</h3>
                  
                  {editingLesson === lesson.lesson_id ? (
                    <div style={{ marginTop: '15px' }}>
                      <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Format:</label>
                        <select 
                          value={editForm.lesson_format}
                          onChange={(e) => setEditForm({...editForm, lesson_format: e.target.value})}
                          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                        >
                          <option value="online">Online</option>
                          <option value="in_person">In Person</option>
                        </select>
                      </div>
                      
                      <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Instrument:</label>
                        <select 
                          value={editForm.instrument}
                          onChange={(e) => setEditForm({...editForm, instrument: e.target.value})}
                          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                        >
                          <option value="vocals">Vocals</option>
                          <option value="piano">Piano</option>
                          <option value="classical_guitar">Classical Guitar</option>
                          <option value="acoustic_guitar">Acoustic Guitar</option>
                          <option value="electric_guitar">Electric Guitar</option>
                          <option value="bass">Bass</option>
                          <option value="drums">Drums</option>
                          <option value="violin">Violin</option>
                          <option value="saxophone">Saxophone</option>
                          <option value="trumpet">Trumpet</option>
                        </select>
                      </div>
                      
                      <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Address:</label>
                        <input 
                          type="text"
                          value={editForm.address}
                          onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                      </div>
                      
                      <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Date:</label>
                        <input 
                          type="text"
                          value={editForm.date}
                          onChange={(e) => setEditForm({...editForm, date: e.target.value})}
                          placeholder="e.g., 2025-01-15"
                          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                      </div>
                      
                      <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Start Time:</label>
                        <input 
                          type="text"
                          value={editForm.start_time}
                          onChange={(e) => setEditForm({...editForm, start_time: e.target.value})}
                          placeholder="e.g., 14:00"
                          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                      </div>
                      
                      <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>End Time:</label>
                        <input 
                          type="text"
                          value={editForm.end_time}
                          onChange={(e) => setEditForm({...editForm, end_time: e.target.value})}
                          placeholder="e.g., 15:00"
                          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                      </div>
                      
                      <div style={{ marginBottom: '10px' }}>
                        <label style={{ display: 'block', marginBottom: '5px', color: '#333' }}>Price (€):</label>
                        <input 
                          type="text"
                          value={editForm.price}
                          onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ddd' }}
                        />
                      </div>
                      
                      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                        <button 
                          onClick={() => handleSaveLesson(lesson.lesson_id)}
                          style={{ 
                            flex: 1,
                            backgroundColor: '#667eea', 
                            color: 'white', 
                            padding: '10px', 
                            border: 'none', 
                            borderRadius: '5px', 
                            cursor: 'pointer',
                            fontWeight: 'bold'
                          }}
                        >
                          Save
                        </button>
                        <button 
                          onClick={handleCancelEdit}
                          style={{ 
                            flex: 1,
                            backgroundColor: '#ccc', 
                            color: '#333', 
                            padding: '10px', 
                            border: 'none', 
                            borderRadius: '5px', 
                            cursor: 'pointer',
                            fontWeight: 'bold'
                          }}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <>
                      <p><strong>Format:</strong> {lesson.lesson_format || 'TBD'}</p>
                      <p><strong>Instrument:</strong> {lesson.instrument || 'TBD'}</p>
                      <p><strong>Date:</strong> {lesson.date}</p>
                      <p><strong>Time:</strong> {lesson.start_time} - {lesson.end_time}</p>
                      <p><strong>Location:</strong> {lesson.address}</p>
                      <p><strong>Price:</strong> €{lesson.price}</p>
                      <button 
                        onClick={() => handleEditLesson(lesson)}
                        style={{ 
                          backgroundColor: '#667eea', 
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
                        Edit Details
                      </button>
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', marginTop: '50px', fontSize: '16px' }}>
              No lesson requests yet
            </p>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TeacherDashboard;
