# 📊 Vercel Free Tier (Hobby Plan) Limits

## 🎯 Overview

Vercel's free tier (Hobby plan) is generous and can handle significant traffic for most websites.

---

## 📈 Traffic & Bandwidth Limits

### **Bandwidth:**
- **100 GB per month** (outbound bandwidth)
- This is **per project**, not per account
- Inbound bandwidth is **unlimited**

### **What This Means:**
- **100 GB = ~100,000 MB**
- Average page size: ~500 KB - 2 MB
- **You can serve:**
  - **50,000 - 200,000 page views per month** (depending on page size)
  - **~1,600 - 6,600 page views per day**
  - **~67 - 275 page views per hour**

### **For Your Metal Prices Site:**
- Your pages are relatively lightweight (mostly text, some charts)
- Estimated page size: ~500 KB - 1 MB
- **You can handle:**
  - **100,000 - 200,000 page views per month**
  - **~3,000 - 6,000 page views per day**
  - **~125 - 250 page views per hour**

---

## ⚡ Function Execution Limits

### **Serverless Functions:**
- **100 GB-hours per month**
- **100 hours of execution time** (if using 1 GB memory)
- **10 seconds max execution time** per function

### **Edge Functions:**
- **1 million invocations per month**
- **50ms max execution time**

---

## 🚀 Build Limits

### **Builds:**
- **6,000 build minutes per month**
- **45 minutes per build** (max)
- **100 builds per day** (soft limit)

### **For Your Site:**
- Typical build time: 2-5 minutes
- **You can build:**
  - **1,200 - 3,000 builds per month**
  - **~40 - 100 builds per day**

---

## 💾 Storage Limits

### **Serverless Functions:**
- **50 MB per function**
- **1 GB total** (across all functions)

### **Edge Config:**
- **256 KB** per config

---

## 🔒 Other Limits

### **Domains:**
- **Unlimited custom domains**
- **Free SSL certificates** (automatic)

### **Deployments:**
- **Unlimited deployments**
- **Preview deployments** for every push

### **Team Members:**
- **1 team member** (just you on free tier)

---

## 📊 Real-World Traffic Examples

### **Small Blog/Website:**
- **10,000 - 50,000 page views/month**
- ✅ **Well within limits**

### **Medium Website:**
- **50,000 - 100,000 page views/month**
- ✅ **Still within limits**

### **Growing Website:**
- **100,000 - 200,000 page views/month**
- ⚠️ **Approaching limits** (may need to optimize)

### **High Traffic Website:**
- **200,000+ page views/month**
- ❌ **Will exceed bandwidth** (need Pro plan)

---

## 💡 Optimization Tips to Stay Within Limits

### 1. **Optimize Images:**
- Use Next.js Image component (already doing this!)
- Serve WebP/AVIF formats
- Lazy load images
- **Saves: 50-70% bandwidth**

### 2. **Enable Caching:**
- Set proper cache headers
- Use CDN caching
- **Reduces bandwidth usage**

### 3. **Minimize JavaScript:**
- Code splitting (already doing this!)
- Tree shaking
- **Reduces bundle size**

### 4. **Compress Assets:**
- Gzip/Brotli compression
- Minify CSS/JS
- **Saves: 30-50% bandwidth**

### 5. **Use Static Generation:**
- Pre-render pages when possible
- **Reduces serverless function usage**

---

## 🎯 For Your Metal Prices Site

### **Current Setup:**
- ✅ Next.js with static generation
- ✅ Image optimization enabled
- ✅ Code splitting
- ✅ Caching headers

### **Estimated Capacity:**
- **Page size:** ~500 KB - 1 MB
- **Monthly capacity:** **100,000 - 200,000 page views**
- **Daily capacity:** **~3,000 - 6,000 page views**
- **Peak hourly:** **~125 - 250 page views**

### **When You'll Need to Upgrade:**
- **> 200,000 page views/month**
- **> 6,000 page views/day**
- **> 250 concurrent users**

---

## 💰 Vercel Pro Plan ($20/month)

### **If You Exceed Free Tier:**

**Pro Plan Includes:**
- **1 TB bandwidth/month** (10x more)
- **Unlimited build minutes**
- **Team collaboration**
- **Advanced analytics**
- **Priority support**

**Cost:** $20/month per user

---

## 📈 Monitoring Your Usage

### **Check Usage in Vercel Dashboard:**
1. Go to: **Vercel Dashboard**
2. Click: **Settings** → **Usage**
3. View:
   - Bandwidth usage
   - Function execution time
   - Build minutes

### **Set Up Alerts:**
- Vercel will email you at **80% usage**
- You'll get warnings before hitting limits

---

## 🚨 What Happens When You Hit Limits?

### **Bandwidth:**
- Site continues to work
- You'll be charged **$40 per 100 GB** over limit
- Or upgrade to Pro plan

### **Function Execution:**
- Functions may be throttled
- Upgrade to Pro for more capacity

### **Builds:**
- Builds may be queued
- Upgrade to Pro for priority

---

## ✅ Summary for Your Site

### **Free Tier Capacity:**
- **100 GB bandwidth/month**
- **~100,000 - 200,000 page views/month**
- **~3,000 - 6,000 page views/day**

### **Your Current Traffic:**
- Check Google Analytics to see current traffic
- If under 6,000 daily views, you're good!

### **When to Upgrade:**
- **> 6,000 daily page views**
- **> 200,000 monthly page views**
- **Need team collaboration**
- **Want advanced analytics**

---

## 🎯 Recommendation

**For a metal prices website:**
- ✅ **Free tier is perfect** for starting out
- ✅ Can handle **significant traffic** (100K+ monthly views)
- ✅ **Upgrade when you hit 6,000+ daily views**
- ✅ **Pro plan is affordable** ($20/month) when needed

**Most websites never exceed free tier limits!**

---

## 📞 Need More Info?

- **Vercel Pricing:** https://vercel.com/pricing
- **Vercel Limits:** https://vercel.com/docs/limits
- **Usage Dashboard:** Vercel Dashboard → Settings → Usage

---

**Bottom Line: Vercel's free tier can handle 100,000-200,000 page views per month, which is more than enough for most websites starting out!** 🚀
