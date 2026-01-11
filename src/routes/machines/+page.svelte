<script lang="ts">
	import MachineCard from '$lib/components/machines/MachineCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: machines = data.machines;
</script>

<svelte:head>
	<title>Stringing Machine Reviews - Best Tennis Stringing Machines</title>
	<meta
		name="description"
		content="Expert reviews of tennis stringing machines. Compare drop-weight, crank, and electronic machines. Find the best stringing machine for your needs."
	/>
</svelte:head>

<div class="container mx-auto px-4 py-8">
	<h1 class="text-4xl font-bold mb-8">Stringing Machine Reviews</h1>

	<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
		{#each machines as machine}
			<MachineCard {machine} />
		{/each}
	</div>
</div>
