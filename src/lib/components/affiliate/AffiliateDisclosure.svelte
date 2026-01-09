<script lang="ts">
	export let variant: 'footer' | 'inline' | 'banner' | 'modal' = 'footer';
	export let showCloseButton: boolean = false;
	
	let dismissed = false;
	
	// Check if user has dismissed disclosure (stored in localStorage)
	if (typeof window !== 'undefined') {
		const stored = localStorage.getItem('affiliateDisclosureDismissed');
		dismissed = stored === 'true';
	}
	
	function handleDismiss() {
		dismissed = true;
		if (typeof window !== 'undefined') {
			localStorage.setItem('affiliateDisclosureDismissed', 'true');
		}
	}
</script>

{#if !dismissed || variant === 'footer'}
	{#if variant === 'footer'}
		<div class="mt-8 pt-8 border-t border-base-300">
			<p class="text-sm text-base-content/70">
				<strong>Affiliate Disclosure:</strong> This site contains affiliate links. 
				We may earn a commission from purchases made through these links at no additional cost to you. 
				This helps us continue to provide free, high-quality content and reviews. 
				We only recommend products we genuinely believe in.
			</p>
		</div>
	{:else if variant === 'inline'}
		<div class="alert alert-info my-4">
			<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
			</svg>
			<div>
				<h3 class="font-bold">Affiliate Disclosure</h3>
				<div class="text-xs">
					This post contains affiliate links. If you make a purchase through these links, 
					we may earn a commission at no extra cost to you.
				</div>
			</div>
			{#if showCloseButton}
				<button class="btn btn-sm btn-ghost" on:click={handleDismiss} aria-label="Dismiss disclosure">×</button>
			{/if}
		</div>
	{:else if variant === 'banner'}
		<div class="alert alert-warning sticky top-0 z-50 rounded-none shadow-lg">
			<div class="flex-1">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="stroke-current shrink-0 w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
				</svg>
				<span class="text-sm">
					<strong>Affiliate Disclosure:</strong> This site contains affiliate links. 
					We may earn a commission from purchases made through these links.
				</span>
			</div>
			{#if showCloseButton}
				<button class="btn btn-sm btn-ghost" on:click={handleDismiss} aria-label="Dismiss disclosure">×</button>
			{/if}
		</div>
	{:else if variant === 'modal'}
		<!-- Modal disclosure (shown once) -->
		{#if !dismissed}
			<div class="modal modal-open">
				<div class="modal-box">
					<h3 class="font-bold text-lg mb-4">Affiliate Disclosure</h3>
					<p class="py-4">
						This website contains affiliate links. When you click on an affiliate link and make a purchase, 
						we may receive a commission at no additional cost to you. This helps us continue to provide 
						free, high-quality content and reviews.
					</p>
					<p class="py-2 text-sm text-base-content/70">
						We only recommend products we genuinely believe in and have tested ourselves. 
						Your support through affiliate links helps us maintain this site and continue providing 
						valuable information to the tennis community.
					</p>
					<div class="modal-action">
						<button class="btn btn-primary" on:click={handleDismiss}>I Understand</button>
					</div>
				</div>
			</div>
		{/if}
	{/if}
{/if}
