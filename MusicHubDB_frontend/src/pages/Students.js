import React, { useState, useEffect } from 'react';
import { getStudents } from '../services/api';

function Students() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await getStudents();
      setStudents(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load students. Please make sure the backend server is running.');
      console.error('Error fetching students:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading students...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1>Music Students</h1>
        <p>Students learning music</p>
      </div>

      <div className="card-grid">
        {students.map((student) => (
          <div key={student.student_id} className="card">
            <h3>{student.name}</h3>
            <p><strong>Age:</strong> {student.age}</p>
            <p><strong>Lesson Format:</strong> {student.lesson_format}</p>
            {student.address && <p><strong>Location:</strong> {student.address}</p>}
            {student.lessons && student.lessons.length > 0 && (
              <div style={{ marginTop: '1rem' }}>
                <strong>Active Lessons:</strong> {student.lessons.length}
              </div>
            )}
            <span className="badge">{student.lesson_format}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Students;
