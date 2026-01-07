export interface MetaTags {
	title: string;
	description: string;
	image?: string;
	url?: string;
	type?: string;
}

export function generateMetaTags(data: MetaTags): Record<string, string> {
	const siteUrl = 'https://tennisstrings.com'; // Update with actual domain
	const fullUrl = data.url ? `${siteUrl}${data.url}` : siteUrl;
	const imageUrl = data.image ? `${siteUrl}${data.image}` : `${siteUrl}/og-image.jpg`;

	return {
		title: `${data.title} | Tennis String Reviews`,
		description: data.description,
		'og:title': data.title,
		'og:description': data.description,
		'og:image': imageUrl,
		'og:url': fullUrl,
		'og:type': data.type || 'website',
		'twitter:card': 'summary_large_image',
		'twitter:title': data.title,
		'twitter:description': data.description,
		'twitter:image': imageUrl
	};
}

export function generateCanonicalUrl(path: string): string {
	const siteUrl = 'https://tennisstrings.com'; // Update with actual domain
	return `${siteUrl}${path}`;
}
