import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	// this method is called on every page load
	const { user, session } = await locals.validateUser();
	return { user };
};
