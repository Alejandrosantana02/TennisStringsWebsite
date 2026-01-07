<script lang="ts">
	import { onMount } from 'svelte';
	import Navbar from './Navbar.svelte';
	import SearchBar from '../search/SearchBar.svelte';

	let mobileMenuOpen = false;

	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}
</script>

<header class="sticky top-0 z-50 bg-base-100 shadow-md">
	<div class="navbar bg-base-100 container mx-auto">
		<div class="navbar-start">
			<div class="dropdown">
				<button
					type="button"
					class="btn btn-ghost lg:hidden"
					on:click={toggleMobileMenu}
					aria-label="Toggle mobile menu"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						class="h-5 w-5"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor"
					>
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
					</svg>
				</button>
			</div>
			<a href="/" class="btn btn-ghost text-xl font-bold text-primary">
				Tennis Strings
			</a>
		</div>
		<div class="navbar-center hidden lg:flex">
			<Navbar />
		</div>
		<div class="navbar-end">
			<div class="hidden md:block w-64">
				<SearchBar />
			</div>
			<a href="/search" class="btn btn-ghost btn-circle md:hidden">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
					/>
				</svg>
			</a>
		</div>
	</div>
	<!-- Mobile menu -->
	{#if mobileMenuOpen}
		<div class="lg:hidden bg-base-100 border-t">
			<Navbar mobile={true} />
		</div>
	{/if}
</header>
