const express = require('express');
const router = express.Router();
const { users, musicians, students, teachers } = require('../data/mockData');

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Find user by email
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // In mock mode, check if password matches stored password (in real app, use bcrypt)
  if (user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Determine role
  let role = null;
  let roleData = null;

  const musician = musicians.find(m => m.musician_id === user.user_id);
  const student = students.find(s => s.student_id === user.user_id);
  const teacher = teachers.find(t => t.teacher_id === user.user_id);

  if (musician) {
    role = 'musician';
    roleData = musician;
  } else if (student) {
    role = 'student';
    roleData = student;
  } else if (teacher) {
    role = 'teacher';
    roleData = teacher;
  }

  // Return user data with role
  res.json({
    user: {
      id: user.user_id,
      name: user.name,
      email: user.email,
      age: user.age,
      address: user.address,
      role,
      roleData
    }
  });
});

// Signup
router.post('/signup', (req, res) => {
  const { name, email, password, age, address, role, experience, genre, certification, lesson_format } = req.body;

  // Check if email already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({ error: 'Email already registered' });
  }

  // Generate new user ID
  const newUserId = Math.max(...users.map(u => u.user_id)) + 1;

  // Create new user
  const newUser = {
    user_id: newUserId,
    concert_id: null,
    name,
    email,
    password, // In real app, hash this
    age: parseInt(age),
    address,
    range: null
  };

  users.push(newUser);

  // Create role-specific entry
  let roleData = null;

  if (role === 'musician') {
    roleData = {
      musician_id: newUserId,
      experience: parseInt(experience),
      band_status: 0,
      genre
    };
    musicians.push(roleData);
  } else if (role === 'student') {
    roleData = {
      student_id: newUserId,
      lesson_format
    };
    students.push(roleData);
  } else if (role === 'teacher') {
    roleData = {
      teacher_id: newUserId,
      lesson_format: 'online',
      experience: parseInt(experience),
      certification: certification === 'yes' ? 1 : 0,
      hourly_wage: 20
    };
    teachers.push(roleData);
  }

  res.json({
    user: {
      id: newUserId,
      name,
      email,
      age: parseInt(age),
      address,
      role,
      roleData
    }
  });
});

module.exports = router;
