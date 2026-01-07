export enum StringType {
	POLYESTER = 'polyester',
	MULTIFILAMENT = 'multifilament',
	HYBRID = 'hybrid',
	NATURAL_GUT = 'natural_gut',
	SYNTHETIC_GUT = 'synthetic_gut'
}

export interface StringRatings {
	stiffness: number; // 1-10
	power: number; // 1-10
	spin: number; // 1-10
	durability: number; // 1-10
	comfort: number; // 1-10
	overall: number; // 1-5 stars
}

export interface AffiliateLinks {
	amazon?: string;
	tennisWarehouse?: string;
	dicks?: string;
}

export interface StringContent {
	summary: string;
	pros: string[];
	cons: string[];
	fullReview: string;
}

export interface SEOData {
	metaDescription: string;
	keywords: string[];
}

export interface StringReview {
	id: string;
	slug: string;
	name: string;
	brand: string;
	type: StringType;
	gauge: number;
	ratings: StringRatings;
	price: number;
	affiliateLinks: AffiliateLinks;
	content: StringContent;
	seo: SEOData;
	images: {
		featured: string;
		gallery?: string[];
	};
	publishedAt: string;
	updatedAt?: string;
}
