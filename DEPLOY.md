# Deployment Guide - Perfume Haven Hub

Complete guide for deploying the Perfume Haven e-commerce application to production.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Security Setup](#security-setup)
3. [Environment Configuration](#environment-configuration)
4. [Database Setup](#database-setup)
5. [Deploy to Netlify (Frontend)](#deploy-to-netlify-frontend)
6. [Deploy to Render (Backend)](#deploy-to-render-backend)
7. [Production Checklist](#production-checklist)
8. [Post-Deployment](#post-deployment)

---

## Prerequisites

Before deploying, ensure you have:
- [Node.js](https://nodejs.org/) v16+ installed
- [Git](https://git-scm.com/) installed
- MongoDB Atlas account (free tier available)
- GitHub account with repository
- Vercel account (for frontend)
- Render account (for backend)
- Google OAuth credentials
- GitHub OAuth credentials

---

## Security Setup

### 1. Environment Variables
**NEVER commit `.env` files to GitHub!**

```bash
# The .env file is already in .gitignore
# Copy .env.example to .env and fill in your secrets
cp backend/.env.example backend/.env
```

### 2. Generate Strong JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Replace `JWT_SECRET` in your `.env` with this value.

### 3. Remove Sensitive Data from Repository

Check if any secrets are already committed:

```bash
# Search for sensitive patterns
git log -p --all -S "GOCSPX" | head -20
git log -p --all -S "mongodb+srv" | head -20
```

If secrets are found in history, use `git-filter-branch` or [BFG Repo Cleaner](https://rtyley.github.io/bfg-repo-cleaner/):

```bash
# Using BFG (recommended)
bfg --replace-text secrets.txt
git reflog expire --expire=now --all && git gc --prune=now --aggressive
git push --force
```

### 4. Store Secrets Securely

- **MongoDB URI**: Use MongoDB Atlas with strong password
- **Google OAuth**: Regenerate keys for production
- **JWT Secret**: Use cryptographically strong random string (min 32 chars)
- **Never** share secrets in code, comments, or issues

---

## Environment Configuration

### Backend (.env)

```dotenv
# Server
PORT=8080
NODE_ENV=production

# Database
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/perfume_shop?retryWrites=true&w=majority

# JWT
JWT_SECRET=<your_strong_jwt_secret_here>
JWT_EXPIRE=7d

# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
GOOGLE_CALLBACK_URL=https://your-backend-domain.com/api/auth/google/callback

# GitHub OAuth (from GitHub Settings)
GITHUB_CLIENT_ID=<your_github_client_id>
GITHUB_CLIENT_SECRET=<your_github_client_secret>
GITHUB_CALLBACK_URL=https://your-backend-domain.com/api/auth/github/callback

# Frontend
FRONTEND_URL=https://your-frontend-domain.com
```

### Frontend (vite.config.ts)

Update API base URL for production:

```typescript
// In your api service, update the base URL
const API_BASE_URL = import.meta.env.PROD 
  ? 'https://your-backend-domain.com/api'
  : 'http://localhost:8080/api';
```

---

## Database Setup

### MongoDB Atlas

1. **Create Cluster**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Create free tier cluster
   - Select region closest to your users

2. **Create Database User**
   - Database Access → Add Database User
   - Use strong password (20+ chars, mixed case, numbers, symbols)
   - Grant admin role for initial setup

3. **Whitelist IP**
   - Network Access → Add IP Address
   - For production: Add your server's IP
   - For development: Allow from anywhere (0.0.0.0/0)

4. **Get Connection String**
   ```
   mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
   ```

5. **Create Indexes** (Optional but recommended)
   ```javascript
   // Run once in MongoDB Compass or Atlas UI
   db.products.createIndex({ name: "text", description: "text" })
   db.products.createIndex({ category: 1, price: 1 })
   db.users.createIndex({ email: 1 }, { unique: true })
   ```

---

## Deploy to Netlify (Frontend)

### 1. Connect Repository

Option A: Using Netlify Dashboard (Recommended)

1. Go to [netlify.com](https://netlify.com)
2. Click "Add new site" → "Import an existing project"
3. Select GitHub and authorize Netlify
4. Choose your repository
5. Configure build settings:
   - **Base directory**: `/` (root)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

Option B: Using Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod
```

### 2. Environment Variables

In Netlify Dashboard → Site Settings → Build & Deploy → Environment:

```
VITE_API_URL=https://your-render-backend-domain.onrender.com/api
```

Or via Netlify CLI:

```bash
netlify env:set VITE_API_URL "https://your-render-backend-domain.onrender.com/api"
```

### 3. Configure netlify.toml

Create `netlify.toml` in your project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"

# Redirect all non-file requests to index.html (for React Router)
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

# Security headers
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "geolocation=(), microphone=(), camera=()"
```

### 4. Deploy

Push to GitHub - Netlify auto-deploys:

```bash
git push origin main
```

### 5. Configure Custom Domain

In Netlify Dashboard → Domain Settings:
1. Add custom domain
2. Update DNS records
3. Auto-provisions SSL certificate (free with Let's Encrypt)

---

## Deploy to Render (Backend)

### 1. Create Web Service

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: perfume-haven-backend
   - **Environment**: Node
   - **Build Command**: `npm install && npm run seed` (optional for initial seed)
   - **Start Command**: `npm run dev` or `node src/server.js`
   - **Plan**: Free tier (with limitations) or Paid

### 2. Environment Variables

In Render Dashboard → Environment:

```
PORT=8080
NODE_ENV=production
MONGODB_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
GOOGLE_CLIENT_ID=<your_id>
GOOGLE_CLIENT_SECRET=<your_secret>
GOOGLE_CALLBACK_URL=https://your-render-domain.onrender.com/api/auth/google/callback
GITHUB_CLIENT_ID=<your_id>
GITHUB_CLIENT_SECRET=<your_secret>
GITHUB_CALLBACK_URL=https://your-render-domain.onrender.com/api/auth/github/callback
FRONTEND_URL=https://your-frontend-domain.com
```

### 3. Seed Database (First Time)

```bash
# Via Render Dashboard Shell
node seed.js
```

### 4. Deploy

Push to GitHub - Render auto-deploys:

```bash
git push origin main
```

---

## Production Checklist

### Security
- [ ] Remove all hardcoded secrets from code
- [ ] Generate new JWT_SECRET for production
- [ ] Rotate OAuth credentials for production
- [ ] Enable HTTPS (automatic with Vercel/Render)
- [ ] Set NODE_ENV=production
- [ ] Add CORS whitelist for production domain
- [ ] Implement rate limiting
- [ ] Add helmet middleware for security headers
- [ ] Update MongoDB connection string with strong password

### Performance
- [ ] Enable gzip compression
- [ ] Optimize images (use CDN)
- [ ] Minify CSS/JS (Vite does this)
- [ ] Configure caching headers
- [ ] Monitor bundle size

### Database
- [ ] Create database backups
- [ ] Set up automated backups (MongoDB Atlas: Auto Backup)
- [ ] Create production-only database user with limited permissions
- [ ] Enable IP whitelist on MongoDB Atlas

### Frontend
- [ ] Update API URLs for production
- [ ] Remove console.logs for sensitive data
- [ ] Test on production environment
- [ ] Set up error tracking (Sentry optional)
- [ ] Test OAuth callback URLs

### Backend
- [ ] Test all API endpoints
- [ ] Verify OAuth flows work
- [ ] Check cart functionality
- [ ] Test email notifications (if implemented)
- [ ] Monitor server logs

### Documentation
- [ ] Update README with production URLs
- [ ] Document deployment steps
- [ ] Create incident response plan
- [ ] Document API endpoints

---

## Post-Deployment

### 1. Verify Deployment

```bash
# Test API
curl https://your-backend-domain.com/api/products

# Check frontend
https://your-frontend-domain.com
```

### 2. Update OAuth Callbacks

Update in Google Cloud Console and GitHub:

**Google Cloud Console:**
- Credentials → OAuth 2.0 Client ID
- Authorized redirect URIs:
  - `https://your-backend-domain.com/api/auth/google/callback`

**GitHub Settings:**
- Developer settings → OAuth Apps
- Authorization callback URL:
  - `https://your-backend-domain.com/api/auth/github/callback`

### 3. Test Authentication

1. Visit your frontend
2. Click "Login"
3. Test Google OAuth
4. Test GitHub OAuth
5. Verify user created in database

### 4. Set Up Monitoring

- **Error Tracking**: Sentry (optional)
- **Performance**: New Relic (optional)
- **Logging**: Check platform's native logging

### 5. Enable CORS for Production

Update `server.js`:

```javascript
const cors = require('cors');

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
```

### 6. Set Up Database Backups

**MongoDB Atlas:**
1. Go to Backup section
2. Enable "Automated Backup" (stored 35 days)
3. Set backup window for off-peak hours

### 7. Create Admin User (Optional)

```bash
# Connect to production database and create admin
db.users.insertOne({
  email: "admin@perfumehaven.com",
  firstName: "Admin",
  lastName: "User",
  role: "admin",
  isVerified: true
})
```

---

## Troubleshooting

### OAuth Not Working
- [ ] Check callback URLs match exactly
- [ ] Verify credentials in environment variables
- [ ] Check CORS settings
- [ ] Review browser console for errors

### Database Connection Fails
- [ ] Verify MongoDB URI is correct
- [ ] Check IP whitelist on MongoDB Atlas
- [ ] Ensure database user has permissions
- [ ] Test connection string locally first

### Frontend API 404 Errors
- [ ] Check API URL in vite.config.ts
- [ ] Verify backend is running
- [ ] Check CORS configuration
- [ ] Review Network tab in browser DevTools

### Build Failures
- [ ] Check Node version (should be v16+)
- [ ] Clear node_modules and reinstall
- [ ] Check for TypeScript errors
- [ ] Review build logs in platform dashboard

---

## Useful Commands

```bash
# Local testing before deployment
npm run build  # Frontend
npm run dev    # Backend

# Database operations
node seed.js   # Re-seed database

# Check environment
echo $MONGODB_URI  # Verify variable is set
echo $JWT_SECRET

# Netlify CLI
netlify login
netlify deploy --prod
netlify logs

# View logs (platform-specific)
netlify logs --tail         # Netlify (frontend)
render logs                 # Render (backend)
```

---

## Support & Resources

- [Netlify Docs](https://docs.netlify.com/)
- [Render Docs](https://render.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [React Router Docs](https://reactrouter.com/)

---

## License

This project is licensed under MIT License. See LICENSE file for details.
