import { handleHooks } from '@lucia-auth/sveltekit';
import type { Handle } from '@sveltejs/kit';
import { auth } from './lib/server/lucia';
import { sequence } from '@sveltejs/kit/hooks';

export const customHandle = (async ({ event, resolve }) => {
	return resolve(event);
}) satisfies Handle;

export const handle = sequence(handleHooks(auth), customHandle) satisfies Handle;
