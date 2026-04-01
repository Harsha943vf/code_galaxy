# 🚀 CodeGalaxy - Real-time Collaborative Code Editor

A modern, full-featured collaborative code editor built with React, Express, Node.js, MongoDB, and Socket.io.

## ✨ Features

- 🔐 **Authentication** - Secure signup/login with JWT
- 👥 **Real-time Collaboration** - Code together in real-time with Socket.io
- 🎨 **Beautiful UI** - Modern dark theme with Tailwind CSS
- 💾 **Database** - MongoDB integration for user persistence
- 🔑 **API Keys** - OneCompiler for code execution, Gemini for AI assistance
- 🌐 **Cross-platform** - Works on macOS, Linux, and Windows
- 📱 **Responsive** - Works on desktop and tablet

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- MongoDB Atlas account
- API keys for OneCompiler and Gemini

### Installation

1. **Clone repository**
   ```bash
   git clone https://github.com/yourusername/cgc.git
   cd cgc
   ```

2. **Backend Setup**
   ```bash
   cd server
   cp .env.example .env
   # Edit .env with your credentials
   npm install
   npm run dev
   ```

3. **Frontend Setup** (new terminal)
   ```bash
   cd client
   cp .env.example .env.local
   npm install
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5174
   ```

### Detailed Setup
See [SETUP_FOR_GITHUB.md](./SETUP_FOR_GITHUB.md) for complete instructions with all required API keys.

## 📁 Project Structure

```
cgc/
├── server/              # Express backend
│   ├── src/
│   │   ├── models/      # MongoDB schemas
│   │   ├── routes/      # API endpoints
│   │   ├── middleware/  # Auth middleware
│   │   └── server.ts    # Main server file
│   └── .env.example     # Environment template
├── client/              # React frontend
│   ├── src/
│   │   ├── pages/       # Page components
│   │   ├── components/  # UI components
│   │   ├── context/     # State management
│   │   └── hooks/       # Custom hooks
│   └── .env.example     # Environment template
└── SETUP_FOR_GITHUB.md  # Setup guide
```

## 🔑 Environment Variables

### Server (`.env`)
- `PORT` - Backend port (default: 3000)
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `ONECOMPILER_API_KEY` - For code execution
- `GEMINI_API_KEY` - For AI assistance

### Client (`.env.local`)
- `VITE_API_URL` - Backend API URL (default: http://localhost:3000)
- `VITE_SOCKET_URL` - Socket.io URL (default: http://localhost:3000)

## 🛠️ Available Scripts

### Backend
```bash
npm run dev      # Start in development mode
npm run build    # Build for production
npm start        # Run production build
```

### Frontend
```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

## 📚 Documentation

- [Complete Setup Guide](./COMPLETE_SETUP_GUIDE.md)
- [Authentication Implementation](./AUTH_IMPLEMENTATION_COMPLETE.md)
- [Windows Compatibility](./WINDOWS_READY.md)
- [Bug Fixes](./BUG_FIX_ROOM_ID.md)

## 🔐 Security

- Passwords hashed with bcryptjs
- JWT-based authentication
- CORS protection
- Environment variables for secrets
- **Never commit `.env` files!**

## 📝 Notes

- Authentication is optional - users can collaborate anonymously
- Real-time collaboration works with both authenticated and anonymous users
- Supports 100+ programming languages through OneCompiler

## 🤝 Contributing

Feel free to fork, create issues, and submit pull requests!

## 📄 License

MIT License - See LICENSE file for details

## 🆘 Support

For issues or questions:
1. Check documentation files
2. Review GitHub issues
3. Create a new issue with details

---

**Made with ❤️ for developers worldwide**
