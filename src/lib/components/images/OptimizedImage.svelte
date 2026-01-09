<script lang="ts">
	import { onMount } from 'svelte';

	export let src: string;
	export let alt: string;
	export let width: number | undefined = undefined;
	export let height: number | undefined = undefined;
	export let loading: 'lazy' | 'eager' = 'lazy';
	export let className: string = '';
	export let placeholder: string = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3C/svg%3E';
	export let sizes: string | undefined = undefined;

	let imageLoaded: boolean = false;
	let imageError: boolean = false;
	let imageElement: HTMLImageElement | undefined;

	function handleLoad() {
		imageLoaded = true;
	}

	function handleError() {
		imageError = true;
	}

	// Generate optimized src (can be enhanced with Cloudflare Images)
	function getOptimizedSrc(originalSrc: string): string {
		// Check if we're in development and static files aren't being served
		if (import.meta.env.DEV && !originalSrc.startsWith('http')) {
			// In development, show a placeholder instead of broken images
			return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRldiBNb2RlPC90ZXh0Pjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTIiIGZpbGw9IiM5OTkiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIxLjhlbSI+SW1hZ2VzIG5vdCBhdmFpbGFibGUgaW4gZGV2ZWxvcG1lbnQ8L3RleHQ+PC9zdmc+';
		}

		// For now, return original src
		// TODO: Implement Cloudflare Images integration if needed
		// Example: https://yourdomain.com/cdn-cgi/image/format=webp,quality=80/{originalSrc}
		return originalSrc;
	}

	$: optimizedSrc = getOptimizedSrc(src);
</script>

<div class="image-wrapper relative {className}" style="aspect-ratio: {width && height ? `${width}/${height}` : 'auto'};">
	{#if !imageLoaded && placeholder}
		<img
			src={placeholder}
			alt=""
			class="absolute inset-0 w-full h-full object-cover blur-sm"
			aria-hidden="true"
		/>
	{/if}

	<img
		bind:this={imageElement}
		src={optimizedSrc}
		alt={alt}
		width={width}
		height={height}
		loading={loading}
		decoding="async"
		class="transition-opacity duration-300 {imageLoaded ? 'opacity-100' : 'opacity-0'} {className}"
		sizes={sizes}
		on:load={handleLoad}
		on:error={handleError}
	/>
	
	{#if imageError}
		<div class="absolute inset-0 flex items-center justify-center bg-base-200">
			<span class="text-base-content/50">Image failed to load</span>
		</div>
	{/if}
</div>

<style>
	.image-wrapper {
		overflow: hidden;
	}
</style>
