# MusicHubDB - Music Community Platform

A full-stack music community application with MySQL database, Node.js/Express backend, and React frontend.

## Overview

MusicHub connects musicians, teachers, and students in one platform. Musicians can join jam sessions and bands, teachers can manage lesson requests, and students can request lessons and update their instrument profiles. All data is stored in a MySQL database with real-time updates.

## Key Features

**Musician Dashboard:**
- Join/leave jam sessions with live participant count updates
- View jam session participants in modal popup
- Join/leave bands with member count updates
- Browse concerts

**Teacher Dashboard:**
- View lesson requests from students
- Edit lesson details (format, instrument, address, date, time, price)
- Browse students and concerts

**Student Dashboard:**
- Request lessons from teachers
- Edit instrument profile (type and name)
- Browse teachers and concerts

**Technical Features:**
- MySQL database integration with mysql2
- Name-based authentication (no password required)
- Real-time database updates
- RESTful API with Express
- React frontend with routing

## Prerequisites

Make sure you have installed:
- **Node.js** (v14 or higher)
- **MySQL** (v8.0 or higher) with the MusicHubDB database and the users already set up

## Setup Instructions

### 1. Backend Setup

```bash
# Navigate to backend folder
cd MusicHubDB_backend

# Install dependencies
npm install

# Install MySQL driver
npm install mysql2

# Start the backend server
npm start
```

✅ Backend runs on: **http://localhost:5001**

### 2. Frontend Setup

Open a new terminal and run:

```bash
# Navigate to frontend folder
cd MusicHubDB_frontend

# Install dependencies (includes react, react-router-dom, axios)
npm install

# Start the React app
npm start
```

✅ Frontend runs on: **http://localhost:3000**

The app will automatically open in your browser at http://localhost:3000

## Login

- Click "Login" or "Sign Up"
- Enter any name that exists in your database for login
- No password required
- Can also create new users through "Sign Up" and later login with these newly created users

## Database Configuration

Default credentials (change in `MusicHubDB_backend/config/db.js` if needed):
- **User:** app_admin
- **Password:** superpass
- **Database:** MusicHubDB
