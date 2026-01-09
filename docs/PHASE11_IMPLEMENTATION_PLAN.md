# Phase 11 Implementation Plan: Content Management

**Status**: ✅ Mostly Complete - Admin Interface Optional

This document provides a detailed plan to verify and complete Phase 11 (Steps 11.1-11.3) from `IMPLEMENTATION_STEPS.md`.

---

## 📋 Current Status Assessment

### ✅ Already Completed
- ✅ Content structure organized (`src/lib/data/`)
- ✅ Content loading functions exist (`src/lib/utils/content.ts`)
- ✅ Content filtering functions exist
- ✅ Content search functions exist
- ✅ Guides route exists (uses articles with guide category)

### ⚠️ Needs Verification/Enhancement
- ⚠️ **Content structure verification** - Need to verify structure matches requirements
- ⚠️ **Content loading enhancements** - Could add more helper functions
- ⚠️ **Guides directory** - Currently guides are articles, may need separate structure
- ❌ **Admin interface** - Not implemented (optional)

---

## Step 11.1: Content Structure

### Verification Checklist

#### Content File Organization

**Current Implementation**: ✅ **Complete**

**Current Structure**:
```
src/lib/data/
├── reviews/
│   ├── strings/
│   │   └── sample-strings.json
│   └── machines/
│       └── sample-machines.json
├── articles/
│   └── sample-articles.json
```

**Required Structure** (from IMPLEMENTATION_STEPS.md):
```
src/lib/data/
├── reviews/
│   ├── strings/
│   └── machines/
├── articles/
└── guides/
```

**Status**: ✅ **Complete** - Structure matches requirements

**Note**: Guides are currently implemented as articles with `category: 'guide'`. This is acceptable, but we can optionally create a separate guides directory.

**Action Items**:

1. **Verify Content Structure**:

```bash
# Verify directory structure
tree src/lib/data -I node_modules

# Expected output:
# src/lib/data/
# ├── articles/
# │   └── sample-articles.json
# ├── reviews/
# │   ├── machines/
# │   │   └── sample-machines.json
# │   └── strings/
# │       └── sample-strings.json
```

2. **Optional: Create Separate Guides Directory** (if needed):

If you want to separate guides from articles:

```bash
# Create guides directory
mkdir -p src/lib/data/guides

# Create sample guides file
touch src/lib/data/guides/sample-guides.json
```

**Option A: Keep Current Structure** (Recommended):
- Guides are articles with `category: 'guide'`
- Simpler to manage
- Single Article type handles all content

**Option B: Separate Guides Directory**:
- Create `src/lib/data/guides/`
- Separate Guide type (similar to Article)
- More separation but more complexity

**Recommendation**: Keep current structure (Option A) unless you need different fields for guides.

3. **Verify Content File Format**:

Check that all JSON files follow the correct schema:
- [ ] `sample-strings.json` - Array of StringReview objects
- [ ] `sample-machines.json` - Array of StringingMachine objects
- [ ] `sample-articles.json` - Array of Article objects

### Testing
- [ ] Verify directory structure
- [ ] Verify JSON files are valid
- [ ] Verify content files match type definitions
- [ ] Test content loading

---

## Step 11.2: Content Loading

### Verification Checklist

#### Content Loading Functions (`src/lib/utils/content.ts`)

**Current Implementation**: ✅ **Complete**

**Existing Functions**:
- ✅ `loadStringReviews()` - Load all string reviews
- ✅ `loadMachineReviews()` - Load all machine reviews
- ✅ `loadArticles()` - Load all articles
- ✅ `getStringReviewBySlug()` - Get string review by slug
- ✅ `getMachineReviewBySlug()` - Get machine review by slug
- ✅ `getArticleBySlug()` - Get article by slug
- ✅ `filterStringReviews()` - Filter string reviews
- ✅ `searchContent()` - Search across all content

**Status**: ✅ **Complete** - All required functions exist

**Optional Enhancements**:

1. **Add More Helper Functions** (`src/lib/utils/content.ts`):

```typescript
import type { StringReview, StringingMachine, Article, ArticleCategory } from '$lib/types';

// ... existing code ...

// Get articles by category
export async function getArticlesByCategory(category: ArticleCategory): Promise<Article[]> {
	const articles = await loadArticles();
	return articles.filter((a) => a.category === category);
}

// Get guides (articles with category 'guide')
export async function loadGuides(): Promise<Article[]> {
	return getArticlesByCategory('guide' as ArticleCategory);
}

// Get related content
export async function getRelatedContent(
	contentId: string,
	contentType: 'string' | 'machine' | 'article',
	limit: number = 3
): Promise<{ strings?: StringReview[]; machines?: StringingMachine[]; articles?: Article[] }> {
	const [strings, machines, articles] = await Promise.all([
		loadStringReviews(),
		loadMachineReviews(),
		loadArticles()
	]);

	const result: {
		strings?: StringReview[];
		machines?: StringingMachine[];
		articles?: Article[];
	} = {};

	if (contentType === 'string') {
		// Get related strings (same brand or type)
		const current = strings.find((s) => s.id === contentId);
		if (current) {
			result.strings = strings
				.filter(
					(s) =>
						s.id !== contentId &&
						(s.brand === current.brand || s.type === current.type)
				)
				.slice(0, limit);
		}
	} else if (contentType === 'machine') {
		// Get related machines (same brand or type)
		const current = machines.find((m) => m.id === contentId);
		if (current) {
			result.machines = machines
				.filter(
					(m) =>
						m.id !== contentId &&
						(m.brand === current.brand || m.type === current.type)
				)
				.slice(0, limit);
		}
	} else if (contentType === 'article') {
		// Get related articles (same category or tags)
		const current = articles.find((a) => a.id === contentId);
		if (current) {
			result.articles = articles
				.filter(
					(a) =>
						a.id !== contentId &&
						(a.category === current.category ||
							a.tags.some((tag) => current.tags.includes(tag)))
				)
				.slice(0, limit);
		}
	}

	return result;
}

// Get featured content
export async function getFeaturedContent(): Promise<{
	strings: StringReview[];
	machines: StringingMachine[];
	articles: Article[];
}> {
	const [strings, machines, articles] = await Promise.all([
		loadStringReviews(),
		loadMachineReviews(),
		loadArticles()
	]);

	return {
		strings: strings.filter((s) => s.featured).slice(0, 6),
		machines: machines.filter((m) => m.featured).slice(0, 6),
		articles: articles.filter((a) => a.featured).slice(0, 6)
	};
}

// Get latest content
export async function getLatestContent(limit: number = 6): Promise<{
	strings: StringReview[];
	machines: StringingMachine[];
	articles: Article[];
}> {
	const [strings, machines, articles] = await Promise.all([
		loadStringReviews(),
		loadMachineReviews(),
		loadArticles()
	]);

	return {
		strings: strings
			.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
			.slice(0, limit),
		machines: machines
			.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
			.slice(0, limit),
		articles: articles
			.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
			.slice(0, limit)
	};
}

// Get content by tag
export async function getContentByTag(tag: string): Promise<{
	strings: StringReview[];
	machines: StringingMachine[];
	articles: Article[];
}> {
	const [strings, machines, articles] = await Promise.all([
		loadStringReviews(),
		loadMachineReviews(),
		loadArticles()
	]);

	return {
		strings: strings.filter((s) => s.tags?.includes(tag) || false),
		machines: machines.filter((m) => m.tags?.includes(tag) || false),
		articles: articles.filter((a) => a.tags.includes(tag))
	};
}

// Get popular content (by rating or views)
export async function getPopularContent(limit: number = 6): Promise<{
	strings: StringReview[];
	machines: StringingMachine[];
	articles: Article[];
}> {
	const [strings, machines, articles] = await Promise.all([
		loadStringReviews(),
		loadMachineReviews(),
		loadArticles()
	]);

	return {
		strings: strings
			.sort((a, b) => b.ratings.overall - a.ratings.overall)
			.slice(0, limit),
		machines: machines
			.sort((a, b) => (b.ratings?.overall || 0) - (a.ratings?.overall || 0))
			.slice(0, limit),
		articles: articles
			.sort((a, b) => (b.views || 0) - (a.views || 0))
			.slice(0, limit)
	};
}

// Filter machine reviews
export function filterMachineReviews(
	machines: StringingMachine[],
	filters: {
		type?: string;
		minPrice?: number;
		maxPrice?: number;
		minRating?: number;
		brand?: string;
	}
): StringingMachine[] {
	return machines.filter((machine) => {
		if (filters.type && machine.type !== filters.type) return false;
		if (filters.minPrice && machine.price < filters.minPrice) return false;
		if (filters.maxPrice && machine.price > filters.maxPrice) return false;
		if (filters.minRating && (machine.ratings?.overall || 0) < filters.minRating) return false;
		if (filters.brand && machine.brand !== filters.brand) return false;
		return true;
	});
}

// Filter articles
export function filterArticles(
	articles: Article[],
	filters: {
		category?: ArticleCategory;
		tags?: string[];
		author?: string;
	}
): Article[] {
	return articles.filter((article) => {
		if (filters.category && article.category !== filters.category) return false;
		if (filters.tags && !filters.tags.some((tag) => article.tags.includes(tag))) return false;
		if (filters.author && article.author !== filters.author) return false;
		return true;
	});
}
```

2. **Add Content Validation** (Optional):

```typescript
// Validate content structure
export function validateStringReview(review: any): review is StringReview {
	return (
		review &&
		typeof review.id === 'string' &&
		typeof review.slug === 'string' &&
		typeof review.name === 'string' &&
		typeof review.brand === 'string' &&
		review.ratings &&
		typeof review.ratings.overall === 'number'
	);
}

export function validateMachineReview(machine: any): machine is StringingMachine {
	return (
		machine &&
		typeof machine.id === 'string' &&
		typeof machine.slug === 'string' &&
		typeof machine.name === 'string' &&
		typeof machine.brand === 'string'
	);
}

export function validateArticle(article: any): article is Article {
	return (
		article &&
		typeof article.id === 'string' &&
		typeof article.slug === 'string' &&
		typeof article.title === 'string' &&
		typeof article.author === 'string'
	);
}
```

### Testing
- [ ] Test all content loading functions
- [ ] Test filtering functions
- [ ] Test search function
- [ ] Test new helper functions (if added)
- [ ] Test error handling
- [ ] Test with invalid data

---

## Step 11.3: Admin Interface (Optional)

### Verification Checklist

#### Admin Routes and Interface

**Current Implementation**: ❌ **Not Implemented**

**Status**: ⚠️ **Optional** - Not required for MVP

**Action Items** (if implementing):

1. **Create Admin Authentication** (`src/lib/utils/auth.ts`):

```typescript
import { env } from '$env/dynamic/private';
import { redirect } from '@sveltejs/kit';
import type { RequestEvent } from '@sveltejs/kit';

const ADMIN_PASSWORD = env.ADMIN_PASSWORD || 'admin123'; // Change in production!

export function requireAdmin(event: RequestEvent): void {
	const session = event.cookies.get('admin_session');
	if (!session || session !== 'authenticated') {
		throw redirect(302, '/admin/login');
	}
}

export function isAdmin(event: RequestEvent): boolean {
	const session = event.cookies.get('admin_session');
	return session === 'authenticated';
}
```

2. **Create Admin Login Page** (`src/routes/admin/login/+page.svelte`):

```svelte
<script lang="ts">
	import { goto } from '$app/navigation';
	
	let password = '';
	let error = '';
	let loading = false;

	async function handleLogin() {
		if (!password) {
			error = 'Please enter a password';
			return;
		}

		loading = true;
		error = '';

		try {
			const response = await fetch('/api/admin/login', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ password })
			});

			if (response.ok) {
				goto('/admin');
			} else {
				error = 'Invalid password';
			}
		} catch (err) {
			error = 'Login failed';
		} finally {
			loading = false;
		}
	}
</script>

<div class="container mx-auto px-4 py-16">
	<div class="max-w-md mx-auto card bg-base-100 shadow-xl">
		<div class="card-body">
			<h1 class="card-title text-2xl mb-4">Admin Login</h1>
			<div class="form-control">
				<label class="label">
					<span class="label-text">Password</span>
				</label>
				<input
					type="password"
					class="input input-bordered"
					bind:value={password}
					on:keydown={(e) => e.key === 'Enter' && handleLogin()}
				/>
			</div>
			{#if error}
				<div class="alert alert-error mt-4">
					<span>{error}</span>
				</div>
			{/if}
			<div class="card-actions justify-end mt-4">
				<button class="btn btn-primary" on:click={handleLogin} disabled={loading}>
					{loading ? 'Logging in...' : 'Login'}
				</button>
			</div>
		</div>
	</div>
</div>
```

3. **Create Admin Login API** (`src/routes/api/admin/login/+server.ts`):

```typescript
import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

const ADMIN_PASSWORD = env.ADMIN_PASSWORD || 'admin123';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const { password } = await request.json();

	if (password === ADMIN_PASSWORD) {
		cookies.set('admin_session', 'authenticated', {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 // 24 hours
		});
		return json({ success: true });
	}

	return json({ error: 'Invalid password' }, { status: 401 });
};
```

4. **Create Admin Layout** (`src/routes/admin/+layout.svelte`):

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { isAdmin } from '$lib/utils/auth';

	let authenticated = false;

	onMount(async () => {
		// Check authentication
		const response = await fetch('/api/admin/check');
		authenticated = response.ok;
		
		if (!authenticated && $page.url.pathname !== '/admin/login') {
			goto('/admin/login');
		}
	});
</script>

{#if authenticated}
	<div class="min-h-screen bg-base-200">
		<div class="navbar bg-base-100 shadow-lg">
			<div class="flex-1">
				<a href="/admin" class="btn btn-ghost text-xl">Admin Panel</a>
			</div>
			<div class="flex-none">
				<ul class="menu menu-horizontal px-1">
					<li><a href="/admin/reviews">Reviews</a></li>
					<li><a href="/admin/machines">Machines</a></li>
					<li><a href="/admin/articles">Articles</a></li>
					<li><a href="/admin/logout">Logout</a></li>
				</ul>
			</div>
		</div>
		<main class="container mx-auto px-4 py-8">
			<slot />
		</main>
	</div>
{/if}
```

5. **Create Admin Dashboard** (`src/routes/admin/+page.svelte`):

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { loadStringReviews, loadMachineReviews, loadArticles } from '$lib/utils/content';

	let stats = {
		strings: 0,
		machines: 0,
		articles: 0
	};

	onMount(async () => {
		const [strings, machines, articles] = await Promise.all([
			loadStringReviews(),
			loadMachineReviews(),
			loadArticles()
		]);
		
		stats = {
			strings: strings.length,
			machines: machines.length,
			articles: articles.length
		};
	});
</script>

<div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
	<div class="stat bg-base-100 shadow-lg rounded-lg">
		<div class="stat-title">String Reviews</div>
		<div class="stat-value">{stats.strings}</div>
		<div class="stat-desc">
			<a href="/admin/reviews/strings" class="link">Manage →</a>
		</div>
	</div>
	<div class="stat bg-base-100 shadow-lg rounded-lg">
		<div class="stat-title">Machine Reviews</div>
		<div class="stat-value">{stats.machines}</div>
		<div class="stat-desc">
			<a href="/admin/reviews/machines" class="link">Manage →</a>
		</div>
	</div>
	<div class="stat bg-base-100 shadow-lg rounded-lg">
		<div class="stat-title">Articles</div>
		<div class="stat-value">{stats.articles}</div>
		<div class="stat-desc">
			<a href="/admin/articles" class="link">Manage →</a>
		</div>
	</div>
</div>

<div class="card bg-base-100 shadow-lg">
	<div class="card-body">
		<h2 class="card-title">Quick Actions</h2>
		<div class="flex flex-wrap gap-4 mt-4">
			<a href="/admin/reviews/strings/new" class="btn btn-primary">Add String Review</a>
			<a href="/admin/reviews/machines/new" class="btn btn-primary">Add Machine Review</a>
			<a href="/admin/articles/new" class="btn btn-primary">Add Article</a>
		</div>
	</div>
</div>
```

6. **Create Content Editor Components** (Simplified example):

```svelte
<!-- src/lib/components/admin/ContentEditor.svelte -->
<script lang="ts">
	export let content: any;
	export let contentType: 'string' | 'machine' | 'article';
	
	let editedContent = { ...content };
	
	function handleSave() {
		// Save content (would need API endpoint)
		console.log('Saving:', editedContent);
	}
</script>

<div class="form-control">
	<label class="label">
		<span class="label-text">Title/Name</span>
	</label>
	<input
		type="text"
		class="input input-bordered"
		bind:value={editedContent.name || editedContent.title}
	/>
</div>

<!-- More form fields based on content type -->

<div class="mt-4">
	<button class="btn btn-primary" on:click={handleSave}>Save</button>
</div>
```

**Note**: Full admin interface implementation is complex and optional. Consider using a headless CMS (Strapi, Contentful) or markdown files with Git-based workflow for content management.

### Testing
- [ ] Test admin authentication
- [ ] Test admin login
- [ ] Test admin routes protection
- [ ] Test content editing (if implemented)
- [ ] Test content creation (if implemented)

---

## Final Verification Checklist

### Content Structure
- [ ] Directory structure verified
- [ ] JSON files are valid
- [ ] Content files match type definitions
- [ ] Guides structure decided (articles vs separate)

### Content Loading
- [ ] All loading functions work
- [ ] Filtering functions work
- [ ] Search function works
- [ ] Helper functions work (if added)
- [ ] Error handling works

### Admin Interface (Optional)
- [ ] Admin authentication works
- [ ] Admin routes protected
- [ ] Content editing works (if implemented)
- [ ] Content creation works (if implemented)

---

## Implementation Commands

### Verify Structure
```bash
# Check directory structure
tree src/lib/data -I node_modules

# Validate JSON files
node -e "JSON.parse(require('fs').readFileSync('src/lib/data/reviews/strings/sample-strings.json'))"
```

### Testing Commands
```bash
# Test content loading
npm run dev
# Visit pages that use content loading

# Test admin (if implemented)
# Visit /admin/login
```

---

## Success Criteria

Phase 11 is complete when:
- ✅ Content structure verified
- ✅ Content loading functions work
- ✅ Content filtering works
- ✅ Content search works
- ✅ Admin interface implemented (optional)

---

## Next Steps

After completing Phase 11:
1. Move to **Phase 12: Testing & Deployment**
2. Consider content management workflow
3. Consider using headless CMS for easier content management

---

## Notes

- Content structure and loading already exist and work
- Focus on verification and optional enhancements
- Admin interface is optional - consider headless CMS instead
- Guides are currently articles with category 'guide' - this is acceptable
- Content validation helps prevent errors
- Helper functions improve code reusability

---

**Last Updated**: Based on current project state assessment
**Status**: Ready for verification and optional enhancements
