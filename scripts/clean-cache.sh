#!/bin/bash
# Clean build cache script
# Run this if you encounter webpack module resolution errors

echo "🧹 Cleaning build cache..."

# Remove Next.js build directory
if [ -d ".next" ]; then
  rm -rf .next
  echo "✓ Removed .next directory"
fi

# Remove node_modules cache
if [ -d "node_modules/.cache" ]; then
  rm -rf node_modules/.cache
  echo "✓ Removed node_modules/.cache"
fi

# Remove SWC cache
if [ -d ".swc" ]; then
  rm -rf .swc
  echo "✓ Removed .swc directory"
fi

# Remove any webpack cache
find . -type d -name ".webpack" -exec rm -rf {} + 2>/dev/null
echo "✓ Cleaned webpack cache"

echo "✅ Cache cleanup complete!"
echo ""
echo "Now run: npm run dev"
