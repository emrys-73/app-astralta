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

    const getPublicAI = async (userId) => {
        try {
            const agents = serializeNonPOJOs(await locals.pb.collection('agents').getFullList({
                sort: '-created',
            }));

            return agents;
        } catch (err) {
            console.log("Whoops")
        }

    }

    const getUser = async (userId) => {
        try {
            const user = serializeNonPOJOs(await locals.pb.collection('users').getOne(userId));

            return user;
        } catch (err) {
            console.log("Whoops")
        }
    }
    

    return {
        user: getUser(locals.user.id),
        loggedIn: loggedIn
    }

}


export const actions = {
    updateProfile: async ({ request, locals }) => {

        // Full form with all user data to be updated

        console.log("Needs to be implemented")

    }

}