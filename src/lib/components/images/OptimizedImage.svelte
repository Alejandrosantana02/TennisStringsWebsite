<script lang="ts">
	export let src: string;
	export let alt: string;
	export let width: number | undefined = undefined;
	export let height: number | undefined = undefined;
	export let loading: 'lazy' | 'eager' = 'lazy';
	export let className: string = '';
	export let sizes: string | undefined = undefined;
</script>

<div class="image-wrapper relative {className}" style="aspect-ratio: {width && height ? `${width}/${height}` : 'auto'};">
	<img
		{src}
		{alt}
		{width}
		{height}
		{loading}
		decoding="async"
		class="w-full h-full object-cover {className}"
		{sizes}
	/>
</div>

<style>
	.image-wrapper {
		overflow: hidden;
	}
</style>