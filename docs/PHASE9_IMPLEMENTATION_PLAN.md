# Phase 9 Implementation Plan: Affiliate Link Management

**Status**: ⚠️ Partially Complete - Needs Enhancement

This document provides a detailed plan to verify and complete Phase 9 (Steps 9.1-9.2) from `IMPLEMENTATION_STEPS.md`.

---

## 📋 Current Status Assessment

### ✅ Already Completed
- ✅ AffiliateButton component exists (`src/lib/components/affiliate/AffiliateButton.svelte`)
- ✅ Basic affiliate click tracking (inline gtag calls)
- ✅ AffiliateLinks interface defined in types
- ✅ Affiliate links stored in data files
- ✅ Affiliate disclosure in Footer component
- ✅ Affiliate disclosure in About page

### ⚠️ Needs Implementation/Enhancement
- ❌ **Affiliate utility file** (`src/lib/utils/affiliate.ts`) - Missing
- ❌ **AffiliateLink component** (for inline links) - Missing
- ⚠️ **Affiliate link generator** - Not centralized
- ⚠️ **Link validation** - Not implemented
- ⚠️ **Affiliate disclosure component** - Exists in Footer but not reusable
- ⚠️ **FTC compliance** - Basic disclosure exists, needs verification

---

## Step 9.1: Affiliate Link System

### Verification Checklist

#### Affiliate Utility File (`src/lib/utils/affiliate.ts`)

**Current Implementation**: ❌ **Missing**

**Required Features**:
- [ ] Affiliate link generator
- [ ] Click tracking wrapper
- [ ] Link validation
- [ ] Vendor-specific link formatting
- [ ] Affiliate ID management

**Action Items**:

1. **Create Affiliate Utility File** (`src/lib/utils/affiliate.ts`):

```typescript
import { browser } from '$app/environment';
import { trackAffiliateClick } from './analytics';

export type AffiliateVendor = 'amazon' | 'tennisWarehouse' | 'dicks';

export interface AffiliateConfig {
	amazon?: {
		associateId: string;
		tag?: string; // Optional tracking tag
	};
	tennisWarehouse?: {
		affiliateId: string;
	};
	dicks?: {
		affiliateId: string;
	};
}

// Get affiliate configuration from environment variables
function getAffiliateConfig(): AffiliateConfig {
	if (!browser) return {};

	return {
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
}

// Validate URL format
export function validateAffiliateLink(url: string): boolean {
	if (!url || typeof url !== 'string') return false;
	
	try {
		const urlObj = new URL(url);
		return ['http:', 'https:'].includes(urlObj.protocol);
	} catch {
		return false;
	}
}

// Generate affiliate link with tracking parameters
export function generateAffiliateLink(
	baseUrl: string,
	vendor: AffiliateVendor,
	productName?: string,
	productId?: string
): string {
	if (!validateAffiliateLink(baseUrl)) {
		console.warn(`Invalid affiliate link: ${baseUrl}`);
		return baseUrl;
	}

	const config = getAffiliateConfig();
	const url = new URL(baseUrl);

	switch (vendor) {
		case 'amazon': {
			if (config.amazon?.associateId) {
				// Amazon Associates link format
				// https://amazon.com/dp/PRODUCT_ID?tag=ASSOCIATE_ID
				if (!url.searchParams.has('tag')) {
					url.searchParams.set('tag', config.amazon.associateId);
				}
				if (config.amazon.tag && !url.searchParams.has('linkCode')) {
					url.searchParams.set('linkCode', config.amazon.tag);
				}
				// Add tracking parameters
				if (productName) {
					url.searchParams.set('ref', `as_li_tl?ie=UTF8&camp=1789&creative=9325&creativeASIN=${productId || ''}&linkCode=as2&tag=${config.amazon.associateId}&linkId=`);
				}
			}
			break;
		}
		case 'tennisWarehouse': {
			if (config.tennisWarehouse?.affiliateId) {
				// Tennis Warehouse affiliate link format
				// Add affiliate ID as query parameter or path
				if (!url.searchParams.has('aff')) {
					url.searchParams.set('aff', config.tennisWarehouse.affiliateId);
				}
			}
			break;
		}
		case 'dicks': {
			if (config.dicks?.affiliateId) {
				// Dick's Sporting Goods affiliate link format
				// Add affiliate ID as query parameter
				if (!url.searchParams.has('aff')) {
					url.searchParams.set('aff', config.dicks.affiliateId);
				}
			}
			break;
		}
	}

	return url.toString();
}

// Track affiliate click and return formatted link
export function getTrackedAffiliateLink(
	baseUrl: string,
	vendor: AffiliateVendor,
	productName?: string,
	productId?: string
): string {
	const affiliateLink = generateAffiliateLink(baseUrl, vendor, productName, productId);
	
	// Track click (will be called when link is clicked)
	// Actual tracking happens in component onClick handler
	
	return affiliateLink;
}

// Check if URL is an affiliate link
export function isAffiliateLink(url: string, vendor?: AffiliateVendor): boolean {
	if (!validateAffiliateLink(url)) return false;

	try {
		const urlObj = new URL(url);
		const hostname = urlObj.hostname.toLowerCase();

		if (vendor) {
			switch (vendor) {
				case 'amazon':
					return hostname.includes('amazon.com') || hostname.includes('amzn.to');
				case 'tennisWarehouse':
					return hostname.includes('tennis-warehouse.com') || hostname.includes('tenniswarehouse.com');
				case 'dicks':
					return hostname.includes('dickssportinggoods.com') || hostname.includes('dicks.com');
			}
		}

		// Check all vendors
		return (
			hostname.includes('amazon.com') ||
			hostname.includes('amzn.to') ||
			hostname.includes('tennis-warehouse.com') ||
			hostname.includes('tenniswarehouse.com') ||
			hostname.includes('dickssportinggoods.com') ||
			hostname.includes('dicks.com')
		);
	} catch {
		return false;
	}
}

// Get vendor from URL
export function getVendorFromUrl(url: string): AffiliateVendor | null {
	if (!validateAffiliateLink(url)) return null;

	try {
		const urlObj = new URL(url);
		const hostname = urlObj.hostname.toLowerCase();

		if (hostname.includes('amazon.com') || hostname.includes('amzn.to')) {
			return 'amazon';
		}
		if (hostname.includes('tennis-warehouse.com') || hostname.includes('tenniswarehouse.com')) {
			return 'tennisWarehouse';
		}
		if (hostname.includes('dickssportinggoods.com') || hostname.includes('dicks.com')) {
			return 'dicks';
		}
	} catch {
		return null;
	}

	return null;
}

// Format vendor name for display
export function formatVendorName(vendor: AffiliateVendor): string {
	const names: Record<AffiliateVendor, string> = {
		amazon: 'Amazon',
		tennisWarehouse: 'Tennis Warehouse',
		dicks: "Dick's Sporting Goods"
	};
	return names[vendor] || vendor;
}
```

2. **Update Environment Variables** (`.env.example`):

```env
# Affiliate Program IDs
PUBLIC_AMAZON_ASSOCIATE_ID=your_amazon_associate_id
PUBLIC_AMAZON_TAG=your_amazon_tag
PUBLIC_TENNIS_WAREHOUSE_ID=your_tennis_warehouse_id
PUBLIC_DICKS_ID=your_dicks_id
```

3. **Create Affiliate Link Data Structure** (Optional - for centralized management):

**Option A: Keep in data files** (Current approach - simpler):
- Affiliate links stored directly in review/machine data
- Pros: Simple, easy to manage per item
- Cons: No centralized validation

**Option B: Centralized affiliate link mapping** (`src/lib/data/affiliate-links.json`):

```json
{
	"products": {
		"babolat-rpm-blast": {
			"amazon": "https://amazon.com/dp/B00EXAMPLE",
			"tennisWarehouse": "https://tennis-warehouse.com/example",
			"dicks": "https://dicks.com/example"
		}
	}
}
```

**Recommendation**: Keep current approach (Option A) for MVP, consider Option B for production.

4. **Update AffiliateButton Component** (`src/lib/components/affiliate/AffiliateButton.svelte`):

```svelte
<script lang="ts">
	import { getTrackedAffiliateLink, formatVendorName, type AffiliateVendor } from '$lib/utils/affiliate';
	import { trackAffiliateClick } from '$lib/utils/analytics';

	export let href: string;
	export let vendor: AffiliateVendor;
	export let text: string;
	export let variant: 'primary' | 'secondary' = 'primary';
	export let productName?: string;
	export let productId?: string;

	// Generate affiliate link with tracking parameters
	$: affiliateLink = getTrackedAffiliateLink(href, vendor, productName, productId);
	$: vendorName = formatVendorName(vendor);

	function handleClick() {
		trackAffiliateClick(vendor, productName || text, affiliateLink);
	}

	const variantClasses = {
		primary: 'btn-primary',
		secondary: 'btn-secondary'
	};
</script>

<a
	href={affiliateLink}
	target="_blank"
	rel="noopener noreferrer nofollow"
	class="btn {variantClasses[variant]}"
	on:click={handleClick}
	aria-label="Buy {text} on {vendorName} (affiliate link)"
>
	{text}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-4 w-4 ml-2"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
		aria-hidden="true"
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

5. **Create AffiliateLink Component** (`src/lib/components/affiliate/AffiliateLink.svelte`):

```svelte
<script lang="ts">
	import { getTrackedAffiliateLink, getVendorFromUrl, formatVendorName, type AffiliateVendor } from '$lib/utils/affiliate';
	import { trackAffiliateClick } from '$lib/utils/analytics';

	export let href: string;
	export let vendor?: AffiliateVendor;
	export let showDisclosure: boolean = false;
	export let productName?: string;
	export let productId?: string;

	// Auto-detect vendor if not provided
	$: detectedVendor = vendor || getVendorFromUrl(href);
	$: vendorName = detectedVendor ? formatVendorName(detectedVendor) : '';
	$: affiliateLink = detectedVendor 
		? getTrackedAffiliateLink(href, detectedVendor, productName, productId)
		: href;

	function handleClick() {
		if (detectedVendor) {
			trackAffiliateClick(detectedVendor, productName || 'inline_link', affiliateLink);
		}
	}
</script>

<span class="inline-flex items-center gap-1">
	<a
		href={affiliateLink}
		target="_blank"
		rel="noopener noreferrer nofollow"
		class="link link-primary"
		on:click={handleClick}
		aria-label="{showDisclosure ? 'Affiliate link' : ''}"
	>
		<slot />
	</a>
	{#if showDisclosure && detectedVendor}
		<span 
			class="text-xs text-base-content/60" 
			title="This is an affiliate link to {vendorName}"
			aria-label="Affiliate link"
		>
			*
		</span>
	{/if}
</span>
```

### Testing
- [ ] Test affiliate link generation
- [ ] Test link validation
- [ ] Test vendor detection
- [ ] Test affiliate ID injection
- [ ] Test click tracking
- [ ] Verify links work correctly
- [ ] Test with different vendors

---

## Step 9.2: Affiliate Disclosure

### Verification Checklist

#### Affiliate Disclosure Component

**Current Implementation**: ⚠️ Basic (in Footer)

**Required Features**:
- [ ] Reusable affiliate disclosure component
- [ ] Display on all pages with affiliate links
- [ ] FTC compliance
- [ ] Multiple display options (footer, inline, modal)

**Action Items**:

1. **Create Affiliate Disclosure Component** (`src/lib/components/affiliate/AffiliateDisclosure.svelte`):

```svelte
<script lang="ts">
	export let variant: 'footer' | 'inline' | 'banner' | 'modal' = 'footer';
	export let showCloseButton: boolean = false;
	
	let dismissed = false;
	
	// Check if user has dismissed disclosure (stored in localStorage)
	if (typeof window !== 'undefined') {
		const stored = localStorage.getItem('affiliateDisclosureDismissed');
		dismissed = stored === 'true';
	}
	
	function handleDismiss() {
		dismissed = true;
		if (typeof window !== 'undefined') {
			localStorage.setItem('affiliateDisclosureDismissed', 'true');
		}
	}
</script>

{#if !dismissed || variant === 'footer'}
	{#if variant === 'footer'}
		<div class="mt-8 pt-8 border-t border-base-300">
			<p class="text-sm text-base-content/70">
				<strong>Affiliate Disclosure:</strong> This site contains affiliate links. 
				We may earn a commission from purchases made through these links at no additional cost to you. 
				This helps us continue to provide free, high-quality content and reviews. 
				We only recommend products we genuinely believe in.
			</p>
		</div>
	{:else if variant === 'inline'}
		<div class="alert alert-info my-4">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
			</svg>
			<div>
				<h3 class="font-bold">Affiliate Disclosure</h3>
				<div class="text-xs">
					This post contains affiliate links. If you make a purchase through these links, 
					we may earn a commission at no extra cost to you.
				</div>
			</div>
			{#if showCloseButton}
				<button class="btn btn-sm btn-ghost" on:click={handleDismiss}>×</button>
			{/if}
		</div>
	{:else if variant === 'banner'}
		<div class="alert alert-warning sticky top-0 z-50 rounded-none shadow-lg">
			<div class="flex-1">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
				</svg>
				<span class="text-sm">
					<strong>Affiliate Disclosure:</strong> This site contains affiliate links. 
					We may earn a commission from purchases made through these links.
				</span>
			</div>
			{#if showCloseButton}
				<button class="btn btn-sm btn-ghost" on:click={handleDismiss}>×</button>
			{/if}
		</div>
	{:else if variant === 'modal'}
		<!-- Modal disclosure (shown once) -->
		{#if !dismissed}
			<div class="modal modal-open">
				<div class="modal-box">
					<h3 class="font-bold text-lg mb-4">Affiliate Disclosure</h3>
					<p class="py-4">
						This website contains affiliate links. When you click on an affiliate link and make a purchase, 
						we may receive a commission at no additional cost to you. This helps us continue to provide 
						free, high-quality content and reviews.
					</p>
					<p class="py-2 text-sm text-base-content/70">
						We only recommend products we genuinely believe in and have tested ourselves. 
						Your support through affiliate links helps us maintain this site and continue providing 
						valuable information to the tennis community.
					</p>
					<div class="modal-action">
						<button class="btn btn-primary" on:click={handleDismiss}>I Understand</button>
					</div>
				</div>
			</div>
		{/if}
	{/if}
{/if}
```

2. **Update Footer to Use Component** (`src/lib/components/layout/Footer.svelte`):

```svelte
<script lang="ts">
	import NewsletterSignup from '../newsletter/NewsletterSignup.svelte';
	import AffiliateDisclosure from '../affiliate/AffiliateDisclosure.svelte';
</script>

<footer class="footer footer-center bg-base-200 text-base-content p-10">
	<!-- ... existing footer content ... -->

	<!-- Affiliate Disclosure -->
	<AffiliateDisclosure variant="footer" />
</footer>
```

3. **Add Disclosure to Pages with Affiliate Links**:

**In Review Detail Pages** (`src/routes/reviews/[slug]/+page.svelte`):

```svelte
<script lang="ts">
	import AffiliateDisclosure from '$lib/components/affiliate/AffiliateDisclosure.svelte';
	// ... other imports ...
</script>

<!-- Add before affiliate links section -->
<AffiliateDisclosure variant="inline" />
```

**In Machine Detail Pages** (`src/routes/machines/[slug]/+page.svelte`):

```svelte
<script lang="ts">
	import AffiliateDisclosure from '$lib/components/affiliate/AffiliateDisclosure.svelte';
	// ... other imports ...
</script>

<!-- Add before affiliate links section -->
<AffiliateDisclosure variant="inline" />
```

4. **Create Utility to Check if Page Has Affiliate Links** (`src/lib/utils/affiliate.ts`):

```typescript
// Check if content has affiliate links
export function hasAffiliateLinks(affiliateLinks: {
	amazon?: string;
	tennisWarehouse?: string;
	dicks?: string;
}): boolean {
	return !!(
		affiliateLinks.amazon ||
		affiliateLinks.tennisWarehouse ||
		affiliateLinks.dicks
	);
}
```

5. **FTC Compliance Checklist**:

**FTC Requirements**:
- [x] Clear and conspicuous disclosure
- [x] Disclosure near affiliate links
- [x] Disclosure in footer
- [x] Disclosure on pages with affiliate links
- [ ] Disclosure in article content (if affiliate links in text)
- [ ] Disclosure language is clear and understandable

**FTC-Compliant Disclosure Text**:

```markdown
**Affiliate Disclosure:** This post contains affiliate links. 
If you make a purchase through these links, we may earn a commission 
at no additional cost to you. This helps us continue to provide free, 
high-quality content. We only recommend products we genuinely believe in.
```

**Best Practices**:
- Disclosure should be visible (not hidden)
- Disclosure should be near affiliate links
- Disclosure should use clear language
- Disclosure should be on every page with affiliate links
- Disclosure should be in footer (site-wide)

### Testing
- [ ] Test affiliate disclosure component
- [ ] Verify disclosure appears on pages with affiliate links
- [ ] Test different disclosure variants
- [ ] Verify FTC compliance
- [ ] Test dismissal functionality
- [ ] Verify disclosure is visible and clear
- [ ] Test on mobile devices

---

## Final Verification Checklist

### Affiliate Link System
- [ ] Affiliate utility file created
- [ ] Affiliate link generator works
- [ ] Link validation works
- [ ] Vendor detection works
- [ ] Affiliate ID injection works
- [ ] Click tracking works
- [ ] AffiliateButton component updated
- [ ] AffiliateLink component created

### Affiliate Disclosure
- [ ] AffiliateDisclosure component created
- [ ] Disclosure in footer
- [ ] Disclosure on review pages
- [ ] Disclosure on machine pages
- [ ] Disclosure variants work
- [ ] FTC compliance verified
- [ ] Disclosure is clear and visible

### Integration
- [ ] All affiliate links use utility functions
- [ ] All affiliate links track clicks
- [ ] Disclosure appears appropriately
- [ ] Environment variables configured
- [ ] Links work correctly
- [ ] No broken affiliate links

---

## Implementation Commands

### Create Missing Files
```bash
# Create affiliate utility file
touch src/lib/utils/affiliate.ts

# Create AffiliateLink component
touch src/lib/components/affiliate/AffiliateLink.svelte

# Create AffiliateDisclosure component
touch src/lib/components/affiliate/AffiliateDisclosure.svelte
```

### Environment Variables
Update `.env.example`:
```env
PUBLIC_AMAZON_ASSOCIATE_ID=your_amazon_associate_id
PUBLIC_AMAZON_TAG=your_amazon_tag
PUBLIC_TENNIS_WAREHOUSE_ID=your_tennis_warehouse_id
PUBLIC_DICKS_ID=your_dicks_id
```

### Testing Commands
```bash
# Test affiliate link generation
# Create test file or use browser console

# Verify links work
# Click affiliate links and verify tracking

# Check disclosure visibility
# Visit pages with affiliate links
```

---

## Success Criteria

Phase 9 is complete when:
- ✅ Affiliate utility file created
- ✅ Affiliate link generator works
- ✅ Link validation works
- ✅ AffiliateButton component updated
- ✅ AffiliateLink component created
- ✅ AffiliateDisclosure component created
- ✅ Disclosure on all pages with affiliate links
- ✅ FTC compliance verified
- ✅ Click tracking works
- ✅ Environment variables configured

---

## Next Steps

After completing Phase 9:
1. Move to **Phase 10: Newsletter Integration**
2. Test affiliate link performance
3. Monitor affiliate conversions

---

## Notes

- AffiliateButton component already exists
- Focus on creating utility file and AffiliateLink component
- Affiliate disclosure is critical for FTC compliance
- Environment variables allow easy affiliate ID management
- Centralized affiliate link generation improves maintainability
- Link validation prevents broken links

---

**Last Updated**: Based on current project state assessment
**Status**: Ready for affiliate utility creation and disclosure component
