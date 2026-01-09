import { browser } from '$app/environment';
import { page } from '$app/stores';
import { get } from 'svelte/store';

// Type definitions for gtag
declare global {
	interface Window {
		dataLayer: any[];
		gtag: (...args: any[]) => void;
	}
}

// Check if GA is loaded
function isGALoaded(): boolean {
	return browser && typeof window !== 'undefined' && typeof window.gtag === 'function';
}

// Get GA Measurement ID from environment
function getGAId(): string {
	if (!browser) return '';
	
	// Try PUBLIC_GA_ID first (SvelteKit convention)
	const publicGAId = import.meta.env.PUBLIC_GA_ID;
	if (publicGAId) return publicGAId;
	
	// Fallback to VITE_GA_MEASUREMENT_ID
	const viteGAId = import.meta.env.VITE_GA_MEASUREMENT_ID;
	if (viteGAId) return viteGAId;
	
	return '';
}

// Initialize Google Analytics (called once)
export function initGA(measurementId: string): void {
	if (!browser || !measurementId) return;

	// GA script is loaded by GoogleAnalytics component
	// This function just ensures gtag is available
	if (!isGALoaded()) {
		console.warn('Google Analytics not loaded');
		return;
	}
}

// Track page view
export function trackPageView(url?: string): void {
	if (!isGALoaded()) return;

	const pageUrl = url || (browser ? get(page).url.pathname + get(page).url.search : '/');
	
	window.gtag('config', getGAId(), {
		page_path: pageUrl,
		page_title: document.title
	});
}

// Track custom event
export function trackEvent(
	eventName: string,
	eventParams?: {
		[key: string]: string | number | boolean | undefined;
	}
): void {
	if (!isGALoaded()) return;

	window.gtag('event', eventName, eventParams || {});
}

// Track affiliate link click
export function trackAffiliateClick(vendor: string, product?: string, url?: string): void {
	trackEvent('affiliate_click', {
		vendor,
		product: product || '',
		link_url: url || '',
		event_category: 'Affiliate',
		event_label: vendor
	});
}

// Track search query
export function trackSearch(query: string, resultCount?: number): void {
	trackEvent('search', {
		search_term: query,
		result_count: resultCount || 0,
		event_category: 'Search',
		event_label: query
	});
}

// Track filter usage
export function trackFilterUsage(filterType: string, filterValue: string): void {
	trackEvent('filter_used', {
		filter_type: filterType,
		filter_value: filterValue,
		event_category: 'Filter',
		event_label: `${filterType}: ${filterValue}`
	});
}

// Track newsletter signup
export function trackNewsletterSignup(source?: string): void {
	trackEvent('newsletter_signup', {
		source: source || 'unknown',
		event_category: 'Newsletter',
		event_label: source || 'unknown'
	});
}

// Track contact form submission
export function trackContactForm(): void {
	trackEvent('contact_form_submit', {
		event_category: 'Contact',
		event_label: 'Contact Form'
	});
}

// Track content view
export function trackContentView(contentType: string, contentId: string, contentName?: string): void {
	trackEvent('content_view', {
		content_type: contentType,
		content_id: contentId,
		content_name: contentName || '',
		event_category: 'Content',
		event_label: contentType
	});
}

// Track external link click
export function trackExternalLink(url: string, linkText?: string): void {
	trackEvent('external_link_click', {
		link_url: url,
		link_text: linkText || '',
		event_category: 'External Links',
		event_label: url
	});
}

// Track scroll depth (optional enhancement)
export function trackScrollDepth(depth: number): void {
	trackEvent('scroll_depth', {
		depth_percent: depth,
		event_category: 'Engagement',
		event_label: `${depth}%`
	});
}

// Track time on page (optional enhancement)
let pageStartTime: number | null = null;

export function startPageTimer(): void {
	if (!browser) return;
	pageStartTime = Date.now();
}

export function trackTimeOnPage(): void {
	if (!browser || !pageStartTime) return;
	
	const timeOnPage = Math.round((Date.now() - pageStartTime) / 1000); // seconds
	trackEvent('time_on_page', {
		time_seconds: timeOnPage,
		event_category: 'Engagement',
		event_label: `${timeOnPage}s`
	});
	
	pageStartTime = null;
}
