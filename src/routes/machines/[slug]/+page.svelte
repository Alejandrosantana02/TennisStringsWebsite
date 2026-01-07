<script lang="ts">
	import type { PageData } from './$types';
	import MachineDetail from '$lib/components/machines/MachineDetail.svelte';
	import SchemaMarkup from '$lib/components/seo/SchemaMarkup.svelte';
	import { generateProductSchema } from '$lib/utils/schema';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.machine.name} Review - {data.machine.brand} Stringing Machine</title>
	<meta name="description" content={data.machine.seo.metaDescription} />
	<meta name="keywords" content={data.machine.seo.keywords.join(', ')} />
</svelte:head>

<SchemaMarkup schema={generateProductSchema(data.machine)} />

<MachineDetail machine={data.machine} />
