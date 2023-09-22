/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { redirect } from "@sveltejs/kit";


const serializeNonPOJOs = (/** @type {any} */ obj) => {
    return structuredClone(obj)
};


export const load = async ({ locals, params }) => {

    const getData = async () => {
        try {
            const user = serializeNonPOJOs(await locals.pb.collection('users').getFirstListItem(`username="${params.username}"`))

            const agents = serializeNonPOJOs(await locals.pb.collection('agents').getFullList({
                filter: `public = true && users ~ "${user.id}"`,
                sort: '-like_count',
            }));

            return {
                user: user,
                agents: agents
            }

        } catch (err) {
            console.log("Error retrieving Data for username page")
            throw redirect(303, '/')
        }
    }
    

    return getData()

}


export const actions = {
    updateProfile: async ({ request, locals }) => {

        // Full form with all user data to be updated

        console.log("Needs to be implemented")

    }

}