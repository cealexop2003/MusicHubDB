const express = require('express');
const router = express.Router();
const { students, users, lessons, teachers } = require('../data/mockData');

// GET all students
router.get('/', (req, res) => {
  const studentsWithDetails = students.map(student => {
    const user = users.find(u => u.user_id === student.student_id);
    const studentLessons = lessons.filter(l => l.student_id === student.student_id);
    
    return {
      ...student,
      ...user,
      lessons: studentLessons
    };
  });
  
  res.json(studentsWithDetails);
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
