const express = require('express');
const router = express.Router();
const { jamSessions, jamSessionsHaveMusicians, musicians, users } = require('../data/mockData');

// GET all jam sessions
router.get('/', (req, res) => {
  const jamSessionsWithParticipants = jamSessions.map(session => {
    const participantIds = jamSessionsHaveMusicians
      .filter(jm => jm.jam_id === session.jam_id)
      .map(jm => jm.musician_id);
    
    const participants = participantIds.map(musicianId => {
      const musician = musicians.find(m => m.musician_id === musicianId);
      const user = users.find(u => u.user_id === musicianId);
      return { ...musician, ...user };
    });
    
    return {
      ...session,
      participants
    };
  });
  
  res.json(jamSessionsWithParticipants);
});

// GET jam session by ID
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const session = jamSessions.find(j => j.jam_id === id);
  
  if (!session) {
    return res.status(404).json({ error: 'Jam session not found' });
  }
  
  const participantIds = jamSessionsHaveMusicians
    .filter(jm => jm.jam_id === session.jam_id)
    .map(jm => jm.musician_id);
  
  const participants = participantIds.map(musicianId => {
    const musician = musicians.find(m => m.musician_id === musicianId);
    const user = users.find(u => u.user_id === musicianId);
    return { ...musician, ...user };
  });
  
  res.json({
    ...session,
    participants
  });
});

// POST create new jam session
router.post('/', (req, res) => {
  res.status(201).json({ message: 'Jam session created (mock)', data: req.body });
});

// PUT update jam session
router.put('/:id', (req, res) => {
  res.json({ message: 'Jam session updated (mock)', id: req.params.id, data: req.body });
});

// DELETE jam session
router.delete('/:id', (req, res) => {
  res.json({ message: 'Jam session deleted (mock)', id: req.params.id });
});

module.exports = router;
