/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { redirect } from '@sveltejs/kit'
import { generateUsername } from '$lib/utils.js'

export const actions = {
    join: async ({ locals, request }) => {
        const data = Object.fromEntries(await request.formData())

        let username = generateUsername(data.name.split(' ').join('')).toLowerCase();

        const userData = {
            "username": username,
            "email": data.email,
            "emailVisibility": true,
            "password": data.password,
            "passwordConfirm": data.passwordConfirm,
            "name": data.name,
            "info": data.info, // goal
            "baseData": data.baseData,
            "tier": "FreeForever",
            "stage": "public_beta",
            "role": "user",
            "msg_count": 0,
            "referral_code": `EARLY${username.toUpperCase()}`,
            "referral_count": 0,
            "referral_info": "JSON"
        };

        try {
            await locals.pb.collection('users').create({userData});
        } catch (err) {
            console.log('Error: ', err)
            throw redirect(303, '/whoops')
        }
        throw redirect(303, '/verify')
    }
}