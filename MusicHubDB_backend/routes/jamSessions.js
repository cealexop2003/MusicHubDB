const express = require('express');
const router = express.Router();
const db = require('../config/db');

// GET all jam sessions
router.get('/', async (req, res) => {
  try {
    const [jamSessions] = await db.query('SELECT * FROM `Jam-Session`');
    
    // For each jam session, get participants
    const jamSessionsWithParticipants = await Promise.all(
      jamSessions.map(async (session) => {
        const [participants] = await db.query(`
          SELECT u.*, m.experience, m.genre
          FROM \`Jam-Sessions_Have_Musicians\` jm
          JOIN User u ON jm.musician_id = u.user_id
          JOIN Musician m ON jm.musician_id = m.musician_id
          WHERE jm.jam_id = ?
        `, [session.jam_id]);
        
        return {
          ...session,
          participants
        };
      })
    );
    
    res.json(jamSessionsWithParticipants);
  } catch (error) {
    console.error('Error fetching jam sessions:', error);
    res.status(500).json({ error: 'Failed to fetch jam sessions' });
  }
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
