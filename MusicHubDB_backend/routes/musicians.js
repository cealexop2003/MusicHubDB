const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all musicians with user details
router.get('/', async (req, res) => {
  try {
    const [musicians] = await db.query(`
      SELECT m.*, u.name, u.email, u.age, u.address, u.range
      FROM Musician m
      JOIN User u ON m.musician_id = u.user_id
    `);
    
    // For each musician, get instruments and bands
    const musiciansWithDetails = await Promise.all(
      musicians.map(async (musician) => {
        const [instruments] = await db.query(`
          SELECT * FROM Instrument WHERE user_id = ?
        `, [musician.musician_id]);
        
        const [bands] = await db.query(`
          SELECT b.*
          FROM Bands_Have_Musicians bm
          JOIN Band b ON bm.band_id = b.band_id
          WHERE bm.musician_id = ?
        `, [musician.musician_id]);
        
        return {
          ...musician,
          instruments,
          bands
        };
      })
    );
    
    res.json(musiciansWithDetails);
  } catch (error) {
    console.error('Error fetching musicians:', error);
    res.status(500).json({ error: 'Failed to fetch musicians' });
  }
});

// GET musician by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const musician = musicians.find(m => m.musician_id === id);
  
  if (!musician) {
    return res.status(404).json({ error: 'Musician not found' });
  }
  
  const user = users.find(u => u.user_id === musician.musician_id);
  const musicianInstruments = instruments.filter(i => i.user_id === musician.musician_id);
  const musicianBands = bandsHaveMusicians
    .filter(bm => bm.musician_id === musician.musician_id)
    .map(bm => bands.find(b => b.band_id === bm.band_id));
  
  res.json({
    ...musician,
    ...user,
    instruments: musicianInstruments,
    bands: musicianBands
  });
});

// POST create new musician
router.post('/', (req, res) => {
  // This will work with real DB later
  res.status(201).json({ message: 'Musician created (mock)', data: req.body });
});

// PUT update musician
router.put('/:id', (req, res) => {
  res.json({ message: 'Musician updated (mock)', id: req.params.id, data: req.body });
});

// DELETE musician
router.delete('/:id', (req, res) => {
  res.json({ message: 'Musician deleted (mock)', id: req.params.id });
});

module.exports = router;
