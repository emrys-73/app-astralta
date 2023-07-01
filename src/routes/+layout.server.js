/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// import { redirect } from '@sveltejs/kit'


export const load = ({ locals }) => {
    // if (!locals.pb.authStore.isValid) {
    //     throw redirect(303, '/my/ai')
    // }

    if (locals.user) {
        return {
            user: locals.user
        }
    }
    return {
        user: undefined
    }
}