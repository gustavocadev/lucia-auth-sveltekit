// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			validate: import('@lucia-auth/sveltekit').Validate;
			validateUser: import('@lucia-auth/sveltekit').ValidateUser;
			setSession: import('@lucia-auth/sveltekit').SetSession;
		}
		// interface PageData {}
		// interface Platform {}
	}
	/* eslint-disable no-var */
	var __prisma: import('@prisma/client').PrismaClient;

	// <reference types="lucia-auth" />
	declare namespace Lucia {
		type Auth = import('./lib/server/lucia').Auth;
		// eslint-disable-next-line @typescript-eslint/ban-types
		type UserAttributes = Omit<import("@prisma/client").User, "id">
	}
}

export {};
