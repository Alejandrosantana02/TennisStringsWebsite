import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email } = await request.json();

		if (!email || !email.includes('@')) {
			return json({ error: 'Invalid email address' }, { status: 400 });
		}

		// Mailchimp integration (example)
		const MAILCHIMP_API_KEY = env.MAILCHIMP_API_KEY;
		const MAILCHIMP_LIST_ID = env.MAILCHIMP_LIST_ID;
		const MAILCHIMP_SERVER_PREFIX = env.MAILCHIMP_SERVER_PREFIX;

		if (MAILCHIMP_API_KEY && MAILCHIMP_LIST_ID && MAILCHIMP_SERVER_PREFIX) {
			try {
				const response = await fetch(
					`https://${MAILCHIMP_SERVER_PREFIX}.api.mailchimp.com/3.0/lists/${MAILCHIMP_LIST_ID}/members`,
					{
						method: 'POST',
						headers: {
							Authorization: `Basic ${btoa(`anystring:${MAILCHIMP_API_KEY}`)}`,
							'Content-Type': 'application/json'
						},
						body: JSON.stringify({
							email_address: email,
							status: 'subscribed'
						})
					}
				);

				if (!response.ok) {
					console.error('Mailchimp API error:', await response.text());
					return json({ error: 'Failed to subscribe to newsletter' }, { status: 500 });
				}
			} catch (mailchimpError) {
				console.error('Mailchimp integration error:', mailchimpError);
				return json({ error: 'Newsletter service temporarily unavailable' }, { status: 500 });
			}
		} else {
			// Fallback: just log the email (for development/testing)
			console.log('Newsletter signup:', email);
		}

		return json({ success: true, message: 'Successfully subscribed' });
	} catch (error) {
		console.error('Newsletter API error:', error);
		return json({ error: 'Something went wrong' }, { status: 500 });
	}
};
