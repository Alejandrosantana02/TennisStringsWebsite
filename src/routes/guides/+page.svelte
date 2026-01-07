<script lang="ts">
	import { onMount } from 'svelte';
	import ArticleCard from '$lib/components/articles/ArticleCard.svelte';
	import { loadArticles } from '$lib/utils/content';
	import type { Article } from '$lib/types';

	let articles: Article[] = [];
	let loading = true;

	onMount(async () => {
		articles = await loadArticles();
		loading = false;
	});
</script>

<svelte:head>
	<title>Tennis Stringing Guides & Tutorials - Expert Tips & Advice</title>
	<meta
		name="description"
		content="Comprehensive guides on tennis stringing, tension selection, string types, and buying guides. Learn everything you need to know about tennis strings."
	/>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-4xl font-bold mb-8">Guides & Tutorials</h1>

	{#if loading}
		<div class="flex justify-center items-center min-h-[400px]">
			<span class="loading loading-spinner loading-lg"></span>
		</div>
	{:else}
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each articles as article}
				<ArticleCard {article} />
			{/each}
		</div>
	{/if}
</div>
