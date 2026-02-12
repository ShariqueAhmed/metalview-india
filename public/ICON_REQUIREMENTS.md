# Icon Requirements for PWA & Mobile Support

This document lists all the icon files that need to be created for full PWA and mobile support.

## Required Icons

### Apple Touch Icons (iOS)
These icons are used when users add the site to their iOS home screen.

- `/apple-touch-icon.png` (180x180px) - Default Apple touch icon
- `/apple-touch-icon-57x57.png` (57x57px) - iPhone (legacy)
- `/apple-touch-icon-60x60.png` (60x60px) - iPhone
- `/apple-touch-icon-72x72.png` (72x72px) - iPad (legacy)
- `/apple-touch-icon-76x76.png` (76x76px) - iPad
- `/apple-touch-icon-114x114.png` (114x114px) - iPhone Retina (legacy)
- `/apple-touch-icon-120x120.png` (120x120px) - iPhone Retina
- `/apple-touch-icon-144x144.png` (144x144px) - iPad Retina (legacy)
- `/apple-touch-icon-152x152.png` (152x152px) - iPad Retina
- `/apple-touch-icon-180x180.png` (180x180px) - iPhone X/11/12/13/14/15

### PWA Icons (Web App Manifest)
These icons are used for the Progressive Web App (PWA) installation.

- `/icon-192x192.png` (192x192px) - Android Chrome, maskable
- `/icon-512x512.png` (512x512px) - Android Chrome, maskable

### Favicons (Browser Tabs)
These icons appear in browser tabs and bookmarks.

- `/favicon.ico` (16x16, 32x32, 48x48px) - Multi-size ICO file
- `/favicon-16x16.png` (16x16px) - Small favicon
- `/favicon-32x32.png` (32x32px) - Standard favicon

### Windows Tiles (Microsoft)
These icons are used for Windows Start Menu tiles.

- `/mstile-70x70.png` (70x70px) - Small tile
- `/mstile-150x150.png` (150x150px) - Medium tile
- `/mstile-310x150.png` (310x150px) - Wide tile
- `/mstile-310x310.png` (310x310px) - Large tile

## Design Guidelines

### Color Scheme
- Primary Color: `#f59e0b` (Amber/Gold)
- Background: White or transparent
- Icon should represent MetalView branding (trending up arrow, metal bars, or similar)

### Icon Design Tips
1. **Simple & Recognizable**: Icons should be simple and instantly recognizable
2. **High Contrast**: Ensure good contrast for visibility on various backgrounds
3. **No Text**: Avoid text in icons (except maybe a simple "M" or "MV" monogram)
4. **Consistent Style**: All icons should follow the same design language
5. **Safe Zone**: For maskable icons (192x192, 512x512), keep important content within the safe zone (80% of the icon area)

## Quick Start

### Option 1: Use an Icon Generator
1. Create a master icon (1024x1024px PNG)
2. Use an online tool like:
   - [RealFaviconGenerator](https://realfavicongenerator.net/)
   - [Favicon.io](https://favicon.io/)
   - [PWA Asset Generator](https://github.com/onderceylan/pwa-asset-generator)

### Option 2: Manual Creation
1. Design icons in your preferred design tool (Figma, Sketch, Adobe Illustrator)
2. Export at the required sizes
3. Optimize images (use tools like [TinyPNG](https://tinypng.com/))
4. Place all files in the `/public` directory

### Option 3: Use SVG and Convert
1. Create an SVG icon
2. Use a tool to convert SVG to PNG at various sizes
3. Place all files in the `/public` directory

## Testing

After adding icons, test:
1. **iOS Safari**: Add to home screen and verify icon appears correctly
2. **Android Chrome**: Install as PWA and verify icon appears correctly
3. **Browser Tabs**: Check favicon appears in browser tabs
4. **Windows**: Check Start Menu tile (if applicable)

## Current Status

⚠️ **Icons are not yet created**. The meta tags and manifest are configured, but you need to add the actual icon files to the `/public` directory.

Once icons are added, the PWA will be fully functional and users will be able to:
- Add the site to their home screen (iOS/Android)
- Install as a Progressive Web App
- See proper icons in browser tabs
- Experience native app-like behavior
