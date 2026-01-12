import type { RequestHandler } from './$types';

export const GET: RequestHandler = () => {
	const siteUrl = 'https://tennisstringguide.com'; // Update with actual domain
	const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml`;

	return new Response(robots, {
		headers: {
			'Content-Type': 'text/plain'
		}
	});
};
