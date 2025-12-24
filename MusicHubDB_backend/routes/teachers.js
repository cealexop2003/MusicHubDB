const express = require('express');
const router = express.Router();
const { teachers, users, lessons, students } = require('../data/mockData');

// GET all teachers
router.get('/', (req, res) => {
  const teachersWithDetails = teachers.map(teacher => {
    const user = users.find(u => u.user_id === teacher.teacher_id);
    const teacherLessons = lessons.filter(l => l.teacher_id === teacher.teacher_id);
    
    return {
      ...teacher,
      ...user,
      lessons: teacherLessons
    };
  });
  
  res.json(teachersWithDetails);
});

// GET teacher by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const teacher = teachers.find(t => t.teacher_id === id);
  
  if (!teacher) {
    return res.status(404).json({ error: 'Teacher not found' });
  }
  
  const user = users.find(u => u.user_id === teacher.teacher_id);
  const teacherLessons = lessons.filter(l => l.teacher_id === teacher.teacher_id);
  
  res.json({
    ...teacher,
    ...user,
    lessons: teacherLessons
  });
});

// POST create new teacher
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Teacher created (mock)', data: req.body });
});

// PUT update teacher
router.put('/:id', (req, res) => {
  res.json({ message: 'Teacher updated (mock)', id: req.params.id, data: req.body });
});

// DELETE teacher
router.delete('/:id', (req, res) => {
  res.json({ message: 'Teacher deleted (mock)', id: req.params.id });
});

module.exports = router;
