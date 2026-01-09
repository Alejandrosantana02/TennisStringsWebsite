# Phase 6 Implementation Plan: Search Functionality

**Status**: ✅ Mostly Complete - Enhancements Needed

This document provides a detailed plan to verify and complete Phase 6 (Steps 6.1-6.2) from `IMPLEMENTATION_STEPS.md`.

---

## 📋 Current Status Assessment

### ✅ Already Completed
- ✅ **Step 6.1**: Search API (`src/routes/api/search/+server.ts`) - Basic implementation
- ✅ **Step 6.2**: Search Results Page (`src/routes/search/+page.svelte`) - Basic implementation
- ✅ SearchBar component exists with recent searches
- ✅ Search utility function (`searchContent`) exists
- ✅ Search through reviews, machines, articles

### ⚠️ Needs Enhancement
- ⚠️ **Autocomplete in SearchBar** - Shows recent searches but not live autocomplete
- ⚠️ **Result highlighting** - Not implemented
- ⚠️ **Filter options** - Not implemented in search results
- ⚠️ **Search algorithm** - Basic string matching, could be improved
- ⚠️ **Search suggestions** - Not implemented

---

## Step 6.1: Search API

### Verification Checklist

#### Search API (`src/routes/api/search/+server.ts`)

**Current Implementation**: ✅ Basic Implementation

**Required Features Check**:
- [x] Search endpoint exists
- [x] Search through reviews, machines, articles
- [x] Return filtered results
- [x] Error handling
- [ ] **Result highlighting** (not in API, should be in UI)
- [ ] **Search suggestions** (not implemented)
- [ ] **Advanced search options** (filters, sorting)

**Status**: ✅ **Complete** - Basic functionality works

**Optional Enhancements**:

1. **Enhance Search API with Filters** (`src/routes/api/search/+server.ts`):

```typescript
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { searchContent } from '$lib/utils/content';

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('q');
	const type = url.searchParams.get('type'); // 'strings' | 'machines' | 'articles' | 'all'
	const limit = parseInt(url.searchParams.get('limit') || '50');

	if (!query || query.trim().length === 0) {
		return json({ strings: [], machines: [], articles: [], total: 0 });
	}

	try {
		const results = await searchContent(query.trim());
		
		// Filter by type if specified
		let filteredResults = results;
		if (type && type !== 'all') {
			filteredResults = {
				strings: type === 'strings' ? results.strings : [],
				machines: type === 'machines' ? results.machines : [],
				articles: type === 'articles' ? results.articles : []
			};
		}
		
		// Apply limit
		const limitedResults = {
			strings: filteredResults.strings.slice(0, limit),
			machines: filteredResults.machines.slice(0, limit),
			articles: filteredResults.articles.slice(0, limit),
			total: filteredResults.strings.length + filteredResults.machines.length + filteredResults.articles.length
		};
		
		return json(limitedResults);
	} catch (error) {
		console.error('Search error:', error);
		return json({ error: 'Search failed', strings: [], machines: [], articles: [], total: 0 }, { status: 500 });
	}
};
```

2. **Add Autocomplete Endpoint** (`src/routes/api/search/autocomplete/+server.ts`):

```typescript
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { loadStringReviews, loadMachineReviews, loadArticles } from '$lib/utils/content';

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('q');
	const limit = parseInt(url.searchParams.get('limit') || '5');

	if (!query || query.trim().length < 2) {
		return json({ suggestions: [] });
	}

	try {
		const [strings, machines, articles] = await Promise.all([
			loadStringReviews(),
			loadMachineReviews(),
			loadArticles()
		]);

		const lowerQuery = query.toLowerCase();
		const suggestions: Array<{ text: string; type: string; url: string }> = [];

		// String suggestions
		strings
			.filter(s => 
				s.name.toLowerCase().includes(lowerQuery) || 
				s.brand.toLowerCase().includes(lowerQuery)
			)
			.slice(0, limit)
			.forEach(s => {
				suggestions.push({
					text: `${s.brand} ${s.name}`,
					type: 'String Review',
					url: `/reviews/${s.slug}`
				});
			});

		// Machine suggestions
		machines
			.filter(m => 
				m.name.toLowerCase().includes(lowerQuery) || 
				m.brand.toLowerCase().includes(lowerQuery)
			)
			.slice(0, limit)
			.forEach(m => {
				suggestions.push({
					text: `${m.brand} ${m.name}`,
					type: 'Stringing Machine',
					url: `/machines/${m.slug}`
				});
			});

		// Article suggestions
		articles
			.filter(a => 
				a.title.toLowerCase().includes(lowerQuery) ||
				a.excerpt.toLowerCase().includes(lowerQuery)
			)
			.slice(0, limit)
			.forEach(a => {
				suggestions.push({
					text: a.title,
					type: 'Article',
					url: `/guides/${a.slug}`
				});
			});

		return json({ suggestions: suggestions.slice(0, limit) });
	} catch (error) {
		console.error('Autocomplete error:', error);
		return json({ suggestions: [] });
	}
};
```

3. **Enhance Search Algorithm** (`src/lib/utils/content.ts`):

```typescript
// Enhanced search with relevance scoring
export function searchContent(query: string): Promise<{
	strings: StringReview[];
	machines: StringingMachine[];
	articles: Article[];
}> {
	const lowerQuery = query.toLowerCase();
	const queryWords = lowerQuery.split(/\s+/).filter(w => w.length > 0);
	
	return Promise.all([
		loadStringReviews(),
		loadMachineReviews(),
		loadArticles()
	]).then(([strings, machines, articles]) => {
		// Score function for relevance
		function calculateScore(item: any, fields: string[]): number {
			let score = 0;
			const text = fields.map(f => {
				const value = f.split('.').reduce((obj, key) => obj?.[key], item);
				return String(value || '').toLowerCase();
			}).join(' ');
			
			queryWords.forEach(word => {
				// Exact match gets highest score
				if (text.includes(word)) {
					score += 10;
				}
				// Partial match gets lower score
				if (text.includes(word.substring(0, Math.max(3, word.length - 1)))) {
					score += 5;
				}
			});
			
			// Boost score if query appears in name/title
			if (item.name?.toLowerCase().includes(lowerQuery) || item.title?.toLowerCase().includes(lowerQuery)) {
				score += 20;
			}
			
			return score;
		}

		return {
			strings: strings
				.map(s => ({ item: s, score: calculateScore(s, ['name', 'brand', 'content.summary', 'content.fullReview']) }))
				.filter(r => r.score > 0)
				.sort((a, b) => b.score - a.score)
				.map(r => r.item),
			machines: machines
				.map(m => ({ item: m, score: calculateScore(m, ['name', 'brand', 'content.summary', 'content.fullReview']) }))
				.filter(r => r.score > 0)
				.sort((a, b) => b.score - a.score)
				.map(r => r.item),
			articles: articles
				.map(a => ({ item: a, score: calculateScore(a, ['title', 'excerpt', 'content']) }))
				.filter(r => r.score > 0)
				.sort((a, b) => b.score - a.score)
				.map(r => r.item)
		};
	});
}
```

### Testing
- [ ] Test search API endpoint
- [ ] Test autocomplete endpoint
- [ ] Test search with various queries
- [ ] Test error handling
- [ ] Test search performance
- [ ] Verify results are relevant

---

## Step 6.2: Search UI

### Verification Checklist

#### SearchBar Component (`src/lib/components/search/SearchBar.svelte`)

**Current Implementation**: ✅ Basic Implementation

**Required Features Check**:
- [x] Search input
- [x] Recent searches dropdown
- [x] Enter key support
- [x] Navigation to search results
- [ ] **Live autocomplete** (not implemented)
- [ ] **Search suggestions** (not implemented)
- [ ] **Keyboard navigation** (arrow keys, escape)

**Status**: ⚠️ **Needs Enhancement** - Autocomplete missing

**Action Items**:

1. **Enhance SearchBar with Autocomplete** (`src/lib/components/search/SearchBar.svelte`):

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let query = '';
	let showDropdown = false;
	let recentSearches: string[] = [];
	let autocompleteSuggestions: Array<{ text: string; type: string; url: string }> = [];
	let selectedIndex = -1;
	let debounceTimer: ReturnType<typeof setTimeout>;

	onMount(() => {
		const stored = localStorage.getItem('recentSearches');
		if (stored) {
			recentSearches = JSON.parse(stored);
		}
	});

	async function fetchAutocomplete(searchQuery: string) {
		if (searchQuery.trim().length < 2) {
			autocompleteSuggestions = [];
			return;
		}

		try {
			const response = await fetch(`/api/search/autocomplete?q=${encodeURIComponent(searchQuery)}&limit=5`);
			const data = await response.json();
			autocompleteSuggestions = data.suggestions || [];
		} catch (error) {
			console.error('Autocomplete error:', error);
			autocompleteSuggestions = [];
		}
	}

	$: {
		if (query.trim().length >= 2) {
			clearTimeout(debounceTimer);
			debounceTimer = setTimeout(() => {
				fetchAutocomplete(query);
			}, 300); // Debounce for 300ms
		} else {
			autocompleteSuggestions = [];
		}
	}

	function handleSearch() {
		if (query.trim().length === 0) return;

		if (!recentSearches.includes(query.trim())) {
			recentSearches = [query.trim(), ...recentSearches].slice(0, 5);
			localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
		}

		goto(`/search?q=${encodeURIComponent(query.trim())}`);
		showDropdown = false;
		autocompleteSuggestions = [];
	}

	function handleSuggestionClick(suggestion: { text: string; url: string }) {
		goto(suggestion.url);
		showDropdown = false;
		autocompleteSuggestions = [];
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (!showDropdown) return;

		if (e.key === 'ArrowDown') {
			e.preventDefault();
			selectedIndex = Math.min(selectedIndex + 1, autocompleteSuggestions.length + recentSearches.length - 1);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			selectedIndex = Math.max(selectedIndex - 1, -1);
		} else if (e.key === 'Enter' && selectedIndex >= 0) {
			e.preventDefault();
			if (selectedIndex < autocompleteSuggestions.length) {
				handleSuggestionClick(autocompleteSuggestions[selectedIndex]);
			} else {
				const recentIndex = selectedIndex - autocompleteSuggestions.length;
				query = recentSearches[recentIndex];
				handleSearch();
			}
		} else if (e.key === 'Escape') {
			showDropdown = false;
			selectedIndex = -1;
		}
	}

	function handleRecentSearch(search: string) {
		query = search;
		handleSearch();
	}

	function clearRecentSearches() {
		recentSearches = [];
		localStorage.removeItem('recentSearches');
	}
</script>

<div class="relative">
	<div class="form-control">
		<div class="input-group">
			<input
				type="text"
				placeholder="Search reviews, machines, guides..."
				class="input input-bordered w-full"
				bind:value={query}
				on:focus={() => {
					showDropdown = true;
					selectedIndex = -1;
				}}
				on:blur={() => setTimeout(() => (showDropdown = false), 200)}
				on:keydown={handleKeyDown}
				on:keydown={(e) => {
					if (e.key === 'Enter' && selectedIndex === -1) {
						handleSearch();
					}
				}}
			/>
			<button class="btn btn-square" on:click={handleSearch}>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</button>
		</div>
	</div>

	{#if showDropdown && (autocompleteSuggestions.length > 0 || recentSearches.length > 0)}
		<div class="absolute top-full left-0 right-0 mt-2 bg-base-100 border border-base-300 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
			<div class="p-2">
				<!-- Autocomplete Suggestions -->
				{#if autocompleteSuggestions.length > 0}
					<div class="mb-2">
						<span class="text-xs font-semibold text-base-content/70 px-2">Suggestions</span>
						{#each autocompleteSuggestions as suggestion, index}
							<button
								class="btn btn-ghost btn-sm w-full justify-start {selectedIndex === index ? 'bg-base-200' : ''}"
								on:click={() => handleSuggestionClick(suggestion)}
								on:mouseenter={() => (selectedIndex = index)}
							>
								<div class="flex flex-col items-start">
									<span>{suggestion.text}</span>
									<span class="text-xs text-base-content/60">{suggestion.type}</span>
								</div>
							</button>
						{/each}
					</div>
				{/if}

				<!-- Recent Searches -->
				{#if recentSearches.length > 0}
					<div class="border-t border-base-300 pt-2">
						<div class="flex justify-between items-center mb-2 px-2">
							<span class="text-xs font-semibold text-base-content/70">Recent Searches</span>
							<button class="btn btn-ghost btn-xs" on:click={clearRecentSearches}>
								Clear
							</button>
						</div>
						{#each recentSearches as search, index}
							<button
								class="btn btn-ghost btn-sm w-full justify-start {selectedIndex === autocompleteSuggestions.length + index ? 'bg-base-200' : ''}"
								on:click={() => handleRecentSearch(search)}
								on:mouseenter={() => (selectedIndex = autocompleteSuggestions.length + index)}
							>
								{search}
							</button>
						{/each}
					</div>
				{/if}
			</div>
		</div>
	{/if}
</div>
```

#### Search Results Page (`src/routes/search/+page.svelte`)

**Current Implementation**: ✅ Basic Implementation

**Required Features Check**:
- [x] Search results page exists
- [x] Display results by category
- [x] Loading states
- [x] Empty state handling
- [ ] **Result highlighting** (not implemented)
- [ ] **Filter options** (not implemented)
- [ ] **Sorting options** (not implemented)
- [ ] **Pagination** (not implemented)

**Status**: ⚠️ **Needs Enhancement** - Highlighting and filters missing

**Action Items**:

1. **Add Result Highlighting** (`src/lib/utils/search.ts`):

```typescript
export function highlightText(text: string, query: string): string {
	if (!query || query.trim().length === 0) return text;
	
	const queryWords = query.trim().split(/\s+/).filter(w => w.length > 0);
	let highlighted = text;
	
	queryWords.forEach(word => {
		const regex = new RegExp(`(${word})`, 'gi');
		highlighted = highlighted.replace(regex, '<mark class="bg-warning text-warning-content">$1</mark>');
	});
	
	return highlighted;
}
```

2. **Enhance Search Results Page** (`src/routes/search/+page.svelte`):

```svelte
<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import StringReviewCard from '$lib/components/reviews/StringReviewCard.svelte';
	import MachineCard from '$lib/components/machines/MachineCard.svelte';
	import ArticleCard from '$lib/components/articles/ArticleCard.svelte';
	import type { StringReview, StringingMachine, Article } from '$lib/types';
	import { highlightText } from '$lib/utils/search';

	let results: {
		strings: StringReview[];
		machines: StringingMachine[];
		articles: Article[];
		total: number;
	} = {
		strings: [],
		machines: [],
		articles: [],
		total: 0
	};
	let loading = true;
	let query = '';
	let filterType: 'all' | 'strings' | 'machines' | 'articles' = 'all';
	let sortBy: 'relevance' | 'name' | 'date' = 'relevance';

	onMount(async () => {
		query = $page.url.searchParams.get('q') || '';
		filterType = ($page.url.searchParams.get('type') as any) || 'all';
		if (query) {
			await performSearch(query);
		} else {
			loading = false;
		}
	});

	async function performSearch(searchQuery: string) {
		loading = true;
		try {
			const typeParam = filterType !== 'all' ? `&type=${filterType}` : '';
			const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}${typeParam}`);
			const data = await response.json();
			results = data;
			
			// Apply sorting
			if (sortBy === 'name') {
				results.strings.sort((a, b) => a.name.localeCompare(b.name));
				results.machines.sort((a, b) => a.name.localeCompare(b.name));
				results.articles.sort((a, b) => a.title.localeCompare(b.title));
			} else if (sortBy === 'date') {
				results.strings.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
				results.machines.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
				results.articles.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
			}
		} catch (error) {
			console.error('Search error:', error);
		} finally {
			loading = false;
		}
	}

	function handleFilterChange(newType: 'all' | 'strings' | 'machines' | 'articles') {
		filterType = newType;
		if (query) {
			performSearch(query);
		}
	}

	function handleSortChange(newSort: 'relevance' | 'name' | 'date') {
		sortBy = newSort;
		if (query) {
			performSearch(query);
		}
	}
</script>

<svelte:head>
	<title>Search Results{query ? ` for "${query}"` : ''} - Tennis String Reviews</title>
	<meta name="description" content="Search results for tennis string reviews, stringing machines, and guides." />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
		<h1 class="text-4xl font-bold">
			Search Results
			{#if query}
				<span class="text-2xl text-base-content/70">for "{query}"</span>
			{/if}
		</h1>
		
		{#if !loading && results.total > 0}
			<div class="flex gap-2">
				<!-- Filter Dropdown -->
				<select
					class="select select-bordered"
					bind:value={filterType}
					on:change={(e) => handleFilterChange(e.currentTarget.value as any)}
				>
					<option value="all">All ({results.total})</option>
					<option value="strings">Strings ({results.strings.length})</option>
					<option value="machines">Machines ({results.machines.length})</option>
					<option value="articles">Articles ({results.articles.length})</option>
				</select>
				
				<!-- Sort Dropdown -->
				<select
					class="select select-bordered"
					bind:value={sortBy}
					on:change={(e) => handleSortChange(e.currentTarget.value as any)}
				>
					<option value="relevance">Relevance</option>
					<option value="name">Name</option>
					<option value="date">Date</option>
				</select>
			</div>
		{/if}
	</div>

	{#if loading}
		<div class="flex justify-center items-center min-h-[400px]">
			<span class="loading loading-spinner loading-lg"></span>
		</div>
	{:else if !query}
		<div class="alert alert-info">
			<span>Please enter a search query</span>
		</div>
	{:else if results.total === 0}
		<div class="alert alert-warning">
			<span>No results found for "{query}"</span>
			<div class="mt-4">
				<p class="text-sm">Try:</p>
				<ul class="list-disc list-inside text-sm">
					<li>Checking your spelling</li>
					<li>Using different keywords</li>
					<li>Searching for a more general term</li>
				</ul>
			</div>
		</div>
	{:else}
		<div class="space-y-12">
			{#if results.strings.length > 0}
				<section>
					<h2 class="text-2xl font-bold mb-4">
						String Reviews ({results.strings.length})
					</h2>
					<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each results.strings as review}
							<StringReviewCard {review} />
						{/each}
					</div>
				</section>
			{/if}

			{#if results.machines.length > 0}
				<section>
					<h2 class="text-2xl font-bold mb-4">
						Stringing Machines ({results.machines.length})
					</h2>
					<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each results.machines as machine}
							<MachineCard {machine} />
						{/each}
					</div>
				</section>
			{/if}

			{#if results.articles.length > 0}
				<section>
					<h2 class="text-2xl font-bold mb-4">Articles ({results.articles.length})</h2>
					<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
						{#each results.articles as article}
							<ArticleCard {article} />
						{/each}
					</div>
				</section>
			{/if}
		</div>
	{/if}
</div>
```

3. **Create Search Utility File** (`src/lib/utils/search.ts`):

```typescript
export function highlightText(text: string, query: string): string {
	if (!query || query.trim().length === 0) return text;
	
	const queryWords = query.trim().split(/\s+/).filter(w => w.length > 0);
	let highlighted = text;
	
	queryWords.forEach(word => {
		const regex = new RegExp(`(${word})`, 'gi');
		highlighted = highlighted.replace(regex, '<mark class="bg-warning text-warning-content">$1</mark>');
	});
	
	return highlighted;
}

export function truncateText(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;
	return text.substring(0, maxLength) + '...';
}

export function extractSnippet(text: string, query: string, snippetLength: number = 150): string {
	const lowerText = text.toLowerCase();
	const lowerQuery = query.toLowerCase();
	const index = lowerText.indexOf(lowerQuery);
	
	if (index === -1) {
		return truncateText(text, snippetLength);
	}
	
	const start = Math.max(0, index - snippetLength / 2);
	const end = Math.min(text.length, index + query.length + snippetLength / 2);
	
	let snippet = text.substring(start, end);
	if (start > 0) snippet = '...' + snippet;
	if (end < text.length) snippet = snippet + '...';
	
	return snippet;
}
```

### Testing
- [ ] Test autocomplete in SearchBar
- [ ] Test keyboard navigation
- [ ] Test result highlighting
- [ ] Test filter options
- [ ] Test sorting options
- [ ] Test search results page
- [ ] Test on mobile devices
- [ ] Test performance with large datasets

---

## Final Verification Checklist

### Search API
- [ ] Search API works correctly
- [ ] Autocomplete endpoint works
- [ ] Error handling works
- [ ] Performance is acceptable
- [ ] Results are relevant

### Search UI
- [ ] SearchBar has autocomplete
- [ ] Keyboard navigation works
- [ ] Search results page displays correctly
- [ ] Result highlighting works
- [ ] Filter options work
- [ ] Sorting options work
- [ ] Mobile responsive

### Integration
- [ ] Search integrates with navigation
- [ ] Recent searches work
- [ ] URL parameters work
- [ ] Error states handled
- [ ] Loading states work

---

## Implementation Commands

### Create Missing Files
```bash
# Create search utility file
touch src/lib/utils/search.ts

# Create autocomplete endpoint
mkdir -p src/routes/api/search/autocomplete
touch src/routes/api/search/autocomplete/+server.ts
```

### Testing Commands
```bash
# Test search API
curl "http://localhost:5173/api/search?q=polyester"

# Test autocomplete API
curl "http://localhost:5173/api/search/autocomplete?q=poly"

# Run dev server
npm run dev
```

---

## Success Criteria

Phase 6 is complete when:
- ✅ Search API works correctly
- ✅ Autocomplete endpoint works
- ✅ SearchBar has live autocomplete
- ✅ Search results page displays results
- ✅ Result highlighting works
- ✅ Filter options work
- ✅ Sorting options work
- ✅ Keyboard navigation works
- ✅ Mobile responsive
- ✅ Performance is acceptable

---

## Next Steps

After completing Phase 6:
1. Move to **Phase 7: Analytics & Tracking**
2. Add search analytics tracking
3. Track search queries

---

## Notes

- Most search functionality exists
- Focus on autocomplete and result highlighting
- Filter and sort options improve UX
- Keyboard navigation improves accessibility
- Performance optimization may be needed for large datasets

---

**Last Updated**: Based on current project state assessment
**Status**: Ready for enhancement of search functionality
