import { auth } from '$lib/server/lucia';
import type { RequestHandler } from '@sveltejs/kit';
import { redirect } from '@sveltejs/kit';

export const POST = (async ({ locals }) => {
	console.log('logout', 'POST');
	const session = await locals.validate();

	if (!session) {
		throw redirect(302, '/');
	}

	await auth.invalidateSession(session.sessionId);
	locals.setSession(null);

	throw redirect(302, '/');
}) satisfies RequestHandler;
