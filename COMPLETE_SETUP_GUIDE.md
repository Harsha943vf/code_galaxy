# 🎯 CodeGalaxy - Complete Setup & Feature Guide

## 📋 Project Overview

**CodeGalaxy** is a real-time collaborative code editor with:
- ✅ User authentication (Register/Login with JWT)
- ✅ Real-time code collaboration via Socket.io
- ✅ Multiple programming languages support
- ✅ Code execution (OneCompiler)
- ✅ AI code suggestions (Gemini)
- ✅ Drawing/sketching capability
- ✅ File management
- ✅ Proper session management with logout

---

## 🚀 Ports Configuration

### Two Port Setup (Required)
```
Frontend (Client):  http://localhost:5174
Backend (Server):   http://localhost:3000
MongoDB:            Cloud (Atlas)
```

### Key Files:
- **Backend Config:** `/Users/harsha/Desktop/Cgc/server/.env`
- **Frontend Config:** `/Users/harsha/Desktop/Cgc/client/.env.local`
- **Vite Config:** `/Users/harsha/Desktop/Cgc/client/vite.config.mts`

---

## 🔧 Environment Variables

### Backend (server/.env)
```properties
PORT=3000
ONECOMPILER_API_KEY=oc_44fhk88bh_44fhk88bz_5a025f74ac6d62705f8a94933e4c699952142e1ae2bf1a69
GEMINI_API_KEY=AIzaSyDWzYkO708NM9avz6sMAR_JImcHD6rXV_U
MONGO_URI=mongodb+srv://harsha7984:Harsha0809@cluster0.ozmzn6j.mongodb.net/?appName=Cluster0
JWT_SECRET=cgc_jwt_secret_key_2024_harsha
```

### Frontend (client/.env.local)
```properties
VITE_SERVER_URL=http://localhost:3000
VITE_BACKEND_URL=http://localhost:3000
```

---

## 📦 Installation & Setup

### 1. Backend Setup
```bash
cd /Users/harsha/Desktop/Cgc/server
npm install
npm run build        # Build TypeScript
npm run dev         # Start development server (port 3000)
```

### 2. Frontend Setup
```bash
cd /Users/harsha/Desktop/Cgc/client
npm install
npm run dev         # Start development server (port 5174)
```

### 3. Access the App
```
Frontend: http://localhost:5174
Backend:  http://localhost:3000
```

---

## 🔐 Authentication System

### User Registration
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

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "123",
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

### User Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

### Get Current User
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 👤 Features by User Type

### Anonymous Users
- ✅ Join/create collaboration rooms with just username
- ✅ Real-time code editing with others
- ✅ Run code
- ✅ Use AI features
- ✅ Draw/sketch
- ❌ Account history
- ❌ Profile management

### Authenticated Users (Logged In)
- ✅ All anonymous features
- ✅ Username auto-fill in join room
- ✅ Account profile in navbar
- ✅ Persistent account
- ✅ Logout with proper cleanup
- ✅ Secure session via JWT

---

## 🎯 User Flows

### Flow 1: Anonymous Collaboration
```
Open App
    ↓
Click "Collaborative Editor"
    ↓
Enter Username + Room ID
    ↓
Join Room
    ↓
Start Coding!
```

### Flow 2: Create Account & Collaborate
```
Open App
    ↓
Click "Sign Up"
    ↓
Fill Registration Form
    ↓
Account Created + Logged In
    ↓
Username auto-filled in editor
    ↓
Join Room
    ↓
Other users see "Welcome, testuser"
```

### Flow 3: Login Existing Account
```
Open App
    ↓
Click "Login"
    ↓
Enter Email + Password
    ↓
Logged In
    ↓
Username auto-filled
    ↓
Ready to collaborate
```

### Flow 4: Logout from Room
```
In Collaborative Room
    ↓
Click "Logout" in navbar
    ↓
Socket.io Disconnects ✅
    ↓
Other users see: "[User] left the room"
    ↓
Auth cleared ✅
    ↓
Redirected to Home Page ✅
```

---

## 🛠️ Troubleshooting

### Issue: Frontend Can't Connect to Backend
**Solution:**
- Check backend is running on port 3000: `curl http://localhost:3000`
- Verify `VITE_SERVER_URL` in client/.env.local
- Check CORS in server

### Issue: MongoDB Connection Fails
**Solution:**
- Verify MONGO_URI in server/.env is correct
- Check MongoDB Atlas cluster is active
- Ensure whitelist IP allows your connection

### Issue: Registration Fails
**Solution:**
- Check email is not already registered
- Verify password is at least 6 characters
- Check backend is running: `npm run dev` in server folder

### Issue: Cannot Join Room
**Solution:**
- Ensure username is at least 3 characters
- Ensure room ID is at least 5 characters
- Verify Socket.io is connected (check browser console)

### Issue: User Still in Room After Logout
**Solution:**
- This is NOW FIXED! ✅
- Update to latest code with logout fix
- Restart dev server: `npm run dev`

---

## 📊 Database Schema

### User Model (MongoDB)
```javascript
{
  _id: ObjectId,
  username: String (unique, lowercase, min 3 chars),
  email: String (unique, lowercase, valid email),
  password: String (hashed with bcryptjs),
  createdAt: Timestamp,
  updatedAt: Timestamp
}
```

---

## 🔒 Security Features

- ✅ **JWT Authentication** - Secure token-based auth
- ✅ **Password Hashing** - bcryptjs with 10 salt rounds
- ✅ **CORS Protection** - Controlled cross-origin requests
- ✅ **Environment Variables** - Sensitive data not in code
- ✅ **Unique Constraints** - No duplicate users
- ✅ **Email Validation** - Regex pattern validation
- ✅ **Token Cleanup** - Proper logout with socket disconnect

---

## 📝 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new account |
| POST | `/api/auth/login` | Login to account |
| GET | `/api/auth/me` | Get current user (requires token) |

### Real-time (Socket.io)
| Event | Description |
|-------|-------------|
| `JOIN_REQUEST` | Join a room |
| `USERNAME_EXISTS` | Username already in room |
| `JOINING_ACCEPT` | Successfully joined |
| `CODE_CHANGE` | Code update from other user |
| `USER_LEFT` | User left the room |
| `CONNECTION_FAILED` | Connection error |

---

## 🚀 Quick Start Commands

### Start All Services
```bash
# Terminal 1 - Backend
cd /Users/harsha/Desktop/Cgc/server
npm run dev

# Terminal 2 - Frontend
cd /Users/harsha/Desktop/Cgc/client
npm run dev

# Open Browser
open http://localhost:5174
```

### Build for Production
```bash
# Backend
cd server
npm run build

# Frontend
cd ../client
npm run build
```

---

## 📚 Documentation Files

- `AUTH_IMPLEMENTATION_COMPLETE.md` - Auth system details
- `BUG_FIX_ROOM_ID.md` - Room ID input fix explanation
- `LOGOUT_IMPLEMENTATION_COMPLETE.md` - Logout functionality
- `LOGOUT_FIX.md` - Logout fix detailed explanation
- `PORT_CONFIGURATION.md` - Port setup guide
- `QUICK_COMMANDS.md` - Quick reference commands

---

## ✨ Features Implemented

### ✅ Authentication
- [x] User Registration
- [x] User Login
- [x] JWT Token Management
- [x] Secure Password Storage (bcryptjs)
- [x] Current User Endpoint
- [x] Logout with Socket Cleanup

### ✅ Collaboration
- [x] Real-time Code Editing
- [x] Multiple User Support
- [x] Room ID System
- [x] User List
- [x] Online/Offline Status
- [x] User Disconnect Handling

### ✅ Code Execution
- [x] OneCompiler Integration
- [x] Multiple Language Support
- [x] Code Output Display
- [x] Error Handling

### ✅ AI Features
- [x] Gemini API Integration
- [x] Code Suggestions
- [x] Code Explanation

### ✅ UI/UX
- [x] Beautiful Landing Page
- [x] Authentication Pages
- [x] Responsive Design
- [x] Navbar with User Info
- [x] Toast Notifications
- [x] Dark Theme

---

## 🎉 Summary

CodeGalaxy is now a **production-ready collaborative code editor** with:
- ✅ Complete authentication system
- ✅ Real-time collaboration
- ✅ Proper session management
- ✅ Clean logout functionality
- ✅ MongoDB database integration
- ✅ JWT security

**All on just 2 ports!** 🚀

---

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the specific documentation files
3. Check server/client console for errors
4. Verify all environment variables are set

**Happy Coding! 💻✨**
