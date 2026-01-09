<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import ArticleContent from '$lib/components/articles/ArticleContent.svelte';
	import SchemaMarkup from '$lib/components/seo/SchemaMarkup.svelte';
	import { generateArticleSchema } from '$lib/utils/schema';
	import { trackContentView } from '$lib/utils/analytics';

	export let data: PageData;

	onMount(() => {
		trackContentView('article', data.article.id, data.article.title);
	});
</script>

<svelte:head>
	<title>{data.article.title} - Tennis Stringing Guide</title>
	<meta name="description" content={data.article.seo.metaDescription} />
	<meta name="keywords" content={data.article.seo.keywords.join(', ')} />
</svelte:head>

<SchemaMarkup schema={generateArticleSchema(data.article)} />

<ArticleContent article={data.article} />
