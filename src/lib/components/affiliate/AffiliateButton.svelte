<script lang="ts">
	export let href: string;
	export let vendor: string;
	export let text: string;
	export let variant: 'primary' | 'secondary' = 'primary';

	function handleClick() {
		// Track affiliate click (will implement analytics in Sprint 7)
		if (typeof window !== 'undefined' && (window as any).gtag) {
			(window as any).gtag('event', 'affiliate_click', {
				vendor,
				link_url: href
			});
		}
	}

	const variantClasses = {
		primary: 'btn-primary',
		secondary: 'btn-secondary'
	};
</script>

<a
	href={href}
	target="_blank"
	rel="noopener noreferrer nofollow"
	class="btn {variantClasses[variant]}"
	on:click={handleClick}
>
	{text}
	<svg
		xmlns="http://www.w3.org/2000/svg"
		class="h-4 w-4 ml-2"
		fill="none"
		viewBox="0 0 24 24"
		stroke="currentColor"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			stroke-width="2"
			d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
		/>
	</svg>
</a>
