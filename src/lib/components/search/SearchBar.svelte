<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let query = '';
	let showDropdown = false;
	let recentSearches: string[] = [];

	onMount(() => {
		// Load recent searches from localStorage
		const stored = localStorage.getItem('recentSearches');
		if (stored) {
			recentSearches = JSON.parse(stored);
		}
	});

	function handleSearch() {
		if (query.trim().length === 0) return;

		// Save to recent searches
		if (!recentSearches.includes(query.trim())) {
			recentSearches = [query.trim(), ...recentSearches].slice(0, 5);
			localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
		}

		goto(`/search?q=${encodeURIComponent(query.trim())}`);
		showDropdown = false;
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
				on:focus={() => (showDropdown = true)}
				on:blur={() => setTimeout(() => (showDropdown = false), 200)}
				on:keydown={(e) => {
					if (e.key === 'Enter') {
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

	{#if showDropdown && recentSearches.length > 0}
		<div class="absolute top-full left-0 right-0 mt-2 bg-base-100 border border-base-300 rounded-lg shadow-lg z-50">
			<div class="p-2">
				<div class="flex justify-between items-center mb-2 px-2">
					<span class="text-sm font-semibold">Recent Searches</span>
					<button class="btn btn-ghost btn-xs" on:click={clearRecentSearches}>Clear</button>
				</div>
				{#each recentSearches as search}
					<button
						class="btn btn-ghost btn-sm w-full justify-start"
						on:click={() => handleRecentSearch(search)}
					>
						{search}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>
