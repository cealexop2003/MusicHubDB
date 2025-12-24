@echo off
REM MusicHubDB Backend Startup Script for Windows

echo 🎵 Starting MusicHubDB Backend...
echo.

cd /d "%~dp0"

REM Check if node_modules exists
if not exist "node_modules" (
    echo 📦 Installing dependencies...
    call npm install
    echo.
)

REM Start the server
echo 🚀 Starting server on port 5001...
set PORT=5001
node server.js
