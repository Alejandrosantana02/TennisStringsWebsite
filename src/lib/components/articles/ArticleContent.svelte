<script lang="ts">
	import type { Article } from '$lib/types';
	import { format } from 'date-fns';
	import { onMount } from 'svelte';
	import OptimizedImage from '../images/OptimizedImage.svelte';

	export let article: Article;

	let headings: { id: string; text: string; level: number }[] = [];

	onMount(() => {
		// Extract headings from content for table of contents
		const headingRegex = /^(#{1,3})\s+(.+)$/gm;
		const matches = [...article.content.matchAll(headingRegex)];
		headings = matches.map((match, index) => ({
			id: `heading-${index}`,
			text: match[2],
			level: match[1].length
		}));
	});

	function formatContent(content: string): string {
		// Enhanced markdown-like formatting
		let headingCounter = 0;

		return content
			// Headings with IDs for table of contents
			.replace(/^# (.+)$/gm, (match, title) => `<h1 id="heading-${headingCounter++}" class="text-3xl font-bold mt-8 mb-4">${title}</h1>`)
			.replace(/^## (.+)$/gm, (match, title) => `<h2 id="heading-${headingCounter++}" class="text-2xl font-semibold mt-6 mb-3">${title}</h2>`)
			.replace(/^### (.+)$/gm, (match, title) => `<h3 id="heading-${headingCounter++}" class="text-xl font-medium mt-4 mb-2">${title}</h3>`)
			// Bold text
			.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
			// Italic text
			.replace(/\*(.+?)\*/g, '<em>$1</em>')
			// Bullet points - convert to proper list structure
			.replace(/^-\s+(.+)$/gm, '<li>$1</li>')
			// Wrap consecutive list items in ul tags
			.replace(/(<li>.*?<\/li>\s*)+/gs, (match) => `<ul class="list-disc list-inside space-y-1 mb-4">${match}</ul>`)
			// Handle paragraphs (split by double newlines, but preserve structure)
			.split('\n\n')
			.map(paragraph => {
				paragraph = paragraph.trim();
				if (!paragraph) return '';

				// If it's already HTML or a list, return as-is
				if (paragraph.includes('<li>') || paragraph.includes('<h')) {
					return paragraph;
				}

				// Otherwise wrap in paragraph tags
				return `<p class="mb-4">${paragraph.replace(/\n/g, ' ')}</p>`;
			})
			.filter(p => p)
			.join('\n');
	}
</script>

<article class="container mx-auto px-4 py-8">
	<!-- Header -->
	<div class="mb-6 sm:mb-8">
		<div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
			<span class="badge badge-lg self-start">{article.category}</span>
			{#if article.readingTime}
				<span class="text-sm text-base-content/60">{article.readingTime} min read</span>
			{/if}
		</div>
		<h1 class="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">{article.title}</h1>
		<div class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-base-content/70">
			<span>By {article.author}</span>
			<span class="hidden sm:block">•</span>
			<span>{format(new Date(article.publishedAt), 'MMMM d, yyyy')}</span>
		</div>
		<div class="flex flex-wrap gap-2 mt-4">
			{#each article.tags as tag}
				<span class="badge badge-outline badge-sm">{tag}</span>
			{/each}
		</div>
	</div>

	<!-- Featured Image -->
	{#if article.images.featured}
		<figure class="mb-8">
			<OptimizedImage
				src={article.images.featured}
				alt={article.title}
				loading="eager"
				width={1200}
				height={600}
				className="w-full rounded-lg shadow-xl"
			/>
		</figure>
	{/if}

	<div class="grid lg:grid-cols-4 gap-6 lg:gap-8">
		<!-- Table of Contents -->
		{#if headings.length > 0}
			<aside class="lg:col-span-1 order-2 lg:order-1">
				<div class="sticky top-24">
					<div class="card bg-base-200">
						<div class="card-body p-4 lg:p-6">
							<h3 class="card-title text-base lg:text-lg">Table of Contents</h3>
							<ul class="menu menu-compact lg:menu-normal">
								{#each headings as heading}
									<li>
										<a
											href="#{heading.id}"
											class="text-xs lg:text-sm {heading.level === 1 ? 'font-bold' : heading.level === 2 ? 'ml-2 lg:ml-4' : 'ml-4 lg:ml-8'}"
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
		<div class="lg:col-span-3 order-1 lg:order-2 prose prose-sm sm:prose lg:prose-lg max-w-none">
			<div class="whitespace-pre-line">{@html formatContent(article.content)}</div>
		</div>
	</div>
</article>
