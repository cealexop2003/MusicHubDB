@echo off
REM MusicHubDB Frontend Startup Script for Windows

echo 🎨 Starting MusicHubDB Frontend...
echo.

cd /d "%~dp0"

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
    echo.
)

REM Start the React app
echo 🚀 Starting React app on port 3000...
echo ⚠️  Make sure the backend is running on port 5001!
echo.
call npm start
