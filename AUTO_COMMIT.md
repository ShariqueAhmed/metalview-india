# Auto-Commit Setup

## Current Configuration

The repository is now set up to automatically push changes to GitHub after each commit.

### How It Works

1. **Git Hook**: A `post-commit` hook automatically pushes to GitHub after each commit
2. **Hot Reloading**: Next.js dev server automatically reloads on file changes
3. **Vercel Auto-Deploy**: If connected to Vercel, it will auto-deploy on push to main branch

### Manual Commands

If you want to commit and push manually:

```bash
# Stage all changes
git add -A

# Commit with message
git commit -m "Your commit message"

# Push to GitHub (hook will also do this automatically)
git push origin main
```

### Disable Auto-Push

To disable the auto-push hook:

```bash
rm .git/hooks/post-commit
```

### Hot Reloading

The Next.js dev server automatically:
- Detects file changes
- Reloads the page in browser
- Preserves component state when possible

No manual refresh needed!

### Vercel Auto-Deploy

If your GitHub repo is connected to Vercel:
- Every push to `main` branch triggers automatic deployment
- Preview deployments for other branches
- Usually takes 2-3 minutes to go live

---

**Note**: The auto-push hook will push to GitHub after every commit. Make sure you're comfortable with this before committing.
