/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { error } from '@sveltejs/kit';


export const actions = {
	updateEmail: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('users').requestEmailChange(data.email);
		} catch (err) {
			throw error(err.status, err.message);
		}

		return {
			success: true
		};
	},
	updateUsername: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			await locals.pb.collection('users').getFirstListItem(`username = "${data.username}"`);
		} catch (err) {
			if (err.status === 404) {
				try {
					const { username } = await locals.pb
						.collection('users')
						.update(locals.user.id, { username: data.username });
					locals.user.username = username;
					return {
						success: true
					};
				} catch (err) {
					console.log('Error: ', err);
					throw error(err.status, err.message);
				}
			}
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	},
	updateName: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			const { name } = await locals.pb
						.collection('users')
						.update(locals.user.id, { name: data.name });
					locals.user.name = name;
					return {
						success: true
					};
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	},
	updateAIName: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			const { ainame } = await locals.pb
						.collection('users')
						.update(locals.user.id, { ainame: data.ainame });
					locals.user.ainame = ainame;
					return {
						success: true
					};
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	},
	updateBg: async ({ request, locals }) => {
		const data = Object.fromEntries(await request.formData());

		try {
			const { bg } = await locals.pb
						.collection('users')
						.update(locals.user.id, { bg: data.bg });
					locals.user.bg = bg;
					return {
						success: true
					};
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	},
};