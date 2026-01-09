<script lang="ts">
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';

	export let measurementId: string | undefined;

	onMount(() => {
		// Only load GA in production
		if (dev || !measurementId) return;

		// Load Google Analytics script
		const script1 = document.createElement('script');
		script1.async = true;
		script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
		document.head.appendChild(script1);

		const script2 = document.createElement('script');
		script2.innerHTML = `
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());
			gtag('config', '${measurementId}');
		`;
		document.head.appendChild(script2);
	});
</script>

<!-- Google Analytics component - no visible output -->