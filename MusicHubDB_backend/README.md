# MusicHubDB Backend

Backend API for MusicHubDB application built with Node.js and Express.

## Installation

```bash
npm install
```

## Running the Server

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Musicians
- `GET /api/musicians` - Get all musicians
- `GET /api/musicians/:id` - Get musician by ID
- `POST /api/musicians` - Create musician
- `PUT /api/musicians/:id` - Update musician
- `DELETE /api/musicians/:id` - Delete musician

### Bands
- `GET /api/bands` - Get all bands
- `GET /api/bands/:id` - Get band by ID
- `POST /api/bands` - Create band
- `PUT /api/bands/:id` - Update band
- `DELETE /api/bands/:id` - Delete band

### Concerts
- `GET /api/concerts` - Get all concerts
- `GET /api/concerts/:id` - Get concert by ID
- `POST /api/concerts` - Create concert
- `PUT /api/concerts/:id` - Update concert
- `DELETE /api/concerts/:id` - Delete concert

### Jam Sessions
- `GET /api/jam-sessions` - Get all jam sessions
- `GET /api/jam-sessions/:id` - Get jam session by ID
- `POST /api/jam-sessions` - Create jam session
- `PUT /api/jam-sessions/:id` - Update jam session
- `DELETE /api/jam-sessions/:id` - Delete jam session

### Teachers
- `GET /api/teachers` - Get all teachers
- `GET /api/teachers/:id` - Get teacher by ID

### Students
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get student by ID

### Instruments
- `GET /api/instruments` - Get all instruments
- `GET /api/instruments/:id` - Get instrument by ID
- `GET /api/instruments/user/:userId` - Get instruments by user

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID

## Note

Currently using mock data. Database connection will be added in the next phase.
