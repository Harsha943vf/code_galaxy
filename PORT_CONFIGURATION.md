# 🚀 CodeGalaxy - Complete Startup Guide

## 📋 Project Overview

Your CodeGalaxy application runs on **exactly 2 ports**:

- **Backend Server**: `http://localhost:3000` (Express + Node.js + MongoDB + Socket.IO)
- **Frontend Client**: `http://localhost:5174` (React + Vite + TypeScript)

---

## 🔧 Configuration

### Backend Configuration
**File**: `/Users/harsha/Desktop/Cgc/server/.env`

```properties
PORT=3000
ONECOMPILER_API_KEY=oc_44fhk88bh_44fhk88bz_5a025f74ac6d62705f8a94933e4c699952142e1ae2bf1a69
GEMINI_API_KEY=AIzaSyDWzYkO708NM9avz6sMAR_JImcHD6rXV_U
MONGO_URI=mongodb+srv://harsha7984:Harsha0809@cluster0.ozmzn6j.mongodb.net/?appName=Cluster0
JWT_SECRET=cgc_jwt_secret_key_2024_harsha
```

### Frontend Configuration
**File**: `/Users/harsha/Desktop/Cgc/client/.env.local`

```properties
VITE_SERVER_URL=http://localhost:3000
VITE_BACKEND_URL=http://localhost:3000
```

---

## 🎯 Quick Start (2 Terminal Windows)

### Terminal 1 - Start Backend Server
```bash
cd /Users/harsha/Desktop/Cgc/server
npm run dev
```

**Expected Output:**
```
> code-sync-server@1.0.0 dev
> nodemon --exec ts-node src/server.ts

Server running on http://localhost:3000
```

### Terminal 2 - Start Frontend Client
```bash
cd /Users/harsha/Desktop/Cgc/client
npm run dev
```

**Expected Output:**
```
> code-sync-client@0.0.0 dev
> vite

  VITE v5.x.x  ready in xxx ms

  ➜  Local:   http://localhost:5174/
  ➜  press h to show help
```

---

## ✅ What Works on Each Port

### Backend (Port 3000)
✅ REST API Endpoints:
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user (requires JWT token)
- `POST /api/execute` - Execute code via OneCompiler
- `POST /api/gemini` - AI Copilot requests

✅ WebSocket (Socket.IO):
- Real-time code collaboration
- Live cursor tracking
- User presence
- Drawing collaboration

✅ Static Files:
- Serves `/public/index.html` as fallback

---

### Frontend (Port 5174)
✅ React Application with:
- Authentication (Login/Register)
- Collaborative Code Editor
- Real-time collaboration
- AI Study Planner
- Code execution
- Drawing board

✅ Dev Server Proxies:
- `/api/*` → `http://localhost:3000/api/*`
- `/socket.io` → `http://localhost:3000` (WebSocket)

---

## 🔌 How Communication Works

### API Calls
```
Client (Port 5174)
    ↓
Vite Dev Proxy (/api)
    ↓
Backend API (Port 3000)
    ↓
Database (MongoDB)
```

### WebSocket (Socket.IO)
```
Client (Port 5174)
    ↓
Socket.IO Client
    ↓
Backend WebSocket (Port 3000)
    ↓
All Connected Clients
```

---

## 🛠️ Development Setup

### Install Dependencies (if not already done)

**Backend:**
```bash
cd /Users/harsha/Desktop/Cgc/server
npm install
```

**Frontend:**
```bash
cd /Users/harsha/Desktop/Cgc/client
npm install
```

---

## 📦 Build for Production

### Backend Build
```bash
cd /Users/harsha/Desktop/Cgc/server
npm run build
node dist/server.js
```

### Frontend Build
```bash
cd /Users/harsha/Desktop/Cgc/client
npm run build
npm run preview
```

---

## 🧪 Testing the Setup

### 1. Test Backend is Running
```bash
curl http://localhost:3000/api/auth/me
```

**Expected Response:**
```json
{"message":"No token provided"}
```

### 2. Test Frontend is Accessible
```bash
curl http://localhost:5174
```

Should return HTML (React app)

### 3. Test Registration
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }'
```

### 4. Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

---

## 🚨 Troubleshooting

### Port Already in Use

**Backend (Port 3000):**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Frontend (Port 5174):**
```bash
# Kill process on port 5174
lsof -ti:5174 | xargs kill -9
```

### Cannot Connect to MongoDB
- ✅ Check `.env` has correct `MONGO_URI`
- ✅ Verify MongoDB cluster is active
- ✅ Check internet connection

### Frontend Cannot Connect to Backend
- ✅ Ensure backend is running on port 3000
- ✅ Check `.env.local` has `VITE_BACKEND_URL=http://localhost:3000`
- ✅ Check browser console for CORS errors

### Socket.IO Connection Issues
- ✅ Ensure WebSocket proxy is configured in `vite.config.mts`
- ✅ Check backend Socket.IO is listening
- ✅ Clear browser cache and restart

---

## 📝 Environment Variables Checklist

### Server (.env)
- ✅ `PORT=3000`
- ✅ `MONGO_URI` with correct credentials
- ✅ `JWT_SECRET` set
- ✅ `GEMINI_API_KEY` set
- ✅ `ONECOMPILER_API_KEY` set

### Client (.env.local)
- ✅ `VITE_SERVER_URL=http://localhost:3000`
- ✅ `VITE_BACKEND_URL=http://localhost:3000`

---

## 🎉 Ready to Go!

Your application is now configured to run on:
- **Backend**: Port 3000
- **Frontend**: Port 5174

Simply run both commands in separate terminals and you're ready to start collaborating! 🚀

```bash
# Terminal 1
cd /Users/harsha/Desktop/Cgc/server && npm run dev

# Terminal 2
cd /Users/harsha/Desktop/Cgc/client && npm run dev
```

Open `http://localhost:5174` in your browser and start coding! 💻
