#!/bin/bash

# CGC Authentication System - Quick Start Script

echo "🚀 CGC Authentication System - Starting..."
echo ""

# Start backend
echo "📦 Starting Backend Server..."
cd /Users/harsha/Desktop/Cgc/server
echo "Backend will run on: http://localhost:3000"
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

# Start frontend
echo ""
echo "🎨 Starting Frontend Client..."
cd /Users/harsha/Desktop/Cgc/client
echo "Frontend will run on: http://localhost:5173"
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are starting..."
echo ""
echo "📝 Open your browser:"
echo "   - Frontend: http://localhost:5173"
echo "   - Backend: http://localhost:3000"
echo ""
echo "🔐 Test Authentication:"
echo "   - Register: http://localhost:5173/register"
echo "   - Login: http://localhost:5173/login"
echo ""
echo "Press Ctrl+C to stop both servers..."
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
