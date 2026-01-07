import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const data = await request.json();

		if (!data.name || !data.email || !data.message) {
			return json({ error: 'Missing required fields' }, { status: 400 });
		}

		// TODO: Integrate with email service (Cloudflare Workers, SendGrid, etc.)
		// For now, just log the message
		console.log('Contact form submission:', data);

		return json({ success: true, message: 'Message received' });
	} catch (error) {
		return json({ error: 'Something went wrong' }, { status: 500 });
	}
};
