<script lang="ts">
	import ArticleCard from '$lib/components/articles/ArticleCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: articles = data.articles;
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

	<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each articles as article}
			<ArticleCard {article} />
		{/each}
	</div>
</div>
