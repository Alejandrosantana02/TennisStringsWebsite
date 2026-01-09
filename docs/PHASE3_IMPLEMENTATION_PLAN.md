# Phase 3 Implementation Plan: Core Components

**Status**: ✅ Mostly Complete - 4 Components Missing

This document provides a detailed plan to verify and complete Phase 3 (Steps 3.1-3.7) from `IMPLEMENTATION_STEPS.md`.

---

## 📋 Current Status Assessment

### ✅ Already Completed
- ✅ **Step 3.1**: All Layout Components (Header, Footer, Navbar)
- ✅ **Step 3.2**: All Review Components (RatingStars, StringReviewCard, StringReviewDetail, ComparisonTable)
- ✅ **Step 3.3**: All Machine Components (MachineCard, MachineDetail)
- ✅ **Step 3.4**: All Article Components (ArticleCard, ArticleContent)
- ✅ **Step 3.5**: SearchBar component
- ✅ **Step 3.6**: AffiliateButton component

### ⚠️ Missing Components
- ❌ **Step 3.5**: FilterPanel component
- ❌ **Step 3.6**: AffiliateLink component (wrapper for inline links)
- ❌ **Step 3.7**: AdSense component
- ❌ **Step 3.7**: AdPlacement component

---

## Step 3.1: Layout Components

### Verification Checklist

#### Header Component (`src/lib/components/layout/Header.svelte`)

**Current Implementation**: ✅ Complete

**Required Features Check**:
- [x] Logo/brand name ("Tennis Strings")
- [x] Sticky navigation bar (`sticky top-0 z-50`)
- [x] Search bar with autocomplete (integrated SearchBar component)
- [x] Mobile hamburger menu
- [x] Responsive design
- [x] DaisyUI navbar component

**Status**: ✅ **Complete** - All features implemented

**Optional Enhancements**:
- [ ] Add logo image instead of text
- [ ] Add user account menu (if authentication added)
- [ ] Add shopping cart icon (if e-commerce added)

#### Footer Component (`src/lib/components/layout/Footer.svelte`)

**Current Implementation**: ✅ Complete

**Required Features Check**:
- [x] Footer links (About, Contact, Privacy Policy)
- [x] Newsletter signup form (NewsletterSignup component)
- [x] Social media links (can be added)
- [x] Affiliate disclosure
- [x] Copyright notice
- [x] DaisyUI footer component

**Status**: ✅ **Complete** - All required features present

**Optional Enhancements**:
- [ ] Add social media links (Twitter, Facebook, Instagram)
- [ ] Add sitemap links
- [ ] Add newsletter archive link

#### Navbar Component (`src/lib/components/layout/Navbar.svelte`)

**Current Implementation**: ✅ Complete

**Required Features Check**:
- [x] Main navigation menu
- [x] Category links (Reviews, Machines, Guides, About)
- [x] Mobile-responsive design
- [x] Active route highlighting
- [x] DaisyUI menu components

**Status**: ✅ **Complete** - All features implemented

**Optional Enhancements**:
- [ ] Add dropdown menus for subcategories
- [ ] Add "New" badges for recent content
- [ ] Add search shortcut in mobile menu

### Testing
- [ ] Test navigation links work
- [ ] Test mobile menu toggle
- [ ] Test responsive breakpoints
- [ ] Verify sticky header behavior
- [ ] Test search bar integration
- [ ] Verify active route highlighting

---

## Step 3.2: Review Components

### Verification Checklist

#### RatingStars Component (`src/lib/components/reviews/RatingStars.svelte`)

**Current Implementation**: ✅ Complete

**Required Features Check**:
- [x] Reusable star rating component
- [x] Visual rating display (1-5 stars)
- [x] Size variants (sm, md, lg)
- [x] Half-star support
- [x] Accessible (ARIA labels)
- [x] Rating number display

**Status**: ✅ **Complete** - Excellent implementation with half-stars

#### StringReviewCard Component (`src/lib/components/reviews/StringReviewCard.svelte`)

**Current Implementation**: ✅ Complete

**Required Features Check**:
- [x] Display string name, image, key ratings
- [x] "Read Review" CTA button
- [x] Affiliate link badge
- [x] Type, gauge, price badges
- [x] Summary text
- [x] DaisyUI card component
- [x] Hover effects

**Status**: ✅ **Complete** - All features implemented

#### StringReviewDetail Component (`src/lib/components/reviews/StringReviewDetail.svelte`)

**Current Implementation**: ✅ Complete

**Required Features Check**:
- [x] Full review content
- [x] Rating breakdown (stiffness, power, spin, durability) with progress bars
- [x] Pros/cons list
- [x] Multiple affiliate link CTAs ("Check Price on Amazon", "Buy on Tennis Warehouse")
- [x] Hero section with image and ratings
- [x] Full review text
- [x] Related reviews section (can be added)

**Status**: ✅ **Complete** - Comprehensive implementation

**Missing Feature**:
- [ ] Schema.org Review markup (will be added in Phase 5/8)

#### ComparisonTable Component (`src/lib/components/reviews/ComparisonTable.svelte`)

**Current Implementation**: ✅ Complete

**Required Features Check**:
- [x] Sortable table component
- [x] Columns: Name, Type, Gauge, Stiffness, Power, Spin, Durability, Price
- [x] Sort functionality (ascending/descending)
- [x] Responsive table (mobile-friendly)
- [x] DaisyUI table component

**Status**: ✅ **Complete** - Well-implemented with sorting

**Optional Enhancements**:
- [ ] Add filter functionality (will be in FilterPanel)
- [ ] Add export to CSV functionality
- [ ] Add row highlighting on hover
- [ ] Add "Compare Selected" feature

### Testing
- [ ] Render components with sample data
- [ ] Test RatingStars with different ratings (including half-stars)
- [ ] Test sorting in ComparisonTable
- [ ] Verify affiliate links render correctly
- [ ] Test on mobile devices
- [ ] Verify accessibility (keyboard navigation, screen readers)

---

## Step 3.3: Machine Components

### Verification Checklist

#### MachineCard Component (`src/lib/components/machines/MachineCard.svelte`)

**Current Implementation**: ✅ Complete

**Required Features Check**:
- [x] Display machine name, image, type, price
- [x] "Read Review" CTA
- [x] Affiliate badge
- [x] Summary text
- [x] DaisyUI card component
- [x] Hover effects

**Status**: ✅ **Complete** - All features implemented

#### MachineDetail Component (`src/lib/components/machines/MachineDetail.svelte`)

**Current Implementation**: ✅ Complete

**Required Features Check**:
- [x] Full machine review
- [x] Pros/cons list
- [x] Specifications table
- [x] Affiliate links
- [x] Hero section with image
- [x] Full review text

**Status**: ✅ **Complete** - Comprehensive implementation

### Testing
- [ ] Render with sample data
- [ ] Test navigation to detail pages
- [ ] Verify affiliate links
- [ ] Test responsive design
- [ ] Verify specifications table displays correctly

---

## Step 3.4: Article Components

### Verification Checklist

#### ArticleCard Component (`src/lib/components/articles/ArticleCard.svelte`)

**Current Implementation**: ✅ Complete

**Required Features Check**:
- [x] Article preview card
- [x] Featured image, title, excerpt, date
- [x] Category badge
- [x] Tags display
- [x] Reading time
- [x] "Read More" CTA
- [x] DaisyUI card component

**Status**: ✅ **Complete** - All features implemented

#### ArticleContent Component (`src/lib/components/articles/ArticleContent.svelte`)

**Current Implementation**: ✅ Complete

**Required Features Check**:
- [x] Article content renderer
- [x] Table of contents (auto-generated from headings)
- [x] Markdown-like formatting
- [x] Author and date display
- [x] Tags display
- [x] Category badge

**Status**: ✅ **Complete** - Good implementation

**Optional Enhancements**:
- [ ] Add proper markdown parser (marked, markdown-it)
- [ ] Add syntax highlighting for code blocks
- [ ] Add related articles section
- [ ] Add share buttons
- [ ] Add print stylesheet

### Testing
- [ ] Render articles with various content lengths
- [ ] Test table of contents generation
- [ ] Verify markdown formatting
- [ ] Test on mobile devices
- [ ] Verify reading time calculation

---

## Step 3.5: Filter & Search Components

### Verification Checklist

#### SearchBar Component (`src/lib/components/search/SearchBar.svelte`)

**Current Implementation**: ✅ Complete

**Required Features Check**:
- [x] Search input with autocomplete
- [x] Search results dropdown (recent searches)
- [x] Integration with search navigation
- [x] Recent searches (localStorage)
- [x] DaisyUI input component
- [x] Mobile-responsive

**Status**: ✅ **Complete** - Well-implemented

**Optional Enhancements**:
- [ ] Add live search results dropdown
- [ ] Add search suggestions
- [ ] Add keyboard shortcuts (Ctrl+K)
- [ ] Add search history management

#### FilterPanel Component (`src/lib/components/filters/FilterPanel.svelte`)

**Current Implementation**: ❌ **Missing**

**Required Features**:
- [ ] Filter by string type (checkboxes)
- [ ] Filter by price range (slider)
- [ ] Filter by skill level (dropdown)
- [ ] Filter by comfort level (slider)
- [ ] Clear filters button
- [ ] URL query parameter sync
- [ ] DaisyUI form components

**Action Items**:

1. **Create FilterPanel Component** (`src/lib/components/filters/FilterPanel.svelte`):

```svelte
<script lang="ts">
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { StringType } from '$lib/types';

	export let filters: {
		type?: string[];
		priceMin?: number;
		priceMax?: number;
		comfortMin?: number;
		comfortMax?: number;
	} = {};

	let selectedTypes: string[] = filters.type || [];
	let priceRange: [number, number] = [filters.priceMin || 0, filters.priceMax || 100];
	let comfortRange: [number, number] = [filters.comfortMin || 0, filters.comfortMax || 10];

	const stringTypes = Object.values(StringType);

	function applyFilters() {
		const params = new URLSearchParams();
		
		if (selectedTypes.length > 0) {
			params.set('type', selectedTypes.join(','));
		}
		if (priceRange[0] > 0) {
			params.set('priceMin', priceRange[0].toString());
		}
		if (priceRange[1] < 100) {
			params.set('priceMax', priceRange[1].toString());
		}
		if (comfortRange[0] > 0) {
			params.set('comfortMin', comfortRange[0].toString());
		}
		if (comfortRange[1] < 10) {
			params.set('comfortMax', comfortRange[1].toString());
		}

		goto(`?${params.toString()}`, { replaceState: true });
	}

	function clearFilters() {
		selectedTypes = [];
		priceRange = [0, 100];
		comfortRange = [0, 10];
		goto('?', { replaceState: true });
	}
</script>

<div class="card bg-base-100 shadow-xl p-6">
	<h2 class="card-title mb-4">Filters</h2>
	
	<!-- String Type Filter -->
	<div class="form-control mb-4">
		<label class="label">
			<span class="label-text font-semibold">String Type</span>
		</label>
		<div class="space-y-2">
			{#each stringTypes as type}
				<label class="label cursor-pointer">
					<span class="label-text capitalize">{type.replace('_', ' ')}</span>
					<input
						type="checkbox"
						class="checkbox checkbox-primary"
						checked={selectedTypes.includes(type)}
						on:change={(e) => {
							if (e.currentTarget.checked) {
								selectedTypes = [...selectedTypes, type];
							} else {
								selectedTypes = selectedTypes.filter(t => t !== type);
							}
							applyFilters();
						}}
					/>
				</label>
			{/each}
		</div>
	</div>

	<!-- Price Range Filter -->
	<div class="form-control mb-4">
		<label class="label">
			<span class="label-text font-semibold">Price Range</span>
			<span class="label-text-alt">${priceRange[0]} - ${priceRange[1]}</span>
		</label>
		<input
			type="range"
			min="0"
			max="100"
			value={priceRange[1]}
			class="range range-primary"
			on:input={(e) => {
				priceRange[1] = Number(e.currentTarget.value);
				applyFilters();
			}}
		/>
		<div class="w-full flex justify-between text-xs px-2">
			<span>$0</span>
			<span>$100</span>
		</div>
	</div>

	<!-- Comfort Level Filter -->
	<div class="form-control mb-4">
		<label class="label">
			<span class="label-text font-semibold">Comfort Level</span>
			<span class="label-text-alt">{comfortRange[0]}/10 - {comfortRange[1]}/10</span>
		</label>
		<input
			type="range"
			min="0"
			max="10"
			value={comfortRange[1]}
			class="range range-primary"
			on:input={(e) => {
				comfortRange[1] = Number(e.currentTarget.value);
				applyFilters();
			}}
		/>
		<div class="w-full flex justify-between text-xs px-2">
			<span>0</span>
			<span>10</span>
		</div>
	</div>

	<!-- Clear Filters Button -->
	<div class="card-actions justify-end">
		<button class="btn btn-ghost btn-sm" on:click={clearFilters}>
			Clear Filters
		</button>
	</div>
</div>
```

2. **Create filters directory**:
```bash
mkdir -p src/lib/components/filters
```

3. **Integrate FilterPanel into listing pages**:
   - Add to `src/routes/reviews/+page.svelte`
   - Add to `src/routes/machines/+page.svelte`

### Testing
- [ ] Test all filter combinations
- [ ] Test URL parameter sync
- [ ] Test clear filters button
- [ ] Test on mobile devices
- [ ] Verify filters persist in URL

---

## Step 3.6: Affiliate Components

### Verification Checklist

#### AffiliateButton Component (`src/lib/components/affiliate/AffiliateButton.svelte`)

**Current Implementation**: ✅ Complete

**Required Features Check**:
- [x] Reusable CTA button component
- [x] Click tracking (Google Analytics events)
- [x] External link icon
- [x] Styling variants (primary, secondary)
- [x] No-follow attributes
- [x] Target blank

**Status**: ✅ **Complete** - Well-implemented

#### AffiliateLink Component (`src/lib/components/affiliate/AffiliateLink.svelte`)

**Current Implementation**: ❌ **Missing**

**Required Features**:
- [ ] Wrapper component for inline links
- [ ] Click tracking
- [ ] No-follow attributes
- [ ] Disclosure text (optional)

**Action Items**:

1. **Create AffiliateLink Component** (`src/lib/components/affiliate/AffiliateLink.svelte`):

```svelte
<script lang="ts">
	export let href: string;
	export let vendor: string;
	export let showDisclosure: boolean = false;

	function handleClick() {
		// Track affiliate click
		if (typeof window !== 'undefined' && (window as any).gtag) {
			(window as any).gtag('event', 'affiliate_click', {
				vendor,
				link_url: href,
				link_type: 'inline'
			});
		}
	}
</script>

<span class="inline-flex items-center gap-1">
	<a
		href={href}
		target="_blank"
		rel="noopener noreferrer nofollow"
		class="link link-primary"
		on:click={handleClick}
	>
		<slot />
	</a>
	{#if showDisclosure}
		<span class="text-xs text-base-content/60" title="Affiliate link">
			*
		</span>
	{/if}
</span>
```

2. **Usage Example**:
```svelte
<p>
	Check out this <AffiliateLink href="..." vendor="Amazon">great string</AffiliateLink> on Amazon.
</p>
```

### Testing
- [ ] Test affiliate link generation
- [ ] Verify click tracking events
- [ ] Check no-follow attributes
- [ ] Test on different vendors
- [ ] Verify disclosure appears when enabled

---

## Step 3.7: Ad Components

### Verification Checklist

#### AdSense Component (`src/lib/components/ads/AdSense.svelte`)

**Current Implementation**: ❌ **Missing**

**Required Features**:
- [ ] Google AdSense integration
- [ ] Ad slot component
- [ ] Responsive ad units
- [ ] Lazy loading support

**Action Items**:

1. **Create ads directory**:
```bash
mkdir -p src/lib/components/ads
```

2. **Create AdSense Component** (`src/lib/components/ads/AdSense.svelte`):

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { PUBLIC_GA_ID } from '$env/static/public';

	export let adSlot: string;
	export let adFormat: string = 'auto';
	export let adClient: string = `ca-pub-${PUBLIC_GA_ID?.replace('G-', '') || 'XXXXXXXXXX'}`;

	let adElement: HTMLElement;

	onMount(() => {
		if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
			try {
				((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
			} catch (e) {
				console.error('AdSense error:', e);
			}
		}
	});
</script>

<div class="ads-container my-4">
	<ins
		bind:this={adElement}
		class="adsbygoogle"
		style="display:block"
		data-ad-client={adClient}
		data-ad-slot={adSlot}
		data-ad-format={adFormat}
		data-full-width-responsive="true"
	></ins>
</div>

<style>
	.ads-container {
		min-height: 100px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
```

3. **Add AdSense Script to `src/app.html`**:
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXX"
     crossorigin="anonymous"></script>
```

#### AdPlacement Component (`src/lib/components/ads/AdPlacement.svelte`)

**Current Implementation**: ❌ **Missing**

**Required Features**:
- [ ] Ad placement wrapper
- [ ] Positions: header, sidebar, in-content, footer
- [ ] Responsive display logic
- [ ] Conditional rendering

**Action Items**:

1. **Create AdPlacement Component** (`src/lib/components/ads/AdPlacement.svelte`):

```svelte
<script lang="ts">
	import AdSense from './AdSense.svelte';

	export let position: 'header' | 'sidebar' | 'in-content' | 'footer';
	export let adSlot: string;
	export let showOnMobile: boolean = true;

	const positionClasses = {
		header: 'w-full mb-4',
		sidebar: 'sticky top-20',
		'in-content': 'w-full my-8',
		footer: 'w-full mt-8'
	};

	const mobileClasses = showOnMobile ? '' : 'hidden md:block';
</script>

<div class="{positionClasses[position]} {mobileClasses}">
	<AdSense {adSlot} />
</div>
```

2. **Usage Examples**:
```svelte
<!-- Header Banner -->
<AdPlacement position="header" adSlot="1234567890" />

<!-- Sidebar Ad -->
<aside class="hidden lg:block">
	<AdPlacement position="sidebar" adSlot="1234567891" />
</aside>

<!-- In-Content Ad -->
<AdPlacement position="in-content" adSlot="1234567892" />

<!-- Footer Ad -->
<AdPlacement position="footer" adSlot="1234567893" showOnMobile={false} />
```

### Testing
- [ ] Verify AdSense script loads
- [ ] Test ad display in different positions
- [ ] Test responsive behavior
- [ ] Verify ads don't break layout
- [ ] Test on mobile devices
- [ ] Check ad performance (after AdSense approval)

---

## Final Verification Checklist

### Component Completeness
- [ ] All layout components exist and work
- [ ] All review components exist and work
- [ ] All machine components exist and work
- [ ] All article components exist and work
- [ ] FilterPanel component created
- [ ] SearchBar component works
- [ ] AffiliateButton component works
- [ ] AffiliateLink component created
- [ ] AdSense component created
- [ ] AdPlacement component created

### Component Quality
- [ ] All components use DaisyUI styling
- [ ] All components are mobile-responsive
- [ ] All components have proper TypeScript types
- [ ] All components are accessible (ARIA labels, keyboard navigation)
- [ ] All components handle edge cases
- [ ] All components have error handling

### Integration
- [ ] Components work together correctly
- [ ] Components integrate with routes
- [ ] Components use data loading utilities
- [ ] Components track analytics events
- [ ] Components handle loading states

### Testing
- [ ] Test all components with sample data
- [ ] Test on mobile devices
- [ ] Test on different browsers
- [ ] Test accessibility (keyboard, screen readers)
- [ ] Test performance (lazy loading, code splitting)

---

## Implementation Commands

### Create Missing Components
```bash
# Create filters directory
mkdir -p src/lib/components/filters

# Create ads directory
mkdir -p src/lib/components/ads

# Components will be created via file creation
```

### Testing Commands
```bash
# Run dev server
npm run dev

# Check TypeScript
npm run check

# Build for production
npm run build
```

---

## Success Criteria

Phase 3 is complete when:
- ✅ All required components exist
- ✅ All components match requirements
- ✅ All components are styled with DaisyUI
- ✅ All components are mobile-responsive
- ✅ All components have proper TypeScript types
- ✅ All components are accessible
- ✅ Components integrate correctly
- ✅ All tests pass

---

## Next Steps

After completing Phase 3:
1. Move to **Phase 4: Routes & Pages**
2. Integrate components into routes
3. Test component integration
4. Add loading states and error handling

---

## Notes

- Most components are already well-implemented
- Focus on creating the 4 missing components
- FilterPanel is important for user experience
- AdSense components can be added later (after AdSense approval)
- AffiliateLink provides better inline link handling

---

**Last Updated**: Based on current project state assessment
**Status**: Ready for implementation of missing components
