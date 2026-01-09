# Phase 16 Implementation Plan: Monetization Setup

**Status**: ⚠️ Partially Complete - Needs Implementation

This document provides a detailed plan to verify and complete Phase 16 (Steps 16.1-16.2) from `IMPLEMENTATION_STEPS.md`.

---

## 📋 Current Status Assessment

### ✅ Already Completed
- ✅ AffiliateButton component exists
- ✅ Affiliate links structure in data files
- ✅ Affiliate disclosure in Footer
- ✅ Basic affiliate link tracking

### ⚠️ Needs Implementation
- ❌ **Google AdSense** - Not set up
- ❌ **AdSense components** - Not created
- ❌ **AdSense script** - Not added to app.html
- ⚠️ **Affiliate programs** - Not signed up
- ⚠️ **Affiliate IDs** - Not configured

---

## Step 16.1: Google AdSense

### Verification Checklist

#### Google AdSense Account Application

**Current Implementation**: ❌ **Not Applied**

**Action Items**:

1. **Apply for Google AdSense Account**:

**Prerequisites**:
- [ ] Site is live and accessible
- [ ] Site has original, quality content
- [ ] Site has privacy policy
- [ ] Site has about/contact pages
- [ ] Site has sufficient content (10+ pages recommended)
- [ ] Site follows AdSense policies

**Application Steps**:
1. Go to [Google AdSense](https://www.google.com/adsense/)
2. Sign in with Google account
3. Click **Get Started**
4. Enter your website URL
5. Select your country/region
6. Choose payment method
7. Submit application

**Application Requirements**:
- Website URL
- Country/region
- Payment information
- Tax information (if applicable)

**Approval Process**:
- Review typically takes 1-2 weeks
- Google checks content quality
- Google checks policy compliance
- May require site improvements

2. **Add AdSense Script to app.html**:

**After Approval**:

```html
<!doctype html>
<html lang="en" data-theme="tennis">
	<head>
		<meta charset="utf-8" />
		<link rel="icon" href="%sveltekit.assets%/favicon.png" />
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		
		<!-- Google AdSense -->
		<script 
			async 
			src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
			crossorigin="anonymous"
		></script>
		
		%sveltekit.head%
	</head>
	<body data-sveltekit-preload-data="hover">
		<div style="display: contents">%sveltekit.body%</div>
	</body>
</html>
```

**Note**: Replace `ca-pub-XXXXXXXXXX` with your actual AdSense publisher ID.

3. **Create AdSense Component** (`src/lib/components/ads/AdSense.svelte`):

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { PUBLIC_ADSENSE_PUBLISHER_ID } from '$env/static/public';

	export let adSlot: string;
	export let adFormat: string = 'auto';
	export let adStyle: string = 'display:block';
	export let fullWidthResponsive: boolean = true;

	let adElement: HTMLElement;
	let adLoaded = false;

	onMount(() => {
		if (!browser || !PUBLIC_ADSENSE_PUBLISHER_ID) return;

		// Wait for AdSense script to load
		const checkAdSense = setInterval(() => {
			if ((window as any).adsbygoogle && !adLoaded) {
				try {
					((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
					adLoaded = true;
					clearInterval(checkAdSense);
				} catch (e) {
					console.error('AdSense error:', e);
				}
			}
		}, 100);

		// Cleanup after 10 seconds
		setTimeout(() => {
			clearInterval(checkAdSense);
		}, 10000);
	});
</script>

{#if PUBLIC_ADSENSE_PUBLISHER_ID}
	<div class="ads-container my-4 flex justify-center">
		<ins
			bind:this={adElement}
			class="adsbygoogle"
			style={adStyle}
			data-ad-client={PUBLIC_ADSENSE_PUBLISHER_ID}
			data-ad-slot={adSlot}
			data-ad-format={adFormat}
			data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
		></ins>
	</div>
{/if}

<style>
	.ads-container {
		min-height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.adsbygoogle {
		display: block;
	}
</style>
```

4. **Create AdPlacement Component** (`src/lib/components/ads/AdPlacement.svelte`):

```svelte
<script lang="ts">
	import AdSense from './AdSense.svelte';

	export let position: 'header' | 'sidebar' | 'in-content' | 'footer';
	export let adSlot: string;
	export let showOnMobile: boolean = true;
	export let showOnDesktop: boolean = true;

	const positionClasses = {
		header: 'w-full mb-4',
		sidebar: 'sticky top-20',
		'in-content': 'w-full my-8',
		footer: 'w-full mt-8 sticky bottom-0 bg-base-100 z-40'
	};

	const mobileClasses = showOnMobile ? '' : 'hidden md:block';
	const desktopClasses = showOnDesktop ? '' : 'md:hidden';
</script>

<div class="{positionClasses[position]} {mobileClasses} {desktopClasses}">
	<AdSense {adSlot} />
</div>
```

5. **Place Ad Units Strategically**:

**Header Banner** (`src/lib/components/layout/Header.svelte`):

```svelte
<script lang="ts">
	import AdPlacement from '../ads/AdPlacement.svelte';
	// ... existing imports ...
</script>

<header class="sticky top-0 z-50 bg-base-100 shadow-md">
	<!-- Header Banner Ad -->
	<div class="hidden md:block">
		<AdPlacement position="header" adSlot="YOUR_HEADER_AD_SLOT" showOnMobile={false} />
	</div>
	
	<!-- ... existing header content ... -->
</header>
```

**Sidebar Ads** (`src/routes/reviews/+page.svelte` or similar):

```svelte
<script lang="ts">
	import AdPlacement from '$lib/components/ads/AdPlacement.svelte';
	// ... existing imports ...
</script>

<div class="container mx-auto px-4 py-8">
	<div class="grid grid-cols-1 lg:grid-cols-4 gap-8">
		<!-- Main Content -->
		<div class="lg:col-span-3">
			<!-- Reviews content -->
		</div>
		
		<!-- Sidebar -->
		<aside class="lg:col-span-1">
			<AdPlacement position="sidebar" adSlot="YOUR_SIDEBAR_AD_SLOT" showOnMobile={false} />
		</aside>
	</div>
</div>
```

**In-Content Ads** (`src/lib/components/articles/ArticleContent.svelte`):

```svelte
<script lang="ts">
	import AdPlacement from '../ads/AdPlacement.svelte';
	// ... existing imports ...
	
	let paragraphCount = 0;
	
	$: {
		// Count paragraphs in content
		const paragraphs = article.content.split('\n\n').filter(p => p.trim().length > 0);
		paragraphCount = paragraphs.length;
	}
</script>

<div class="prose max-w-none">
	{#each article.content.split('\n\n') as paragraph, index}
		<p>{paragraph}</p>
		
		<!-- Show ad after 2nd paragraph -->
		{#if index === 1 && paragraphCount > 3}
			<AdPlacement position="in-content" adSlot="YOUR_IN_CONTENT_AD_SLOT" />
		{/if}
	{/each}
</div>
```

**Sticky Footer (Mobile)** (`src/routes/+layout.svelte`):

```svelte
<script lang="ts">
	import AdPlacement from '$lib/components/ads/AdPlacement.svelte';
	// ... existing imports ...
</script>

<div class="min-h-screen flex flex-col">
	<Header />
	<main class="flex-grow">
		<slot />
	</main>
	<Footer />
	
	<!-- Sticky Footer Ad (Mobile Only) -->
	<div class="md:hidden">
		<AdPlacement position="footer" adSlot="YOUR_FOOTER_AD_SLOT" showOnDesktop={false} />
	</div>
</div>
```

6. **Create Ad Configuration** (`src/lib/config/ads.ts`):

```typescript
export const adSlots = {
	header: import.meta.env.PUBLIC_ADSENSE_HEADER_SLOT || '',
	sidebar: import.meta.env.PUBLIC_ADSENSE_SIDEBAR_SLOT || '',
	inContent: import.meta.env.PUBLIC_ADSENSE_IN_CONTENT_SLOT || '',
	footer: import.meta.env.PUBLIC_ADSENSE_FOOTER_SLOT || ''
};

export const adConfig = {
	enabled: import.meta.env.PUBLIC_ADSENSE_PUBLISHER_ID ? true : false,
	publisherId: import.meta.env.PUBLIC_ADSENSE_PUBLISHER_ID || ''
};
```

7. **Update Environment Variables**:

**`.env.example`**:
```env
# Google AdSense
PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXX
PUBLIC_ADSENSE_HEADER_SLOT=1234567890
PUBLIC_ADSENSE_SIDEBAR_SLOT=1234567891
PUBLIC_ADSENSE_IN_CONTENT_SLOT=1234567892
PUBLIC_ADSENSE_FOOTER_SLOT=1234567893
```

**Cloudflare Pages Environment Variables**:
- `PUBLIC_ADSENSE_PUBLISHER_ID`
- `PUBLIC_ADSENSE_HEADER_SLOT`
- `PUBLIC_ADSENSE_SIDEBAR_SLOT`
- `PUBLIC_ADSENSE_IN_CONTENT_SLOT`
- `PUBLIC_ADSENSE_FOOTER_SLOT`

### Testing
- [ ] AdSense account applied for
- [ ] AdSense approved
- [ ] AdSense script added to app.html
- [ ] AdSense component created
- [ ] AdPlacement component created
- [ ] Ads placed in all positions
- [ ] Ads display correctly
- [ ] Ads are responsive
- [ ] No layout shift from ads
- [ ] Ads work on mobile

---

## Step 16.2: Affiliate Programs

### Verification Checklist

#### Amazon Associates

**Current Implementation**: ⚠️ **Not Signed Up**

**Action Items**:

1. **Sign Up for Amazon Associates**:

**Steps**:
1. Go to [Amazon Associates](https://affiliate-program.amazon.com/)
2. Click **Join Now for Free**
3. Sign in with Amazon account
4. Complete application:
   - Website information
   - Website content description
   - Payment information
   - Tax information
5. Submit application

**Requirements**:
- Active website
- Original content
- Privacy policy
- About page
- Contact information

**Approval Process**:
- Usually approved within 24-48 hours
- May require site improvements
- Must have sales within 180 days to stay active

2. **Get Amazon Associate ID**:

**After Approval**:
1. Log in to Amazon Associates
2. Go to **Account Settings**
3. Find your **Associate ID** (e.g., `yourname-20`)
4. Copy the ID

3. **Configure Amazon Associate ID**:

**Environment Variables**:
- `PUBLIC_AMAZON_ASSOCIATE_ID` - Your Associate ID
- `PUBLIC_AMAZON_TAG` - Optional tracking tag

**Update Affiliate Utility** (if created in Phase 9):
- Use Associate ID in link generation
- Add to affiliate link generator

#### Tennis Warehouse Affiliate Program

**Action Items**:

1. **Sign Up for Tennis Warehouse Affiliate Program**:

**Steps**:
1. Go to Tennis Warehouse website
2. Look for "Affiliate Program" or "Partners" link
3. Or contact Tennis Warehouse directly
4. Complete application
5. Get affiliate ID

**Note**: Tennis Warehouse may use different affiliate networks (Commission Junction, Impact Radius, etc.)

2. **Configure Tennis Warehouse Affiliate ID**:

**Environment Variables**:
- `PUBLIC_TENNIS_WAREHOUSE_ID` - Affiliate ID

#### Dick's Sporting Goods Affiliate Program

**Action Items**:

1. **Sign Up for Dick's Affiliate Program**:

**Steps**:
1. Go to Dick's Sporting Goods website
2. Look for "Affiliate Program" or "Partners" link
3. Or search for "Dick's Sporting Goods affiliate program"
4. May use affiliate networks like:
   - Commission Junction
   - Impact Radius
   - Rakuten Advertising
5. Complete application
6. Get affiliate ID

2. **Configure Dick's Affiliate ID**:

**Environment Variables**:
- `PUBLIC_DICKS_ID` - Affiliate ID

#### Add Affiliate IDs to Configuration

**Action Items**:

1. **Update Environment Variables**:

**`.env.example`**:
```env
# Affiliate Programs
PUBLIC_AMAZON_ASSOCIATE_ID=yourname-20
PUBLIC_AMAZON_TAG=your-tag
PUBLIC_TENNIS_WAREHOUSE_ID=your-tennis-warehouse-id
PUBLIC_DICKS_ID=your-dicks-id
```

**Cloudflare Pages Environment Variables**:
- `PUBLIC_AMAZON_ASSOCIATE_ID`
- `PUBLIC_AMAZON_TAG` (optional)
- `PUBLIC_TENNIS_WAREHOUSE_ID`
- `PUBLIC_DICKS_ID`

2. **Update Affiliate Utility** (`src/lib/utils/affiliate.ts` - if created):

```typescript
// Use environment variables
const config = {
	amazon: {
		associateId: import.meta.env.PUBLIC_AMAZON_ASSOCIATE_ID || '',
		tag: import.meta.env.PUBLIC_AMAZON_TAG || ''
	},
	tennisWarehouse: {
		affiliateId: import.meta.env.PUBLIC_TENNIS_WAREHOUSE_ID || ''
	},
	dicks: {
		affiliateId: import.meta.env.PUBLIC_DICKS_ID || ''
	}
};
```

3. **Test Affiliate Links**:

**Test Procedure**:
1. Generate affiliate link
2. Click link
3. Verify affiliate ID is in URL
4. Verify tracking works
5. Test on production

### Testing
- [ ] Amazon Associates account created
- [ ] Amazon Associate ID obtained
- [ ] Tennis Warehouse affiliate account created
- [ ] Tennis Warehouse affiliate ID obtained
- [ ] Dick's affiliate account created
- [ ] Dick's affiliate ID obtained
- [ ] All affiliate IDs configured
- [ ] Affiliate links work correctly
- [ ] Affiliate tracking works

---

## Final Verification Checklist

### Google AdSense
- [ ] AdSense account applied for
- [ ] AdSense approved
- [ ] AdSense script added
- [ ] AdSense component created
- [ ] AdPlacement component created
- [ ] Ads placed strategically
- [ ] Ads display correctly
- [ ] Ads are responsive

### Affiliate Programs
- [ ] Amazon Associates signed up
- [ ] Tennis Warehouse signed up
- [ ] Dick's signed up
- [ ] All affiliate IDs configured
- [ ] Affiliate links work
- [ ] Affiliate tracking works

---

## Implementation Commands

### Create Ad Components
```bash
# Create ads directory
mkdir -p src/lib/components/ads

# Create components
touch src/lib/components/ads/AdSense.svelte
touch src/lib/components/ads/AdPlacement.svelte
```

### Environment Variables
Update `.env.example` and Cloudflare Pages:
```env
PUBLIC_ADSENSE_PUBLISHER_ID=ca-pub-XXXXXXXXXX
PUBLIC_ADSENSE_HEADER_SLOT=1234567890
PUBLIC_ADSENSE_SIDEBAR_SLOT=1234567891
PUBLIC_ADSENSE_IN_CONTENT_SLOT=1234567892
PUBLIC_ADSENSE_FOOTER_SLOT=1234567893
PUBLIC_AMAZON_ASSOCIATE_ID=yourname-20
PUBLIC_TENNIS_WAREHOUSE_ID=your-id
PUBLIC_DICKS_ID=your-id
```

---

## Success Criteria

Phase 16 is complete when:
- ✅ AdSense account applied for
- ✅ AdSense approved and active
- ✅ Ads placed strategically
- ✅ Amazon Associates signed up
- ✅ Tennis Warehouse signed up
- ✅ Dick's signed up
- ✅ All affiliate IDs configured
- ✅ Affiliate links work correctly

---

## Next Steps

After completing Phase 16:
1. Monitor ad performance
2. Monitor affiliate performance
3. Optimize ad placement
4. A/B test ad positions
5. Plan Phase 17: Ongoing Maintenance

---

## Notes

- AdSense approval can take 1-2 weeks
- Need quality content for AdSense approval
- Affiliate programs may have different approval times
- Test affiliate links before going live
- Monitor ad performance regularly
- Follow AdSense policies strictly
- Disclose affiliate relationships (FTC requirement)

---

**Last Updated**: Based on current project state assessment
**Status**: Ready for monetization setup
