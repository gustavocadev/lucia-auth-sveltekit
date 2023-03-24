import { fail, redirect, type Actions } from '@sveltejs/kit';
import { auth } from '../../lib/server/lucia';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	const session = await locals.validate();

	if (session) {
		throw redirect(302, '/');
	}
}) satisfies PageServerLoad;

export const actions = {
	default: async ({ request }) => {
		const { name, username, password } = Object.fromEntries(await request.formData()) as Record<
			string,
			string
		>;

		try {
			await auth.createUser({
				primaryKey: {
					providerId: 'username',
					providerUserId: username,
					password: password
				},
				attributes: {
					name,
					username
				}
			});
		} catch (error) {
			console.error(error);
			return fail(400, {
				message: 'Failed to create user'
			});
		}

		/*
      300: Multiple Choices
      301: Moved Permanently
      302: Found
      303: See Other
      304: Not Modified
      305: Use Proxy
      306: Switch Proxy
      307: Temporary Redirect
      308: Permanent Redirect
    */

		throw redirect(302, '/login');
	}
} satisfies Actions;
