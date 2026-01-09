import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';
import type { RequestHandler } from './$types';

// Enhanced email validation
function isValidEmail(email: string): boolean {
	if (!email || typeof email !== 'string') return false;
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email.trim());
}

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { email } = await request.json();

		// Enhanced email validation
		if (!email || !isValidEmail(email)) {
			return json({ error: 'Please enter a valid email address' }, { status: 400 });
		}

		const normalizedEmail = email.trim().toLowerCase();

		// Mailchimp integration
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
							email_address: normalizedEmail,
							status: 'subscribed'
						})
					}
				);

				const data = await response.json();

				if (!response.ok) {
					// Handle specific Mailchimp errors
					if (response.status === 400 && data.title === 'Member Exists') {
						return json(
							{ error: 'This email is already subscribed to our newsletter' },
							{ status: 400 }
						);
					}
					
					console.error('Mailchimp API error:', data);
					return json(
						{ error: 'Failed to subscribe to newsletter. Please try again later.' },
						{ status: 500 }
					);
				}

				return json({
					success: true,
					message: 'Successfully subscribed to newsletter!'
				});
			} catch (mailchimpError) {
				console.error('Mailchimp integration error:', mailchimpError);
				return json(
					{ error: 'Newsletter service temporarily unavailable. Please try again later.' },
					{ status: 500 }
				);
			}
		} else {
			// Fallback: just log the email (for development/testing)
			console.log('Newsletter signup (dev mode):', normalizedEmail);
			return json({
				success: true,
				message: 'Successfully subscribed (dev mode)'
			});
		}
	} catch (error) {
		console.error('Newsletter API error:', error);
		return json(
			{ error: 'Something went wrong. Please try again later.' },
			{ status: 500 }
		);
	}
};
