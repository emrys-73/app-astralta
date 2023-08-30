/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { error, redirect } from '@sveltejs/kit';


export const load = ({ locals, params }) => {

    if (!locals.user) {
        throw redirect(303, '/')
    }

    const serializeNonPOJOs = (/** @type {any} */ obj) => {
        return structuredClone(obj)
    };

    const getAgent = async (agentId) => {
        try {
            const agent = serializeNonPOJOs(await locals.pb.collection('agents').getOne(agentId));

            return agent

        } catch (err) {
            console.log("Error: ", err)
            throw error(err.status, err.message)
        }
    }

    return {
        agent: getAgent(params.agentId)
    }
} 


export const actions = {
    deletePublicAgent: async ({ request, locals, params }) => {

        try {
            await locals.pb.collection('agents').delete(params.agentId);   

        } catch (err) {
            console.log("Error: ", err)
            throw error(err.status, err.message)
        }

        throw redirect(303, '/')
    },
}
