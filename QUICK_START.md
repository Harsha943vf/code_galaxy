# 🚀 Quick Start Guide - CodeGalaxy

## For New Developers

### 1️⃣ First Time Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/cgc.git
cd cgc

# Backend Setup
cd server
npm install
cp .env.example .env
# Edit .env and add your credentials (optional for basic testing)
npm run build
npm start

# Frontend Setup (in another terminal)
cd ../client
npm install
npm run dev
```

### 2️⃣ Access the App

Open your browser and go to:
```
http://localhost:5174
```

## ✨ Features You Can Try

### 🔐 Authentication (Required for Study Planner)
1. Click **"Register"** in the top-right navbar
2. Create an account with email and password
3. You're automatically logged in!

### 💻 Real-time Code Editor
1. Go to **"Editor"** page
2. Either:
   - Create a new room (share the Room ID with others)
   - Join a room with someone's Room ID
3. Edit code together in real-time
4. Select a language and click **"Run"** to execute

### 📚 Study Planner (NEW! ⭐)
1. Make sure you're **logged in**
2. Click **"Study Planner"** in the navbar
3. Click **"Create Study Plan"**
4. Fill in the form:
   - Subject (e.g., "JavaScript", "Python")
   - Goal (e.g., "Learn for beginners")
   - Level (beginner/intermediate/advanced)
   - Total Hours and Duration
5. Click **"Generate Plan"**
6. View your personalized study plan!

## 🌐 Ports

- **Frontend**: http://localhost:5174 (Vite dev server)
- **Backend**: http://localhost:3000 (Express server)
- **Socket.io**: ws://localhost:3000 (Real-time updates)

## 🔑 Optional: Enable AI Features

To use real AI-powered Study Planner (instead of mock data):

1. Get free API key from [Google AI Studio](https://aistudio.google.com/)
2. Edit `/server/.env`:
   ```
   GEMINI_API_KEY=your_key_here
   ```
3. Restart backend:
   ```bash
   npm run build
   npm start
   ```

See [GEMINI_API_SETUP.md](./GEMINI_API_SETUP.md) for details.

## 📁 Project Structure

```
cgc/
├── client/                 # React + Vite frontend
│   ├── src/pages/         # Page components
│   ├── src/components/    # Reusable components
│   ├── src/context/       # State management
│   └── src/hooks/         # Custom React hooks
├── server/                # Express + Node backend
│   ├── src/models/        # MongoDB schemas
│   ├── src/routes/        # API endpoints
│   ├── src/services/      # Business logic
│   └── src/middleware/    # Auth, validation, etc.
└── Documentation files
```

## 🧪 API Endpoints

### Authentication
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Login

### Study Plans
- `POST /api/study-plans/generate` - Create study plan (requires auth)
- `GET /api/study-plans` - List all study plans (requires auth)
- `GET /api/study-plans/:id` - Get specific study plan (requires auth)

### Real-time Collaboration
- Socket.io events for live code editing
- No authentication required for collaboration

## 📝 Database

CodeGalaxy uses **MongoDB Atlas** (cloud database). You need:
1. MongoDB Atlas account (free tier available)
2. Connection string in `.env`: `MONGO_URI=mongodb+srv://...`
3. User collection stores usernames, emails, hashed passwords
4. Study plans collection stores all created study plans

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 5174
lsof -ti:5174 | xargs kill -9
```

### MongoDB Connection Error
- Check `MONGO_URI` in `.env`
- Verify database is accessible
- Check IP whitelist in MongoDB Atlas

### API Not Responding
- Check if backend is running: `curl http://localhost:3000`
- Check console for errors
- Verify `VITE_API_URL` in client `.env.local`

### Study Planner Shows Error
- Make sure you're logged in
- Check server logs for details
- Review [DEBUG_REPORT.md](./DEBUG_REPORT.md)

## 📚 More Documentation

- [Complete Setup Guide](./SETUP_FOR_GITHUB.md)
- [Gemini API Setup](./GEMINI_API_SETUP.md)
- [Debug Report](./DEBUG_REPORT.md)
- [GitHub Repository](https://github.com/yourusername/cgc)

## 🎓 Common Tasks

### Run in Development Mode
```bash
# Terminal 1: Backend
cd server && npm run dev

# Terminal 2: Frontend
cd client && npm run dev
```

### Build for Production
```bash
# Backend
cd server && npm run build

# Frontend
cd client && npm run build
```

### Debug Study Planner Issues
1. Check server logs for error messages
2. Read [GEMINI_API_SETUP.md](./GEMINI_API_SETUP.md)
3. Review [DEBUG_REPORT.md](./DEBUG_REPORT.md)

### Create Test User
```bash
# Use the Register page in the UI
# Or via API:
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "Test@1234",
    "confirmPassword": "Test@1234"
  }'
```

## 🆘 Need Help?

1. **Study Planner Issues?** → See [GEMINI_API_SETUP.md](./GEMINI_API_SETUP.md)
2. **Authentication Issues?** → Check [SETUP_FOR_GITHUB.md](./SETUP_FOR_GITHUB.md)
3. **Debug Info?** → Read [DEBUG_REPORT.md](./DEBUG_REPORT.md)
4. **Not Starting?** → Check ports aren't in use

## 🎉 You're Ready!

You now have:
- ✅ Real-time code editor
- ✅ Authentication system
- ✅ AI Study Planner
- ✅ Multi-user collaboration

Start coding! 🚀

---

**Last Updated**: 2026-04-02  
**Status**: Production Ready ✅  
**Need Help?** Check the documentation files or check server logs
