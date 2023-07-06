/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// import { redirect } from '@sveltejs/kit'

// import { error, redirect } from '@sveltejs/kit';


export const load = async ({ locals }) => {
    // if (!locals.pb.authStore.isValid) {
    //     throw redirect(303, '/my/ai')
    // }

    // try {
    //     const bgs = await locals.pb.collection('backgrounds').getFullList({
    //         sort: '-created',
    //     });
    //     backgrounds = await bgs.json();
        
    // } catch (err) {
    //     throw error(err.status, err.message)
    // }

    try {
        if (locals.user) {
            return {
                user: locals.user
            }
        }
        return {
            user: undefined,
        }
    } catch(err) {

        console.log("Error", err)
    }

    
}