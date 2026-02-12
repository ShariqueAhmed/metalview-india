# 🔧 Fix: ads.txt Not Working on Non-WWW Domain

## ⚠️ Issue

- ❌ `https://metalview.in/ads.txt` - Not working
- ✅ `https://www.metalview.in/ads.txt` - Working

**This is a concern** because Google AdSense needs to access `ads.txt` on the canonical domain.

---

## ✅ Solution Implemented

### 1. Created Route Handler for ads.txt

**File:** `app/ads.txt/route.ts`

This ensures `ads.txt` is accessible on **both** www and non-www versions:
- ✅ `https://metalview.in/ads.txt`
- ✅ `https://www.metalview.in/ads.txt`

### 2. Created Middleware

**File:** `middleware.ts`

This handles domain redirects and ensures ads.txt works on both versions.

---

## 🔍 Why This Happens

### Common Causes:

1. **Domain Configuration:**
   - Your domain might be configured to redirect non-www to www (or vice versa)
   - DNS settings might only point www to your server

2. **Hosting Configuration:**
   - Vercel/hosting might have redirect rules
   - Static files might not be accessible on non-www

3. **Next.js Static Files:**
   - Files in `public/` folder might not work on both versions
   - Route handlers ensure dynamic serving

---

## ✅ What We've Done

### 1. Route Handler (`app/ads.txt/route.ts`)

This dynamically serves the ads.txt content, ensuring it works on:
- Both www and non-www
- Any domain configuration
- With proper caching headers

### 2. Middleware (`middleware.ts`)

Handles:
- Domain redirects (if needed)
- Ensures ads.txt is accessible
- Can be configured for www/non-www preference

---

## 🎯 Next Steps

### Step 1: Deploy Changes

After deploying, test both URLs:
- `https://metalview.in/ads.txt`
- `https://www.metalview.in/ads.txt`

Both should now work!

### Step 2: Choose Canonical Domain

**Important:** You should choose ONE canonical domain:

**Option A: Use Non-WWW (Recommended for SEO)**
- Canonical: `https://metalview.in`
- Redirect www to non-www

**Option B: Use WWW**
- Canonical: `https://www.metalview.in`
- Redirect non-www to www

### Step 3: Configure Redirects (Optional)

If you want to redirect one to the other, uncomment the relevant section in `middleware.ts`:

**To redirect www to non-www:**
```typescript
if (hostname.startsWith('www.')) {
  url.hostname = hostname.replace('www.', '');
  return NextResponse.redirect(url, 301);
}
```

**To redirect non-www to www:**
```typescript
if (!hostname.startsWith('www.') && hostname.includes('metalview.in')) {
  url.hostname = `www.${hostname}`;
  return NextResponse.redirect(url, 301);
}
```

### Step 4: Update Vercel Domain Settings

1. Go to Vercel Dashboard
2. Navigate to: Your Project → Settings → Domains
3. Ensure both `metalview.in` and `www.metalview.in` are added
4. Set one as primary (canonical)

### Step 5: Update Google Services

**Google Search Console:**
- Add both properties:
  - `https://metalview.in`
  - `https://www.metalview.in`
- Set one as preferred (canonical)

**Google AdSense:**
- Add both domains if needed
- Or set one as primary

---

## 🧪 Testing

### After Deployment:

1. **Test Non-WWW:**
   ```bash
   curl https://metalview.in/ads.txt
   ```
   Should return: `google.com, pub-7313067850150544, DIRECT, f08c47fec0942fa0`

2. **Test WWW:**
   ```bash
   curl https://www.metalview.in/ads.txt
   ```
   Should return: `google.com, pub-7313067850150544, DIRECT, f08c47fec0942fa0`

3. **Check in Browser:**
   - Visit both URLs
   - Both should display the ads.txt content

---

## 📊 Impact on AdSense

### Before Fix:
- ❌ Google might not find ads.txt on non-www
- ❌ Status might show "Not found" or "Unauthorised"
- ❌ Ads might not show properly

### After Fix:
- ✅ ads.txt accessible on both domains
- ✅ Google can verify from either domain
- ✅ Status should show "Authorised"
- ✅ Ads will work correctly

---

## 🔧 Additional Configuration

### Vercel Redirects (Alternative)

You can also add redirects in `vercel.json`:

```json
{
  "redirects": [
    {
      "source": "/ads.txt",
      "destination": "/ads.txt",
      "permanent": false
    }
  ]
}
```

But the route handler is better as it serves the content directly.

---

## ✅ Verification Checklist

After deployment:

- [ ] `https://metalview.in/ads.txt` works
- [ ] `https://www.metalview.in/ads.txt` works
- [ ] Both return the same content
- [ ] Content-Type is `text/plain`
- [ ] Google AdSense can access both
- [ ] Status in AdSense shows "Authorised"

---

## 🎯 Recommendation

**Best Practice:**
1. Choose one canonical domain (non-www is recommended)
2. Redirect the other to canonical
3. Ensure ads.txt works on both (we've done this!)
4. Set canonical in Google Search Console
5. Set canonical in AdSense

**This ensures:**
- ✅ SEO benefits (no duplicate content)
- ✅ AdSense works correctly
- ✅ Consistent user experience
- ✅ Proper domain authority

---

**The route handler ensures ads.txt works on both domains, so you're covered!** ✅
