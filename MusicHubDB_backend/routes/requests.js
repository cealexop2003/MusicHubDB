const express = require('express');
const router = express.Router();
const { 
  jamSessionRequests, 
  bandRequests, 
  lessonRequests, 
  concertInterests,
  jamSessions,
  bands,
  concerts,
  users,
  teachers,
  students
} = require('../data/mockData');

// Get all requests for a user
router.get('/my-requests/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);

  const myJamRequests = jamSessionRequests.filter(r => r.musician_id === userId).map(r => ({
    ...r,
    type: 'jam-session',
    details: jamSessions.find(j => j.jam_id === r.jam_id)
  }));

  const myBandRequests = bandRequests.filter(r => r.musician_id === userId).map(r => ({
    ...r,
    type: 'band',
    details: bands.find(b => b.band_id === r.band_id)
  }));

  const myLessonRequests = lessonRequests.filter(r => r.student_id === userId || r.teacher_id === userId).map(r => ({
    ...r,
    type: 'lesson',
    teacher: users.find(u => u.user_id === r.teacher_id),
    student: users.find(u => u.user_id === r.student_id)
  }));

  const myConcertInterests = concertInterests.filter(r => r.user_id === userId).map(r => ({
    ...r,
    type: 'concert',
    details: concerts.find(c => c.concert_id === r.concert_id)
  }));

  res.json({
    jamSessions: myJamRequests,
    bands: myBandRequests,
    lessons: myLessonRequests,
    concerts: myConcertInterests
  });
});

// Request to join jam session
router.post('/jam-session', (req, res) => {
  const { jam_id, musician_id } = req.body;

  // Check if request already exists
  const existingRequest = jamSessionRequests.find(
    r => r.jam_id === parseInt(jam_id) && r.musician_id === parseInt(musician_id) && r.status === 'pending'
  );

  if (existingRequest) {
    return res.status(400).json({ error: 'Request already exists' });
  }

  const newRequest = {
    request_id: jamSessionRequests.length + 1,
    jam_id: parseInt(jam_id),
    musician_id: parseInt(musician_id),
    status: 'pending',
    created_at: new Date().toISOString().split('T')[0]
  };

  jamSessionRequests.push(newRequest);
  res.json(newRequest);
});

// Cancel jam session request
router.delete('/jam-session/:musicianId/:jamId', (req, res) => {
  const musicianId = parseInt(req.params.musicianId);
  const jamId = parseInt(req.params.jamId);

  const index = jamSessionRequests.findIndex(
    r => r.musician_id === musicianId && r.jam_id === jamId && r.status === 'pending'
  );

  if (index === -1) {
    return res.status(404).json({ error: 'Request not found' });
  }

  jamSessionRequests.splice(index, 1);
  res.json({ message: 'Request cancelled' });
});

// Request to join band
router.post('/band', (req, res) => {
  const { band_id, musician_id } = req.body;

  // Check if request already exists
  const existingRequest = bandRequests.find(
    r => r.band_id === parseInt(band_id) && r.musician_id === parseInt(musician_id) && r.status === 'pending'
  );

  if (existingRequest) {
    return res.status(400).json({ error: 'Request already exists' });
  }

  const newRequest = {
    request_id: bandRequests.length + 1,
    band_id: parseInt(band_id),
    musician_id: parseInt(musician_id),
    status: 'pending',
    created_at: new Date().toISOString().split('T')[0]
  };

  bandRequests.push(newRequest);
  res.json(newRequest);
});

// Cancel band request
router.delete('/band/:musicianId/:bandId', (req, res) => {
  const musicianId = parseInt(req.params.musicianId);
  const bandId = parseInt(req.params.bandId);

  const index = bandRequests.findIndex(
    r => r.musician_id === musicianId && r.band_id === bandId && r.status === 'pending'
  );

  if (index === -1) {
    return res.status(404).json({ error: 'Request not found' });
  }

  bandRequests.splice(index, 1);
  res.json({ message: 'Request cancelled' });
});

// Request lesson (from student)
router.post('/lesson', (req, res) => {
  const { teacher_id, student_id } = req.body;

  // Check if request already exists
  const existingRequest = lessonRequests.find(
    r => r.teacher_id === parseInt(teacher_id) && r.student_id === parseInt(student_id) && r.status === 'pending'
  );

  if (existingRequest) {
    return res.status(400).json({ error: 'Request already exists' });
  }

  const newRequest = {
    request_id: lessonRequests.length + 1,
    teacher_id: parseInt(teacher_id),
    student_id: parseInt(student_id),
    status: 'pending',
    created_at: new Date().toISOString().split('T')[0]
  };

  lessonRequests.push(newRequest);
  res.json(newRequest);
});

// Cancel lesson request
router.delete('/lesson/:studentId/:teacherId', (req, res) => {
  const studentId = parseInt(req.params.studentId);
  const teacherId = parseInt(req.params.teacherId);

  const index = lessonRequests.findIndex(
    r => r.student_id === studentId && r.teacher_id === teacherId && r.status === 'pending'
  );

  if (index === -1) {
    return res.status(404).json({ error: 'Request not found' });
  }

  lessonRequests.splice(index, 1);
  res.json({ message: 'Request cancelled' });
});

// Show interest in concert
router.post('/concert', (req, res) => {
  const { concert_id, user_id } = req.body;

  // Check if interest already exists
  const existingInterest = concertInterests.find(
    i => i.concert_id === parseInt(concert_id) && i.user_id === parseInt(user_id)
  );

  if (existingInterest) {
    return res.status(400).json({ error: 'Interest already registered' });
  }

  const newInterest = {
    interest_id: concertInterests.length + 1,
    concert_id: parseInt(concert_id),
    user_id: parseInt(user_id),
    created_at: new Date().toISOString().split('T')[0]
  };

  concertInterests.push(newInterest);
  res.json(newInterest);
});

// Remove interest in concert
router.delete('/concert/:userId/:concertId', (req, res) => {
  const userId = parseInt(req.params.userId);
  const concertId = parseInt(req.params.concertId);

  const index = concertInterests.findIndex(
    i => i.user_id === userId && i.concert_id === concertId
  );

  if (index === -1) {
    return res.status(404).json({ error: 'Interest not found' });
  }

  concertInterests.splice(index, 1);
  res.json({ message: 'Interest removed' });
});

// Approve/reject jam session request
router.put('/jam-session/:requestId', (req, res) => {
  const requestId = parseInt(req.params.requestId);
  const { status } = req.body; // 'approved' or 'rejected'

  const request = jamSessionRequests.find(r => r.request_id === requestId);
  if (!request) {
    return res.status(404).json({ error: 'Request not found' });
  }

  request.status = status;
  res.json(request);
});

// Approve/reject band request
router.put('/band/:requestId', (req, res) => {
  const requestId = parseInt(req.params.requestId);
  const { status } = req.body;

  const request = bandRequests.find(r => r.request_id === requestId);
  if (!request) {
    return res.status(404).json({ error: 'Request not found' });
  }

  request.status = status;
  res.json(request);
});

// Approve/reject lesson request
router.put('/lesson/:requestId', (req, res) => {
  const requestId = parseInt(req.params.requestId);
  const { status } = req.body;

  const request = lessonRequests.find(r => r.request_id === requestId);
  if (!request) {
    return res.status(404).json({ error: 'Request not found' });
  }

  request.status = status;
  res.json(request);
});

// Get pending lesson requests for a teacher
router.get('/lesson/teacher/:teacherId', (req, res) => {
  const teacherId = parseInt(req.params.teacherId);
  
  const requests = lessonRequests
    .filter(r => r.teacher_id === teacherId)
    .map(r => ({
      ...r,
      student: users.find(u => u.user_id === r.student_id),
      studentDetails: students.find(s => s.student_id === r.student_id)
    }));

  res.json(requests);
});

module.exports = router;
