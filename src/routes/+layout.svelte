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

<GoogleAnalytics measurementId={PUBLIC_GA_ID} />

<div class="min-h-screen flex flex-col">
	<Header />
	<main class="flex-grow">
		<slot />
	</main>
	<Footer />
</div>
