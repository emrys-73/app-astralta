/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { error, redirect } from '@sveltejs/kit'
import { generateUsername } from '$lib/utils.js'

export const actions = {
    register: async ({ locals, request }) => {
        
        // This gives us an object with all of the fields mapped
        const body = Object.fromEntries(await request.formData())

        let username = generateUsername(body.name.split(' ').join('')).toLowerCase()

        try {
            await locals.pb.collection('users').create({ username, ...body})
            await locals.pb.collection('users').requestVerification(body.email)
            
        } catch (err) {
            console.log('Error: ', err)
            throw redirect(303, '/whoops')    
            // throw error(500, 'Something went wrong') 
        }

        // Adapt for verify site
        throw redirect(303, '/thanks-bro')
    }
}