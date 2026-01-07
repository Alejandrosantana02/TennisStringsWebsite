import type { StringReview, StringingMachine, Article } from '$lib/types';

export function generateReviewSchema(review: StringReview): object {
	return {
		'@context': 'https://schema.org',
		'@type': 'Review',
		itemReviewed: {
			'@type': 'Product',
			name: review.name,
			brand: {
				'@type': 'Brand',
				name: review.brand
			},
			category: review.type
		},
		author: {
			'@type': 'Organization',
			name: 'Tennis String Reviews'
		},
		reviewRating: {
			'@type': 'Rating',
			ratingValue: review.ratings.overall,
			bestRating: 5,
			worstRating: 1
		},
		reviewBody: review.content.fullReview,
		datePublished: review.publishedAt
	};
}

export function generateProductSchema(review: StringReview | StringingMachine): object {
	const price = 'price' in review 
		? review.price 
		: ('priceRange' in review && review.priceRange) 
			? review.priceRange.min 
			: 0;
	
	return {
		'@context': 'https://schema.org',
		'@type': 'Product',
		name: review.name,
		brand: {
			'@type': 'Brand',
			name: review.brand
		},
		description: review.content.summary,
		image: review.images.featured,
		offers: {
			'@type': 'Offer',
			price: price,
			priceCurrency: 'USD',
			availability: 'https://schema.org/InStock'
		}
	};
}

export function generateArticleSchema(article: Article): object {
	return {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: article.title,
		description: article.excerpt,
		image: article.images.featured,
		datePublished: article.publishedAt,
		dateModified: article.updatedAt || article.publishedAt,
		author: {
			'@type': 'Person',
			name: article.author
		},
		publisher: {
			'@type': 'Organization',
			name: 'Tennis String Reviews',
			logo: {
				'@type': 'ImageObject',
				url: 'https://tennisstrings.com/logo.png'
			}
		}
	};
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): object {
	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url
		}))
	};
}
