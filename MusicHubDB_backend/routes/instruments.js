const express = require('express');
const router = express.Router();
const { instruments, users } = require('../data/mockData');

// GET all instruments
router.get('/', (req, res) => {
  const instrumentsWithOwners = instruments.map(instrument => {
    const owner = users.find(u => u.user_id === instrument.user_id);
    
    return {
      ...instrument,
      owner_name: owner?.name
    };
  });
  
  res.json(instrumentsWithOwners);
});

// GET instrument by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const instrument = instruments.find(i => i.instrument_id === id);
  
  if (!instrument) {
    return res.status(404).json({ error: 'Instrument not found' });
  }
  
  const owner = users.find(u => u.user_id === instrument.user_id);
  
  res.json({
    ...instrument,
    owner_name: owner?.name
  });
});

// GET instruments by user ID
router.get('/user/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const userInstruments = instruments.filter(i => i.user_id === userId);
  
  res.json(userInstruments);
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

module.exports = router;
