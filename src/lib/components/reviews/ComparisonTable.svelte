<script lang="ts">
	import type { StringReview } from '$lib/types';
	import { writable } from 'svelte/store';

	export let reviews: StringReview[];
	export let limit: number | undefined = undefined;

	const sortBy = writable<{ column: string; direction: 'asc' | 'desc' }>({
		column: 'name',
		direction: 'asc'
	});

	let sortedReviews = [...reviews];

	$: {
		const { column, direction } = $sortBy;
		const reviewsToSort = limit ? reviews.slice(0, limit) : reviews;
		sortedReviews = [...reviewsToSort].sort((a, b) => {
			let aVal: any;
			let bVal: any;

			switch (column) {
				case 'name':
					aVal = a.name;
					bVal = b.name;
					break;
				case 'price':
					aVal = a.price;
					bVal = b.price;
					break;
				case 'stiffness':
					aVal = a.ratings.stiffness;
					bVal = b.ratings.stiffness;
					break;
				case 'power':
					aVal = a.ratings.power;
					bVal = b.ratings.power;
					break;
				case 'spin':
					aVal = a.ratings.spin;
					bVal = b.ratings.spin;
					break;
				case 'durability':
					aVal = a.ratings.durability;
					bVal = b.ratings.durability;
					break;
				case 'overall':
					aVal = a.ratings.overall;
					bVal = b.ratings.overall;
					break;
				default:
					return 0;
			}

			if (typeof aVal === 'string') {
				return direction === 'asc'
					? aVal.localeCompare(bVal)
					: bVal.localeCompare(aVal);
			}

			return direction === 'asc' ? aVal - bVal : bVal - aVal;
		});
	}

	function handleSort(column: string) {
		$sortBy = {
			column,
			direction: $sortBy.column === column && $sortBy.direction === 'asc' ? 'desc' : 'asc'
		};
	}
</script>

<div class="overflow-x-auto">
	<table class="table table-zebra w-full">
		<thead>
			<tr>
				<th>
					<button
						class="btn btn-ghost btn-sm"
						on:click={() => handleSort('name')}
					>
						Name
						{#if $sortBy.column === 'name'}
							{$sortBy.direction === 'asc' ? '↑' : '↓'}
						{/if}
					</button>
				</th>
				<th>Type</th>
				<th>Gauge</th>
				<th>
					<button
						class="btn btn-ghost btn-sm"
						on:click={() => handleSort('stiffness')}
					>
						Stiffness
						{#if $sortBy.column === 'stiffness'}
							{$sortBy.direction === 'asc' ? '↑' : '↓'}
						{/if}
					</button>
				</th>
				<th>
					<button
						class="btn btn-ghost btn-sm"
						on:click={() => handleSort('power')}
					>
						Power
						{#if $sortBy.column === 'power'}
							{$sortBy.direction === 'asc' ? '↑' : '↓'}
						{/if}
					</button>
				</th>
				<th>
					<button
						class="btn btn-ghost btn-sm"
						on:click={() => handleSort('spin')}
					>
						Spin
						{#if $sortBy.column === 'spin'}
							{$sortBy.direction === 'asc' ? '↑' : '↓'}
						{/if}
					</button>
				</th>
				<th>
					<button
						class="btn btn-ghost btn-sm"
						on:click={() => handleSort('durability')}
					>
						Durability
						{#if $sortBy.column === 'durability'}
							{$sortBy.direction === 'asc' ? '↑' : '↓'}
						{/if}
					</button>
				</th>
				<th>
					<button
						class="btn btn-ghost btn-sm"
						on:click={() => handleSort('price')}
					>
						Price
						{#if $sortBy.column === 'price'}
							{$sortBy.direction === 'asc' ? '↑' : '↓'}
						{/if}
					</button>
				</th>
				<th>
					<button
						class="btn btn-ghost btn-sm"
						on:click={() => handleSort('overall')}
					>
						Rating
						{#if $sortBy.column === 'overall'}
							{$sortBy.direction === 'asc' ? '↑' : '↓'}
						{/if}
					</button>
				</th>
				<th>Action</th>
			</tr>
		</thead>
		<tbody>
			{#each sortedReviews as review}
				<tr>
					<td>
						<div class="font-bold">{review.name}</div>
						<div class="text-sm opacity-50">{review.brand}</div>
					</td>
					<td>
						<span class="badge badge-outline">{review.type}</span>
					</td>
					<td>{review.gauge}</td>
					<td>{review.ratings.stiffness}/10</td>
					<td>{review.ratings.power}/10</td>
					<td>{review.ratings.spin}/10</td>
					<td>{review.ratings.durability}/10</td>
					<td>${review.price}</td>
					<td>{review.ratings.overall}/5</td>
					<td>
						<a href="/reviews/{review.slug}" class="btn btn-primary btn-xs">View</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
