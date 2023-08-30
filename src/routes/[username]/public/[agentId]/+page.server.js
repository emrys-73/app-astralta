/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck


import { redirect } from '@sveltejs/kit'
import { publicUrl } from '../../../../stores.js';

const serializeNonPOJOs = (/** @type {any} */ obj) => {
    return structuredClone(obj)
};


export const load = async ({ locals, params }) => {
    try {
        const user = await locals.pb.collection('users').getFirstListItem(`username="${params.username}"`);

        const agent = serializeNonPOJOs(await locals.pb.collection('agents').getOne(params.agentId))

        if (!agent.public) {
            throw redirect(303, '/')
        }

        if (!user) {
            throw redirect(303, '/')
        }

        return {
            agent: agent
        }

    } catch (err) {
        console.log("Error finding User")
        throw redirect(303, '/')
    }
}


export const actions = {
    createPublicAgent: async ({ request, locals, params }) => {
        try {
            const agent = await locals.pb.collection('agents').getOne(params.agentId);
    
            // console.log(agent)
    
            const chatData = {
                "title": agent.name,
                "user": agent.user,
                "agent": params.agentId
            };
    
            const newChat = await locals.pb.collection('chats').create(chatData);
    
            // console.log(newChat)
    
            const systemTrainingData = {
                "content": agent.training,
                "role": "system",
                "usage": "JSON",
                "chat": newChat.id,
                "user": agent.user
            };
    
            const systemMessage = await locals.pb.collection('messages').create(systemTrainingData);
    
            // console.log(systemMessage)


            const url = `/${params.username}/public/${params.agentId}/${newChat.id}`
            // console.log(url)

            // throw redirect(303, `/${params.username}/public/${params.agentId}/${newChat.id}`)
            
            publicUrl.set(url)
            

            let pUrl;
            publicUrl.subscribe((value) => {pUrl = value})

            // console.log(pUrl)
            throw redirect(303, `${pUrl}`)
            
            
        } catch (err) {
            console.log("Error creating agent")
            let pUrl;
            publicUrl.subscribe((value) => {pUrl = value})

            // throw redirect(303, '/')
            throw redirect(303, `${pUrl}`)

        }
    }
}