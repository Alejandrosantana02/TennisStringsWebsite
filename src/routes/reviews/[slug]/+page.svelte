<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import StringReviewDetail from '$lib/components/reviews/StringReviewDetail.svelte';
	import SchemaMarkup from '$lib/components/seo/SchemaMarkup.svelte';
	import { generateReviewSchema, generateProductSchema } from '$lib/utils/schema';
	import { trackContentView } from '$lib/utils/analytics';

	export let data: PageData;

	onMount(() => {
		trackContentView('string_review', data.review.id, data.review.name);
	});
</script>

<svelte:head>
	<title>{data.review.name} Review - {data.review.brand} Tennis String</title>
	<meta name="description" content={data.review.seo.metaDescription} />
	<meta name="keywords" content={data.review.seo.keywords.join(', ')} />
</svelte:head>

<SchemaMarkup schema={generateReviewSchema(data.review)} />
<SchemaMarkup schema={generateProductSchema(data.review)} />

<StringReviewDetail review={data.review} />
