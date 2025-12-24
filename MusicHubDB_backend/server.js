const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
const musiciansRoutes = require('./routes/musicians');
const bandsRoutes = require('./routes/bands');
const concertsRoutes = require('./routes/concerts');
const jamSessionsRoutes = require('./routes/jamSessions');
const teachersRoutes = require('./routes/teachers');
const studentsRoutes = require('./routes/students');
const instrumentsRoutes = require('./routes/instruments');
const usersRoutes = require('./routes/users');

// Routes
app.use('/api/musicians', musiciansRoutes);
app.use('/api/bands', bandsRoutes);
app.use('/api/concerts', concertsRoutes);
app.use('/api/jam-sessions', jamSessionsRoutes);
app.use('/api/teachers', teachersRoutes);
app.use('/api/students', studentsRoutes);
app.use('/api/instruments', instrumentsRoutes);
app.use('/api/users', usersRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'MusicHubDB API is running' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🎵 MusicHubDB Backend running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
});
