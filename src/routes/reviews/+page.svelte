<script lang="ts">
	import { onMount } from 'svelte';
	import StringReviewCard from '$lib/components/reviews/StringReviewCard.svelte';
	import ComparisonTable from '$lib/components/reviews/ComparisonTable.svelte';
	import { loadStringReviews } from '$lib/utils/content';
	import type { StringReview } from '$lib/types';

	let reviews: StringReview[] = [];
	let viewMode: 'grid' | 'table' = 'grid';
	let loading = true;
	let displayCount = 6; // Start with 6 reviews for faster initial load
	let showLoadMore = false;

	onMount(async () => {
		const allReviews = await loadStringReviews();
		reviews = allReviews.slice(0, displayCount);
		showLoadMore = allReviews.length > displayCount;
		loading = false;
	});

	function loadMore() {
		displayCount += 6;
		loadStringReviews().then(allReviews => {
			reviews = allReviews.slice(0, displayCount);
			showLoadMore = displayCount < allReviews.length;
		});
	}
</script>

<svelte:head>
	<title>Tennis String Reviews - Expert Reviews of All String Types</title>
	<meta
		name="description"
		content="Comprehensive reviews of tennis strings including polyester, multifilament, hybrid, and natural gut strings. Compare ratings, prices, and find the perfect string."
	/>
</svelte:head>

<div class="container mx-auto px-4 py-6 sm:py-8">
	<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold">Tennis String Reviews</h1>
		<div class="flex gap-2 w-full sm:w-auto">
			<button
				class="btn btn-sm flex-1 sm:flex-none {viewMode === 'grid' ? 'btn-primary' : 'btn-ghost'}"
				on:click={() => (viewMode = 'grid')}
			>
				Grid
			</button>
			<button
				class="btn btn-sm flex-1 sm:flex-none {viewMode === 'table' ? 'btn-primary' : 'btn-ghost'}"
				on:click={() => (viewMode = 'table')}
			>
				Table
			</button>
		</div>
	</div>

	{#if loading}
		<div class="flex justify-center items-center min-h-[400px]">
			<span class="loading loading-spinner loading-lg"></span>
		</div>
	{:else if viewMode === 'grid'}
		<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
			{#each reviews as review}
				<StringReviewCard {review} />
			{/each}
		</div>
		{#if showLoadMore}
			<div class="flex justify-center mt-6 sm:mt-8">
				<button class="btn btn-primary btn-lg w-full sm:w-auto" on:click={loadMore}>
					Load More Reviews
				</button>
			</div>
		{/if}
	{:else}
		<ComparisonTable {reviews} limit={6} />
	{/if}
</div>
