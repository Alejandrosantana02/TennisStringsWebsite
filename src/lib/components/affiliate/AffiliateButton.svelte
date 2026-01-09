<script lang="ts">
	import { getTrackedAffiliateLink, formatVendorName, type AffiliateVendor } from '$lib/utils/affiliate';
	import { trackAffiliateClick } from '$lib/utils/analytics';

	export let href: string;
	export let vendor: AffiliateVendor;
	export let text: string;
	export let variant: 'primary' | 'secondary' = 'primary';
	export let productName: string | undefined = undefined;
	export let productId: string | undefined = undefined;

	// Generate affiliate link with tracking parameters
	$: affiliateLink = getTrackedAffiliateLink(href, vendor, productName || text, productId);
	$: vendorName = formatVendorName(vendor);

	function handleClick() {
		trackAffiliateClick(vendor, productName || text, affiliateLink);
	}

	const variantClasses = {
		primary: 'btn-primary',
		secondary: 'btn-secondary'
	};
</script>

<a
	href={affiliateLink}
	target="_blank"
	rel="noopener noreferrer nofollow"
	class="btn {variantClasses[variant]}"
	on:click={handleClick}
	aria-label="Buy {text} on {vendorName} (affiliate link)"
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
