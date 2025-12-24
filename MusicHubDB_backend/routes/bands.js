const express = require('express');
const router = express.Router();
const { bands, bandsHaveMusicians, musicians, users } = require('../data/mockData');

// GET all bands
router.get('/', (req, res) => {
  const bandsWithMembers = bands.map(band => {
    const memberIds = bandsHaveMusicians
      .filter(bm => bm.band_id === band.band_id)
      .map(bm => bm.musician_id);
    
    const members = memberIds.map(musicianId => {
      const musician = musicians.find(m => m.musician_id === musicianId);
      const user = users.find(u => u.user_id === musicianId);
      return { ...musician, ...user };
    });
    
    return {
      ...band,
      members
    };
  });
  
  res.json(bandsWithMembers);
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
