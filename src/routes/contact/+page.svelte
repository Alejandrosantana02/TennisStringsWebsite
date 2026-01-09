<script lang="ts">
	import { trackContactForm } from '$lib/utils/analytics';

	let formData = {
		name: '',
		email: '',
		subject: '',
		message: ''
	};

	let status: 'idle' | 'loading' | 'success' | 'error' = 'idle';
	let statusMessage = '';

	// Enhanced email validation
	function isValidEmail(email: string): boolean {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email.trim());
	}

	async function handleSubmit() {
		// Validation
		if (!formData.name || !formData.email || !formData.message) {
			statusMessage = 'Please fill in all required fields';
			status = 'error';
			return;
		}

		if (!isValidEmail(formData.email)) {
			statusMessage = 'Please enter a valid email address';
			status = 'error';
			return;
		}

		status = 'loading';
		statusMessage = '';

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				status = 'success';
				statusMessage = "Thank you for your message! We'll get back to you soon.";
				formData = { name: '', email: '', subject: '', message: '' };
				
				// Track contact form submission
				trackContactForm();
			} else {
				const data = await response.json();
				status = 'error';
				statusMessage = data.error || 'Something went wrong. Please try again.';
			}
		} catch (error) {
			status = 'error';
			statusMessage = 'Network error. Please check your connection and try again.';
			console.error('Contact form error:', error);
		}
	}
</script>

<svelte:head>
	<title>Contact Us - Tennis String Reviews</title>
	<meta name="description" content="Get in touch with Tennis String Reviews. Have questions or suggestions? We'd love to hear from you!" />
</svelte:head>

<div class="container mx-auto px-4 py-16">
	<div class="max-w-2xl mx-auto">
		<h1 class="text-4xl font-bold mb-8">Contact Us</h1>

		<div class="card bg-base-100 shadow-xl">
			<div class="card-body">
				<form on:submit|preventDefault={handleSubmit}>
					<div class="form-control mb-4">
						<label class="label">
							<span class="label-text">Name *</span>
						</label>
						<input
							type="text"
							placeholder="Your name"
							class="input input-bordered"
							bind:value={formData.name}
							required
						/>
					</div>

					<div class="form-control mb-4">
						<label class="label">
							<span class="label-text">Email *</span>
						</label>
						<input
							type="email"
							placeholder="your.email@example.com"
							class="input input-bordered"
							bind:value={formData.email}
							required
						/>
					</div>

					<div class="form-control mb-4">
						<label class="label">
							<span class="label-text">Subject</span>
						</label>
						<input
							type="text"
							placeholder="Message subject"
							class="input input-bordered"
							bind:value={formData.subject}
						/>
					</div>

					<div class="form-control mb-4">
						<label class="label">
							<span class="label-text">Message *</span>
						</label>
						<textarea
							class="textarea textarea-bordered h-32"
							placeholder="Your message"
							bind:value={formData.message}
							required
						></textarea>
					</div>

					{#if statusMessage}
						<div
							class="alert mb-4 {status === 'success' ? 'alert-success' : 'alert-error'}"
						>
							<span>{statusMessage}</span>
						</div>
					{/if}

					<div class="form-control mt-6">
						<button
							type="submit"
							class="btn btn-primary"
							disabled={status === 'loading'}
						>
							{status === 'loading' ? 'Sending...' : 'Send Message'}
						</button>
					</div>
				</form>
			</div>
		</div>
	</div>
</div>
