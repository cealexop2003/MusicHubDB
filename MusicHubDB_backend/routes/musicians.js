const express = require('express');
const router = express.Router();
const { musicians, users, instruments, bands, bandsHaveMusicians } = require('../data/mockData');

// GET all musicians with user details
router.get('/', (req, res) => {
  const musiciansWithDetails = musicians.map(musician => {
    const user = users.find(u => u.user_id === musician.musician_id);
    const musicianInstruments = instruments.filter(i => i.user_id === musician.musician_id);
    const musicianBands = bandsHaveMusicians
      .filter(bm => bm.musician_id === musician.musician_id)
      .map(bm => bands.find(b => b.band_id === bm.band_id));
    
    return {
      ...musician,
      ...user,
      instruments: musicianInstruments,
      bands: musicianBands
    };
  });
  
  res.json(musiciansWithDetails);
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
