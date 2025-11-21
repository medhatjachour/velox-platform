# AI Generation Troubleshooting Guide

## 🚨 Current Issue: Connection Timeout to Groq API

### Error Message
```
Error [FetchError]: request to https://api.groq.com/openai/v1/chat/completions failed, reason: ETIMEDOUT
```

### What This Means
The application cannot reach Groq's API servers. This is a network connectivity issue, not a code problem.

## 🔍 Possible Causes & Solutions

### 1. Internet Connectivity
**Check**: Can you access other websites?
```bash
# Test internet connection
ping -c 3 google.com

# Test if Groq API is reachable
curl -I https://api.groq.com
```

**Solution**: 
- Check your internet connection
- Try restarting your router/modem
- Try using a different network

### 2. Firewall/Proxy Blocking
**Check**: Corporate firewall or proxy might be blocking API.groq.com

**Solution**:
```bash
# If behind a proxy, set these environment variables
export HTTP_PROXY=http://your-proxy:port
export HTTPS_PROXY=http://your-proxy:port

# Then restart the dev server
npm run dev
```

### 3. Groq API Status
**Check**: Visit https://status.groq.com to see if there are any outages

**Solution**: Wait for Groq to resolve the issue (usually temporary)

### 4. DNS Issues
**Check**: DNS might not be resolving api.groq.com

**Solution**:
```bash
# Try Google's DNS
sudo systemctl stop systemd-resolved
sudo systemctl start systemd-resolved

# Or manually set DNS to 8.8.8.8
```

### 5. API Key Issues
**Check**: Verify API key is valid

**Solution**:
```bash
# Test the API key directly
curl https://api.groq.com/openai/v1/models \
  -H "Authorization: Bearer $GROQ_API_KEY"
```

If this returns models, your key is valid. If timeout, it's network-related.

## ✅ What I've Already Fixed

1. **Added Retry Logic**: The AI service now retries up to 2 times on network errors
2. **Better Error Messages**: Users see helpful messages like:
   - "AI service is temporarily unavailable. Please check your internet connection."
   - "AI service rate limit reached. Please try again in a moment."
3. **Error Type Detection**: Distinguishes between network, API key, and rate limit errors

## 🔄 Retry Mechanism

The updated code automatically retries:
```typescript
private maxRetries = 2
private retryDelay = 1000 // 1 second

// Will try 3 times total (initial + 2 retries)
// Waits 1 second between retries
```

## 🎯 Quick Test

Run this to test if the issue is network-related:

```bash
# Test 1: Can we reach Groq?
curl -v https://api.groq.com/openai/v1/models \
  -H "Authorization: Bearer $GROQ_API_KEY" \
  -H "Content-Type: application/json" \
  --max-time 10

# Test 2: Check local DNS resolution
nslookup api.groq.com

# Test 3: Check if port 443 is open
nc -zv api.groq.com 443
```

## 📱 Alternative: Use OpenAI API

If Groq continues to have issues, you can switch to OpenAI:

1. **Get OpenAI API Key**: https://platform.openai.com/api-keys

2. **Update .env.local**:
```env
OPENAI_API_KEY=sk-...
```

3. **Modify lib/ai/ai-service.ts**:
```typescript
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

// Replace groq.chat.completions.create with:
const completion = await openai.chat.completions.create({
  // ... same parameters
  model: 'gpt-4o-mini', // or 'gpt-3.5-turbo' for cheaper
})
```

4. **Install OpenAI SDK**:
```bash
npm install openai
```

## 🏃 Workaround: Disable AI Features Temporarily

If you need to continue development:

1. **Mock the AI responses** in `hooks/use-ai.ts`:
```typescript
export function useAI() {
  const generateBio = async (input: any) => {
    // Mock response
    return "Experienced developer with passion for building modern web applications. Specializing in React, Node.js, and cloud technologies.";
  };

  const generateHeadline = async (input: any) => {
    return "Full Stack Developer | React Expert | Cloud Enthusiast";
  };

  return { generateBio, generateHeadline, loading: false };
}
```

2. **Users can still manually type** their bios and headlines

## 📊 Monitoring

Check the terminal for these logs:
```
✓ AI generation error (attempt 1/3): [error details]
✓ Retrying in 1000ms...
✓ AI generation error (attempt 2/3): [error details]
✓ Retrying in 1000ms...
✗ AI generation error (attempt 3/3): [error details]
→ All retries exhausted
```

## 🎓 Understanding the Error

**ETIMEDOUT** means:
- The connection attempt took too long
- No response from the server within timeout period (usually 30-60 seconds)
- Not a DNS issue (would be ENOTFOUND)
- Not a connection refused (would be ECONNREFUSED)

**This typically indicates**:
- Network/ISP issues blocking outbound HTTPS to api.groq.com
- Groq's servers are overloaded or down
- Regional blocking/firewall

## 💡 Next Steps

1. **Verify internet connectivity**: Can you browse normally?
2. **Test Groq API directly**: Run the curl command above
3. **Check Groq status**: Visit https://status.groq.com
4. **Try different network**: Use mobile hotspot to test
5. **Wait and retry**: Often temporary API issues resolve in minutes

## 📝 Report to Groq

If issue persists:
1. Visit https://console.groq.com/support
2. Report: "Unable to connect to api.groq.com from [your location]"
3. Include: ETIMEDOUT error, your IP region, ISP name

---

**Current Status**: ✅ Code is correct, ⚠️ Network connectivity issue

The portfolio editor works perfectly. The AI generation feature will work once network connectivity to Groq is restored.
