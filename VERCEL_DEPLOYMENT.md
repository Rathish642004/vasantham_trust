# Vercel Deployment Guide for Vasantham Trust

This guide walks you through deploying the Vasantham Trust website to Vercel.

## Prerequisites

- A [Vercel account](https://vercel.com/signup)
- A [Supabase project](https://supabase.com/dashboard) with tables created
- A [Cloudinary account](https://cloudinary.com/console) for image uploads
- Git repository (GitHub, GitLab, or Bitbucket)

## Step 1: Connect Repository to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your Git repository
4. Vercel will auto-detect Next.js framework

## Step 2: Configure Environment Variables

In your Vercel project dashboard, go to **Settings** → **Environment Variables** and add the following:

### Required Variables

| Variable Name | Description | Where to Get It |
|--------------|-------------|-----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | [Supabase Dashboard](https://supabase.com/dashboard) → Project → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous/public key | [Supabase Dashboard](https://supabase.com/dashboard) → Project → Settings → API |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name | [Cloudinary Console](https://cloudinary.com/console) |
| `CLOUDINARY_API_KEY` | Cloudinary API key | [Cloudinary Console](https://cloudinary.com/console) |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | [Cloudinary Console](https://cloudinary.com/console) |

### Optional Variables

| Variable Name | Description | Default |
|--------------|-------------|---------|
| `NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL` | Auth redirect URL | Auto-detected from deployment URL |

### Setting Variables for Different Environments

You can set different values for:
- **Production** - Your main domain
- **Preview** - Branch deployments
- **Development** - Local development

## Step 3: Configure Supabase for Vercel

### Add Vercel Domain to Supabase

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project → **Authentication** → **URL Configuration**
3. Add your Vercel domains to **Site URL** and **Redirect URLs**:
   - Production: `https://your-domain.vercel.app`
   - Preview: `https://*.vercel.app` (for preview deployments)

### Update Row Level Security (RLS)

Ensure your Supabase tables have appropriate RLS policies for public access where needed.

## Step 4: Deploy

### Automatic Deployments

Once connected, Vercel will automatically deploy:
- **Production**: When you push to `main` or `master` branch
- **Preview**: For every pull request and other branches

### Manual Deployment

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Step 5: Custom Domain (Optional)

1. Go to Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Add your custom domain
3. Configure DNS settings as instructed
4. Update Supabase redirect URLs with your custom domain

## Troubleshooting

### Build Errors

1. Check build logs in Vercel Dashboard → Deployments → [deployment] → **Build Logs**
2. Ensure all environment variables are set correctly
3. Try building locally first: `npm run build`

### Environment Variables Not Working

1. Ensure `NEXT_PUBLIC_` prefix for client-side variables
2. Redeploy after adding/changing environment variables
3. Check variable scopes (Production/Preview/Development)

### Supabase Connection Issues

1. Verify Supabase URL and keys are correct
2. Check if Supabase project is active
3. Ensure RLS policies allow necessary operations

### Image Upload Issues (Cloudinary)

1. Verify Cloudinary credentials
2. Check upload preset settings in Cloudinary
3. Ensure the folder `vasantham_trust/events` exists or auto-creates

## Environment Variable Quick Reference

```bash
# Copy to .env.local for local development
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=123456789012345
CLOUDINARY_API_SECRET=your-api-secret-here
```

## Useful Commands

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server locally
npm start

# Run linting
npm run lint

# Deploy with Vercel CLI
vercel --prod
```

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
