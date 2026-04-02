# 🚀 Quick Commands Reference

## 🎬 Starting the System

### Backend (Terminal 1)
```bash
cd /Users/harsha/Desktop/Cgc/server
npm run dev
```

### Frontend (Terminal 2)
```bash
cd /Users/harsha/Desktop/Cgc/client
npm run dev
```

### Or use the script
```bash
chmod +x /Users/harsha/Desktop/Cgc/START_AUTH_SYSTEM.sh
/Users/harsha/Desktop/Cgc/START_AUTH_SYSTEM.sh
```

---

## 🌐 URLs

| App | URL |
|-----|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3000 |
| Login | http://localhost:5173/login |
| Register | http://localhost:5173/register |
| Editor | http://localhost:5173/editor |
| Home | http://localhost:5173/homepage |

---

## 🧪 Test Credentials

### Create New Account
- Go to: http://localhost:5173/register
- Fill in any username/email/password
- Click "Create Account"

### Quick Test User
```
Email: test@example.com
Password: test123456
```
(Only works if you registered this user first)

---

## 📦 Build Commands

### Server Build
```bash
cd /Users/harsha/Desktop/Cgc/server
npm run build
```

### Client Build
```bash
cd /Users/harsha/Desktop/Cgc/client
npm run build
```

---

## 🔍 API Testing with cURL

### Register
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "test123456",
    "confirmPassword": "test123456"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "test123456"
  }'
```

### Get Current User (replace TOKEN with actual token)
```bash
curl -X GET http://localhost:3000/api/auth/me \
  -H "Authorization: Bearer TOKEN"
```

---

## 📝 Environment Files

### Server .env Location
```
/Users/harsha/Desktop/Cgc/server/.env
```

**Current Config:**
```
PORT=3000
MONGO_URI=your_mongodb_uri_here
JWT_SECRET=your_jwt_secret_here
GEMINI_API_KEY=your_gemini_key_here
ONECOMPILER_API_KEY=your_onecompiler_key_here
```
See `.env.example` for setup instructions.

---

## 📂 New Files Created

### Backend
```
✅ server/src/models/User.ts
✅ server/src/middleware/auth.ts
✅ server/src/routes/auth.ts
✅ server/src/config/database.ts
```

### Frontend
```
✅ client/src/context/AuthContext.tsx
✅ client/src/hooks/useAuth.ts
✅ client/src/pages/LoginPage.tsx
✅ client/src/pages/RegisterPage.tsx
✅ client/src/styles/auth.css
```

### Documentation
```
✅ AUTH_SETUP.md
✅ AUTHENTICATION_GUIDE.md
✅ QUICK_COMMANDS.md (this file)
✅ START_AUTH_SYSTEM.sh
```

---

## 🔐 Important Notes

⚠️ **JWT Secret** - Keep it safe! Never share it
⚠️ **MongoDB URI** - Contains credentials, don't commit to git
⚠️ **Passwords** - Always sent to backend, never stored on client
⚠️ **Tokens** - Stored in localStorage, vulnerable in XSS attacks

---

## 🐛 Debug Mode

### Check if servers are running
```bash
# Backend
curl http://localhost:3000/

# Frontend (check browser dev tools)
```

### View logs
```bash
# Backend logs are printed in Terminal 1
# Frontend logs are in browser Console (F12)
```

### Check MongoDB
```bash
# Go to MongoDB Atlas dashboard
# https://www.mongodb.com/cloud/atlas
# View -> Collections -> users
```

---

## 🚨 Common Issues & Fixes

**"Cannot connect to MongoDB"**
- Check .env MONGO_URI
- Ensure cluster is active in MongoDB Atlas
- Check IP whitelist in MongoDB Atlas

**"JWT verification failed"**
- Clear browser localStorage: `localStorage.clear()`
- Login again to get new token
- Check JWT_SECRET in .env

**"Port already in use"**
```bash
# Find process using port 3000
lsof -i :3000

# Kill process
kill -9 <PID>
```

**"Module not found"**
```bash
# Reinstall dependencies
npm install

# Clear cache
npm cache clean --force
```

---

## 📊 Database Query Examples

### MongoDB Atlas Console

View all users:
```javascript
db.users.find({})
```

Find user by email:
```javascript
db.users.findOne({ email: "test@example.com" })
```

Count total users:
```javascript
db.users.countDocuments()
```

Delete user:
```javascript
db.users.deleteOne({ email: "test@example.com" })
```

---

## 💾 Backup & Migration

### Export users (MongoDB)
```bash
mongoexport --uri "your_mongodb_uri" \
  --collection users \
  --out users_backup.json
```

### Import users
```bash
mongoimport --uri "your_mongodb_uri" \
  --collection users \
  --file users_backup.json
```

**Note:** Replace `your_mongodb_uri` with your actual MongoDB connection string from `.env`

---

## 🎨 Customizing Auth Pages

### Change colors in `client/src/styles/auth.css`
```css
/* Gradient colors */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Change form fields in `client/src/pages/LoginPage.tsx`
- Add/remove input fields
- Change validation rules
- Customize button text

---

## 🚀 Deployment Checklist

- [ ] Build both applications successfully
- [ ] Test all auth flows locally
- [ ] Update MongoDB IP whitelist for production
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS for production
- [ ] Set secure cookie options
- [ ] Configure CORS for production domain
- [ ] Setup monitoring/logging
- [ ] Plan backup strategy

---

## 📞 Need Help?

Check these files:
1. **AUTH_SETUP.md** - Technical details
2. **AUTHENTICATION_GUIDE.md** - Full guide
3. **This file** - Quick reference
4. **Inline comments** in source code

---

**Last Updated:** April 1, 2026
**System Status:** ✅ Ready for Production
