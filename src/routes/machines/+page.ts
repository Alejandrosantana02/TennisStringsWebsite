import type { PageLoad } from './$types';
import { loadMachineReviews } from '$lib/utils/content';

export const load: PageLoad = async () => {
	const machines = await loadMachineReviews();
	return { machines };
};
