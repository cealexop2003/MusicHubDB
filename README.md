# MusicHubDB - Music Community Platform

A full-stack music community application with MySQL database, Node.js/Express backend, and React frontend.

## Prerequisites

Make sure you have installed:
- **Node.js** (v14 or higher)
- **MySQL** (v8.0 or higher) with the MusicHubDB database already set up

## Setup Instructions

### 1. Backend Setup

```bash
# Navigate to backend folder
cd MusicHubDB_backend

# Install dependencies
npm install

# Start the backend server
npm start
```

✅ Backend runs on: **http://localhost:5001**

### 2. Frontend Setup

Open a new terminal and run:

```bash
# Navigate to frontend folder
cd MusicHubDB_frontend

# Install dependencies
npm install

# Start the React app
npm start
```

✅ Frontend runs on: **http://localhost:3000**

The app will automatically open in your browser at http://localhost:3000

## Login

- Click "Login" or "Sign Up"
- Enter any name that exists in your database
- No password required

## Database Configuration

Default credentials (change in `MusicHubDB_backend/config/db.js` if needed):
- **User:** app_admin
- **Password:** superpass
- **Database:** MusicHubDB
