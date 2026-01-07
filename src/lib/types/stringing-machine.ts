export enum MachineType {
	DROP_WEIGHT = 'drop-weight',
	CRANK = 'crank',
	ELECTRONIC = 'electronic'
}

export interface MachineSpecifications {
	mountingSystem: string;
	tensionRange: string;
	weight?: string;
	dimensions?: string;
	warranty?: string;
}

export interface MachineContent {
	summary: string;
	pros: string[];
	cons: string[];
	fullReview: string;
}

export interface StringingMachine {
	id: string;
	slug: string;
	name: string;
	brand: string;
	type: MachineType;
	price: number;
	priceRange?: {
		min: number;
		max: number;
	};
	specifications: MachineSpecifications;
	affiliateLinks: {
		amazon?: string;
		tennisWarehouse?: string;
		dicks?: string;
	};
	content: MachineContent;
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
}
