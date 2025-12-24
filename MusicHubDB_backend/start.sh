#!/bin/bash

# MusicHubDB Backend Startup Script

echo "🎵 Starting MusicHubDB Backend..."
echo ""

cd "$(dirname "$0")"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start the server
echo "🚀 Starting server on port 5001..."
PORT=5001 node server.js
