<script lang="ts">
	import { onMount } from 'svelte';
	import StringReviewCard from '$lib/components/reviews/StringReviewCard.svelte';
	import ComparisonTable from '$lib/components/reviews/ComparisonTable.svelte';
	import { loadStringReviews } from '$lib/utils/content';
	import type { StringReview } from '$lib/types';

	let reviews: StringReview[] = [];
	let viewMode: 'grid' | 'table' = 'grid';
	let loading = true;

	onMount(async () => {
		reviews = await loadStringReviews();
		loading = false;
	});
</script>

<svelte:head>
	<title>Tennis String Reviews - Expert Reviews of All String Types</title>
	<meta
		name="description"
		content="Comprehensive reviews of tennis strings including polyester, multifilament, hybrid, and natural gut strings. Compare ratings, prices, and find the perfect string."
	/>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<div class="flex justify-between items-center mb-8">
		<h1 class="text-4xl font-bold">Tennis String Reviews</h1>
		<div class="flex gap-2">
			<button
				class="btn btn-sm {viewMode === 'grid' ? 'btn-primary' : 'btn-ghost'}"
				on:click={() => (viewMode = 'grid')}
			>
				Grid
			</button>
			<button
				class="btn btn-sm {viewMode === 'table' ? 'btn-primary' : 'btn-ghost'}"
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
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each reviews as review}
				<StringReviewCard {review} />
			{/each}
		</div>
	{:else}
		<ComparisonTable {reviews} />
	{/if}
</div>
