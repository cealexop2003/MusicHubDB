const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all requests for a user
router.get('/my-requests/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    // Get jam sessions musician has joined
    const [jamSessions] = await db.query(`
      SELECT js.jam_id, js.date, js.address, js.genre, js.start_time, js.end_time, js.\`participants#\`
      FROM \`Jam-Sessions_Have_Musicians\` jshm
      JOIN \`Jam-Session\` js ON jshm.jam_id = js.jam_id
      WHERE jshm.musician_id = ?
    `, [userId]);

    // Get bands musician has joined
    const [bands] = await db.query(`
      SELECT b.band_id, b.name, b.creation_date, b.genre, b.\`members#\`
      FROM \`Bands_Have_Musicians\` bhm
      JOIN Band b ON bhm.band_id = b.band_id
      WHERE bhm.musician_id = ?
    `, [userId]);

    // Get lessons (as student or teacher)
    const [lessons] = await db.query(`
      SELECT tgls.*, 
             student.name as student_name, teacher.name as teacher_name
      FROM Teachers_Give_Lessons_to_Students tgls
      LEFT JOIN User student ON tgls.student_id = student.user_id
      LEFT JOIN User teacher ON tgls.teacher_id = teacher.user_id
      WHERE tgls.student_id = ? OR tgls.teacher_id = ?
    `, [userId, userId]);

    res.json({
      jamSessions: jamSessions.map(r => ({ ...r, type: 'jam-session' })),
      bands: bands.map(r => ({ ...r, type: 'band' })),
      lessons: lessons.map(r => ({ ...r, type: 'lesson' })),
      concerts: [] // No concert tracking in database
    });
  } catch (error) {
    console.error('Error fetching user requests:', error);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

// Request to join jam session (adds to Jam-Sessions_Have_Musicians)
router.post('/jam-session', async (req, res) => {
  try {
    const { jam_id, musician_id } = req.body;

    // Check if musician already joined
    const [existing] = await db.query(
      'SELECT * FROM `Jam-Sessions_Have_Musicians` WHERE jam_id = ? AND musician_id = ?',
      [parseInt(jam_id), parseInt(musician_id)]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Already joined this jam session' });
    }

    // Add musician to jam session
    await db.query(
      'INSERT INTO `Jam-Sessions_Have_Musicians` (jam_id, musician_id) VALUES (?, ?)',
      [parseInt(jam_id), parseInt(musician_id)]
    );

    // Increment participants count
    await db.query(
      'UPDATE `Jam-Session` SET `participants#` = `participants#` + 1 WHERE jam_id = ?',
      [parseInt(jam_id)]
    );

    res.json({ message: 'Joined jam session' });
  } catch (error) {
    console.error('Error joining jam session:', error);
    res.status(500).json({ error: 'Failed to join jam session' });
  }
});

// Leave jam session
router.delete('/jam-session/:musicianId/:jamId', async (req, res) => {
  try {
    const musicianId = parseInt(req.params.musicianId);
    const jamId = parseInt(req.params.jamId);

    const [result] = await db.query(
      'DELETE FROM `Jam-Sessions_Have_Musicians` WHERE musician_id = ? AND jam_id = ?',
      [musicianId, jamId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Not in this jam session' });
    }

    // Decrement participants count
    await db.query(
      'UPDATE `Jam-Session` SET `participants#` = `participants#` - 1 WHERE jam_id = ?',
      [jamId]
    );

    res.json({ message: 'Left jam session' });
  } catch (error) {
    console.error('Error leaving jam session:', error);
    res.status(500).json({ error: 'Failed to leave jam session' });
  }
});

// Request to join band (adds to Bands_Have_Musicians)
router.post('/band', async (req, res) => {
  try {
    const { band_id, musician_id } = req.body;

    // Check if musician already in band
    const [existing] = await db.query(
      'SELECT * FROM `Bands_Have_Musicians` WHERE band_id = ? AND musician_id = ?',
      [parseInt(band_id), parseInt(musician_id)]
    );

    if (existing.length > 0) {
      return res.status(400).json({ error: 'Already in this band' });
    }

    // Add musician to band
    await db.query(
      'INSERT INTO `Bands_Have_Musicians` (band_id, musician_id) VALUES (?, ?)',
      [parseInt(band_id), parseInt(musician_id)]
    );

    // Increment members count
    await db.query(
      'UPDATE Band SET `members#` = `members#` + 1 WHERE band_id = ?',
      [parseInt(band_id)]
    );

    res.json({ message: 'Joined band' });
  } catch (error) {
    console.error('Error joining band:', error);
    res.status(500).json({ error: 'Failed to join band' });
  }
});

// Leave band
router.delete('/band/:musicianId/:bandId', async (req, res) => {
  try {
    const musicianId = parseInt(req.params.musicianId);
    const bandId = parseInt(req.params.bandId);

    const [result] = await db.query(
      'DELETE FROM `Bands_Have_Musicians` WHERE musician_id = ? AND band_id = ?',
      [musicianId, bandId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Not in this band' });
    }

    // Decrement members count
    await db.query(
      'UPDATE Band SET `members#` = `members#` - 1 WHERE band_id = ?',
      [bandId]
    );

    res.json({ message: 'Left band' });
  } catch (error) {
    console.error('Error leaving band:', error);
    res.status(500).json({ error: 'Failed to leave band' });
  }
});

// Schedule lesson (adds to Teachers_Give_Lessons_to_Students)
router.post('/lesson', async (req, res) => {
  try {
    const { teacher_id, student_id, lesson_format, address, instrument, start_time, end_time, date, price } = req.body;

    // Get max lesson_id and increment
    const [maxResult] = await db.query('SELECT MAX(lesson_id) as max_id FROM Teachers_Give_Lessons_to_Students');
    const lesson_id = (maxResult[0].max_id || 0) + 1;

    // Use defaults for required fields
    await db.query(
      'INSERT INTO Teachers_Give_Lessons_to_Students (lesson_id, teacher_id, student_id, lesson_format, address, instrument, start_time, end_time, date, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [
        lesson_id, 
        parseInt(teacher_id), 
        parseInt(student_id), 
        lesson_format || 'online', 
        address || 'TBD', 
        instrument || 'vocals', 
        start_time || 'TBD', 
        end_time || 'TBD', 
        date || 'TBD', 
        price || '0'
      ]
    );

    res.json({ message: 'Lesson scheduled' });
  } catch (error) {
    console.error('Error scheduling lesson:', error);
    res.status(500).json({ error: 'Failed to schedule lesson' });
  }
});

// Cancel lesson
router.delete('/lesson/:studentId/:teacherId', async (req, res) => {
  try {
    const studentId = parseInt(req.params.studentId);
    const teacherId = parseInt(req.params.teacherId);

    const [result] = await db.query(
      'DELETE FROM Teachers_Give_Lessons_to_Students WHERE student_id = ? AND teacher_id = ?',
      [studentId, teacherId]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Lesson not found' });
    }

    res.json({ message: 'Lesson cancelled' });
  } catch (error) {
    console.error('Error cancelling lesson:', error);
    res.status(500).json({ error: 'Failed to cancel lesson' });
  }
});

// Show interest in concert (updates User.concert_id)
router.post('/concert', async (req, res) => {
  try {
    const { concert_id, user_id } = req.body;

    await db.query(
      'UPDATE User SET concert_id = ? WHERE user_id = ?',
      [parseInt(concert_id), parseInt(user_id)]
    );

    res.json({ message: 'Concert interest updated' });
  } catch (error) {
    console.error('Error updating concert interest:', error);
    res.status(500).json({ error: 'Failed to update concert interest' });
  }
});

// Remove concert interest (sets User.concert_id to NULL)
router.delete('/concert/:userId', async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);

    await db.query(
      'UPDATE User SET concert_id = NULL WHERE user_id = ?',
      [userId]
    );

    res.json({ message: 'Concert interest removed' });
  } catch (error) {
    console.error('Error removing concert interest:', error);
    res.status(500).json({ error: 'Failed to remove concert interest' });
  }
});

module.exports = router;
