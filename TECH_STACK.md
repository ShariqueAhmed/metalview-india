# Tech Stack - MetalView India

## Frontend Framework
- **Next.js 14** (App Router)
  - Server-side rendering (SSR)
  - Static site generation (SSG)
  - API Routes (Serverless Functions)
  - File-based routing

## Core Technologies
- **React 18.2**
  - Client-side components
  - Hooks (useState, useEffect, useCallback)
  - Component-based architecture

- **TypeScript 5.2**
  - Type safety
  - Interface definitions
  - Type checking

## Styling
- **Tailwind CSS 3.3.5**
  - Utility-first CSS framework
  - Custom color palette (gold, silver)
  - Dark mode support (class-based)
  - Responsive design utilities
  - Custom animations and keyframes

- **PostCSS 8.4.31**
  - CSS processing

- **Autoprefixer 10.4.16**
  - Automatic vendor prefixing

## UI Components & Icons
- **Lucide React 0.294.0**
  - Icon library
  - Used for: Coins, MapPin, TrendingUp, TrendingDown, Info, etc.

## Data Visualization
- **Recharts 2.10.0**
  - Line charts for price trends
  - Responsive charts
  - Custom tooltips and legends

## Fonts
- **Inter** (Google Fonts)
  - Primary font family
  - System font fallback

## Backend/API
- **Next.js API Routes**
  - Serverless functions
  - `/api/metals` - Main price fetching endpoint
  - `/api/historical` - Historical data endpoint
  - No traditional backend server

## Data Fetching
- **Native Fetch API**
  - Server-side data fetching
  - Client-side data fetching
  - Groww.in API integration

## State Management
- **React Hooks**
  - useState for local state
  - useEffect for side effects
  - useCallback for memoization
  - useRef for references

## Caching
- **In-memory caching**
  - Custom SimpleCache implementation
  - 10-minute TTL per city
  - City-specific cache instances

## Deployment
- **Vercel** (Free Tier)
  - Serverless hosting
  - Automatic deployments
  - Edge functions support

## Development Tools
- **Node.js** (Runtime)
- **npm/yarn** (Package manager)
- **ESLint** (Code linting via Next.js)

## SEO & Metadata
- **Next.js Metadata API**
  - Dynamic metadata generation
  - Open Graph tags
  - Twitter Card tags
  - Structured data (JSON-LD)
  - Sitemap generation
  - Robots.txt

## Environment Variables
- `.env.local` for local development
- Environment variable support via Next.js

## Project Structure
```
metalview-india/
├── app/
│   ├── api/              # Serverless API routes
│   ├── blog/             # Blog pages
│   ├── city/             # City-specific pages
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # React components
├── utils/                # Utility functions
├── public/               # Static assets
└── package.json          # Dependencies
```

## Key Features
- ✅ Serverless architecture
- ✅ TypeScript for type safety
- ✅ Responsive design (mobile-first)
- ✅ Dark mode support
- ✅ Real-time price updates
- ✅ Historical data visualization
- ✅ SEO optimized
- ✅ City-specific pages
- ✅ Blog section
- ✅ No database (in-memory storage)

## External APIs
- **Groww.in API** - Gold price data source
  - Direct API endpoint
  - No API key required
  - Returns 24K and 22K gold prices

## Browser Support
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers
- Progressive enhancement

## Performance Optimizations
- Server-side rendering
- Code splitting (automatic with Next.js)
- Image optimization (Next.js Image component ready)
- Lazy loading
- In-memory caching
- Minimal dependencies
