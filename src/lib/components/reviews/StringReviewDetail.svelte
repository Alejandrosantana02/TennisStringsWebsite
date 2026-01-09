<script lang="ts">
	import type { StringReview } from '$lib/types';
	import RatingStars from './RatingStars.svelte';
	import AffiliateButton from '../affiliate/AffiliateButton.svelte';
	import AffiliateDisclosure from '../affiliate/AffiliateDisclosure.svelte';
	import OptimizedImage from '../images/OptimizedImage.svelte';
	import { hasAffiliateLinks } from '$lib/utils/affiliate';

	export let review: StringReview;

	function getRatingLabel(value: number): string {
		if (value >= 8) return 'Excellent';
		if (value >= 6) return 'Good';
		if (value >= 4) return 'Average';
		return 'Below Average';
	}

	function getRatingColor(value: number): string {
		if (value >= 8) return 'text-success';
		if (value >= 6) return 'text-info';
		if (value >= 4) return 'text-warning';
		return 'text-error';
	}
</script>

<article class="container mx-auto px-4 py-8">
	<!-- Hero Section -->
	<div class="hero bg-base-200 rounded-lg mb-8">
		<div class="hero-content flex-col lg:flex-row gap-8">
			<OptimizedImage
				src={review.images.featured}
				alt="{review.brand} {review.name}"
				loading="eager"
				width={400}
				height={400}
				className="max-w-sm rounded-lg shadow-2xl"
			/>
			<div>
				<h1 class="text-4xl font-bold mb-2">{review.name}</h1>
				<p class="text-2xl text-base-content/70 mb-4">{review.brand}</p>
				<div class="mb-4">
					<RatingStars rating={review.ratings.overall} size="lg" />
				</div>
				<div class="flex flex-wrap gap-2 mb-4">
					<span class="badge badge-lg">{review.type}</span>
					<span class="badge badge-lg">{review.gauge} gauge</span>
					<span class="badge badge-lg badge-primary">${review.price}</span>
				</div>
				<p class="text-lg mb-6">{review.content.summary}</p>
				<div class="flex flex-wrap gap-2">
					{#if review.affiliateLinks.amazon}
						<AffiliateButton
							href={review.affiliateLinks.amazon}
							vendor="amazon"
							text="Check Price on Amazon"
						/>
					{/if}
					{#if review.affiliateLinks.tennisWarehouse}
						<AffiliateButton
							href={review.affiliateLinks.tennisWarehouse}
							vendor="tennisWarehouse"
							text="Buy on Tennis Warehouse"
						/>
					{/if}
				</div>
			</div>
		</div>
	</div>

	<!-- Rating Breakdown -->
	<div class="card bg-base-100 shadow-xl mb-8">
		<div class="card-body">
			<h2 class="card-title mb-4">Rating Breakdown</h2>
			<div class="space-y-4">
				<div>
					<div class="flex justify-between mb-1">
						<span>Stiffness</span>
						<span class={getRatingColor(review.ratings.stiffness)}>
							{review.ratings.stiffness}/10 - {getRatingLabel(review.ratings.stiffness)}
						</span>
					</div>
					<progress
						class="progress progress-primary w-full"
						value={review.ratings.stiffness}
						max="10"
					></progress>
				</div>
				<div>
					<div class="flex justify-between mb-1">
						<span>Power</span>
						<span class={getRatingColor(review.ratings.power)}>
							{review.ratings.power}/10 - {getRatingLabel(review.ratings.power)}
						</span>
					</div>
					<progress
						class="progress progress-info w-full"
						value={review.ratings.power}
						max="10"
					></progress>
				</div>
				<div>
					<div class="flex justify-between mb-1">
						<span>Spin</span>
						<span class={getRatingColor(review.ratings.spin)}>
							{review.ratings.spin}/10 - {getRatingLabel(review.ratings.spin)}
						</span>
					</div>
					<progress
						class="progress progress-success w-full"
						value={review.ratings.spin}
						max="10"
					></progress>
				</div>
				<div>
					<div class="flex justify-between mb-1">
						<span>Durability</span>
						<span class={getRatingColor(review.ratings.durability)}>
							{review.ratings.durability}/10 - {getRatingLabel(review.ratings.durability)}
						</span>
					</div>
					<progress
						class="progress progress-warning w-full"
						value={review.ratings.durability}
						max="10"
					></progress>
				</div>
				<div>
					<div class="flex justify-between mb-1">
						<span>Comfort</span>
						<span class={getRatingColor(review.ratings.comfort)}>
							{review.ratings.comfort}/10 - {getRatingLabel(review.ratings.comfort)}
						</span>
					</div>
					<progress
						class="progress progress-error w-full"
						value={review.ratings.comfort}
						max="10"
					></progress>
				</div>
			</div>
		</div>
	</div>

	<!-- Pros and Cons -->
	<div class="grid md:grid-cols-2 gap-4 mb-8">
		<div class="card bg-success/10 border-success">
			<div class="card-body">
				<h3 class="card-title text-success">Pros</h3>
				<ul class="list-disc list-inside space-y-2">
					{#each review.content.pros as pro}
						<li>{pro}</li>
					{/each}
				</ul>
			</div>
		</div>
		<div class="card bg-error/10 border-error">
			<div class="card-body">
				<h3 class="card-title text-error">Cons</h3>
				<ul class="list-disc list-inside space-y-2">
					{#each review.content.cons as con}
						<li>{con}</li>
					{/each}
				</ul>
			</div>
		</div>
	</div>

	<!-- Full Review -->
	<div class="prose max-w-none mb-8">
		<h2>Full Review</h2>
		<p class="whitespace-pre-line">{review.content.fullReview}</p>
	</div>

	<!-- Affiliate Disclosure -->
	{#if hasAffiliateLinks(review.affiliateLinks)}
		<AffiliateDisclosure variant="inline" />
	{/if}

	<!-- Affiliate Links -->
	<div class="card bg-primary/10 border-primary mb-8">
		<div class="card-body">
			<h3 class="card-title">Where to Buy</h3>
			<div class="flex flex-wrap gap-2">
				{#if review.affiliateLinks.amazon}
					<AffiliateButton
						href={review.affiliateLinks.amazon}
						vendor="amazon"
						text="Buy on Amazon"
						variant="primary"
						productName={review.name}
					/>
				{/if}
				{#if review.affiliateLinks.tennisWarehouse}
					<AffiliateButton
						href={review.affiliateLinks.tennisWarehouse}
						vendor="tennisWarehouse"
						text="Buy on Tennis Warehouse"
						variant="secondary"
						productName={review.name}
					/>
				{/if}
				{#if review.affiliateLinks.dicks}
					<AffiliateButton
						href={review.affiliateLinks.dicks}
						vendor="dicks"
						text="Buy on Dick's"
						variant="secondary"
						productName={review.name}
					/>
				{/if}
			</div>
		</div>
	</div>
</article>
