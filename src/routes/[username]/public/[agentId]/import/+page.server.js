/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { redirect } from '@sveltejs/kit';


const serializeNonPOJOs = (/** @type {any} */ obj) => {
    return structuredClone(obj)
};


export const load = async ({ locals, params }) => {

    if (!locals.user) {
        throw redirect(303, '/')
    }

    const user = serializeNonPOJOs(await locals.pb.collection('users').getFirstListItem(`username="${params.username}"`))

    const agent = serializeNonPOJOs(await locals.pb.collection('agents').getOne(params.agentId))

    // console.log(user)

    return {
        username: user.username,
        agent: agent
    }

}

export const actions = {
    importAI: async ({ request, locals, params }) => {
        const agent = serializeNonPOJOs(await locals.pb.collection('agents').getOne(params.agentId))

        if (locals.user.id === agent.user) {
            console.log("AI already imported")
            throw redirect(303, `/agents/${agent.id}`)
        }

        else {
            const agentData = {
                "user": locals.user.id,
                "name": agent.name,
                "personality": agent.personality,
                "training": agent.training,
                "model": agent.model,
                "public": false,
                "CTA_name": agent.CTA_name,
                "CTA_URL": agent.CTA_URL,
                "summary": agent.summary
            };

            const importedAgent = serializeNonPOJOs(await locals.pb.collection('agents').create(agentData))

            throw redirect(303, `/agents/${importedAgent.id}`);
        }
    }
}