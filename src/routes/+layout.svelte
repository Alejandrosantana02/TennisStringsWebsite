<script lang="ts">
	import '../app.css';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import GoogleAnalytics from '$lib/components/seo/GoogleAnalytics.svelte';
	import { trackPageView, startPageTimer } from '$lib/utils/analytics';

	const PUBLIC_GA_ID = import.meta.env.PUBLIC_GA_ID || import.meta.env.VITE_GA_MEASUREMENT_ID;

	onMount(() => {
		// Track initial page view
		trackPageView();
		startPageTimer();

		// Track page views on navigation
		const unsubscribe = page.subscribe(() => {
			trackPageView();
			startPageTimer();
		});

		return unsubscribe;
	});
</script>

<svelte:head>
	<title>Tennis Strings Website</title>
	<meta name="description" content="Comprehensive guide to tennis strings, reviews, and equipment">
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/daisyui@4.12.24/dist/full.min.css">
	<!-- Force rebuild trigger: v2 -->
</svelte:head>

<GoogleAnalytics measurementId={PUBLIC_GA_ID} />

<div class="min-h-screen flex flex-col bg-base-100 text-base-content">
	<Header />
	<main class="flex-grow">
		<slot />
	</main>
	<Footer />
</div>

<style>
	@import '../app.css';
</style>
