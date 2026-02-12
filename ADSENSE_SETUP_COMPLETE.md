# ✅ Google AdSense Setup Complete!

## 🎉 What's Been Done

### 1. ✅ AdSense Script Added
- Added Google AdSense script to `app/layout.tsx`
- Client ID: `ca-pub-7313067850150544`
- Script loads on every page automatically

### 2. ✅ AdSense Component Created
- Created `components/AdSense.tsx` with reusable ad components
- Supports responsive ads (auto-sizing)
- Ready for ad slot IDs when you create ad units

### 3. ✅ Ads Placed on Key Pages

#### Homepage (`app/page-client.tsx`):
- ✅ After SEO content section
- ✅ After Metal Tabs (before price sections)
- ✅ After Price History Table
- ✅ Before Footer

#### City Pages (`app/city/[cityName]/page.tsx`):
- ✅ Before Related Cities section
- ✅ Before Footer

#### Metal-City Pages (`app/[metal]/price-in/[city]/page.tsx`):
- ✅ After page header
- ✅ Before Related Cities section
- ✅ Before Footer

---

## 🚀 Next Steps

### Step 1: Create Ad Units in AdSense Dashboard

1. **Go to AdSense Dashboard:**
   - Visit: https://www.google.com/adsense
   - Sign in with your account

2. **Create Ad Units:**
   - Go to: Ads → By ad unit
   - Click: "Create ad unit"
   - Choose: "Display ads" → "Responsive"
   - Name: "Homepage - Responsive 1", "Homepage - Responsive 2", etc.
   - Click: "Create"

3. **Get Ad Slot IDs:**
   - After creating, you'll get an ad slot ID (e.g., "1234567890")
   - Copy these IDs

### Step 2: Add Ad Slot IDs to Components (Optional)

Currently, ads are set to **auto ads mode** (no ad slot IDs needed). Google will automatically place ads.

**If you want to use specific ad units:**

1. **Update `components/AdSense.tsx`:**
   ```typescript
   <AdSense
     adSlot="1234567890"  // Your ad slot ID
     format="responsive"
   />
   ```

2. **Or use the pre-built components:**
   ```typescript
   <AdSenseResponsive />  // Auto-responsive
   <AdSenseBanner />       // 728x90 Leaderboard
   <AdSenseRectangle />    // 300x250 Medium Rectangle
   ```

### Step 3: Enable Auto Ads (Recommended)

1. **Go to AdSense Dashboard:**
   - Visit: https://www.google.com/adsense
   - Go to: Ads → By site
   - Select: Your site (metalview.in)

2. **Enable Auto Ads:**
   - Toggle: "Enable Auto ads"
   - Choose: Ad formats (Display, In-article, etc.)
   - Save

3. **Auto Ads Will:**
   - Automatically place ads in optimal locations
   - Use the ad placements we've already set up
   - Optimize for maximum revenue

---

## 📊 Monitoring Your Ads

### Check Ad Performance:

1. **AdSense Dashboard:**
   - Go to: Reports → Overview
   - See: Impressions, clicks, CTR, revenue

2. **Key Metrics:**
   - **Impressions:** How many times ads were shown
   - **Clicks:** How many times ads were clicked
   - **CTR (Click-Through Rate):** Clicks ÷ Impressions (target: 1-3%)
   - **RPM (Revenue Per 1000 Impressions):** Revenue per 1000 views
   - **CPC (Cost Per Click):** Average earnings per click

### Expected Performance:

**With 1,000 Daily Visitors:**
- Impressions: ~3,000-5,000/day
- Clicks: 30-150/day
- Revenue: ₹500-2,000/day = ₹15,000-60,000/month

**With 5,000 Daily Visitors:**
- Impressions: ~15,000-25,000/day
- Clicks: 150-750/day
- Revenue: ₹2,500-10,000/day = ₹75,000-3,00,000/month

---

## 🎯 Ad Placement Strategy

### Current Placements:

1. **Above the Fold:** ✅ After SEO content (homepage)
2. **Between Content:** ✅ After Metal Tabs, After Price History
3. **Below Content:** ✅ Before Footer (all pages)

### Best Practices:

- ✅ **Don't place too many ads** (max 3-4 per page)
- ✅ **Keep ads away from navigation** (we've done this)
- ✅ **Use responsive ads** (we're using responsive)
- ✅ **Test different placements** (A/B test in AdSense)

---

## 🔧 Troubleshooting

### Ads Not Showing?

1. **Check AdSense Status:**
   - Go to: AdSense Dashboard
   - Check: Account status (should be "Active")
   - Check: Site status (should be "Ready")

2. **Check Ad Blockers:**
   - Disable ad blockers in your browser
   - Test in incognito mode

3. **Check Traffic:**
   - Ads may not show if traffic is very low
   - Wait 24-48 hours after setup

4. **Check AdSense Code:**
   - Verify script is in `app/layout.tsx`
   - Check browser console for errors

### Low Revenue?

1. **Optimize Ad Placements:**
   - Move ads to higher-traffic areas
   - Test different ad sizes
   - Use sticky ads (optional)

2. **Improve Traffic Quality:**
   - Focus on SEO (you're already doing this!)
   - Target high-value keywords
   - Improve user engagement

3. **Enable More Ad Types:**
   - In-article ads
   - Anchor ads
   - Vignette ads

---

## 📝 Files Modified

1. ✅ `app/layout.tsx` - Added AdSense script
2. ✅ `components/AdSense.tsx` - Created ad component
3. ✅ `app/page-client.tsx` - Added ads to homepage
4. ✅ `app/city/[cityName]/page.tsx` - Added ads to city pages
5. ✅ `app/[metal]/price-in/[city]/page.tsx` - Added ads to metal-city pages

---

## 🎉 You're All Set!

Your site is now ready to monetize with Google AdSense:

- ✅ Script installed
- ✅ Ads placed strategically
- ✅ Responsive design
- ✅ Mobile-optimized

**Just enable Auto Ads in your AdSense dashboard and start earning!**

---

## 💡 Pro Tips

1. **Wait 24-48 Hours:**
   - Ads may take time to start showing
   - Revenue data updates daily

2. **Monitor Performance:**
   - Check AdSense dashboard daily
   - Track which pages perform best

3. **Optimize Continuously:**
   - Test different ad placements
   - A/B test ad sizes
   - Focus on high-traffic pages

4. **Follow AdSense Policies:**
   - Don't click your own ads
   - Don't ask users to click ads
   - Keep content original (you're doing this!)

---

**Questions?** Check AdSense Help: https://support.google.com/adsense
