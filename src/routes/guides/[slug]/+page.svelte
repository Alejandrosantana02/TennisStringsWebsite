<script lang="ts">
	import type { PageData } from './$types';
	import ArticleContent from '$lib/components/articles/ArticleContent.svelte';
	import SchemaMarkup from '$lib/components/seo/SchemaMarkup.svelte';
	import { generateArticleSchema } from '$lib/utils/schema';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.article.title} - Tennis Stringing Guide</title>
	<meta name="description" content={data.article.seo.metaDescription} />
	<meta name="keywords" content={data.article.seo.keywords.join(', ')} />
</svelte:head>

<SchemaMarkup schema={generateArticleSchema(data.article)} />

<ArticleContent article={data.article} />
