<script lang="ts">
	import type { Article } from '$lib/types';
	import { format } from 'date-fns';
	import { onMount } from 'svelte';

	export let article: Article;

	let headings: { id: string; text: string; level: number }[] = [];

	onMount(() => {
		// Extract headings from content for table of contents
		// This is a simplified version - in production, you'd parse markdown properly
		const headingRegex = /^(#{1,3})\s+(.+)$/gm;
		const matches = [...article.content.matchAll(headingRegex)];
		headings = matches.map((match, index) => ({
			id: `heading-${index}`,
			text: match[2],
			level: match[1].length
		}));
	});

	function formatContent(content: string): string {
		// Simple markdown-like formatting
		// In production, use a proper markdown parser
		return content
			.replace(/^# (.+)$/gm, '<h1>$1</h1>')
			.replace(/^## (.+)$/gm, '<h2>$1</h2>')
			.replace(/^### (.+)$/gm, '<h3>$1</h3>')
			.replace(/\n\n/g, '</p><p>')
			.replace(/^\*\*(.+)\*\*$/gm, '<strong>$1</strong>')
			.replace(/^\*(.+)\*$/gm, '<em>$1</em>');
	}
</script>

<article class="container mx-auto px-4 py-8">
	<!-- Header -->
	<div class="mb-8">
		<div class="flex items-center gap-2 mb-4">
			<span class="badge badge-lg">{article.category}</span>
			{#if article.readingTime}
				<span class="text-sm text-base-content/60">{article.readingTime} min read</span>
			{/if}
		</div>
		<h1 class="text-4xl font-bold mb-4">{article.title}</h1>
		<div class="flex items-center gap-4 text-sm text-base-content/70">
			<span>By {article.author}</span>
			<span>•</span>
			<span>{format(new Date(article.publishedAt), 'MMMM d, yyyy')}</span>
		</div>
		<div class="flex flex-wrap gap-2 mt-4">
			{#each article.tags as tag}
				<span class="badge badge-outline">{tag}</span>
			{/each}
		</div>
	</div>

	<!-- Featured Image -->
	{#if article.images.featured}
		<figure class="mb-8">
			<img
				src={article.images.featured}
				alt={article.title}
				class="w-full rounded-lg shadow-xl"
			/>
		</figure>
	{/if}

	<div class="grid lg:grid-cols-4 gap-8">
		<!-- Table of Contents -->
		{#if headings.length > 0}
			<aside class="lg:col-span-1">
				<div class="sticky top-24">
					<div class="card bg-base-200">
						<div class="card-body">
							<h3 class="card-title text-lg">Table of Contents</h3>
							<ul class="menu">
								{#each headings as heading}
									<li>
										<a
											href="#{heading.id}"
											class="text-sm {heading.level === 1 ? 'font-bold' : heading.level === 2 ? 'ml-4' : 'ml-8'}"
										>
											{heading.text}
										</a>
									</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>
			</aside>
		{/if}

		<!-- Content -->
		<div class="lg:col-span-3 prose max-w-none">
			<div class="whitespace-pre-line">{@html formatContent(article.content)}</div>
		</div>
	</div>
</article>
