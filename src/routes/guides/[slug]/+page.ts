import { error } from '@sveltejs/kit';
import { getArticleBySlug } from '$lib/utils/content';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const article = await getArticleBySlug(params.slug);

	if (!article) {
		throw error(404, 'Article not found');
	}

	return {
		article
	};
};
