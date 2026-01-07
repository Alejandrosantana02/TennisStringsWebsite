<script lang="ts">
	import type { Article } from '$lib/types';
	import { format } from 'date-fns';

	export let article: Article;
</script>

<div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
	<figure class="h-48 bg-base-200">
		<img src={article.images.featured} alt={article.title} class="object-cover w-full h-full" />
	</figure>
	<div class="card-body">
		<div class="flex items-center gap-2 mb-2">
			<span class="badge badge-outline">{article.category}</span>
			{#if article.readingTime}
				<span class="text-sm text-base-content/60">{article.readingTime} min read</span>
			{/if}
		</div>
		<h2 class="card-title">{article.title}</h2>
		<p class="text-sm text-base-content/80 mb-4 line-clamp-3">{article.excerpt}</p>
		<div class="flex flex-wrap gap-2 mb-4">
			{#each article.tags.slice(0, 3) as tag}
				<span class="badge badge-ghost badge-sm">{tag}</span>
			{/each}
		</div>
		<div class="card-actions justify-between items-center">
			<span class="text-xs text-base-content/60">
				{format(new Date(article.publishedAt), 'MMM d, yyyy')}
			</span>
			<a href="/guides/{article.slug}" class="btn btn-primary btn-sm">Read More</a>
		</div>
	</div>
</div>
