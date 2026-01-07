import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { searchContent } from '$lib/utils/content';

export const GET: RequestHandler = async ({ url }) => {
	const query = url.searchParams.get('q');

	if (!query || query.trim().length === 0) {
		return json({ strings: [], machines: [], articles: [] });
	}

	try {
		const results = await searchContent(query.trim());
		return json(results);
	} catch (error) {
		console.error('Search error:', error);
		return json({ error: 'Search failed' }, { status: 500 });
	}
};
