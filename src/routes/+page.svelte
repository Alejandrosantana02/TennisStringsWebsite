<script lang="ts">
	import { onMount } from 'svelte';
	import StringReviewCard from '$lib/components/reviews/StringReviewCard.svelte';
	import MachineCard from '$lib/components/machines/MachineCard.svelte';
	import ArticleCard from '$lib/components/articles/ArticleCard.svelte';
	import { loadStringReviews, loadMachineReviews, loadArticles } from '$lib/utils/content';
	import type { StringReview, StringingMachine, Article } from '$lib/types';

	let featuredStrings: StringReview[] = [];
	let featuredMachines: StringingMachine[] = [];
	let latestArticles: Article[] = [];

	onMount(async () => {
		const [strings, machines, articles] = await Promise.all([
			loadStringReviews(),
			loadMachineReviews(),
			loadArticles()
		]);

		featuredStrings = strings.slice(0, 3);
		featuredMachines = machines.slice(0, 2);
		latestArticles = articles.slice(0, 3);
	});
</script>

<svelte:head>
	<title>Tennis String Reviews & Stringing Machines - Expert Reviews & Guides</title>
	<meta
		name="description"
		content="Expert reviews of tennis strings and stringing machines. Find the perfect string for your game and the best stringing machine for your needs."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="hero bg-gradient-to-r from-primary to-primary-focus text-primary-content min-h-[60vh]">
	<div class="hero-content text-center">
		<div class="max-w-3xl">
			<h1 class="mb-5 text-5xl font-bold">Tennis String Reviews & Stringing Machines</h1>
			<p class="mb-5 text-xl">
				Expert reviews, buying guides, and tutorials to help you find the perfect tennis string and
				stringing machine for your game.
			</p>
			<div class="flex gap-4 justify-center">
				<a href="/reviews" class="btn btn-lg btn-secondary">Browse String Reviews</a>
				<a href="/machines" class="btn btn-lg btn-outline btn-secondary">View Machines</a>
			</div>
		</div>
	</div>
</section>

<!-- Featured String Reviews -->
<section class="container mx-auto px-4 py-16">
	<div class="flex justify-between items-center mb-8">
		<h2 class="text-3xl font-bold">Featured String Reviews</h2>
		<a href="/reviews" class="btn btn-ghost">View All →</a>
	</div>
	<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each featuredStrings as review}
			<StringReviewCard {review} />
		{/each}
	</div>
</section>

<!-- Featured Machines -->
<section class="container mx-auto px-4 py-16 bg-base-200">
	<div class="flex justify-between items-center mb-8">
		<h2 class="text-3xl font-bold">Featured Stringing Machines</h2>
		<a href="/machines" class="btn btn-ghost">View All →</a>
	</div>
	<div class="grid md:grid-cols-2 gap-6">
		{#each featuredMachines as machine}
			<MachineCard {machine} />
		{/each}
	</div>
</section>

<!-- Latest Articles -->
<section class="container mx-auto px-4 py-16">
	<div class="flex justify-between items-center mb-8">
		<h2 class="text-3xl font-bold">Latest Guides & Articles</h2>
		<a href="/guides" class="btn btn-ghost">View All →</a>
	</div>
	<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each latestArticles as article}
			<ArticleCard {article} />
		{/each}
	</div>
</section>
