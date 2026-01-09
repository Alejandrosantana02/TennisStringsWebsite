# Phase 7 Implementation Plan: Analytics & Tracking

**Status**: ⚠️ Partially Complete - Needs Enhancement

This document provides a detailed plan to verify and complete Phase 7 (Steps 7.1-7.2) from `IMPLEMENTATION_STEPS.md`.

---

## 📋 Current Status Assessment

### ✅ Already Completed
- ✅ GoogleAnalytics component exists (`src/lib/components/seo/GoogleAnalytics.svelte`)
- ✅ GoogleAnalytics component integrated in layout
- ✅ GA4 script loading (via component)
- ✅ Basic affiliate click tracking (in AffiliateButton component)

### ⚠️ Needs Implementation/Enhancement
- ❌ **Analytics utility file** (`src/lib/utils/analytics.ts`) - Missing
- ❌ **Page view tracking** - Not implemented
- ❌ **Search query tracking** - Not implemented
- ❌ **Filter usage tracking** - Not implemented
- ⚠️ **GA4 script in app.html** - Currently in component, should also be in app.html
- ⚠️ **Environment variable** - Uses `VITE_GA_MEASUREMENT_ID`, should use `PUBLIC_GA_ID`

---

## Step 7.1: Google Analytics Setup

### Verification Checklist

#### Analytics Utility File (`src/lib/utils/analytics.ts`)

**Current Implementation**: ❌ **Missing**

**Required Features**:
- [ ] Google Analytics 4 integration
- [ ] Event tracking functions
- [ ] Page view tracking
- [ ] Type-safe gtag wrapper

**Action Items**:

1. **Create Analytics Utility File** (`src/lib/utils/analytics.ts`):

```typescript
import { browser } from '$app/environment';
import { page } from '$app/stores';
import { get } from 'svelte/store';

// Type definitions for gtag
declare global {
	interface Window {
		dataLayer: any[];
		gtag: (...args: any[]) => void;
	}
}

// Check if GA is loaded
function isGALoaded(): boolean {
	return browser && typeof window !== 'undefined' && typeof window.gtag === 'function';
}

// Initialize Google Analytics (called once)
export function initGA(measurementId: string): void {
	if (!browser || !measurementId) return;

	// GA script is loaded by GoogleAnalytics component
	// This function just ensures gtag is available
	if (!isGALoaded()) {
		console.warn('Google Analytics not loaded');
		return;
	}
}

// Track page view
export function trackPageView(url?: string): void {
	if (!isGALoaded()) return;

	const pageUrl = url || (browser ? get(page).url.pathname + get(page).url.search : '/');
	
	window.gtag('config', getGAId(), {
		page_path: pageUrl,
		page_title: document.title
	});
}

// Track custom event
export function trackEvent(
	eventName: string,
	eventParams?: {
		[key: string]: string | number | boolean | undefined;
	}
): void {
	if (!isGALoaded()) return;

	window.gtag('event', eventName, eventParams || {});
}

// Track affiliate link click
export function trackAffiliateClick(vendor: string, product?: string, url?: string): void {
	trackEvent('affiliate_click', {
		vendor,
		product: product || '',
		link_url: url || '',
		event_category: 'Affiliate',
		event_label: vendor
	});
}

// Track search query
export function trackSearch(query: string, resultCount?: number): void {
	trackEvent('search', {
		search_term: query,
		result_count: resultCount || 0,
		event_category: 'Search',
		event_label: query
	});
}

// Track filter usage
export function trackFilterUsage(filterType: string, filterValue: string): void {
	trackEvent('filter_used', {
		filter_type: filterType,
		filter_value: filterValue,
		event_category: 'Filter',
		event_label: `${filterType}: ${filterValue}`
	});
}

// Track newsletter signup
export function trackNewsletterSignup(source?: string): void {
	trackEvent('newsletter_signup', {
		source: source || 'unknown',
		event_category: 'Newsletter',
		event_label: source || 'unknown'
	});
}

// Track contact form submission
export function trackContactForm(): void {
	trackEvent('contact_form_submit', {
		event_category: 'Contact',
		event_label: 'Contact Form'
	});
}

// Track content view
export function trackContentView(contentType: string, contentId: string, contentName?: string): void {
	trackEvent('content_view', {
		content_type: contentType,
		content_id: contentId,
		content_name: contentName || '',
		event_category: 'Content',
		event_label: contentType
	});
}

// Track external link click
export function trackExternalLink(url: string, linkText?: string): void {
	trackEvent('external_link_click', {
		link_url: url,
		link_text: linkText || '',
		event_category: 'External Links',
		event_label: url
	});
}

// Get GA Measurement ID from environment
function getGAId(): string {
	if (!browser) return '';
	
	// Try PUBLIC_GA_ID first (SvelteKit convention)
	const publicGAId = import.meta.env.PUBLIC_GA_ID;
	if (publicGAId) return publicGAId;
	
	// Fallback to VITE_GA_MEASUREMENT_ID
	const viteGAId = import.meta.env.VITE_GA_MEASUREMENT_ID;
	if (viteGAId) return viteGAId;
	
	return '';
}

// Track scroll depth (optional enhancement)
export function trackScrollDepth(depth: number): void {
	trackEvent('scroll_depth', {
		depth_percent: depth,
		event_category: 'Engagement',
		event_label: `${depth}%`
	});
}

// Track time on page (optional enhancement)
let pageStartTime: number | null = null;

export function startPageTimer(): void {
	if (!browser) return;
	pageStartTime = Date.now();
}

export function trackTimeOnPage(): void {
	if (!browser || !pageStartTime) return;
	
	const timeOnPage = Math.round((Date.now() - pageStartTime) / 1000); // seconds
	trackEvent('time_on_page', {
		time_seconds: timeOnPage,
		event_category: 'Engagement',
		event_label: `${timeOnPage}s`
	});
	
	pageStartTime = null;
}
```

#### GA4 Script in app.html

**Current Implementation**: ⚠️ In component only

**Action Items**:

1. **Add GA4 Script to app.html** (optional, component already handles it):

```html
<!doctype html>
<html lang="en" data-theme="tennis">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/favicon.png" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		
		<!-- Google Analytics (if not using component) -->
		<!-- Uncomment if you want to load GA directly in app.html instead of component -->
		<!--
		<script async src="https://www.googletagmanager.com/gtag/js?id=%PUBLIC_GA_ID%"></script>
		<script>
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			gtag('config', '%PUBLIC_GA_ID%');
		</script>
		-->
		
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>
```

**Note**: Since GoogleAnalytics component already exists and works, you can keep using it. The script in app.html is optional.

#### Update GoogleAnalytics Component

**Current Implementation**: ✅ Works but uses old env var

**Action Items**:

1. **Update GoogleAnalytics Component** (`src/lib/components/seo/GoogleAnalytics.svelte`):

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	import { PUBLIC_GA_ID } from '$env/static/public';

	const measurementId = PUBLIC_GA_ID;

	onMount(() => {
		// Only load GA in production
		if (dev || !measurementId) return;

		// Load Google Analytics script
		const script1 = document.createElement('script');
		script1.async = true;
		script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
		document.head.appendChild(script1);

		const script2 = document.createElement('script');
		script2.innerHTML = `
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			gtag('config', '${measurementId}');
		`;
		document.head.appendChild(script2);
	});
</script>

<!-- Google Analytics component - no visible output -->
```

2. **Update Layout** (`src/routes/+layout.svelte`):

```svelte
<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import GoogleAnalytics from '$lib/components/seo/GoogleAnalytics.svelte';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { trackPageView, startPageTimer } from '$lib/utils/analytics';

	onMount(() => {
		// Track initial page view
		trackPageView();
		startPageTimer();

		// Track page views on navigation
		const unsubscribe = page.subscribe(() => {
			trackPageView();
			startPageTimer();
		});

		return unsubscribe;
	});
</script>

<GoogleAnalytics />

<div class="min-h-screen flex flex-col">
	<Header />
	<main class="flex-grow">
		<slot />
	</main>
	<Footer />
</div>
```

#### Track Affiliate Link Clicks

**Current Implementation**: ⚠️ Basic tracking exists

**Action Items**:

1. **Update AffiliateButton Component** (`src/lib/components/affiliate/AffiliateButton.svelte`):

```svelte
<script lang="ts">
	import { trackAffiliateClick } from '$lib/utils/analytics';
	
	export let href: string;
	export let vendor: string;
	export let text: string;
	export let variant: 'primary' | 'secondary' = 'primary';
	export let product?: string;

	function handleClick() {
		trackAffiliateClick(vendor, product || text, href);
	}

	const variantClasses = {
		primary: 'btn-primary',
		secondary: 'btn-secondary'
	};
</script>

<a
	href={href}
	target="_blank"
	rel="noopener noreferrer nofollow"
	class="btn {variantClasses[variant]}"
	on:click={handleClick}
>
	{text}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-4 w-4 ml-2"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
		/>
	</svg>
</a>
```

2. **Update AffiliateLink Component** (if it exists):

```svelte
<script lang="ts">
	import { trackAffiliateClick } from '$lib/utils/analytics';
	
	export let href: string;
	export let vendor: string;
	export let product?: string;

	function handleClick() {
		trackAffiliateClick(vendor, product, href);
	}
</script>

<a
	href={href}
	target="_blank"
	rel="noopener noreferrer nofollow"
	class="link link-primary"
	on:click={handleClick}
>
	<slot />
</a>
```

#### Track Search Queries

**Action Items**:

1. **Update SearchBar Component** (`src/lib/components/search/SearchBar.svelte`):

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { trackSearch } from '$lib/utils/analytics';

	// ... existing code ...

	function handleSearch() {
		if (query.trim().length === 0) return;

		// Track search query
		trackSearch(query.trim());

		// ... rest of existing code ...
	}
</script>
```

2. **Update Search Results Page** (`src/routes/search/+page.svelte`):

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { trackSearch } from '$lib/utils/analytics';
	// ... other imports ...

	onMount(async () => {
		query = $page.url.searchParams.get('q') || '';
		if (query) {
			await performSearch(query);
			// Track search with result count
			trackSearch(query, results.total);
		} else {
			loading = false;
		}
	});

	// ... rest of code ...
</script>
```

#### Track Filter Usage

**Action Items**:

1. **Update FilterPanel Component** (when created):

```svelte
<script lang="ts">
	import { trackFilterUsage } from '$lib/utils/analytics';
	
	// ... existing code ...

	function applyFilters() {
		// Track filter usage
		if (selectedTypes.length > 0) {
			trackFilterUsage('type', selectedTypes.join(','));
		}
		if (priceRange[0] > 0 || priceRange[1] < 100) {
			trackFilterUsage('price', `${priceRange[0]}-${priceRange[1]}`);
		}
		if (comfortRange[0] > 0 || comfortRange[1] < 10) {
			trackFilterUsage('comfort', `${comfortRange[0]}-${comfortRange[1]}`);
		}

		// ... rest of existing code ...
	}
</script>
```

2. **Track Filter Usage in Listing Pages**:

```svelte
<script lang="ts">
	import { trackFilterUsage } from '$lib/utils/analytics';
	import { page } from '$app/stores';

	$: {
		const urlParams = $page.url.searchParams;
		const typeFilter = urlParams.get('type');
		if (typeFilter) {
			trackFilterUsage('type', typeFilter);
		}
		// ... other filters ...
	}
</script>
```

#### Track Newsletter Signup

**Action Items**:

1. **Update NewsletterSignup Component** (`src/lib/components/newsletter/NewsletterSignup.svelte`):

```svelte
<script lang="ts">
	import { trackNewsletterSignup } from '$lib/utils/analytics';
	
	export let source: string = 'unknown';
	
	// ... existing code ...

	async function handleSubmit() {
		// ... existing validation and submission code ...
		
		if (data.success) {
			trackNewsletterSignup(source);
			success = true;
			// ... rest of code ...
		}
	}
</script>
```

#### Track Contact Form

**Action Items**:

1. **Update Contact Page** (`src/routes/contact/+page.svelte`):

```svelte
<script lang="ts">
	import { trackContactForm } from '$lib/utils/analytics';
	
	// ... existing code ...

	async function handleSubmit() {
		// ... existing validation code ...
		
		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				trackContactForm();
				status = 'success';
				// ... rest of code ...
			}
		} catch (error) {
			// ... error handling ...
		}
	}
</script>
```

#### Track Content Views

**Action Items**:

1. **Add to Review Detail Pages** (`src/routes/reviews/[slug]/+page.svelte`):

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { trackContentView } from '$lib/utils/analytics';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(() => {
		trackContentView('string_review', data.review.id, data.review.name);
	});
</script>
```

2. **Add to Machine Detail Pages** (`src/routes/machines/[slug]/+page.svelte`):

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { trackContentView } from '$lib/utils/analytics';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(() => {
		trackContentView('machine_review', data.machine.id, data.machine.name);
	});
</script>
```

3. **Add to Article Detail Pages** (`src/routes/guides/[slug]/+page.svelte`):

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { trackContentView } from '$lib/utils/analytics';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(() => {
		trackContentView('article', data.article.id, data.article.title);
	});
</script>
```

### Testing
- [ ] Verify analytics utility functions work
- [ ] Test page view tracking
- [ ] Test affiliate click tracking
- [ ] Test search query tracking
- [ ] Test filter usage tracking
- [ ] Test newsletter signup tracking
- [ ] Test contact form tracking
- [ ] Test content view tracking
- [ ] Verify events appear in GA4 dashboard
- [ ] Test in development (should not track)

---

## Step 7.2: Google Search Console

### Verification Checklist

#### Google Search Console Setup

**Current Implementation**: ❌ **Not Implemented** (Manual process)

**Required Steps**:
- [ ] Set up Google Search Console account
- [ ] Submit sitemap
- [ ] Verify ownership
- [ ] Monitor search performance

**Action Items**:

1. **Set Up Google Search Console** (Manual Process):

**Steps**:
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add property (your domain)
3. Verify ownership using one of these methods:
   - HTML file upload
   - HTML tag (add to `app.html`)
   - Domain name provider
   - Google Analytics (if already set up)

2. **Add Verification Meta Tag to app.html** (if using HTML tag method):

```html
<!doctype html>
<html lang="en" data-theme="tennis">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/favicon.png" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		
		<!-- Google Search Console Verification -->
		<!-- Replace with your verification code from Search Console -->
		<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
		
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>
```

3. **Submit Sitemap** (After verification):

**Steps**:
1. In Google Search Console, go to "Sitemaps"
2. Enter sitemap URL: `https://yourdomain.com/sitemap.xml`
3. Click "Submit"
4. Wait for Google to process (may take a few days)

4. **Create Documentation** (`docs/SEARCH_CONSOLE_SETUP.md`):

```markdown
# Google Search Console Setup Guide

## Steps Completed
- [ ] Google Search Console account created
- [ ] Property added
- [ ] Ownership verified
- [ ] Sitemap submitted

## Verification Method Used
- [ ] HTML file upload
- [ ] HTML tag
- [ ] Domain name provider
- [ ] Google Analytics

## Sitemap URL
https://yourdomain.com/sitemap.xml

## Notes
- Sitemap submitted on: [DATE]
- Verification completed on: [DATE]
```

### Testing
- [ ] Verify ownership in Search Console
- [ ] Submit sitemap
- [ ] Check sitemap status
- [ ] Monitor indexing status
- [ ] Check search performance data

---

## Final Verification Checklist

### Analytics Setup
- [ ] Analytics utility file created
- [ ] Page view tracking works
- [ ] Event tracking functions work
- [ ] Affiliate click tracking works
- [ ] Search query tracking works
- [ ] Filter usage tracking works
- [ ] Newsletter signup tracking works
- [ ] Contact form tracking works
- [ ] Content view tracking works
- [ ] GoogleAnalytics component updated
- [ ] Environment variable configured

### Google Search Console
- [ ] Google Search Console account created
- [ ] Property added
- [ ] Ownership verified
- [ ] Sitemap submitted
- [ ] Verification meta tag added (if using HTML tag method)

### Integration
- [ ] Analytics integrated in layout
- [ ] All tracking functions used correctly
- [ ] Events appear in GA4 dashboard
- [ ] No tracking in development mode
- [ ] Performance is acceptable

---

## Implementation Commands

### Create Missing Files
```bash
# Create analytics utility file
touch src/lib/utils/analytics.ts
```

### Environment Variables
Update `.env.example`:
```env
PUBLIC_GA_ID=G-XXXXXXXXXX
```

Update Cloudflare Pages environment variables:
```
PUBLIC_GA_ID=G-XXXXXXXXXX
```

### Testing Commands
```bash
# Run dev server (should not track)
npm run dev

# Build for production
npm run build

# Check GA4 dashboard for events
# Visit: https://analytics.google.com
```

---

## Success Criteria

Phase 7 is complete when:
- ✅ Analytics utility file created
- ✅ Page view tracking works
- ✅ All event tracking functions work
- ✅ Affiliate clicks tracked
- ✅ Search queries tracked
- ✅ Filter usage tracked
- ✅ Newsletter signups tracked
- ✅ Contact forms tracked
- ✅ Content views tracked
- ✅ Google Search Console set up
- ✅ Sitemap submitted
- ✅ Events appear in GA4 dashboard

---

## Next Steps

After completing Phase 7:
1. Move to **Phase 8: Performance Optimization**
2. Monitor analytics for performance insights
3. Use Search Console data for SEO improvements

---

## Notes

- GoogleAnalytics component already exists and works
- Focus on creating analytics utility and adding tracking
- Google Search Console is a manual setup process
- Environment variable should use `PUBLIC_GA_ID` (SvelteKit convention)
- All tracking should be disabled in development mode
- Consider privacy and GDPR compliance

---

**Last Updated**: Based on current project state assessment
**Status**: Ready for analytics utility creation and tracking implementation
