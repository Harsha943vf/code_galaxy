# 🤖 Gemini API Setup Guide for CodeGalaxy

## Overview

CodeGalaxy uses the Google Gemini API to power AI-driven features like the **Study Planner**. This guide will help you set up a valid Gemini API key.

## ⚠️ Current Status

If you see the following error in the server logs:
```
Error: [GoogleGenerativeAI Error]: Error fetching from https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent: [403 Forbidden] Method doesn't allow unregistered callers
```

This means your Gemini API key is invalid or not properly configured. **Don't worry!** The application has fallback mock data that allows the Study Planner to work even without a valid API key. However, to use real AI-powered features, follow the steps below.

## 🔧 Getting a Valid Gemini API Key

### Step 1: Go to Google AI Studio
1. Visit [Google AI Studio](https://aistudio.google.com/)
2. Click **"Get API Key"** (you may need to sign in with your Google account)

### Step 2: Create API Key
1. Click **"Create API Key"** button
2. Choose **"Create API key in new project"** or select an existing project
3. Copy the generated API key

### Step 3: Update Your .env File
1. Open `/server/.env`
2. Replace the `GEMINI_API_KEY` value with your new key:
   ```
   GEMINI_API_KEY=your_new_api_key_here
   ```
3. Save the file

### Step 4: Restart the Server
1. Stop the running server (Ctrl+C)
2. Rebuild and restart:
   ```bash
   cd server
   npm run build
   npm start
   ```

### Step 5: Test the API
1. Login to CodeGalaxy
2. Go to **Study Planner**
3. Create a new study plan
4. You should now see AI-generated study plans instead of mock data

## 📋 Troubleshooting

### Problem: Still getting 403 Forbidden error

**Solutions:**
1. **Verify API Key**: Double-check that you copied the correct API key
2. **Check .env File**: Make sure the key is exactly as copied (no extra spaces or characters)
3. **Restart Server**: Always rebuild after changing .env
   ```bash
   npm run build
   npm start
   ```
4. **Check Project Settings**: Ensure the Gemini API is enabled in your Google Cloud project

### Problem: Rate Limited (429 error)

The Gemini API has usage limits on the free tier:
- **Rate Limit**: 60 requests per minute per project
- **Daily Limit**: Varies by API key

**Solutions:**
1. Wait a few minutes before making more requests
2. For production use, set up billing and upgrade to a paid tier
3. Contact Google Cloud support for higher limits

### Problem: "Not found" or other 404 errors

This might indicate the API key belongs to a different region or project. Try:
1. Creating a new API key from AI Studio
2. Make sure you're using the latest API key format

## 🎯 Features Using Gemini API

The following features in CodeGalaxy use the Gemini API:

1. **Study Plan Generation** - AI creates personalized study plans
2. **Quiz Generation** - Auto-generates quizzes for study topics
3. **Topic Explanation** - AI explains complex topics
4. **Resource Recommendations** - AI suggests learning resources

## 📊 Understanding the Fallback System

CodeGalaxy has an intelligent fallback system:
- If the Gemini API key is invalid or rate-limited, the app uses **mock/default data**
- This ensures the application remains functional even without a valid API key
- Server logs will show: `⚠️ Gemini API Key issue detected. Using mock study plan.`

### Fallback Data Includes:
- Pre-built study plans for common subjects (JavaScript, Python, etc.)
- Default quiz questions
- Generic explanations and resources

While fallback data is functional, **real AI-generated content** is more personalized and relevant.

## 🚀 Production Deployment

For production deployments:

1. **Use a Service Account**: Instead of API keys, use Google Cloud service accounts
2. **Set Up Billing**: Enable billing in Google Cloud Console
3. **Increase Quota**: Request higher API quotas
4. **Monitor Usage**: Use Google Cloud Console to track API usage
5. **Store Keys Securely**: Use environment variables and never commit keys to Git

### Production Environment Setup:
```bash
# Use .env.production or set environment variables
export GEMINI_API_KEY=your_production_key
export MONGO_URI=your_production_mongodb_uri
export JWT_SECRET=your_secure_random_secret
```

## 📚 Resources

- [Google AI Studio](https://aistudio.google.com/)
- [Gemini API Documentation](https://ai.google.dev/)
- [Google Cloud Console](https://console.cloud.google.com/)
- [Generative AI Python SDK](https://github.com/google/generative-ai-python)
- [Node.js SDK](https://github.com/google/generative-ai-js)

## ❓ FAQ

**Q: Is there a free tier?**
A: Yes! Google provides free access to Gemini API through AI Studio with usage limits.

**Q: Can I use the app without a valid API key?**
A: Yes! The fallback system allows basic functionality with mock data.

**Q: How often are API rate limits reset?**
A: Rate limits reset every minute (60 requests/minute limit).

**Q: What if I want to use a different AI API?**
A: You can modify `/server/src/services/studyPlanService.ts` to use a different AI API.

---

**Last Updated**: 2026-04-02
**Maintained by**: CodeGalaxy Team
