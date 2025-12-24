# MusicHubDB - Full Stack Application

A music community platform built with Node.js/Express backend and React frontend.

## Project Structure

```
MusicHubDB_project/
├── MusicHubDB_backend/      # Node.js/Express API
│   ├── data/                # Mock data
│   ├── routes/              # API routes
│   ├── server.js            # Entry point
│   └── package.json
│
└── MusicHubDB_frontend/     # React application
    ├── public/
    ├── src/
    │   ├── components/      # Reusable components
    │   ├── pages/           # Page components
    │   ├── services/        # API service
    │   └── App.js
    └── package.json
```

## Features

### Core Functionality
- 🎸 **Musicians**: Browse profiles, instruments, and band affiliations
- 🎤 **Bands**: View bands and their members
- 🎪 **Concerts**: Explore upcoming concerts and events
- 🎹 **Jam Sessions**: Find local jam sessions
- 👨‍🏫 **Teachers**: Connect with music instructors
- 🎓 **Students**: View students and their lessons

## Setup Instructions

### Backend Setup

1. Navigate to the backend folder:
```bash
cd MusicHubDB_backend
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
# Development mode (with auto-restart)
npm run dev

# Or production mode
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Open a new terminal and navigate to the frontend folder:
```bash
cd MusicHubDB_frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the React app:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Testing the Application

1. **Start the backend** first (port 5000)
2. **Start the frontend** (port 3000)
3. **Open your browser** to `http://localhost:3000`
4. **Navigate** through the different sections using the navbar

### API Endpoints Available

- `GET /api/musicians` - All musicians
- `GET /api/musicians/:id` - Musician details
- `GET /api/bands` - All bands
- `GET /api/bands/:id` - Band details
- `GET /api/concerts` - All concerts
- `GET /api/concerts/:id` - Concert details
- `GET /api/jam-sessions` - All jam sessions
- `GET /api/jam-sessions/:id` - Jam session details
- `GET /api/teachers` - All teachers
- `GET /api/students` - All students

## Current Status

✅ Backend REST API with Express
✅ Frontend React application with routing
✅ Mock data based on your database schema
✅ Full CRUD endpoints (using mock data)
✅ Responsive UI with modern styling
✅ Navigation between all pages

⏳ **Not Yet Connected**: MySQL database (next phase)

## Next Steps

When ready to connect to the actual MySQL database:

1. Install MySQL driver in backend:
```bash
cd MusicHubDB_backend
npm install mysql2
```

2. Create database connection module
3. Replace mock data with actual SQL queries
4. Test with your `musichubdbdump.sql` database

## Technologies Used

### Backend
- Node.js
- Express.js
- CORS
- dotenv

### Frontend
- React 18
- React Router DOM
- Axios
- Modern CSS

## Environment Variables

### Backend (.env)
```
PORT=5000
DB_HOST=localhost
DB_USER=app_admin
DB_PASSWORD=superpass
DB_NAME=MusicHubDB
```

### Frontend (.env)
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Troubleshooting

**Backend won't start?**
- Make sure you ran `npm install` in the backend folder
- Check if port 5000 is available

**Frontend shows errors?**
- Make sure backend is running first
- Check if `npm install` completed successfully in frontend folder
- Verify the API URL in frontend `.env` file

**Can't see data?**
- Verify backend is running on port 5000
- Open browser console to see any errors
- Check Network tab to see API calls

## License

This is a university project for learning database connectivity.
