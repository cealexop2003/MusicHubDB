# MusicHubDB - Music Community Platform

A full-stack music community application with MySQL database, Node.js/Express backend, and React frontend.

## Prerequisites

Before you begin, make sure you have the following installed:
- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MySQL** (v8.0 or higher) - [Download here](https://dev.mysql.com/downloads/)
- **npm** (comes with Node.js)

## Project Structure

```
MusicHubDB_project/
├── MusicHubDB_backend/      # Node.js/Express API (Port 5001)
└── MusicHubDB_frontend/     # React application (Port 3000)
```

## Quick Start Guide

### 1. Database Setup

First, set up your MySQL database:

```bash
# Login to MySQL
mysql -u root -p

# Create the database (if not already created)
CREATE DATABASE MusicHubDB;

# Create a user for the application
CREATE USER 'app_admin'@'localhost' IDENTIFIED BY 'superpass';
GRANT ALL PRIVILEGES ON MusicHubDB.* TO 'app_admin'@'localhost';
FLUSH PRIVILEGES;

# Exit MySQL
exit;
```

**Note:** The database schema should already be set up with all necessary tables (User, Musician, Teacher, Student, Band, Concert, Jam-Session, Instrument, etc.). If not, import your SQL schema file.

### 2. Backend Setup

```bash
# Navigate to backend folder
cd MusicHubDB_backend

# Install dependencies
npm install

# Start the backend server
npm start
```

✅ Backend will run on: **http://localhost:5001**

### 3. Frontend Setup

Open a **new terminal window** and run:

```bash
# Navigate to frontend folder
cd MusicHubDB_frontend

# Install dependencies
npm install

# Start the React app
npm start
```

✅ Frontend will run on: **http://localhost:3000**

The app should automatically open in your browser. If not, navigate to http://localhost:3000

## Using the Application

### Login

The app uses **name-only authentication** (no password required):

1. Go to http://localhost:3000
2. Click "Login" or "Sign Up"
3. Enter a name that exists in your database
4. You'll be redirected to the appropriate dashboard based on your role

### Available Dashboards

**🎸 Musician Dashboard**
- Join/leave jam sessions (with participant modal view)
- Join/leave bands
- View concerts

**👨‍🏫 Teacher Dashboard**
- View and edit lesson requests
- Update lesson details (format, instrument, address, date, time, price)
- View students and concerts

**🎓 Student Dashboard**
- Request lessons from teachers
- Edit instrument profile (type and name)
- View concerts

## Database Configuration

The app connects to MySQL with these credentials (edit in `MusicHubDB_backend/config/db.js` if needed):

```javascript
Host: localhost
User: app_admin
Password: superpass
Database: MusicHubDB
Port: 3306
```

## Features

- ✅ MySQL database integration
- ✅ Name-only authentication
- ✅ Musician jam session & band management
- ✅ Teacher lesson request editing
- ✅ Student lesson requests & instrument profile
- ✅ Interactive jam session participant modal
- ✅ Real-time database updates for joins/leaves
- ✅ Concert viewing (read-only)

## Troubleshooting

**Backend won't start:**
- Check if MySQL is running: `mysql -u app_admin -psuperpass`
- Verify database exists: `SHOW DATABASES;`
- Check if port 5001 is available

**Frontend won't start:**
- Check if port 3000 is available
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

**Database connection error:**
- Verify MySQL credentials in `MusicHubDB_backend/config/db.js`
- Ensure user `app_admin` has proper privileges

**Can't login:**
- Make sure your name exists in the User table
- Check browser console for errors

## Tech Stack

- **Frontend:** React, Axios
- **Backend:** Node.js, Express
- **Database:** MySQL (mysql2 driver)
- **Authentication:** Name-based (simplified)

## Port Configuration

- Backend API: **5001**
- Frontend React: **3000**
- MySQL: **3306**

---

**Need help?** Check the browser console (F12) and backend terminal for error messages.

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
