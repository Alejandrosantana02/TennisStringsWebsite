
<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import GoogleAnalytics from '$lib/components/seo/GoogleAnalytics.svelte';

	// Environment variables
	const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
</script>

<GoogleAnalytics measurementId={GA_MEASUREMENT_ID} />

<div class="min-h-screen flex flex-col">
	<Header />
	<main class="flex-grow">
		<slot />
	</main>
	<Footer />
</div>
