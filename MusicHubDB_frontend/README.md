# MusicHubDB Frontend

React frontend for the MusicHubDB application.

## Installation

```bash
npm install
```

## Running the App

Development mode:
```bash
npm start
```

The app will run on `http://localhost:3000`

Build for production:
```bash
npm run build
```

## Features

- **Home**: Overview of all features with quick navigation
- **Musicians**: Browse musicians, view their profiles, instruments, and bands
- **Bands**: Explore bands and their members
- **Concerts**: View upcoming concerts with details
- **Jam Sessions**: Find local jam sessions to join
- **Teachers**: Connect with music teachers
- **Students**: View students and their learning progress

## Tech Stack

- React 18
- React Router for navigation
- Axios for API calls
- Modern CSS with gradient backgrounds and card layouts

## Configuration

The API URL is configured in the `.env` file:
```
REACT_APP_API_URL=http://localhost:5000/api
```

Make sure the backend server is running before starting the frontend.

## Note

Currently using mock data from the backend. Database connection will be added in the next phase.
