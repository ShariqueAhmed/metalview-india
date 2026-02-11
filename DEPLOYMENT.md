# Deployment Guide for Vercel

This guide will help you deploy MetalView to Vercel in just a few minutes.

## Prerequisites

1. A GitHub account
2. A Vercel account (sign up at [vercel.com](https://vercel.com) - it's free!)
3. Your code pushed to a GitHub repository

## Step-by-Step Deployment

### Method 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/metalview.git
   git push -u origin main
   ```

2. **Import Project to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js

3. **Configure Project Settings**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Environment Variables** (if needed)
   - Currently, no environment variables are required
   - If you add API keys later, add them in Vercel Dashboard → Settings → Environment Variables

5. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 2-3 minutes)
   - Your app will be live at `https://your-project.vercel.app`

### Method 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Link to existing project? No (first time)
   - Project name: metalview (or your preferred name)
   - Directory: `./`
   - Override settings? No

4. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Post-Deployment

### Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

### Environment Variables

If you need to add environment variables later:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variables for:
   - Production
   - Preview
   - Development

### Monitoring

- **Analytics**: Vercel Analytics (available in dashboard)
- **Logs**: View real-time logs in Vercel Dashboard
- **Performance**: Built-in performance monitoring

## Troubleshooting

### Build Fails

1. **Check Build Logs**
   - Go to Vercel Dashboard → Deployments → Click on failed deployment
   - Review error messages

2. **Common Issues**
   - **TypeScript Errors**: Fix all TypeScript errors locally first
   - **Missing Dependencies**: Ensure all dependencies are in `package.json`
   - **Build Timeout**: Increase build timeout in Vercel settings (if needed)

3. **Test Build Locally**
   ```bash
   npm run build
   ```
   Fix any errors before deploying

### API Routes Not Working

- Vercel automatically handles Next.js API routes
- Ensure routes are in `/app/api/` directory
- Check function logs in Vercel Dashboard

### Caching Issues

- Vercel uses edge caching by default
- To clear cache: Vercel Dashboard → Deployments → Redeploy

## Vercel Free Tier Limits

- **Bandwidth**: 100GB/month
- **Build Time**: 45 minutes/month
- **Function Execution**: 100GB-hours/month
- **Edge Network**: Unlimited requests

These limits are generous for most projects!

## Continuous Deployment

Vercel automatically deploys:
- **Production**: Every push to `main` branch
- **Preview**: Every push to other branches
- **Pull Requests**: Automatic preview deployments

## Support

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Next.js on Vercel**: [vercel.com/docs/frameworks/nextjs](https://vercel.com/docs/frameworks/nextjs)
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)

## Quick Deploy Button

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/metalview)

Replace `YOUR_USERNAME` with your GitHub username.

---

**That's it!** Your MetalView app should now be live on Vercel! 🚀
