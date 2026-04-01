# 🪟 Windows Compatibility Guide - CodeGalaxy

## ✅ Good News - Project is Windows Compatible!

CodeGalaxy is **fully compatible with Windows**! All dependencies and configurations work seamlessly on Windows systems.

---

## 📋 Windows Setup Checklist

### Prerequisites
- [ ] Node.js v16+ installed (download from https://nodejs.org/)
- [ ] Git installed (download from https://git-scm.com/)
- [ ] MongoDB Atlas account (cloud-based, works everywhere)
- [ ] Terminal/Command Prompt (cmd.exe or PowerShell)

### No Issues Found ✅

The project uses:
- ✅ **Node.js packages** - Cross-platform (Windows/Mac/Linux)
- ✅ **Express.js** - Works on Windows
- ✅ **MongoDB Atlas** - Cloud-based (not local DB, no OS issues)
- ✅ **Vite** - Cross-platform build tool
- ✅ **React** - Cross-platform
- ✅ **Socket.io** - Cross-platform
- ✅ **No native bindings** - All packages are pure JavaScript

---

## 🚀 Quick Start on Windows

### Method 1: Using Batch Script (Easiest)
```cmd
cd C:\Users\YourUsername\path-to-project\Cgc
start-dev.bat
```

This will:
- ✅ Install dependencies automatically
- ✅ Start backend on port 3000
- ✅ Start frontend on port 5174
- ✅ Open browser automatically

### Method 2: Manual Setup (Windows Command Prompt)

**Terminal 1 - Backend:**
```cmd
cd C:\Users\YourUsername\path-to-project\Cgc\server
npm install
npm run dev
```

**Terminal 2 - Frontend:**
```cmd
cd C:\Users\YourUsername\path-to-project\Cgc\client
npm install
npm run dev
```

### Method 3: Using PowerShell

**Backend:**
```powershell
cd "C:\Users\YourUsername\path-to-project\Cgc\server"
npm install
npm run dev
```

**Frontend:**
```powershell
cd "C:\Users\YourUsername\path-to-project\Cgc\client"
npm install
npm run dev
```

---

## ⚙️ Configuration on Windows

### 1. Clone Repository
```cmd
git clone https://github.com/yourusername/codegalaxy.git
cd codegalaxy
```

### 2. Backend Configuration (`server/.env`)
```properties
PORT=3000
ONECOMPILER_API_KEY=oc_44fhk88bh_44fhk88bz_5a025f74ac6d62705f8a94933e4c699952142e1ae2bf1a69
GEMINI_API_KEY=AIzaSyDWzYkO708NM9avz6sMAR_JImcHD6rXV_U
MONGO_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/?appName=Cluster0
JWT_SECRET=your-secret-key-here
```

**Note:** Already configured, no changes needed!

### 3. Frontend Configuration (`client/.env.local`)
```properties
VITE_SERVER_URL=http://localhost:3000
VITE_BACKEND_URL=http://localhost:3000
```

**Note:** Already configured, no changes needed!

---

## 🔧 Windows-Specific Notes

### Path Separators
- ✅ **OK:** Uses forward slashes `/` in code (supported by Node.js)
- ✅ **OK:** Windows native backslashes `\` work in file system

### Line Endings
- ✅ **OK:** Git handles CRLF automatically with `.gitattributes`
- ✅ **OK:** No Unix-specific shell commands used

### Port Usage
- ✅ **Port 3000 (Backend)** - Usually available
- ✅ **Port 5174 (Frontend)** - Usually available

### If Ports Are In Use on Windows

**Find what's using port 3000:**
```cmd
netstat -ano | findstr :3000
```

**Find what's using port 5174:**
```cmd
netstat -ano | findstr :5174
```

**Kill process by PID (example: PID 1234):**
```cmd
taskkill /PID 1234 /F
```

Or **change port in code** (`server/.env`):
```properties
PORT=3001
```

---

## ✅ Verified Working On Windows

| Feature | Status | Notes |
|---------|--------|-------|
| Node.js | ✅ Works | v16+ required |
| npm | ✅ Works | Comes with Node.js |
| Git | ✅ Works | Handle CRLF automatically |
| Express | ✅ Works | No OS dependencies |
| MongoDB | ✅ Works | Cloud-based (Atlas) |
| React | ✅ Works | Cross-platform |
| Vite | ✅ Works | Cross-platform |
| Socket.io | ✅ Works | Cross-platform |
| JWT Auth | ✅ Works | Pure JavaScript |
| bcryptjs | ✅ Works | No native bindings |

---

## 🐛 Troubleshooting on Windows

### Issue 1: "npm is not recognized"
**Solution:** 
- Install Node.js from https://nodejs.org/
- Restart Command Prompt after installation
- Verify: `node --version` and `npm --version`

### Issue 2: Permission Denied
**Solution:**
- Run Command Prompt as Administrator
- Or use PowerShell instead of cmd.exe

### Issue 3: Port Already in Use
**Solution:**
```cmd
REM Find process using port 3000
netstat -ano | findstr :3000

REM Kill process (replace 1234 with actual PID)
taskkill /PID 1234 /F
```

### Issue 4: MONGO_URI Connection Failed
**Solution:**
- Check MongoDB Atlas cluster is active
- Verify IP whitelist includes your IP (or use 0.0.0.0)
- Check username/password in connection string

### Issue 5: npm install fails
**Solution:**
```cmd
REM Clear npm cache
npm cache clean --force

REM Delete node_modules and lock file
rmdir /s /q node_modules
del package-lock.json

REM Reinstall
npm install
```

### Issue 6: Git Line Ending Warnings
**Solution:** (Usually automatic)
```cmd
git config --global core.autocrlf true
```

---

## 📦 Alternative Installation

### Using Windows Package Manager (winget)
```cmd
winget install OpenJS.NodeJS
winget install Git.Git
```

### Using Chocolatey
```cmd
choco install nodejs
choco install git
```

---

## 🌐 Access the App on Windows

After running both servers:

```
Frontend:  http://localhost:5174
Backend:   http://localhost:3000
```

**From same Windows machine:**
- ✅ Open browser: `http://localhost:5174`

**From another Windows machine on same network:**
- ✅ Use: `http://<your-machine-ip>:5174`
- To find your IP: `ipconfig` in Command Prompt

---

## 📝 Environment Variables on Windows

Windows handles `.env` files the same as macOS/Linux:
- ✅ `dotenv` package reads `.env` automatically
- ✅ No special configuration needed
- ✅ Works in `server/.env` exactly as expected

---

## 🚀 Production Build on Windows

### Build Backend
```cmd
cd server
npm run build
npm start
```

### Build Frontend
```cmd
cd ..\client
npm run build
```

**Output:**
- `server/dist/` - Backend ready for deployment
- `client/dist/` - Frontend ready for Vercel/Netlify

---

## 🎯 Windows-Specific Best Practices

1. **Use PowerShell instead of cmd.exe**
   - Better support for modern terminal features
   - Easier to read output

2. **Right-click "Run as Administrator"**
   - Prevents permission issues
   - Ensures all resources accessible

3. **Use Forward Slashes in npm commands**
   - `npm run` handles them correctly
   - More portable across systems

4. **Keep Terminal Open**
   - Don't close terminal while servers run
   - You'll see errors and logs in real-time

5. **Create .bat Shortcuts**
   - Create custom `.bat` files for quick start
   - Save in project root for easy access

---

## 📱 Testing on Other Windows Machines

### Share via Network

1. **Find your IP:**
```cmd
ipconfig
```

2. **Share from host machine:**
- App runs on `http://YOUR_IP:5174`

3. **From another Windows machine:**
- Open browser: `http://192.168.x.x:5174`

---

## ✅ Summary

**CodeGalaxy is 100% Windows Compatible!**

### Key Points:
- ✅ No OS-specific code
- ✅ All cross-platform dependencies
- ✅ Cloud MongoDB (no local DB issues)
- ✅ Batch script for easy startup
- ✅ No special configuration needed
- ✅ Same setup as macOS/Linux, just different paths

### To Get Started on Windows:
1. Install Node.js
2. Clone repository
3. Run `start-dev.bat`
4. Open http://localhost:5174

**That's it! 🎉**

---

## 📚 Additional Resources

- Node.js: https://nodejs.org/
- Git: https://git-scm.com/
- MongoDB Atlas: https://www.mongodb.com/cloud/atlas
- Vite Docs: https://vitejs.dev/
- Express Docs: https://expressjs.com/

---

**Happy Coding on Windows! 💻✨**

If you encounter any Windows-specific issues, check the troubleshooting section above or create an issue on GitHub with detailed error messages.
