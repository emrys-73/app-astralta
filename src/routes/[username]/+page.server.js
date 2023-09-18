/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
import { error, redirect } from "@sveltejs/kit";

const serializeNonPOJOs = (/** @type {any} */ obj) => {
    return structuredClone(obj)
};


export const load = async ({ locals, params }) => {

    let loggedIn = false;

    if (!locals.user) {
        loggedIn = true;
    }

    const getPublicAI = async () => {
        try {
            const agents = serializeNonPOJOs(await locals.pb.collection('agents').getFullList({
                filter: 'public = true ',
            }));

            return agents;
        } catch (err) {
            console.log("Whoops")
        }

    }

    const getData = async () => {
        try {

            const user = serializeNonPOJOs(await locals.pb.collection('users').getFirstListItem(`username="${params.username}"`))
            

            const agents = serializeNonPOJOs(await locals.pb.collection('agents').getFullList({
                filter: `public = true && users ~ "${user.id}"`,
                sort: '-likes',
            }));

            // console.log(agents)

            return {
                user: user,
                loggedIn: loggedIn,
                agents: agents
            }

        } catch (err) {
            console.log("Whoops")
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