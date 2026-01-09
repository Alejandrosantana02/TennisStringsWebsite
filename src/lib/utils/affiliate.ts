import { browser } from '$app/environment';

export type AffiliateVendor = 'amazon' | 'tennisWarehouse' | 'dicks';

export interface AffiliateConfig {
	amazon?: {
		associateId: string;
		tag?: string;
	};
	tennisWarehouse?: {
		affiliateId: string;
	};
	dicks?: {
		affiliateId: string;
	};
}

// Get affiliate configuration from environment variables
function getAffiliateConfig(): AffiliateConfig {
	if (!browser) return {};

	return {
		amazon: {
			associateId: import.meta.env.PUBLIC_AMAZON_ASSOCIATE_ID || '',
			tag: import.meta.env.PUBLIC_AMAZON_TAG || ''
		},
		tennisWarehouse: {
			affiliateId: import.meta.env.PUBLIC_TENNIS_WAREHOUSE_ID || ''
		},
		dicks: {
			affiliateId: import.meta.env.PUBLIC_DICKS_ID || ''
		}
	};
}

// Validate URL format
export function validateAffiliateLink(url: string): boolean {
	if (!url || typeof url !== 'string') return false;
	
	try {
		const urlObj = new URL(url);
		return ['http:', 'https:'].includes(urlObj.protocol);
	} catch {
		return false;
	}
}

// Generate affiliate link with tracking parameters
export function generateAffiliateLink(
	baseUrl: string,
	vendor: AffiliateVendor,
	productName?: string,
	productId?: string
): string {
	if (!validateAffiliateLink(baseUrl)) {
		console.warn(`Invalid affiliate link: ${baseUrl}`);
		return baseUrl;
	}

	const config = getAffiliateConfig();
	const url = new URL(baseUrl);

	switch (vendor) {
		case 'amazon': {
			if (config.amazon?.associateId) {
				// Amazon Associates link format
				if (!url.searchParams.has('tag')) {
					url.searchParams.set('tag', config.amazon.associateId);
				}
				if (config.amazon.tag && !url.searchParams.has('linkCode')) {
					url.searchParams.set('linkCode', config.amazon.tag);
				}
			}
			break;
		}
		case 'tennisWarehouse': {
			if (config.tennisWarehouse?.affiliateId) {
				if (!url.searchParams.has('aff')) {
					url.searchParams.set('aff', config.tennisWarehouse.affiliateId);
				}
			}
			break;
		}
		case 'dicks': {
			if (config.dicks?.affiliateId) {
				if (!url.searchParams.has('aff')) {
					url.searchParams.set('aff', config.dicks.affiliateId);
				}
			}
			break;
		}
	}

	return url.toString();
}

// Track affiliate click and return formatted link
export function getTrackedAffiliateLink(
	baseUrl: string,
	vendor: AffiliateVendor,
	productName?: string,
	productId?: string
): string {
	return generateAffiliateLink(baseUrl, vendor, productName, productId);
}

// Check if URL is an affiliate link
export function isAffiliateLink(url: string, vendor?: AffiliateVendor): boolean {
	if (!validateAffiliateLink(url)) return false;

	try {
		const urlObj = new URL(url);
		const hostname = urlObj.hostname.toLowerCase();

		if (vendor) {
			switch (vendor) {
				case 'amazon':
					return hostname.includes('amazon.com') || hostname.includes('amzn.to');
				case 'tennisWarehouse':
					return hostname.includes('tennis-warehouse.com') || hostname.includes('tenniswarehouse.com');
				case 'dicks':
					return hostname.includes('dickssportinggoods.com') || hostname.includes('dicks.com');
			}
		}

		// Check all vendors
		return (
			hostname.includes('amazon.com') ||
			hostname.includes('amzn.to') ||
			hostname.includes('tennis-warehouse.com') ||
			hostname.includes('tenniswarehouse.com') ||
			hostname.includes('dickssportinggoods.com') ||
			hostname.includes('dicks.com')
		);
	} catch {
		return false;
	}
}

// Get vendor from URL
export function getVendorFromUrl(url: string): AffiliateVendor | null {
	if (!validateAffiliateLink(url)) return null;

	try {
		const urlObj = new URL(url);
		const hostname = urlObj.hostname.toLowerCase();

		if (hostname.includes('amazon.com') || hostname.includes('amzn.to')) {
			return 'amazon';
		}
		if (hostname.includes('tennis-warehouse.com') || hostname.includes('tenniswarehouse.com')) {
			return 'tennisWarehouse';
		}
		if (hostname.includes('dickssportinggoods.com') || hostname.includes('dicks.com')) {
			return 'dicks';
		}
	} catch {
		return null;
	}

	return null;
}

// Format vendor name for display
export function formatVendorName(vendor: AffiliateVendor): string {
	const names: Record<AffiliateVendor, string> = {
		amazon: 'Amazon',
		tennisWarehouse: 'Tennis Warehouse',
		dicks: "Dick's Sporting Goods"
	};
	return names[vendor] || vendor;
}

// Check if content has affiliate links
export function hasAffiliateLinks(affiliateLinks: {
	amazon?: string;
	tennisWarehouse?: string;
	dicks?: string;
}): boolean {
	return !!(
		affiliateLinks.amazon ||
		affiliateLinks.tennisWarehouse ||
		affiliateLinks.dicks
	);
}
