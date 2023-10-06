/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { error, redirect } from '@sveltejs/kit'
import { generateUsername } from '$lib/utils.js'

export const actions = {
    register: async ({ locals, request }) => {
        
        // This gives us an object with all of the fields mapped

        const data = Object.fromEntries(await request.formData());

        let username = generateUsername(data.name.split(' ').join('')).toLowerCase()

        const userData = {
            "username": username,
            "email": data.email,
            "emailVisibility": true,
            "password": data.password,
            "passwordConfirm": data.passwordConfirm,
            "name": data.name,
            "info": undefined,
            "goal": data.goal,
            "tier": "Free",
            "stage": "waitlist",
            "role": "user",
            "msg_count": 0,
            "chat_count": 0,
            "agent_count": 0,
            "referral_code": "",
            "referral_count": 0,
            "referral_info": "",
            "verified_creator": false,
            "bio": undefined,
            "followers": [
                
            ],
            "instagram": undefined,
            "linkdIn": undefined,
            "tiktok": undefined,
            "business": false,
            "business_name": undefined
        };

        

        try {
            // console.log(userData)
            const record = await locals.pb.collection('users').create(userData);
            await locals.pb.collection('users').requestVerification(data.email)
            
        } catch (err) {
            console.log('Error: ', err)
            throw redirect(303, '/whoops')    
            // throw error(500, 'Something went wrong') 
        }

        // Adapt for verify site
        throw redirect(303, '/thanks-bro')
    }
}