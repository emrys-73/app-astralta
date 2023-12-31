/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { error, redirect } from '@sveltejs/kit'



export const actions = {
    resetPassword: async ({ request, locals }) => {
        const body = Object.fromEntries(await request.formData())

        try {
            await locals.pb.collection('users').requestPasswordReset(body.email)
            return {
                success: true
            };
        } catch (err) {
            console.log('Error', err);
            throw redirect(303, '/whoops')    
            // throw error(500, 'Something went wrong');
        }
    }
}

