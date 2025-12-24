const express = require('express');
const router = express.Router();
const { concerts, bands, musicians, users } = require('../data/mockData');

// GET all concerts
router.get('/', (req, res) => {
  const concertsWithDetails = concerts.map(concert => {
    const band = bands.find(b => b.band_id === concert.band_id);
    const musician = musicians.find(m => m.musician_id === concert.musician_id);
    const user = users.find(u => u.user_id === concert.musician_id);
    
    return {
      ...concert,
      band_name: band?.name,
      musician_name: user?.name
    };
  });
  
  res.json(concertsWithDetails);
});

// GET concert by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const concert = concerts.find(c => c.concert_id === id);
  
  if (!concert) {
    return res.status(404).json({ error: 'Concert not found' });
  }
  
  const band = bands.find(b => b.band_id === concert.band_id);
  const musician = musicians.find(m => m.musician_id === concert.musician_id);
  const user = users.find(u => u.user_id === concert.musician_id);
  
  res.json({
    ...concert,
    band_name: band?.name,
    musician_name: user?.name
  });
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
