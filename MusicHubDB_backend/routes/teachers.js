const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all teachers
router.get('/', async (req, res) => {
  try {
    const [teachers] = await db.query(`
      SELECT t.*, u.name, u.age, u.address
      FROM Teacher t
      JOIN User u ON t.teacher_id = u.user_id
    `);
    
    // For each teacher, get lessons
    const teachersWithDetails = await Promise.all(
      teachers.map(async (teacher) => {
        const [lessons] = await db.query(`
          SELECT * FROM Teachers_Give_Lessons_to_Students WHERE teacher_id = ?
        `, [teacher.teacher_id]);
        
        return {
          ...teacher,
          lessons
        };
      })
    );
    
    res.json(teachersWithDetails);
  } catch (error) {
    console.error('Error fetching teachers:', error);
    res.status(500).json({ error: 'Failed to fetch teachers' });
  }
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
