<script lang="ts">
	import type { StringingMachine } from '$lib/types';
	import OptimizedImage from '../images/OptimizedImage.svelte';

	export let machine: StringingMachine;
</script>

<div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
	<figure class="h-48 bg-base-200">
		<OptimizedImage
			src={machine.images.featured}
			alt="{machine.brand} {machine.name}"
			loading="lazy"
			width={400}
			height={300}
			className="object-cover w-full h-full"
		/>
	</figure>
	<div class="card-body">
		<div class="flex items-start justify-between mb-2">
			<div>
				<h2 class="card-title text-lg">{machine.name}</h2>
				<p class="text-sm text-base-content/70">{machine.brand}</p>
			</div>
			{#if Object.keys(machine.affiliateLinks).length > 0}
				<div class="badge badge-primary">Affiliate</div>
			{/if}
		</div>

		<p class="text-sm text-base-content/80 mb-4 line-clamp-2">{machine.content.summary}</p>

		<div class="flex flex-wrap gap-2 mb-4">
			<span class="badge badge-outline">{machine.type}</span>
			<span class="badge badge-outline">
				${machine.priceRange ? `${machine.priceRange.min}-${machine.priceRange.max}` : machine.price}
			</span>
		</div>

		<div class="card-actions justify-end">
			<a href="/machines/{machine.slug}" class="btn btn-primary btn-sm">Read Review</a>
		</div>
	</div>
</div>
