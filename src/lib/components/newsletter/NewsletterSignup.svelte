<script lang="ts">
	import { trackNewsletterSignup } from '$lib/utils/analytics';

	export let source: string = 'unknown';
	export let placeholder: string = 'Enter your email';
	export let buttonText: string = 'Subscribe';
	export let size: 'sm' | 'md' | 'lg' = 'md';

	let email = '';
	let status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
	let message = '';

	// Enhanced email validation
	function isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email.trim());
	}

	async function handleSubmit() {
		// Client-side validation
		if (!email || !isValidEmail(email)) {
			message = 'Please enter a valid email address';
			status = 'error';
			return;
		}

		status = 'loading';
		message = '';

		try {
			const response = await fetch('/api/newsletter', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: email.trim() })
			});

			const data = await response.json();

			if (response.ok && data.success) {
				status = 'success';
				message = data.message || 'Thank you for subscribing!';
				email = '';
				
				// Track newsletter signup
				trackNewsletterSignup(source);
			} else {
				status = 'error';
				message = data.error || 'Something went wrong. Please try again.';
			}
		} catch (error) {
			status = 'error';
			message = 'Network error. Please check your connection and try again.';
			console.error('Newsletter signup error:', error);
		}
	}

	function handleKeyDown(e: KeyboardEvent) {
		if (e.key === 'Enter' && status !== 'loading') {
			handleSubmit();
		}
	}

	const sizeClasses = {
		sm: 'input-sm btn-sm',
		md: '',
		lg: 'input-lg btn-lg'
	};
</script>

<div class="form-control w-full max-w-xs">
	<div class="input-group">
		<input
			type="email"
			placeholder={placeholder}
			class="input input-bordered w-full {sizeClasses[size]}"
			bind:value={email}
			disabled={status === 'loading'}
			on:keydown={handleKeyDown}
			aria-label="Email address for newsletter subscription"
			aria-invalid={status === 'error'}
			aria-describedby={message ? 'newsletter-message' : undefined}
		/>
		<button
			class="btn btn-primary {sizeClasses[size]}"
			on:click={handleSubmit}
			disabled={status === 'loading' || !email}
			aria-label="Subscribe to newsletter"
		>
			{#if status === 'loading'}
				<span class="loading loading-spinner loading-sm"></span>
			{:else if status === 'success'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
				</svg>
			{:else}
				{buttonText}
			{/if}
		</button>
	</div>
	
	{#if message}
		<div
			id="newsletter-message"
			class="mt-2 text-sm {status === 'success' ? 'text-success' : 'text-error'}"
			role="alert"
		>
			{#if status === 'success'}
				<div class="flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>{message}</span>
				</div>
			{:else}
				<div class="flex items-center gap-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-4 w-4"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
					<span>{message}</span>
				</div>
			{/if}
		</div>
	{/if}
</div>
