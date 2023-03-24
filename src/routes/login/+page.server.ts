import { auth } from '$lib/server/lucia';
import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const session = await locals.validate();

	if (session) {
		throw redirect(302, '/');
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request, locals }) => {
		const { username, password } = Object.fromEntries(await request.formData()) as Record<
			string,
			string
		>;

		try {
			const key = await auth.useKey('username', username, password);

			const session = await auth.createSession(key.userId);

			// this method is provided by @lucia-auth/sveltekit
			locals.setSession(session);
		} catch (error) {
			console.error(error);
			return fail(400, {
				message: 'Failed to create user'
			});
		}

		throw redirect(302, '/');
	}
} satisfies Actions;
