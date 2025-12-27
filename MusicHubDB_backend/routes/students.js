const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all students
router.get('/', async (req, res) => {
  try {
    const [students] = await db.query(`
      SELECT s.*, u.name, u.age, u.address
      FROM Student s
      JOIN User u ON s.student_id = u.user_id
    `);
    
    // For each student, get lessons
    const studentsWithDetails = await Promise.all(
      students.map(async (student) => {
        const [lessons] = await db.query(`
          SELECT * FROM Teachers_Give_Lessons_to_Students WHERE student_id = ?
        `, [student.student_id]);
        
        return {
          ...student,
          lessons
        };
      })
    );
    
    res.json(studentsWithDetails);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// GET student by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(s => s.student_id === id);
  
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  
  const user = users.find(u => u.user_id === student.student_id);
  const studentLessons = lessons.filter(l => l.student_id === student.student_id);
  
  res.json({
    ...student,
    ...user,
    lessons: studentLessons
  });
});

// POST create new student
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Student created (mock)', data: req.body });
});

// PUT update student
router.put('/:id', (req, res) => {
  res.json({ message: 'Student updated (mock)', id: req.params.id, data: req.body });
});

// DELETE student
router.delete('/:id', (req, res) => {
  res.json({ message: 'Student deleted (mock)', id: req.params.id });
});

module.exports = router;
