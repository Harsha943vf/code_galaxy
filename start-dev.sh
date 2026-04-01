#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting CodeGalaxy Development Servers${NC}"
echo "=================================="
echo ""

# Check if node_modules exist
if [ ! -d "server/node_modules" ]; then
    echo -e "${BLUE}📦 Installing server dependencies...${NC}"
    cd server && npm install && cd ..
fi

if [ ! -d "client/node_modules" ]; then
    echo -e "${BLUE}📦 Installing client dependencies...${NC}"
    cd client && npm install && cd ..
fi

echo ""
echo -e "${GREEN}✅ Starting Backend Server (Port 3000)${NC}"
echo "Command: cd server && npm run dev"
echo ""

# Start backend in background
cd server
npm run dev &
BACKEND_PID=$!
echo -e "${GREEN}Backend PID: $BACKEND_PID${NC}"
cd ..

# Give backend time to start
sleep 3

echo ""
echo -e "${GREEN}✅ Starting Frontend Client (Port 5174)${NC}"
echo "Command: cd client && npm run dev"
echo ""

# Start frontend in background
cd client
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}Frontend PID: $FRONTEND_PID${NC}"
cd ..

echo ""
echo "=================================="
echo -e "${GREEN}🎉 Both servers are running!${NC}"
echo ""
echo "📍 Backend:  http://localhost:3000"
echo "📍 Frontend: http://localhost:5174"
echo ""
echo "Press Ctrl+C to stop both servers"
echo "=================================="
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
