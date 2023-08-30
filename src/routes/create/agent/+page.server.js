/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { redirect } from "@sveltejs/kit";
import { agentData } from "../../../stores"


export const load = async () => {
    let localAgentData = {};

    agentData.subscribe((value) => {localAgentData = value})

    return {
        agentData: localAgentData
    }
}

export const actions = {
    createAgent: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());

        let localAgentData;
        agentData.subscribe((value) => {localAgentData = value})

        console.log(localAgentData)


        localAgentData.training = `${localAgentData.training} '''${data.knowledge}'''`


        const user = await locals.pb.collection('users').getOne(localAgentData.user);


        console.log(user.username)
        

        if (localAgentData.public) {
            throw redirect(303, `/${user.username}/public/${localAgentData.id}`)
        }
        throw redirect(303, `/agents/${localAgentData.id}`)
    }
}

