/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck


import { error } from '@sveltejs/kit';


export const load = async ({ locals }) => {
    try {
        if (locals.user) {
            return {
                user: locals.user
            }
        }
        return {
            user: undefined,
        }

    } catch (err) {
        throw error(err.status, err.message)
    }
}