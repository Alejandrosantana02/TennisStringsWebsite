import type { PageLoad } from './$types';
import { loadStringReviews, loadMachineReviews, loadArticles } from '$lib/utils/content';

export const load: PageLoad = async () => {
	const [strings, machines, articles] = await Promise.all([
		loadStringReviews(),
		loadMachineReviews(),
		loadArticles()
	]);

	return {
		featuredStrings: strings.slice(0, 3),
		featuredMachines: machines.slice(0, 2),
		latestArticles: articles.slice(0, 3)
	};
};
