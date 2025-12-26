const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by name (email field contains the name)
    const [users] = await db.query('SELECT * FROM User WHERE name = ?', [email]);
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = users[0];

    // Determine role
    let role = null;
    let roleData = null;

    // Check if user is a musician
    const [musicians] = await db.query('SELECT * FROM Musician WHERE musician_id = ?', [user.user_id]);
    if (musicians.length > 0) {
      role = 'musician';
      roleData = musicians[0];
    }

    // Check if user is a student
    if (!role) {
      const [students] = await db.query('SELECT * FROM Student WHERE student_id = ?', [user.user_id]);
      if (students.length > 0) {
        role = 'student';
        roleData = students[0];
      }
    }

    // Check if user is a teacher
    if (!role) {
      const [teachers] = await db.query('SELECT * FROM Teacher WHERE teacher_id = ?', [user.user_id]);
      if (teachers.length > 0) {
        role = 'teacher';
        roleData = teachers[0];
      }
    }

    // Return user data with role
    res.json({
      user: {
        id: user.user_id,
        name: user.name,
        email: user.name, // Use name as email
        age: user.age,
        address: user.address,
        role,
        roleData
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, age, address, role, experience, genre, certification, lesson_format } = req.body;

    // Check if name already exists
    const [existingUsers] = await db.query('SELECT * FROM User WHERE name = ?', [name]);
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Name already registered' });
    }

    // Generate new user ID
    const [maxIdResult] = await db.query('SELECT MAX(user_id) as maxId FROM User');
    const newUserId = (maxIdResult[0].maxId || 0) + 1;

    // Create new user (only using columns that exist, range default to 0)
    await db.query(
      'INSERT INTO User (user_id, concert_id, name, age, address, `range`) VALUES (?, NULL, ?, ?, ?, 0)',
      [newUserId, name, parseInt(age), address]
    );

    // Create role-specific entry
    let roleData = null;

    if (role === 'musician') {
      await db.query(
        'INSERT INTO Musician (musician_id, experience, band_status, genre) VALUES (?, ?, 0, ?)',
        [newUserId, parseInt(experience), genre]
      );
      roleData = {
        musician_id: newUserId,
        experience: parseInt(experience),
        band_status: 0,
        genre
      };
    } else if (role === 'student') {
      await db.query(
        'INSERT INTO Student (student_id, lesson_format) VALUES (?, ?)',
        [newUserId, lesson_format]
      );
      roleData = {
        student_id: newUserId,
        lesson_format
      };
    } else if (role === 'teacher') {
      const cert = certification === 'yes' ? 1 : 0;
      await db.query(
        'INSERT INTO Teacher (teacher_id, lesson_format, experience, certification, hourly_wage) VALUES (?, ?, ?, ?, ?)',
        [newUserId, 'online', parseInt(experience), cert, 20]
      );
      roleData = {
        teacher_id: newUserId,
        lesson_format: 'online',
        experience: parseInt(experience),
        certification: cert,
        hourly_wage: 20
      };
    }

    res.json({
      user: {
        id: newUserId,
        name,
        email: name, // Use name as email
        age: parseInt(age),
        address,
        role,
        roleData
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

module.exports = router;
