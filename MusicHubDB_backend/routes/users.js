const express = require('express');
const router = express.Router();
const { users } = require('../data/mockData');

// GET all users
router.get('/', (req, res) => {
  res.json(users);
});

// GET user by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.user_id === id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
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
