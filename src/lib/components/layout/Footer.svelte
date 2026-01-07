<script lang="ts">
	import NewsletterSignup from '../newsletter/NewsletterSignup.svelte';
</script>

<footer class="footer footer-center bg-base-200 text-base-content p-10">
	<div class="container mx-auto">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-8">
			<!-- About Section -->
			<div>
				<h3 class="footer-title">About</h3>
				<div class="grid grid-flow-col gap-4">
					<a href="/about" class="link link-hover">About Us</a>
					<a href="/contact" class="link link-hover">Contact</a>
					<a href="/privacy" class="link link-hover">Privacy Policy</a>
				</div>
			</div>

			<!-- Newsletter -->
			<div>
				<h3 class="footer-title">Newsletter</h3>
				<p class="text-sm mb-4">Stay updated with the latest string reviews and guides</p>
				<NewsletterSignup />
			</div>

			<!-- Links -->
			<div>
				<h3 class="footer-title">Quick Links</h3>
				<div class="grid grid-flow-col gap-4">
					<a href="/reviews" class="link link-hover">String Reviews</a>
					<a href="/machines" class="link link-hover">Machines</a>
					<a href="/guides" class="link link-hover">Guides</a>
				</div>
			</div>
		</div>

		<!-- Affiliate Disclosure -->
		<div class="mt-8 pt-8 border-t border-base-300">
			<p class="text-sm text-base-content/70">
				<strong>Affiliate Disclosure:</strong> This site contains affiliate links. We may earn a commission
				from purchases made through these links at no additional cost to you.
			</p>
		</div>

		<!-- Copyright -->
		<div class="mt-4">
			<p class="text-sm text-base-content/60">
				© {new Date().getFullYear()} Tennis Strings. All rights reserved.
			</p>
		</div>
	</div>
</footer>
