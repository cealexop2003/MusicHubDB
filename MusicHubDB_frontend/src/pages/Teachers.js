import React, { useState, useEffect } from 'react';
import { getTeachers } from '../services/api';

function Teachers() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const response = await getTeachers();
      setTeachers(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load teachers. Please make sure the backend server is running.');
      console.error('Error fetching teachers:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading teachers...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1>Music Teachers</h1>
        <p>Find experienced music instructors</p>
      </div>

      <div className="card-grid">
        {teachers.map((teacher) => (
          <div key={teacher.teacher_id} className="card">
            <h3>{teacher.name}</h3>
            <p><strong>Experience:</strong> {teacher.experience} years</p>
            <p><strong>Lesson Format:</strong> {teacher.lesson_format}</p>
            <p><strong>Hourly Rate:</strong> €{teacher.hourly_wage}</p>
            <p><strong>Certified:</strong> {teacher.certification ? 'Yes' : 'No'}</p>
            {teacher.address && <p><strong>Location:</strong> {teacher.address}</p>}
            <span className="badge">
              {teacher.certification ? '✓ Certified' : 'Teacher'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Teachers;
