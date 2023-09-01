/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { redirect } from '@sveltejs/kit';

const serializeNonPOJOs = (/** @type {any} */ obj) => {
    return structuredClone(obj)
};


export const load = async ({ locals, params }) => {

    const agent = serializeNonPOJOs(await locals.pb.collection('agents').getOne(params.agentId))

    return {
        agent: agent
    }
}


export const actions = {
    updateAgent: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());

        const agentData = {
            "summary": data.summary
        };

        // console.log(data.id)
        // console.log(agentData)

        const newAgent = await locals.pb.collection('agents').update(data.id, agentData);
        
        console.log(newAgent)

        if (newAgent.public) {
           throw redirect(303, `/${locals.user.username}/public/${newAgent.id}`)
        }

        throw redirect(303, `/agents/${newAgent.id}`)

    }
}