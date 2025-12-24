#!/bin/bash

# MusicHubDB Frontend Startup Script

echo "🎨 Starting MusicHubDB Frontend..."
echo ""

cd "$(dirname "$0")"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo ""
fi

# Start the React app
echo "🚀 Starting React app on port 3000..."
echo "⚠️  Make sure the backend is running on port 5001!"
echo ""
npm start
