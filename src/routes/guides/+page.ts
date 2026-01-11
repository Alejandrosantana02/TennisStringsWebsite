import type { PageLoad } from './$types';
import { loadArticles } from '$lib/utils/content';

export const load: PageLoad = async () => {
	const articles = await loadArticles();
	return { articles };
};
