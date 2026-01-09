<script lang="ts">
	import type { StringReview } from '$lib/types';
	import RatingStars from './RatingStars.svelte';
	import OptimizedImage from '../images/OptimizedImage.svelte';

	export let review: StringReview;
</script>

<div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
	<figure class="h-48 bg-base-200">
		<OptimizedImage
			src={review.images.featured}
			alt="{review.brand} {review.name}"
			loading="lazy"
			width={400}
			height={300}
			className="object-cover w-full h-full"
		/>
	</figure>
	<div class="card-body">
		<div class="flex items-start justify-between mb-2">
			<div>
				<h2 class="card-title text-lg">{review.name}</h2>
				<p class="text-sm text-base-content/70">{review.brand}</p>
			</div>
			{#if Object.keys(review.affiliateLinks).length > 0}
				<div class="badge badge-primary">Affiliate</div>
			{/if}
		</div>

		<div class="mb-4">
			<RatingStars rating={review.ratings.overall} size="sm" />
		</div>

		<p class="text-sm text-base-content/80 mb-4 line-clamp-2">{review.content.summary}</p>

		<div class="flex flex-wrap gap-2 mb-4">
			<span class="badge badge-outline">{review.type}</span>
			<span class="badge badge-outline">{review.gauge} gauge</span>
			<span class="badge badge-outline">${review.price}</span>
		</div>

		<div class="card-actions justify-end">
			<a href="/reviews/{review.slug}" class="btn btn-primary btn-sm">Read Review</a>
		</div>
	</div>
</div>
