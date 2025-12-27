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
router.get('/:id', async (req, res) => {
  try {
    const jamId = parseInt(req.params.id);
    
    // Get jam session details
    const [sessions] = await db.query('SELECT * FROM `Jam-Session` WHERE jam_id = ?', [jamId]);
    
    if (sessions.length === 0) {
      return res.status(404).json({ error: 'Jam session not found' });
    }
    
    // Get musicians from jammers view
    const [participants] = await db.query(`
      SELECT u.user_id, u.name, u.age, m.experience, m.genre
      FROM jammers j
      JOIN User u ON j.musician_id = u.user_id
      JOIN Musician m ON j.musician_id = m.musician_id
      WHERE j.jam_id = ?
    `, [jamId]);
    
    res.json({
      ...sessions[0],
      participants
    });
  } catch (error) {
    console.error('Error fetching jam session:', error);
    res.status(500).json({ error: 'Failed to fetch jam session' });
  }
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
