# Phase 14 Implementation Plan: Deployment

**Status**: ⚠️ Partially Configured - Needs Completion

This document provides a detailed plan to verify and complete Phase 14 (Steps 14.1-14.4) from `IMPLEMENTATION_STEPS.md`.

---

## 📋 Current Status Assessment

### ✅ Already Completed
- ✅ Cloudflare adapter configured (`svelte.config.js`)
- ✅ `wrangler.toml` exists with basic configuration
- ✅ Build command configured (`npm run build`)
- ✅ Output directory configured (`.svelte-kit/cloudflare`)

### ⚠️ Needs Implementation
- ⚠️ **GitHub repository connection** - Not verified
- ⚠️ **Cloudflare Pages setup** - Not completed
- ⚠️ **Environment variables** - Not configured in Cloudflare
- ⚠️ **Domain configuration** - Not set up
- ⚠️ **Post-deployment tasks** - Not completed

---

## Step 14.1: Cloudflare Pages Setup

### Verification Checklist

#### GitHub Repository Connection

**Current Implementation**: ⚠️ **Not Verified**

**Action Items**:

1. **Verify GitHub Repository**:

**Checklist**:
- [ ] Repository exists on GitHub
- [ ] Repository is public or Cloudflare has access
- [ ] Main branch is `main` or `master`
- [ ] Code is pushed to GitHub

2. **Connect Repository to Cloudflare Pages**:

**Steps**:
1. Log in to Cloudflare Dashboard
2. Go to **Workers & Pages** → **Pages**
3. Click **Create a project**
4. Click **Connect to Git**
5. Authorize Cloudflare to access GitHub
6. Select your repository (`TennisStringsWebsite`)
7. Click **Begin setup**

3. **Configure Build Settings**:

**Build Settings**:
- **Project name**: `tennis-strings-site` (or your preferred name)
- **Production branch**: `main` (or `master`)
- **Build command**: `npm run build`
- **Build output directory**: `.svelte-kit/cloudflare`
- **Root directory**: `/` (leave empty if root)
- **Node version**: `18` or higher (select from dropdown)

**Configuration in Cloudflare Pages UI**:
```
Framework preset: None (or SvelteKit if available)
Build command: npm run build
Build output directory: .svelte-kit/cloudflare
Root directory: (leave empty)
Environment variables: (configure in next step)
```

4. **Verify Build Configuration** (`wrangler.toml`):

**Current Configuration**:
```toml
name = "tennis-strings-site"
compatibility_date = "2024-01-01"
pages_build_output_dir = ".svelte-kit/cloudflare"
```

**Enhancement** (Optional):
```toml
name = "tennis-strings-site"
compatibility_date = "2024-01-01"
pages_build_output_dir = ".svelte-kit/cloudflare"

# Optional: Add build configuration
[env.production]
compatibility_date = "2024-01-01"

# Optional: Add preview environment
[env.preview]
compatibility_date = "2024-01-01"
```

5. **Test Build Locally**:

**Before deploying, test build**:
```bash
# Install dependencies
npm install

# Run build
npm run build

# Verify output directory exists
ls -la .svelte-kit/cloudflare

# Test preview
npm run preview
```

6. **Create Build Verification Script** (Optional):

**Add to `package.json`**:
```json
{
  "scripts": {
    "build": "vite build",
    "build:verify": "npm run build && test -d .svelte-kit/cloudflare && echo 'Build successful'",
    "preview": "vite preview"
  }
}
```

### Testing
- [ ] Build succeeds locally
- [ ] Output directory is correct
- [ ] Preview works locally
- [ ] Cloudflare Pages build succeeds
- [ ] Site is accessible after deployment

---

## Step 14.2: Environment Variables

### Verification Checklist

#### Environment Variables Setup

**Current Implementation**: ⚠️ **Not Configured**

**Action Items**:

1. **List Required Environment Variables**:

**Required Variables**:
- `PUBLIC_GA_ID` - Google Analytics Measurement ID
- `MAILCHIMP_API_KEY` - Mailchimp API key (private)
- `MAILCHIMP_LIST_ID` - Mailchimp list ID (private)
- `MAILCHIMP_SERVER_PREFIX` - Mailchimp server prefix (private)
- `PUBLIC_AMAZON_ASSOCIATE_ID` - Amazon Associates ID (optional)
- `PUBLIC_TENNIS_WAREHOUSE_ID` - Tennis Warehouse affiliate ID (optional)
- `PUBLIC_DICKS_ID` - Dick's affiliate ID (optional)

2. **Set Up Environment Variables in Cloudflare Pages**:

**Steps**:
1. Go to Cloudflare Dashboard
2. Navigate to **Workers & Pages** → **Pages** → Your Project
3. Click **Settings** → **Environment Variables**
4. Add variables for **Production** environment:
   - Click **Add variable**
   - Enter variable name (e.g., `PUBLIC_GA_ID`)
   - Enter variable value
   - Click **Save**
5. Repeat for all required variables
6. Optionally add variables for **Preview** environment (for testing)

**Important Notes**:
- Variables starting with `PUBLIC_` are exposed to the client
- Variables without `PUBLIC_` are server-only
- Never commit sensitive values to Git
- Use Cloudflare's environment variables for secrets

3. **Create Environment Variables Documentation** (`docs/ENVIRONMENT_VARIABLES.md`):

```markdown
# Environment Variables

## Required Variables

### Google Analytics
- `PUBLIC_GA_ID`: Google Analytics Measurement ID (e.g., `G-XXXXXXXXXX`)

### Newsletter (Mailchimp)
- `MAILCHIMP_API_KEY`: Mailchimp API key (private)
- `MAILCHIMP_LIST_ID`: Mailchimp list ID (private)
- `MAILCHIMP_SERVER_PREFIX`: Mailchimp server prefix (e.g., `us1`) (private)

## Optional Variables

### Affiliate Programs
- `PUBLIC_AMAZON_ASSOCIATE_ID`: Amazon Associates ID
- `PUBLIC_AMAZON_TAG`: Amazon tracking tag
- `PUBLIC_TENNIS_WAREHOUSE_ID`: Tennis Warehouse affiliate ID
- `PUBLIC_DICKS_ID`: Dick's Sporting Goods affiliate ID

## How to Set

1. Go to Cloudflare Dashboard
2. Workers & Pages → Pages → Your Project
3. Settings → Environment Variables
4. Add variables for Production and Preview environments
```

4. **Update `.env.example`** (if exists):

```env
# Google Analytics
PUBLIC_GA_ID=G-XXXXXXXXXX

# Mailchimp Newsletter
MAILCHIMP_API_KEY=your_mailchimp_api_key
MAILCHIMP_LIST_ID=your_mailchimp_list_id
MAILCHIMP_SERVER_PREFIX=us1

# Affiliate Programs (Optional)
PUBLIC_AMAZON_ASSOCIATE_ID=your_amazon_associate_id
PUBLIC_AMAZON_TAG=your_amazon_tag
PUBLIC_TENNIS_WAREHOUSE_ID=your_tennis_warehouse_id
PUBLIC_DICKS_ID=your_dicks_id
```

5. **Verify Environment Variables in Code**:

**Check all files that use environment variables**:
- [ ] `src/routes/+layout.svelte` - Uses `PUBLIC_GA_ID`
- [ ] `src/routes/api/newsletter/+server.ts` - Uses Mailchimp variables
- [ ] `src/lib/utils/affiliate.ts` - Uses affiliate IDs (if created)
- [ ] `src/lib/utils/analytics.ts` - Uses `PUBLIC_GA_ID` (if created)

### Testing
- [ ] Environment variables set in Cloudflare
- [ ] Variables accessible in production
- [ ] Google Analytics works
- [ ] Newsletter signup works
- [ ] Affiliate links work (if configured)

---

## Step 14.3: Domain Configuration

### Verification Checklist

#### Custom Domain Setup

**Current Implementation**: ⚠️ **Not Configured**

**Action Items**:

1. **Configure Custom Domain in Cloudflare Pages**:

**Steps**:
1. Go to Cloudflare Dashboard
2. Navigate to **Workers & Pages** → **Pages** → Your Project
3. Click **Custom domains**
4. Click **Set up a custom domain**
5. Enter your domain (e.g., `tennisstrings.com`)
6. Click **Continue**

2. **DNS Configuration**:

**If domain is already on Cloudflare**:
- Cloudflare will automatically configure DNS
- SSL certificate will be provisioned automatically

**If domain is not on Cloudflare**:
- Add domain to Cloudflare
- Update nameservers at your domain registrar
- Wait for DNS propagation (can take up to 24 hours)

3. **SSL Certificate**:

**Cloudflare automatically provisions SSL certificates**:
- SSL is enabled by default
- Certificate is automatically renewed
- HTTPS redirect is automatic

**Verify SSL**:
- [ ] Visit site with `https://`
- [ ] Certificate is valid
- [ ] No SSL warnings
- [ ] HTTPS redirect works

4. **DNS Records** (if needed manually):

**CNAME Record** (if not automatic):
```
Type: CNAME
Name: @ (or www)
Target: your-project.pages.dev
Proxy: Yes (orange cloud)
```

**Or A Record** (if CNAME doesn't work):
```
Type: A
Name: @
Content: (Cloudflare will provide IP)
Proxy: Yes
```

5. **Subdomain Configuration** (Optional):

**For www subdomain**:
- Add `www.yourdomain.com` as custom domain
- Cloudflare will handle redirects

**Redirect Configuration** (in Cloudflare Pages):
- Set up redirect rules if needed
- Configure www to non-www (or vice versa)

### Testing
- [ ] Custom domain configured
- [ ] DNS records correct
- [ ] SSL certificate active
- [ ] HTTPS works
- [ ] Domain accessible
- [ ] Redirects work (if configured)

---

## Step 14.4: Post-Deployment

### Verification Checklist

#### Post-Deployment Tasks

**Current Implementation**: ⚠️ **Not Completed**

**Action Items**:

1. **Submit Sitemap to Google Search Console**:

**Steps**:
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property (your domain)
3. Verify ownership (HTML file, meta tag, or DNS)
4. Go to **Sitemaps**
5. Enter sitemap URL: `https://yourdomain.com/sitemap.xml`
6. Click **Submit**
7. Wait for Google to process (may take a few days)

**Sitemap URL Format**:
- Production: `https://yourdomain.com/sitemap.xml`
- Verify sitemap is accessible: `curl https://yourdomain.com/sitemap.xml`

2. **Submit Sitemap to Bing Webmaster Tools**:

**Steps**:
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Sign in with Microsoft account
3. Add site
4. Verify ownership
5. Go to **Sitemaps**
6. Submit sitemap URL: `https://yourdomain.com/sitemap.xml`

3. **Verify Google Analytics Tracking**:

**Steps**:
1. Visit your production site
2. Open browser DevTools → Network tab
3. Filter for `gtag` or `collect`
4. Verify requests are being sent
5. Check Google Analytics dashboard
6. Verify real-time data appears

**Alternative**:
- Use Google Analytics Debugger extension
- Check GA4 Real-Time reports

4. **Test All Functionality on Production**:

**Functional Testing Checklist**:
- [ ] Homepage loads correctly
- [ ] Navigation works
- [ ] Search works
- [ ] Filters work
- [ ] Review pages load
- [ ] Machine pages load
- [ ] Article pages load
- [ ] Affiliate links work
- [ ] Newsletter signup works
- [ ] Contact form works
- [ ] Images load correctly
- [ ] Mobile responsive
- [ ] No console errors

5. **Set Up Monitoring/Error Tracking**:

**Option A: Cloudflare Analytics** (Built-in):
- Cloudflare provides basic analytics
- Check **Analytics** tab in Pages dashboard
- Monitor page views, requests, errors

**Option B: Sentry** (Recommended for error tracking):

**Installation**:
```bash
npm install @sentry/sveltekit
```

**Configuration** (`src/hooks.client.ts`):
```typescript
import * as Sentry from '@sentry/sveltekit';

Sentry.init({
	dsn: import.meta.env.PUBLIC_SENTRY_DSN,
	tracesSampleRate: 1.0,
	environment: import.meta.env.MODE
});
```

**Option C: Logflare** (Cloudflare-native):
- Integrates with Cloudflare Workers
- Real-time log streaming
- Error tracking

6. **Set Up Uptime Monitoring** (Optional):

**Services**:
- **UptimeRobot**: Free uptime monitoring
- **Pingdom**: Advanced monitoring
- **StatusCake**: Free tier available

**Configuration**:
- Monitor homepage URL
- Set up alerts for downtime
- Check every 5 minutes

7. **Create Post-Deployment Checklist** (`docs/DEPLOYMENT_CHECKLIST.md`):

```markdown
# Post-Deployment Checklist

## Immediate (Day 1)
- [ ] Site is accessible
- [ ] SSL certificate active
- [ ] All pages load correctly
- [ ] No console errors
- [ ] Google Analytics tracking works
- [ ] Newsletter signup works
- [ ] Contact form works

## First Week
- [ ] Submit sitemap to Google Search Console
- [ ] Submit sitemap to Bing Webmaster Tools
- [ ] Monitor error logs
- [ ] Check analytics daily
- [ ] Test all functionality
- [ ] Monitor performance

## Ongoing
- [ ] Monitor uptime
- [ ] Check error logs weekly
- [ ] Review analytics monthly
- [ ] Update content regularly
- [ ] Monitor Core Web Vitals
- [ ] Check for broken links
```

### Testing
- [ ] Sitemap submitted to Google
- [ ] Sitemap submitted to Bing
- [ ] Google Analytics verified
- [ ] All functionality tested
- [ ] Monitoring set up
- [ ] Error tracking configured

---

## Final Verification Checklist

### Cloudflare Pages Setup
- [ ] Repository connected
- [ ] Build settings configured
- [ ] Build succeeds
- [ ] Site is accessible

### Environment Variables
- [ ] All variables set
- [ ] Variables accessible
- [ ] Google Analytics works
- [ ] Newsletter works
- [ ] Affiliate links work

### Domain Configuration
- [ ] Custom domain configured
- [ ] DNS records correct
- [ ] SSL certificate active
- [ ] HTTPS works

### Post-Deployment
- [ ] Sitemap submitted
- [ ] Analytics verified
- [ ] Functionality tested
- [ ] Monitoring set up

---

## Implementation Commands

### Pre-Deployment
```bash
# Test build locally
npm run build

# Verify output
ls -la .svelte-kit/cloudflare

# Test preview
npm run preview

# Check for errors
npm run check
```

### Post-Deployment
```bash
# Test production site
curl https://yourdomain.com

# Test sitemap
curl https://yourdomain.com/sitemap.xml

# Test robots.txt
curl https://yourdomain.com/robots.txt
```

---

## Success Criteria

Phase 14 is complete when:
- ✅ Site deployed to Cloudflare Pages
- ✅ Custom domain configured
- ✅ SSL certificate active
- ✅ Environment variables configured
- ✅ Sitemap submitted
- ✅ Analytics verified
- ✅ All functionality works
- ✅ Monitoring set up

---

## Next Steps

After completing Phase 14:
1. Monitor site performance
2. Gather user feedback
3. Continue content creation
4. Optimize based on analytics
5. Plan Phase 15: Ongoing Maintenance

---

## Notes

- Cloudflare Pages provides automatic deployments on Git push
- SSL certificates are automatic and free
- Environment variables are secure
- Monitoring helps catch issues early
- Regular testing ensures site quality
- Keep documentation updated

---

**Last Updated**: Based on current project state assessment
**Status**: Ready for deployment configuration
