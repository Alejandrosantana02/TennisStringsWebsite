<script lang="ts">
	import type { PageData } from './$types';
	import StringReviewDetail from '$lib/components/reviews/StringReviewDetail.svelte';
	import SchemaMarkup from '$lib/components/seo/SchemaMarkup.svelte';
	import { generateReviewSchema, generateProductSchema } from '$lib/utils/schema';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.review.name} Review - {data.review.brand} Tennis String</title>
	<meta name="description" content={data.review.seo.metaDescription} />
	<meta name="keywords" content={data.review.seo.keywords.join(', ')} />
</svelte:head>

<SchemaMarkup schema={generateReviewSchema(data.review)} />
<SchemaMarkup schema={generateProductSchema(data.review)} />

<StringReviewDetail review={data.review} />
