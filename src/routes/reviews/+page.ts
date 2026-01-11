import type { PageLoad } from './$types';
import { loadStringReviews } from '$lib/utils/content';

export const load: PageLoad = async () => {
	const reviews = await loadStringReviews();
	return { reviews };
};
