<script lang="ts">
	export let rating: number; // 1-5
	export let size: 'sm' | 'md' | 'lg' = 'md';

	const sizeClasses = {
		sm: 'w-4 h-4',
		md: 'w-5 h-5',
		lg: 'w-6 h-6'
	};
</script>

<div class="flex items-center gap-1" role="img" aria-label="Rating: {rating} out of 5 stars">
	{#each Array(5) as _, i}
		{#if i < Math.floor(rating)}
			<!-- Full star -->
			<svg
				class="{sizeClasses[size]} text-warning"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<path
					d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
				/>
			</svg>
		{:else if i < rating}
			<!-- Half star -->
			<svg
				class="{sizeClasses[size]} text-warning"
				fill="currentColor"
				viewBox="0 0 20 20"
			>
				<defs>
					<linearGradient id="half-{i}">
						<stop offset="50%" stop-color="currentColor" />
						<stop offset="50%" stop-color="transparent" stop-opacity="1" />
					</linearGradient>
				</defs>
				<path
					fill="url(#half-{i})"
					d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
				/>
			</svg>
		{:else}
			<!-- Empty star -->
			<svg
				class="{sizeClasses[size]} text-base-300"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 20 20"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
				/>
			</svg>
		{/if}
	{/each}
	<span class="ml-2 text-sm text-base-content/70">({rating.toFixed(1)})</span>
</div>
