# SuperMetal

A production-ready, lightweight, serverless web application that displays live prices of precious and industrial metals relevant to the Indian market.

## 🎯 Features

- **Live Metal Prices**: Real-time prices for Gold, Silver, Copper, Aluminium, and Zinc
- **Indian Market Units**: Prices displayed in ₹ per 10g (Gold), ₹ per kg (Silver), and ₹ per metric ton (Industrial metals)
- **Free API Support**: Works with free APIs - no API key required for precious metals!
- **Graceful Fallbacks**: Industrial metals show "—" with note if unavailable in free tier
- **Modern UI**: Clean, responsive design with dark mode support
- **Price Charts**: Historical price trends for Gold and Silver (7D/30D views)
- **Auto-refresh**: Prices update automatically every 10 minutes
- **Error Handling**: Graceful fallback with cached data when APIs are unavailable
- **Serverless**: Built with Next.js API routes, deployable on Vercel free tier

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn
- **No API key required!** The app works with free APIs out of the box
- Optional: MetalpriceAPI key for industrial metals (free tier available)

### Installation

1. **Clone or download this repository**

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables (OPTIONAL)**:
   
   Create a `.env.local` file in the root directory:
   ```env
   # Optional: Only needed if you want industrial metals data
   # Get free key at: https://metalpriceapi.com/
   METALPRICE_API_KEY=your_metalprice_api_key_here
   ```
   
   **Note**: The app works perfectly without this key! Precious metals (Gold & Silver) will work using the free gold-api.com service.

4. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**:
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📦 Project Structure

```
metalview-india/
├── app/
│   ├── api/
│   │   └── metals/
│   │       └── route.ts          # Serverless API endpoint
│   ├── globals.css                # Global styles
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Main dashboard page
├── components/
│   ├── ChartSection.tsx           # Price charts component
│   ├── Footer.tsx                  # Footer with disclaimer
│   ├── Header.tsx                  # Header with dark mode toggle
│   ├── MetalCard.tsx               # Individual metal price card
│   └── PriceGrid.tsx               # Grid of metal price cards
├── utils/
│   ├── cache.ts                    # In-memory cache utility
│   ├── conversions.ts               # Price conversion utilities
│   ├── fetcher.ts                  # Exchange rate fetcher
│   └── fetchMetalPrices.ts         # Metal price fetcher (swappable providers)
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🌐 Deployment to Vercel

### Step 1: Prepare Your Repository

1. Initialize git (if not already done):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. Push to GitHub/GitLab/Bitbucket:
   ```bash
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Sign up/Login** to [Vercel](https://vercel.com/)

2. **Import your project**:
   - Click "New Project"
   - Import your Git repository
   - Vercel will auto-detect Next.js settings

3. **Add Environment Variable (OPTIONAL)**:
   - In project settings, go to "Environment Variables"
   - Add `METALPRICE_API_KEY` with your API key value (only if you want industrial metals)
   - Select "Production", "Preview", and "Development" environments
   - **Note**: You can skip this step - the app works without it!

4. **Deploy**:
   - Click "Deploy"
   - Wait for build to complete
   - Your app will be live at `https://your-project.vercel.app`

### Step 3: Verify Deployment

- Check that the API route works: `https://your-project.vercel.app/api/metals`
- Verify prices are loading correctly on the homepage
- Test dark mode toggle
- Check responsive design on mobile

## 🔧 API Providers

The app uses a **swappable API provider system** for maximum reliability:

### Precious Metals (Gold & Silver)

**Primary Provider: gold-api.com** (No API key required)
- Free, no registration needed
- Reliable and fast
- Endpoints:
  - `https://gold-api.com/api/XAU/USD` (Gold)
  - `https://gold-api.com/api/XAG/USD` (Silver)

**Fallback Provider: MetalpriceAPI** (Optional API key)
- Used if gold-api.com fails
- Requires free API key from [metalpriceapi.com](https://metalpriceapi.com/)

### Industrial Metals (Copper, Aluminium, Zinc)

**Provider: MetalpriceAPI** (Optional API key)
- Only available if `METALPRICE_API_KEY` is set
- Free tier may have limitations
- If unavailable, cards show "—" with note: "Free data unavailable"

### Currency Conversion

**Provider: exchangerate.host** (Free, no API key)
- Endpoint: `https://api.exchangerate.host/latest?base=USD&symbols=INR`
- Fallback rate: 83.0 INR/USD if API fails

## 🔄 How to Switch API Providers

The API provider system is designed to be easily swappable. Edit `utils/fetchMetalPrices.ts`:

### Adding a New Provider

1. **Create a new fetch function**:
   ```typescript
   async function fetchFromNewProvider(): Promise<PreciousMetalPrices> {
     // Your API logic here
     return {
       gold: goldPrice,
       silver: silverPrice,
     };
   }
   ```

2. **Add to the main fetchMetalPrices function**:
   ```typescript
   export async function fetchMetalPrices(apiKey?: string): Promise<MetalPricesResponse> {
     // Try new provider first
     try {
       const precious = await fetchFromNewProvider();
       return { precious, industrial: {}, source: 'new-provider' };
     } catch (error) {
       // Fallback to existing providers...
     }
   }
   ```

### Changing Provider Priority

Modify the order of try-catch blocks in `fetchMetalPrices()` to change which provider is tried first.

## 🧮 Price Conversion Logic

### Gold (₹/10g)
```
(gold_usd_per_ounce × usd_inr / 31.1035) × 10
```

### Silver (₹/kg)
```
(silver_usd_per_ounce × usd_inr / 31.1035) × 1000
```

### Industrial Metals (₹/metric ton)
```
(metal_usd_per_ounce × usd_inr / 31.1035) × 1,000,000
```

**Note**: 1 troy ounce = 31.1035 grams

## ➕ Adding More Metals

To add more metals:

1. **Update the API call** in `utils/fetchMetalPrices.ts`:
   ```typescript
   // Add new metal symbol to the API request
   const url = `...&symbols=XAU,XAG,NEW_SYMBOL`;
   ```

2. **Update the API route** in `app/api/metals/route.ts`:
   ```typescript
   // Add conversion logic for new metal
   const newMetal_ton = metalsData.industrial.newMetal
     ? convertIndustrialMetalToRupeesPerTon(
         metalsData.industrial.newMetal,
         usdInr
       )
     : null;
   
   // Add to response
   return {
     ...existingData,
     newMetal_ton: newMetal_ton ? Math.round(newMetal_ton * 100) / 100 : null,
   };
   ```

3. **Add to PriceGrid** in `components/PriceGrid.tsx`:
   ```tsx
   <MetalCard
     name="New Metal"
     price={data.newMetal_ton}
     unit="metric ton"
     unavailable={data.newMetal_ton === null}
     // ... other props
   />
   ```

4. **Update TypeScript interfaces** in relevant files

## ⚙️ Configuration

### Changing Cache Duration

Edit `CACHE_TTL` in `app/api/metals/route.ts`:
```typescript
const cache = new SimpleCache<any>(10); // Change 10 to desired minutes
```

### Customizing UI

- **Colors**: Edit `tailwind.config.js` for theme colors
- **Fonts**: Change font in `app/layout.tsx`
- **Branding**: Update app name in `components/Header.tsx`

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)
- **Hosting**: Vercel (Serverless)

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🐛 Troubleshooting

### Prices Not Loading

1. **Check Internet Connection**: Verify APIs are accessible
2. **Check Console**: Look for errors in browser console
3. **Check API Status**: Visit gold-api.com to verify service status
4. **Try Refresh**: Click the "Refresh Prices" button

### Industrial Metals Show "—"

This is expected behavior if:
- No `METALPRICE_API_KEY` is set
- MetalpriceAPI free tier doesn't include industrial metals
- API rate limit exceeded

**Solution**: Get a free API key from [metalpriceapi.com](https://metalpriceapi.com/) and add it to `.env.local`

### Build Errors

1. **TypeScript Errors**: Run `npm run build` locally to see errors
2. **Missing Dependencies**: Run `npm install` again
3. **Environment Variables**: Ensure all required env vars are set (if using MetalpriceAPI)

### Deployment Issues

1. **Build Fails**: Check Vercel build logs
2. **API Route 500**: Verify environment variables in Vercel dashboard (if using MetalpriceAPI)
3. **CORS Issues**: Next.js API routes handle CORS automatically

## 📄 License

This project is open source and available for personal and commercial use.

## 🙏 Acknowledgments

- [Gold-API.com](https://gold-api.com/) for free precious metal prices
- [MetalpriceAPI](https://metalpriceapi.com/) for optional industrial metal data
- [ExchangeRate.host](https://exchangerate.host/) for currency conversion
- [Vercel](https://vercel.com/) for hosting platform

## 📝 Notes

- Prices are indicative, derived from international spot markets, and for informational purposes only
- Actual local prices may vary based on premiums, taxes, and market conditions
- This app is for informational purposes only and not financial advice
- Chart data is currently simulated; connect to historical API for real data
- **The app works perfectly without any API keys** - precious metals use free gold-api.com service

---

Built with ❤️ for the Indian market
