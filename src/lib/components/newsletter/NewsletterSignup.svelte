<script lang="ts">
	let email = '';
	let status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
	let message = '';

	async function handleSubmit() {
		if (!email || !email.includes('@')) {
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
				body: JSON.stringify({ email })
			});

			if (response.ok) {
				status = 'success';
				message = 'Thank you for subscribing!';
				email = '';
			} else {
				status = 'error';
				message = 'Something went wrong. Please try again.';
			}
		} catch (error) {
			status = 'error';
			message = 'Something went wrong. Please try again.';
		}
	}
</script>

<div class="form-control w-full max-w-xs">
	<div class="input-group">
		<input
			type="email"
			placeholder="Enter your email"
			class="input input-bordered w-full"
			bind:value={email}
			disabled={status === 'loading'}
		/>
		<button class="btn btn-primary" on:click={handleSubmit} disabled={status === 'loading'}>
			{status === 'loading' ? '...' : 'Subscribe'}
		</button>
	</div>
	{#if message}
		<p class="text-sm mt-2 {status === 'success' ? 'text-success' : 'text-error'}">
			{message}
		</p>
	{/if}
</div>
