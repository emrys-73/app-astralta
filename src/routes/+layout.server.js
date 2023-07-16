/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck


// import { error } from '@sveltejs/kit';


export const load = async ({ locals }) => {
    let waitlist = true;
    try {
        if (locals.user) {
            return {
                user: locals.user,
                waitlist: false,
            }
        }
        return {
            user: undefined,
            waitlist,
        }

    } catch (err) {
        // throw error(err.status, err.message)
        console.log("Error on startup")
    }
}