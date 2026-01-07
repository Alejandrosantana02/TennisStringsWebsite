<script lang="ts">
	import { page } from '$app/stores';

	export let mobile = false;

	const navItems = [
		{ href: '/reviews', label: 'String Reviews' },
		{ href: '/machines', label: 'Stringing Machines' },
		{ href: '/guides', label: 'Guides' },
		{ href: '/about', label: 'About' }
	];

	function isActive(href: string): boolean {
		return $page.url.pathname.startsWith(href);
	}

	const navClass = mobile ? 'flex flex-col p-4 space-y-2' : 'flex space-x-2';
</script>

<nav class={navClass}>
	{#each navItems as item}
		<a
			href={item.href}
			class="btn btn-ghost {isActive(item.href) ? 'btn-active' : ''}"
			class:text-primary={isActive(item.href)}
		>
			{item.label}
		</a>
	{/each}
</nav>
