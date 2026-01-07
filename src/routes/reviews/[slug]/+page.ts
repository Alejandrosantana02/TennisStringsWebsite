import { error } from '@sveltejs/kit';
import { getStringReviewBySlug } from '$lib/utils/content';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const review = await getStringReviewBySlug(params.slug);

	if (!review) {
		throw error(404, 'Review not found');
	}

	return {
		review
	};
};
