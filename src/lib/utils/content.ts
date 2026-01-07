import type { StringReview, StringingMachine, Article } from '$lib/types';

// Load all string reviews
export async function loadStringReviews(): Promise<StringReview[]> {
	const module = await import('$lib/data/reviews/strings/sample-strings.json');
	return module.default as StringReview[];
}

// Load all machine reviews
export async function loadMachineReviews(): Promise<StringingMachine[]> {
	const module = await import('$lib/data/reviews/machines/sample-machines.json');
	return module.default as StringingMachine[];
}

// Load all articles
export async function loadArticles(): Promise<Article[]> {
	const module = await import('$lib/data/articles/sample-articles.json');
	return module.default as Article[];
}

// Get string review by slug
export async function getStringReviewBySlug(slug: string): Promise<StringReview | null> {
	const reviews = await loadStringReviews();
	return reviews.find((r) => r.slug === slug) || null;
}

// Get machine review by slug
export async function getMachineReviewBySlug(slug: string): Promise<StringingMachine | null> {
	const machines = await loadMachineReviews();
	return machines.find((m) => m.slug === slug) || null;
}

// Get article by slug
export async function getArticleBySlug(slug: string): Promise<Article | null> {
	const articles = await loadArticles();
	return articles.find((a) => a.slug === slug) || null;
}

// Filter string reviews
export function filterStringReviews(
	reviews: StringReview[],
	filters: {
		type?: string;
		minPrice?: number;
		maxPrice?: number;
		minRating?: number;
	}
): StringReview[] {
	return reviews.filter((review) => {
		if (filters.type && review.type !== filters.type) return false;
		if (filters.minPrice && review.price < filters.minPrice) return false;
		if (filters.maxPrice && review.price > filters.maxPrice) return false;
		if (filters.minRating && review.ratings.overall < filters.minRating) return false;
		return true;
	});
}

// Search content
export async function searchContent(query: string): Promise<{
	strings: StringReview[];
	machines: StringingMachine[];
	articles: Article[];
}> {
	const lowerQuery = query.toLowerCase();
	const [strings, machines, articles] = await Promise.all([
		loadStringReviews(),
		loadMachineReviews(),
		loadArticles()
	]);

	return {
		strings: strings.filter(
			(s) =>
				s.name.toLowerCase().includes(lowerQuery) ||
				s.brand.toLowerCase().includes(lowerQuery) ||
				s.content.summary.toLowerCase().includes(lowerQuery)
		),
		machines: machines.filter(
			(m) =>
				m.name.toLowerCase().includes(lowerQuery) ||
				m.brand.toLowerCase().includes(lowerQuery) ||
				m.content.summary.toLowerCase().includes(lowerQuery)
		),
		articles: articles.filter(
			(a) =>
				a.title.toLowerCase().includes(lowerQuery) ||
				a.excerpt.toLowerCase().includes(lowerQuery) ||
				a.content.toLowerCase().includes(lowerQuery)
		)
	};
}
