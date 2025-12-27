const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all instruments
router.get('/', async (req, res) => {
  try {
    const [instruments] = await db.query(`
      SELECT i.*, u.name as owner_name
      FROM Instrument i
      LEFT JOIN User u ON i.user_id = u.user_id
    `);
    
    res.json(instruments);
  } catch (error) {
    console.error('Error fetching instruments:', error);
    res.status(500).json({ error: 'Failed to fetch instruments' });
  }
});

// GET instrument by ID
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [instruments] = await db.query(`
      SELECT i.*, u.name as owner_name
      FROM Instrument i
      LEFT JOIN User u ON i.user_id = u.user_id
      WHERE i.instrument_id = ?
    `, [id]);
    
    if (instruments.length === 0) {
      return res.status(404).json({ error: 'Instrument not found' });
    }
    
    res.json(instruments[0]);
  } catch (error) {
    console.error('Error fetching instrument:', error);
    res.status(500).json({ error: 'Failed to fetch instrument' });
  }
});

// GET instruments by user ID
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const [instruments] = await db.query(
      'SELECT * FROM Instrument WHERE user_id = ?',
      [userId]
    );
    
    res.json(instruments);
  } catch (error) {
    console.error('Error fetching user instruments:', error);
    res.status(500).json({ error: 'Failed to fetch instruments' });
  }
});

// POST create new instrument
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Instrument created (mock)', data: req.body });
});

// PUT update instrument
router.put('/:id', (req, res) => {
  res.json({ message: 'Instrument updated (mock)', id: req.params.id, data: req.body });
});

// DELETE instrument
router.delete('/:id', (req, res) => {
  res.json({ message: 'Instrument deleted (mock)', id: req.params.id });
});

// GET instrument by user_id
router.get('/user/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const [instruments] = await db.query('SELECT * FROM Instrument WHERE user_id = ?', [userId]);
    res.json(instruments[0] || null);
  } catch (error) {
    console.error('Error fetching user instrument:', error);
    res.status(500).json({ error: 'Failed to fetch user instrument' });
  }
});

// Update or create instrument for user
router.put('/user/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { type, name } = req.body;

    // Check if instrument exists for this user
    const [existing] = await db.query('SELECT * FROM Instrument WHERE user_id = ?', [userId]);

    if (existing.length > 0) {
      // Update existing
      await db.query(
        'UPDATE Instrument SET type = ?, name = ? WHERE user_id = ?',
        [type, name, userId]
      );
    } else {
      // Insert new
      const [maxResult] = await db.query('SELECT MAX(instrument_id) as max_id FROM Instrument');
      const instrument_id = (maxResult[0].max_id || 0) + 1;
      
      await db.query(
        'INSERT INTO Instrument (instrument_id, user_id, type, name) VALUES (?, ?, ?, ?)',
        [instrument_id, userId, type, name]
      );
    }

    res.json({ message: 'Instrument updated successfully' });
  } catch (error) {
    console.error('Error updating instrument:', error);
    res.status(500).json({ error: 'Failed to update instrument' });
  }
});

module.exports = router;
