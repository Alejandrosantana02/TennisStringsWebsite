export interface MetaTags {
	title: string;
	description: string;
	image?: string;
	url?: string;
	type?: string;
	keywords?: string[];
}

// Get site URL from environment or use default
function getSiteUrl(): string {
	if (typeof window !== 'undefined') {
		return window.location.origin;
	}
	return import.meta.env.PUBLIC_SITE_URL || 'https://tennisstrings.com';
}

export function generateMetaTags(data: MetaTags): Record<string, string> {
	const siteUrl = getSiteUrl();
	const fullUrl = data.url ? `${siteUrl}${data.url}` : siteUrl;
	const imageUrl = data.image 
		? (data.image.startsWith('http') ? data.image : `${siteUrl}${data.image}`)
		: `${siteUrl}/og-image.jpg`;

	const metaTags: Record<string, string> = {
		title: `${data.title} | Tennis String Reviews`,
		description: data.description,
		'og:title': data.title,
		'og:description': data.description,
		'og:image': imageUrl,
		'og:url': fullUrl,
		'og:type': data.type || 'website',
		'og:site_name': 'Tennis String Reviews',
		'twitter:card': 'summary_large_image',
		'twitter:title': data.title,
		'twitter:description': data.description,
		'twitter:image': imageUrl
	};

	if (data.keywords && data.keywords.length > 0) {
		metaTags.keywords = data.keywords.join(', ');
	}

	return metaTags;
}

export function generateCanonicalUrl(path: string): string {
	const siteUrl = getSiteUrl();
	return `${siteUrl}${path}`;
}
