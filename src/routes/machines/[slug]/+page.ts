import { error } from '@sveltejs/kit';
import { getMachineReviewBySlug } from '$lib/utils/content';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const machine = await getMachineReviewBySlug(params.slug);

	if (!machine) {
		throw error(404, 'Machine review not found');
	}

	return {
		machine
	};
};
