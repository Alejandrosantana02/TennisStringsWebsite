<script lang="ts">
	import type { StringingMachine } from '$lib/types';
	import AffiliateButton from '../affiliate/AffiliateButton.svelte';
	import AffiliateDisclosure from '../affiliate/AffiliateDisclosure.svelte';
	import OptimizedImage from '../images/OptimizedImage.svelte';
	import { hasAffiliateLinks } from '$lib/utils/affiliate';

	export let machine: StringingMachine;
</script>

<article class="max-w-5xl mx-auto px-4 py-8">
	<!-- Hero Section -->
	<div class="hero bg-base-200 rounded-lg mb-8">
		<div class="hero-content flex-col lg:flex-row gap-8">
			<OptimizedImage
				src={machine.images.featured}
				alt="{machine.brand} {machine.name}"
				loading="eager"
				width={400}
				height={400}
				className="max-w-sm rounded-lg shadow-2xl"
			/>
			<div>
				<h1 class="text-4xl font-bold mb-2">{machine.name}</h1>
				<p class="text-2xl text-base-content/70 mb-4">{machine.brand}</p>
				<div class="flex flex-wrap gap-2 mb-4">
					<span class="badge badge-lg">{machine.type}</span>
					<span class="badge badge-lg badge-primary">
						${machine.priceRange ? `${machine.priceRange.min}-${machine.priceRange.max}` : `$${machine.price}`}
					</span>
				</div>
				<p class="text-lg mb-6">{machine.content.summary}</p>
				<div class="flex flex-wrap gap-2">
					{#if machine.affiliateLinks.amazon}
						<AffiliateButton
							href={machine.affiliateLinks.amazon}
							vendor="amazon"
							text="Check Price on Amazon"
						/>
					{/if}
					{#if machine.affiliateLinks.tennisWarehouse}
						<AffiliateButton
							href={machine.affiliateLinks.tennisWarehouse}
							vendor="tennisWarehouse"
							text="Buy on Tennis Warehouse"
						/>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- Specifications -->
	<div class="card bg-base-100 shadow-xl mb-8">
		<div class="card-body">
			<h2 class="card-title mb-4">Specifications</h2>
			<div class="overflow-x-auto">
				<table class="table table-zebra">
					<tbody>
						<tr>
							<td class="font-bold">Type</td>
							<td>{machine.type}</td>
						</tr>
						<tr>
							<td class="font-bold">Mounting System</td>
							<td>{machine.specifications.mountingSystem}</td>
						</tr>
						<tr>
							<td class="font-bold">Tension Range</td>
							<td>{machine.specifications.tensionRange}</td>
						</tr>
						{#if machine.specifications.weight}
							<tr>
								<td class="font-bold">Weight</td>
								<td>{machine.specifications.weight}</td>
							</tr>
						{/if}
						{#if machine.specifications.dimensions}
							<tr>
								<td class="font-bold">Dimensions</td>
								<td>{machine.specifications.dimensions}</td>
							</tr>
						{/if}
						{#if machine.specifications.warranty}
							<tr>
								<td class="font-bold">Warranty</td>
								<td>{machine.specifications.warranty}</td>
							</tr>
						{/if}
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<!-- Pros and Cons -->
	<div class="grid md:grid-cols-2 gap-4 mb-8">
		<div class="card bg-success/10 border-success">
			<div class="card-body">
				<h3 class="card-title text-success">Pros</h3>
				<ul class="list-disc list-inside space-y-2">
					{#each machine.content.pros as pro}
						<li>{pro}</li>
					{/each}
				</ul>
			</div>
		</div>
		<div class="card bg-error/10 border-error">
			<div class="card-body">
				<h3 class="card-title text-error">Cons</h3>
				<ul class="list-disc list-inside space-y-2">
					{#each machine.content.cons as con}
						<li>{con}</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>

	<!-- Full Review -->
	<div class="prose max-w-none mb-8">
		<h2>Full Review</h2>
		<p class="whitespace-pre-line">{machine.content.fullReview}</p>
	</div>

	<!-- Affiliate Disclosure -->
	{#if hasAffiliateLinks(machine.affiliateLinks)}
		<AffiliateDisclosure variant="inline" />
	{/if}

	<!-- Affiliate Links -->
	<div class="card bg-primary/10 border-primary mb-8">
		<div class="card-body">
			<h3 class="card-title">Where to Buy</h3>
			<div class="flex flex-wrap gap-2">
				{#if machine.affiliateLinks.amazon}
					<AffiliateButton
						href={machine.affiliateLinks.amazon}
						vendor="amazon"
						text="Buy on Amazon"
						variant="primary"
						productName={machine.name}
					/>
				{/if}
				{#if machine.affiliateLinks.tennisWarehouse}
					<AffiliateButton
						href={machine.affiliateLinks.tennisWarehouse}
						vendor="tennisWarehouse"
						text="Buy on Tennis Warehouse"
						variant="secondary"
						productName={machine.name}
					/>
				{/if}
				{#if machine.affiliateLinks.dicks}
					<AffiliateButton
						href={machine.affiliateLinks.dicks}
						vendor="dicks"
						text="Buy on Dick's"
						variant="secondary"
						productName={machine.name}
					/>
				{/if}
			</div>
		</div>
	</div>
</article>
