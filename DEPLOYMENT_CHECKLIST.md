# 🚀 KHELO Deployment Checklist

## Before You Deploy

### 1. Prepare Your Code
- [ ] Push all code to GitHub
- [ ] Ensure all dependencies are in package.json files
- [ ] Remove any console.logs or debug code
- [ ] Test locally one final time

### 2. Set Up Accounts (if not already done)
- [ ] Create Vercel account (vercel.com)
- [ ] Create Render account (render.com)
- [ ] Ensure MongoDB Atlas is set up and accessible
- [ ] Ensure Cloudinary account is ready

---

## Backend Deployment (Render)

### Step 1: Deploy to Render
- [ ] Go to render.com/dashboard
- [ ] Click "New +" → "Web Service"
- [ ] Connect GitHub repository
- [ ] Select your repo

### Step 2: Configure Service
- [ ] Name: `khelo-backend`
- [ ] Root Directory: `server`
- [ ] Environment: `Node`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Instance Type: `Free` (or higher)

### Step 3: Add Environment Variables
Copy from `server/.env.example` and set in Render:

```
NODE_ENV=production
PORT=10000
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<generate-random-string>
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=<your-cloudinary-name>
CLOUDINARY_API_KEY=<your-cloudinary-key>
CLOUDINARY_API_SECRET=<your-cloudinary-secret>
CLIENT_URL=https://your-app.vercel.app
```

### Step 4: Complete Backend Deployment
- [ ] Click "Create Web Service"
- [ ] Wait for build to complete (~5-10 min)
- [ ] Copy your backend URL (e.g., `https://khelo-backend.onrender.com`)
- [ ] Test health endpoint: `https://your-backend.onrender.com/api/health`

---

## Frontend Deployment (Vercel)

### Step 1: Create .env File
In `client/` folder, create `.env`:

```
VITE_API_URL=https://khelo-backend.onrender.com/api
```

Replace with your actual Render backend URL from above.

### Step 2: Deploy to Vercel (Option A - CLI)
```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to client folder
cd client

# Login
vercel login

# Deploy to production
vercel --prod
```

### Step 2: Deploy to Vercel (Option B - Dashboard)
- [ ] Go to vercel.com/dashboard
- [ ] Click "Add New..." → "Project"
- [ ] Import your GitHub repository
- [ ] Framework: `Vite`
- [ ] Root Directory: `client`
- [ ] Build Command: `npm run build`
- [ ] Output Directory: `dist`

### Step 3: Add Environment Variable in Vercel
- [ ] Go to Project Settings → Environment Variables
- [ ] Add: `VITE_API_URL` = `https://khelo-backend.onrender.com/api`
- [ ] Apply to: Production, Preview, Development

### Step 4: Complete Frontend Deployment
- [ ] Click "Deploy"
- [ ] Wait for build (~2-3 min)
- [ ] Copy your Vercel URL (e.g., `https://your-app.vercel.app`)

---

## Post-Deployment Configuration

### Update Backend CORS
- [ ] Go back to Render dashboard
- [ ] Open your backend service
- [ ] Go to Environment
- [ ] Update `CLIENT_URL` to your Vercel URL
- [ ] Save (auto-redeploys)

### In MongoDB Atlas
- [ ] Go to Network Access
- [ ] Add IP Address: `0.0.0.0/0` (allows Render)
- [ ] Save

---

## Testing Your Deployment

### Backend Tests
- [ ] Visit: `https://your-backend.onrender.com/api/health`
- [ ] Should see: `{"status":"success","message":"Server is healthy"}`

### Frontend Tests
- [ ] Visit your Vercel URL
- [ ] Create an account ✓
- [ ] Login ✓
- [ ] Create a player profile ✓
- [ ] Add an achievement ✓
- [ ] Upload a certificate ✓
- [ ] Search for players ✓
- [ ] Test all features ✓

### Check Browser Console
- [ ] No CORS errors
- [ ] No 404 errors
- [ ] All API calls successful

---

## Troubleshooting

### CORS Errors
**Problem**: "blocked by CORS policy"
**Solution**: 
1. Check `CLIENT_URL` in Render environment matches your Vercel URL exactly
2. Redeploy backend on Render
3. Hard refresh frontend (Ctrl+Shift+R)

### API Calls Failing
**Problem**: 404 or 500 errors
**Solution**:
1. Check `VITE_API_URL` in Vercel environment
2. Ensure it ends with `/api`
3. Redeploy frontend

### Backend Not Starting
**Problem**: "Application failed to respond"
**Solution**:
1. Check Render logs
2. Verify all environment variables are set
3. Check MongoDB connection string
4. Ensure MongoDB IP whitelist includes 0.0.0.0/0

### Images Not Uploading
**Problem**: Upload fails
**Solution**:
1. Check Cloudinary credentials in Render
2. Verify CLOUDINARY_* variables are correct
3. Check Render logs for errors

---

## Optional: Custom Domains

### Add Custom Domain to Vercel
1. Project Settings → Domains
2. Add your domain
3. Update DNS records as shown

### Add Custom Domain to Render
1. Service Settings → Custom Domain
2. Add your domain
3. Update DNS records as shown

---

## Monitoring

### Check Logs
- **Vercel**: Dashboard → Your Project → Deployments → Logs
- **Render**: Dashboard → Your Service → Logs

### Set Up Monitoring (Optional)
- [ ] Add error tracking (Sentry)
- [ ] Add analytics (Google Analytics, Vercel Analytics)
- [ ] Set up uptime monitoring (UptimeRobot, Betteruptime)

---

## Done! 🎉

Your KHELO application is now live:
- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-backend.onrender.com`

Share your live URL and start using your app!

---

## Quick Commands Reference

```bash
# Redeploy frontend
cd client
vercel --prod

# Check backend logs on Render
# Go to dashboard.render.com → Your Service → Logs

# Update environment variables
# Vercel: Project Settings → Environment Variables
# Render: Service Settings → Environment

# Force rebuild
# Vercel: Deployments → ... → Redeploy
# Render: Manual Deploy → Deploy latest commit
```
