import type { RequestHandler } from './$types';
import { loadStringReviews, loadMachineReviews, loadArticles } from '$lib/utils/content';

export const GET: RequestHandler = async () => {
	const siteUrl = 'https://tennisstringguide.com'; // Update with actual domain
	const [strings, machines, articles] = await Promise.all([
		loadStringReviews(),
		loadMachineReviews(),
		loadArticles()
	]);

	const pages = [
		{ url: '', changefreq: 'daily', priority: '1.0' },
		{ url: '/reviews', changefreq: 'weekly', priority: '0.9' },
		{ url: '/machines', changefreq: 'weekly', priority: '0.9' },
		{ url: '/guides', changefreq: 'weekly', priority: '0.9' },
		{ url: '/about', changefreq: 'monthly', priority: '0.5' },
		{ url: '/contact', changefreq: 'monthly', priority: '0.5' }
	];

	const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
	.map(
		(page) => `  <url>
    <loc>${siteUrl}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
${strings
	.map(
		(review) => `  <url>
    <loc>${siteUrl}/reviews/${review.slug}</loc>
    <lastmod>${new Date(review.updatedAt || review.publishedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
	)
	.join('\n')}
${machines
	.map(
		(machine) => `  <url>
    <loc>${siteUrl}/machines/${machine.slug}</loc>
    <lastmod>${new Date(machine.updatedAt || machine.publishedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
	)
	.join('\n')}
${articles
	.map(
		(article) => `  <url>
    <loc>${siteUrl}/guides/${article.slug}</loc>
    <lastmod>${new Date(article.updatedAt || article.publishedAt).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(sitemap, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
};
