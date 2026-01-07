<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import StringReviewCard from '$lib/components/reviews/StringReviewCard.svelte';
	import MachineCard from '$lib/components/machines/MachineCard.svelte';
	import ArticleCard from '$lib/components/articles/ArticleCard.svelte';
	import type { StringReview, StringingMachine, Article } from '$lib/types';

	let results: {
		strings: StringReview[];
		machines: StringingMachine[];
		articles: Article[];
	} = {
		strings: [],
		machines: [],
		articles: []
	};
	let loading = true;
	let query = '';

	onMount(async () => {
		query = $page.url.searchParams.get('q') || '';
		if (query) {
			await performSearch(query);
		} else {
			loading = false;
		}
	});

	async function performSearch(searchQuery: string) {
		loading = true;
		try {
			const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
			results = await response.json();
		} catch (error) {
			console.error('Search error:', error);
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Search Results - Tennis String Reviews</title>
	<meta name="description" content="Search results for tennis string reviews, stringing machines, and guides." />
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-4xl font-bold mb-8">Search Results</h1>

	{#if loading}
		<div class="flex justify-center items-center min-h-[400px]">
			<span class="loading loading-spinner loading-lg"></span>
		</div>
	{:else if !query}
		<div class="alert alert-info">
			<span>Please enter a search query</span>
		</div>
	{:else if results.strings.length === 0 && results.machines.length === 0 && results.articles.length === 0}
		<div class="alert alert-warning">
			<span>No results found for "{query}"</span>
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
