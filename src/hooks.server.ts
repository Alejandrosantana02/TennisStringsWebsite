import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);

	// Set caching headers for static assets
	const pathname = event.url.pathname;
	
	// Cache static assets aggressively
	if (
		pathname.startsWith('/_app/') ||
		pathname.startsWith('/images/') ||
		pathname.endsWith('.js') ||
		pathname.endsWith('.css') ||
		pathname.endsWith('.png') ||
		pathname.endsWith('.jpg') ||
		pathname.endsWith('.webp') ||
		pathname.endsWith('.svg')
	) {
		response.headers.set(
			'Cache-Control',
			'public, max-age=31536000, immutable'
		);
	}
	// Cache HTML pages for shorter duration
	else if (pathname.endsWith('.html') || (!pathname.includes('.') && !pathname.startsWith('/api/'))) {
		response.headers.set(
			'Cache-Control',
			'public, max-age=3600, must-revalidate'
		);
	}
	// Cache API responses
	else if (pathname.startsWith('/api/')) {
		response.headers.set(
			'Cache-Control',
			'public, max-age=300, stale-while-revalidate=600'
		);
	}

	// Security headers
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('X-Frame-Options', 'DENY');
	response.headers.set('X-XSS-Protection', '1; mode=block');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

	return response;
};
