<script lang="ts">
	import { onMount } from 'svelte';
	import MachineCard from '$lib/components/machines/MachineCard.svelte';
	import { loadMachineReviews } from '$lib/utils/content';
	import type { StringingMachine } from '$lib/types';

	let machines: StringingMachine[] = [];
	let loading = true;

	onMount(async () => {
		machines = await loadMachineReviews();
		loading = false;
	});
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

	{#if loading}
		<div class="flex justify-center items-center min-h-[400px]">
			<span class="loading loading-spinner loading-lg"></span>
		</div>
	{:else}
		<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
			{#each machines as machine}
				<MachineCard {machine} />
			{/each}
		</div>
	{/if}
</div>
