# 🚀 Setup Instructions for Other Machines

## For Developers Cloning This Repository

### Step 1: Clone the Repository
```bash
git clone https://github.com/yourusername/cgc.git
cd cgc
```

### Step 2: Backend Setup

#### a. Copy `.env.example` to `.env`
```bash
cd server
cp .env.example .env
```

#### b. Edit `.env` with your credentials
```bash
nano .env  # or use your favorite editor
```

Fill in your actual values:
```properties
PORT=3000
ONECOMPILER_API_KEY=your_actual_key_here
GEMINI_API_KEY=your_actual_key_here
MONGO_URI=your_actual_mongodb_uri_here
JWT_SECRET=your_secure_jwt_secret_here
```

#### c. Install dependencies
```bash
npm install
```

#### d. Start backend
```bash
npm run dev
```

### Step 3: Frontend Setup

#### a. Open new terminal, copy `.env.example` to `.env.local`
```bash
cd client
cp .env.example .env.local
```

#### b. Edit `.env.local` (usually works with defaults)
```bash
nano .env.local
```

Default values should work:
```properties
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3000
```

#### c. Install dependencies
```bash
npm install
```

#### d. Start frontend
```bash
npm run dev
```

### Step 4: Access the App
Open your browser and go to: **http://localhost:5174**

---

## 🔑 Getting API Keys

### OneCompiler API Key
1. Visit [OneCompiler](https://onecompiler.com)
2. Go to Settings → API Keys
3. Generate new API key
4. Copy to `.env`

### Gemini API Key
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API key"
3. Copy to `.env`

### MongoDB URI
1. Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster or use existing
3. Click "Connect" → "Drivers"
4. Copy connection string
5. Replace `<password>` with your password
6. Copy to `.env`

### JWT Secret
Can be any random string. Generate one:
```bash
# macOS/Linux
openssl rand -base64 32

# Or use Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🐛 Troubleshooting

### Port Already in Use
If port 3000 or 5174 is already in use:

**Change backend port:**
```env
PORT=3001  # in server/.env
```

Then update frontend `.env.local`:
```env
VITE_API_URL=http://localhost:3001
VITE_SOCKET_URL=http://localhost:3001
```

### MongoDB Connection Error
- Check MongoDB URI is correct
- Ensure IP is whitelisted in MongoDB Atlas
- Verify database credentials

### API Key Errors
- Double-check API keys are correct
- Ensure keys have proper permissions
- Check if keys have expired

### Node Version Issue
Ensure you have Node.js 16+:
```bash
node --version
```

---

## ✅ Quick Checklist

- [ ] Cloned repository
- [ ] Created `.env` files in server and client
- [ ] Filled in all API keys
- [ ] Ran `npm install` in both directories
- [ ] Backend running on port 3000
- [ ] Frontend running on port 5174
- [ ] Opened http://localhost:5174 in browser
- [ ] Can sign up and login

---

## 📝 Important Notes

- **Never commit `.env` files** - they contain secrets
- `.env.example` is safe to commit - it's a template
- Each developer needs their own `.env` with their API keys
- Don't share your API keys with anyone
- Keep MongoDB credentials secure

---

## 🆘 Need Help?

Check existing documentation:
- `COMPLETE_SETUP_GUIDE.md` - Detailed setup
- `AUTH_IMPLEMENTATION_COMPLETE.md` - Auth system docs
- `WINDOWS_READY.md` - Windows-specific instructions

---

**Happy coding! 🎉**
