const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all concerts
router.get('/', async (req, res) => {
  try {
    const [concerts] = await db.query(`
      SELECT c.*, b.name as band_name, u.name as musician_name
      FROM CONCERT c
      LEFT JOIN Band b ON c.band_id = b.band_id
      LEFT JOIN User u ON c.musician_id = u.user_id
    `);
    
    res.json(concerts);
  } catch (error) {
    console.error('Error fetching concerts:', error);
    res.status(500).json({ error: 'Failed to fetch concerts' });
  }
});

// GET concert by ID
router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const [concerts] = await db.query(`
      SELECT c.*, b.name as band_name, u.name as musician_name
      FROM CONCERT c
      LEFT JOIN Band b ON c.band_id = b.band_id
      LEFT JOIN User u ON c.musician_id = u.user_id
      WHERE c.concert_id = ?
    `, [id]);
    
    if (concerts.length === 0) {
      return res.status(404).json({ error: 'Concert not found' });
    }
    
    res.json(concerts[0]);
  } catch (error) {
    console.error('Error fetching concert:', error);
    res.status(500).json({ error: 'Failed to fetch concert' });
  }
});

// POST create new concert
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Concert created (mock)', data: req.body });
});

// PUT update concert
router.put('/:id', (req, res) => {
  res.json({ message: 'Concert updated (mock)', id: req.params.id, data: req.body });
});

// DELETE concert
router.delete('/:id', (req, res) => {
  res.json({ message: 'Concert deleted (mock)', id: req.params.id });
});

module.exports = router;
