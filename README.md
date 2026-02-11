# MetalView - Indian Metal Price Screener

A production-ready, serverless web application for displaying live metal prices in India. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🎯 Features

- **Live Metal Prices**: Gold, Silver, Copper, and Platinum prices in Indian Rupees
- **City-Specific Pages**: SEO-optimized pages for major Indian cities
- **Real-Time Updates**: Prices updated every 10 minutes with intelligent caching
- **Price Charts**: Historical price trends using Recharts
- **Responsive Design**: Mobile-first, fully responsive UI
- **SEO Optimized**: Complete SEO system with structured data, sitemap, and meta tags
- **Serverless Architecture**: Deployable on Vercel Free Tier

## 🧱 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.2
- **Styling**: Tailwind CSS 3.3.5
- **Icons**: Lucide React
- **Charts**: Recharts 2.10.0
- **Fonts**: Inter (Google Fonts)
- **Deployment**: Vercel (Serverless)

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd metalview
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional)
   ```bash
   cp .env.example .env.local
   ```
   
   Add your configuration:
   ```env
   NEXT_PUBLIC_BASE_URL=http://localhost:3000
   NEXT_PUBLIC_GOOGLE_VERIFICATION=your-google-verification-code
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🚀 Quick Deploy to Vercel

### Method 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/metalview.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in (free account)
   - Click **"Add New Project"**
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click **"Deploy"**

3. **Done!** Your app will be live in 2-3 minutes at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   Follow the prompts, then deploy to production:
   ```bash
   vercel --prod
   ```

### Environment Variables (Optional)

Set these in Vercel Dashboard → Settings → Environment Variables:

- `NEXT_PUBLIC_BASE_URL`: Your production URL (e.g., `https://your-project.vercel.app`)
- `NEXT_PUBLIC_GOOGLE_VERIFICATION`: Google Search Console verification code (optional)

**Note:** No environment variables are required for basic deployment. The app works out of the box!

📖 **For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

## 📁 Project Structure

```
metalview/
├── app/
│   ├── api/
│   │   └── metals/
│   │       ├── route.ts              # Main API route
│   │       └── [city]/
│   │           └── route.ts          # City-specific API route
│   ├── gold-price-today-in-[city]/
│   │   ├── page.tsx                  # City-specific gold price page
│   │   └── GoldPricePageClient.tsx  # Client component
│   ├── layout.tsx                    # Root layout with SEO metadata
│   ├── page.tsx                      # Homepage
│   └── sitemap.ts                    # Dynamic sitemap
├── components/
│   ├── Header.tsx                    # App header
│   ├── CitySelector.tsx              # City dropdown selector
│   ├── MetalCard.tsx                 # Individual metal price card
│   ├── PriceGrid.tsx                 # Grid of metal price cards
│   ├── ChartSection.tsx              # Price trend charts
│   └── Footer.tsx                    # Footer with disclaimer
├── utils/
│   ├── growwFetcher.ts               # Groww API integration
│   ├── cache.ts                      # In-memory caching system
│   ├── conversions.ts                # Currency/unit formatting
│   └── seo.ts                        # SEO utilities
└── public/
    └── robots.txt                    # Robots.txt file
```

## 🔧 API Routes

### `/api/metals`
Fetches metal prices for default city (Mumbai) or specified city via query parameter.

**Query Parameters:**
- `city` (optional): City name (e.g., `mumbai`, `delhi`)

**Response:**
```json
{
  "city": "mumbai",
  "gold_10g": 65000.50,
  "silver_1kg": 85000.00,
  "copper": null,
  "platinum": null,
  "updated_at": "2025-01-20T10:30:00.000Z",
  "cached": false
}
```

### `/api/metals/[city]`
Fetches metal prices for a specific city.

**Example:** `/api/metals/delhi`

## 🎨 Customization

### Adding New Cities

1. Add city to `TOP_CITIES` array in:
   - `app/page.tsx`
   - `app/gold-price-today-in-[city]/page.tsx`
   - `app/sitemap.ts`

2. The city will automatically be included in:
   - City selector dropdown
   - Static page generation
   - Sitemap

### Styling

The app uses Tailwind CSS. Customize colors, spacing, and other design tokens in `tailwind.config.js`.

### Data Source

Currently uses Groww.in API. To change data source, update `utils/growwFetcher.ts`.

## 📊 Caching Strategy

- **In-Memory Cache**: 10-minute TTL per city
- **City-Specific Caches**: Separate cache for each city to reduce API load
- **Stale-While-Revalidate**: Returns cached data if API fails
- **Server-Side Caching**: Next.js revalidation every 10 minutes

## 🔍 SEO Features

- **Dynamic Metadata**: City and metal-specific meta tags
- **Structured Data**: JSON-LD schema markup
- **Sitemap**: Auto-generated sitemap with all city pages
- **Robots.txt**: Search engine directives
- **Open Graph**: Social media sharing tags
- **Canonical URLs**: Prevents duplicate content issues

## 🐛 Troubleshooting

### Build Errors

If you encounter build errors:

1. Clear `.next` directory:
   ```bash
   rm -rf .next
   npm run build
   ```

2. Clear node_modules and reinstall:
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### API Errors

If API calls fail:

1. Check Groww API availability
2. Verify network connectivity
3. Check browser console for errors
4. Cached data will be served if available

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

Built with ❤️ using Next.js 14
