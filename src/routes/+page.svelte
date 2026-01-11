<script lang="ts">
	import StringReviewCard from '$lib/components/reviews/StringReviewCard.svelte';
	import MachineCard from '$lib/components/machines/MachineCard.svelte';
	import ArticleCard from '$lib/components/articles/ArticleCard.svelte';
	import NewsletterSignup from '$lib/components/newsletter/NewsletterSignup.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ featuredStrings, featuredMachines, latestArticles } = data);
</script>

<svelte:head>
	<title>Tennis String Reviews & Stringing Machines - Expert Reviews & Guides</title>
	<meta
		name="description"
		content="Expert reviews of tennis strings and stringing machines. Find the perfect string for your game and the best stringing machine for your needs."
	/>
</svelte:head>

<!-- Hero Section -->
<section class="hero bg-gradient-to-r from-primary to-primary-focus text-primary-content min-h-[50vh] sm:min-h-[60vh]">
	<div class="hero-content text-center px-4">
		<div class="max-w-3xl">
			<h1 class="mb-5 text-3xl sm:text-4xl lg:text-5xl font-bold px-2">Tennis String Reviews & Stringing Machines</h1>
			<p class="mb-5 text-lg sm:text-xl px-4">
				Expert reviews, buying guides, and tutorials to help you find the perfect tennis string and
				stringing machine for your game.
			</p>
			<div class="flex flex-col sm:flex-row gap-4 justify-center px-4">
				<a href="/reviews" class="btn btn-lg btn-secondary w-full sm:w-auto">Browse String Reviews</a>
				<a href="/machines" class="btn btn-lg btn-outline btn-secondary w-full sm:w-auto">View Machines</a>
			</div>
		</div>
	</div>
</section>

<!-- Featured String Reviews -->
<section class="container mx-auto px-4 py-8 sm:py-16">
	<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
		<h2 class="text-2xl sm:text-3xl font-bold">Featured String Reviews</h2>
		<a href="/reviews" class="btn btn-ghost btn-sm sm:btn-md">View All →</a>
	</div>
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
		{#each featuredStrings as review}
			<StringReviewCard {review} />
		{/each}
	</div>
</section>

<!-- Featured Machines -->
<section class="container mx-auto px-4 py-8 sm:py-16 bg-base-200">
	<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
		<h2 class="text-2xl sm:text-3xl font-bold">Featured Stringing Machines</h2>
		<a href="/machines" class="btn btn-ghost btn-sm sm:btn-md">View All →</a>
	</div>
	<div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
		{#each featuredMachines as machine}
			<MachineCard {machine} />
		{/each}
	</div>
</section>

<!-- Latest Articles -->
<section class="container mx-auto px-4 py-8 sm:py-16">
	<div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
		<h2 class="text-2xl sm:text-3xl font-bold">Latest Guides & Articles</h2>
		<a href="/guides" class="btn btn-ghost btn-sm sm:btn-md">View All →</a>
	</div>
	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
		{#each latestArticles as article}
			<ArticleCard {article} />
		{/each}
	</div>
</section>

<!-- Newsletter Signup CTA -->
<section class="container mx-auto px-4 py-8 sm:py-16">
	<div class="bg-primary text-primary-content rounded-lg p-6 sm:p-8 md:p-12">
		<div class="max-w-2xl mx-auto text-center">
			<h2 class="text-2xl sm:text-3xl font-bold mb-4">Stay Updated</h2>
			<p class="text-base sm:text-lg mb-6 px-4">
				Get the latest string reviews, machine comparisons, and expert guides delivered to your inbox.
			</p>
			<div class="flex justify-center">
				<NewsletterSignup source="homepage" size="lg" />
			</div>
		</div>
	</div>
</section>