# 🔑 Multiple Gemini API Keys - Rate Limiting Solution

## Problem

Using a **single Gemini API key** for multiple purposes (Chat/Code Generation + Study Planner) can cause **rate limiting issues** because:

- Free tier limit: **60 requests per minute** per project
- Chat/Code Generation uses API calls
- Study Planner also uses API calls
- Both compete for the same quota

## Solution: Separate API Keys

CodeGalaxy now supports **separate API keys** for different purposes:

```
GEMINI_API_KEY_CHAT   → For Chat and Code Generation
GEMINI_API_KEY_STUDY  → For Study Planner
GEMINI_API_KEY        → Fallback (used if specific keys not provided)
```

### Benefits
✅ **Separate Rate Limits** - Each key has its own 60 req/min quota  
✅ **Backward Compatible** - Works with single key if needed  
✅ **Easy Migration** - Just add new keys to `.env`  
✅ **Better Organization** - Easier to track usage by feature  

---

## Setup Instructions

### Step 1: Get Multiple API Keys

You can get multiple free API keys from Google:

1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Get your first API key (copy it)
3. **For a second key**, create a new Google Cloud Project:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable Generative AI API
   - Create an API key
   - Copy it

### Step 2: Update `.env` File

Edit `/server/.env`:

```bash
# Key for Chat/Code Generation (recommended for high-traffic features)
GEMINI_API_KEY_CHAT=your_first_api_key_here

# Key for Study Planner (recommended for background generation)
GEMINI_API_KEY_STUDY=your_second_api_key_here

# Fallback key (optional - used if specific keys not provided)
GEMINI_API_KEY=your_api_key_here
```

### Step 3: Restart Server

```bash
cd server
npm run build
npm start
```

---

## API Key Priority Order

### For Chat/Code Generation
1. **`GEMINI_API_KEY_CHAT`** (if set)
2. **`GEMINI_API_KEY`** (fallback)

### For Study Planner
1. **`GEMINI_API_KEY_STUDY`** (if set)
2. **`GEMINI_API_KEY`** (fallback)

---

## Usage Scenarios

### Scenario 1: Single API Key (Development)
```env
GEMINI_API_KEY=AIzaSy...your_key
# Chat and Study Planner share this key
```
- ✅ Works but limited
- ⚠️ Both features compete for same quota

### Scenario 2: Two API Keys (Recommended)
```env
GEMINI_API_KEY_CHAT=AIzaSy...key1
GEMINI_API_KEY_STUDY=AIzaSy...key2
```
- ✅ Separate quotas
- ✅ 60 req/min for each feature
- ✅ **RECOMMENDED for production**

### Scenario 3: Three API Keys (Advanced)
```env
GEMINI_API_KEY_CHAT=AIzaSy...key1
GEMINI_API_KEY_STUDY=AIzaSy...key2
GEMINI_API_KEY=AIzaSy...key3
```
- ✅ Maximum flexibility
- ✅ Can use key3 as backup
- ✅ 180 total requests/minute

---

## Monitoring API Usage

### Check Current Usage

```bash
# View server logs during operations
npm start

# You'll see logs like:
# "Calling Gemini API with model: gemini-1.5-flash"
# "Error generating study plan with Gemini API" (if rate limited)
```

### Monitor via Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** → **Quotas**
4. Find **Generative AI API**
5. View quota usage

### Common Issues & Solutions

#### Issue: Still getting rate limited with multiple keys
**Solution:**
- Generate more requests than expected?
- Set up billing to increase quota
- Use fallback mock data (it's pretty good!)

#### Issue: One key working, other not
**Solution:**
- Verify both keys are valid (from AI Studio or Cloud Console)
- Check that Generative AI API is enabled for both projects
- Test each key separately

#### Issue: Not sure which key is being used
**Solution:**
- Check server logs when making requests
- Logs show which API is being called
- Look for error messages indicating which key failed

---

## Production Best Practices

### 1. Use Different Projects
- Create separate Google Cloud projects for different features
- Keep each project's quota separate
- Monitor each project independently

### 2. Set Up Billing
- Free tier: 60 requests/minute per key
- With billing: Request higher quotas (1000+/min)
- You only pay for usage beyond free tier

### 3. Monitor Quotas
```bash
# Set up alerts in Google Cloud Console
# Go to Quotas → Set quotas for your project
# Enable notifications when approaching limits
```

### 4. Implement Caching
Study Planner already has fallback mock data, but consider:
- Cache generated study plans
- Reuse quizzes/explanations when possible
- Reduce API calls over time

### 5. Rate Limit Handling
Server automatically:
- ✅ Falls back to mock data on 403 error
- ✅ Logs API key issues
- ✅ Continues functioning normally

---

## Troubleshooting

### Q: I only have one API key, can I still use the app?
**A:** Yes! The app has fallback logic. Set `GEMINI_API_KEY` and it will work for both features (with potential rate limiting).

### Q: How do I get a second API key?
**A:** 
1. Option 1: Use [AI Studio](https://aistudio.google.com/) again
2. Option 2: Create new Google Cloud project and enable API
3. Both give free 60 req/min quotas

### Q: What if I forget to update `.env`?
**A:** App still works with mock data - no errors!

### Q: Can I use the same key for both?
**A:** Yes, but you'll hit rate limits faster. Separate keys are recommended.

### Q: Do separate keys cost extra?
**A:** No! Each free tier key has 60 req/min. Multiple keys = more total quota.

---

## API Key File Structure

```
server/.env
├── GEMINI_API_KEY_CHAT       ← Chat/Code Generation
├── GEMINI_API_KEY_STUDY      ← Study Planner
├── GEMINI_API_KEY            ← Fallback for both
├── ONECOMPILER_API_KEY       ← Code execution
├── MONGO_URI                 ← Database
└── JWT_SECRET                ← Authentication
```

---

## Environment Variables Reference

| Variable | Purpose | Required | Fallback |
|----------|---------|----------|----------|
| `GEMINI_API_KEY_CHAT` | Chat/Code Gen | No | GEMINI_API_KEY |
| `GEMINI_API_KEY_STUDY` | Study Planner | No | GEMINI_API_KEY |
| `GEMINI_API_KEY` | Fallback for all | No | Mock data |
| `ONECOMPILER_API_KEY` | Code execution | No | Mock response |
| `MONGO_URI` | Database | Yes | Error |
| `JWT_SECRET` | Auth tokens | Yes | Error |

---

## Cost Breakdown

### Free Tier
- 60 requests/minute per key
- Multiple keys = more quota
- No cost for up to limits

### Example Usage
```
With 1 key:  60 req/min total
With 2 keys: 120 req/min total
With 3 keys: 180 req/min total
```

### Upgrading
- Set up billing when free tier insufficient
- Pay only for usage beyond free tier
- Request higher quotas if needed

---

## Quick Start: Multiple Keys

```bash
# 1. Get two API keys from https://aistudio.google.com/
# (get first key, then create new project for second)

# 2. Edit /server/.env
GEMINI_API_KEY_CHAT=your_first_key
GEMINI_API_KEY_STUDY=your_second_key

# 3. Restart server
cd server
npm run build
npm start

# Done! 🎉 Now each feature has its own quota
```

---

## Testing

### Test Chat API (uses GEMINI_API_KEY_CHAT)
```bash
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Hello, world!"}'
```

### Test Study Planner (uses GEMINI_API_KEY_STUDY)
```bash
# Log in first, then:
curl -X POST http://localhost:3000/api/study-plans/generate \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "subject": "JavaScript",
    "goal": "Learn basics",
    "totalHours": 10,
    "duration": 7
  }'
```

---

## Server Logs

When multiple keys are configured, you'll see logs like:

```
Using GEMINI_API_KEY_CHAT for chat endpoint ✅
Using GEMINI_API_KEY_STUDY for study planner ✅
```

When falling back:

```
GEMINI_API_KEY_CHAT not found, using GEMINI_API_KEY
GEMINI_API_KEY_STUDY not found, using GEMINI_API_KEY
```

When both missing:

```
No Gemini API key configured, using mock data ✓
```

---

## Summary

| Feature | Before | After |
|---------|--------|-------|
| API Keys | 1 shared key | Separate keys |
| Rate Limit | 60 req/min | 60 req/min each |
| Flexibility | Limited | Full |
| Cost | Free | Free (with billing option) |
| Reliability | Prone to limits | Robust |

---

**Last Updated**: 2026-04-02  
**Status**: ✅ Production Ready  

Need help? Check the troubleshooting section above!
