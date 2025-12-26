const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all users
router.get('/', async (req, res) => {
  try {
    const [users] = await db.query('SELECT * FROM User');
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// GET user by ID
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [users] = await db.query('SELECT * FROM User WHERE user_id = ?', [id]);
    
    if (users.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(users[0]);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// POST create new user
router.post('/', (req, res) => {
  res.status(201).json({ message: 'User created (mock)', data: req.body });
});

// PUT update user
router.put('/:id', (req, res) => {
  res.json({ message: 'User updated (mock)', id: req.params.id, data: req.body });
});

// DELETE user
router.delete('/:id', (req, res) => {
  res.json({ message: 'User deleted (mock)', id: req.params.id });
});

module.exports = router;
