const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all bands
router.get('/', async (req, res) => {
  try {
    const [bands] = await db.query('SELECT * FROM Band');
    
    // For each band, get members
    const bandsWithMembers = await Promise.all(
      bands.map(async (band) => {
        const [members] = await db.query(`
          SELECT u.*, m.experience, m.genre
          FROM Bands_Have_Musicians bm
          JOIN User u ON bm.musician_id = u.user_id
          JOIN Musician m ON bm.musician_id = m.musician_id
          WHERE bm.band_id = ?
        `, [band.band_id]);
        
        return {
          ...band,
          members
        };
      })
    );
    
    res.json(bandsWithMembers);
  } catch (error) {
    console.error('Error fetching bands:', error);
    res.status(500).json({ error: 'Failed to fetch bands' });
  }
});

// GET band by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const band = bands.find(b => b.band_id === id);
  
  if (!band) {
    return res.status(404).json({ error: 'Band not found' });
  }
  
  const memberIds = bandsHaveMusicians
    .filter(bm => bm.band_id === band.band_id)
    .map(bm => bm.musician_id);
  
  const members = memberIds.map(musicianId => {
    const musician = musicians.find(m => m.musician_id === musicianId);
    const user = users.find(u => u.user_id === musicianId);
    return { ...musician, ...user };
  });
  
  res.json({
    ...band,
    members
  });
});

// POST create new band
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Band created (mock)', data: req.body });
});

// PUT update band
router.put('/:id', (req, res) => {
  res.json({ message: 'Band updated (mock)', id: req.params.id, data: req.body });
});

// DELETE band
router.delete('/:id', (req, res) => {
  res.json({ message: 'Band deleted (mock)', id: req.params.id });
});

module.exports = router;
