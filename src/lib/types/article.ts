export enum ArticleCategory {
	GUIDE = 'guide',
	TUTORIAL = 'tutorial',
	COMPARISON = 'comparison',
	BUYERS_GUIDE = 'buyers-guide',
	NEWS = 'news'
}

export interface Article {
	id: string;
	slug: string;
	title: string;
	category: ArticleCategory;
	tags: string[];
	excerpt: string;
	content: string;
	author: string;
	seo: {
		metaDescription: string;
		keywords: string[];
	};
	images: {
		featured: string;
		gallery?: string[];
	};
	publishedAt: string;
	updatedAt?: string;
	readingTime?: number; // in minutes
}
