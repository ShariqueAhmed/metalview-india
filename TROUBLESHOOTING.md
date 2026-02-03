# Troubleshooting Guide

## Webpack Module Resolution Error

If you encounter errors like:
- `Error: Cannot find module './682.js'`
- `Error: Cannot find module './948.js'`
- Any webpack chunk loading errors

### Quick Fix

Run the cleanup script:
```bash
npm run clean
```

Or manually:
```bash
rm -rf .next node_modules/.cache .swc
npm run dev
```

### Prevention

1. **Always use the clean dev command:**
   ```bash
   npm run dev:clean
   ```

2. **If errors persist:**
   - Stop the dev server (Ctrl+C)
   - Run `npm run clean`
   - Restart with `npm run dev`

3. **For production builds:**
   ```bash
   npm run build
   ```
   (This automatically cleans cache before building)

### Root Cause

This error occurs when:
- Next.js build cache gets corrupted
- Hot Module Replacement (HMR) gets out of sync
- Webpack chunks are not properly generated

The configuration in `next.config.js` has been optimized to prevent this, but if it still occurs, use the cleanup steps above.
