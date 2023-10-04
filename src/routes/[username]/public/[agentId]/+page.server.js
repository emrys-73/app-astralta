/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck


import { redirect, error } from '@sveltejs/kit'
import { publicUrl } from '../../../../stores.js';
import { getImageURL } from '$lib/utils.js';

const serializeNonPOJOs = (/** @type {any} */ obj) => {
    return structuredClone(obj)
};


export const load = async ({ locals, params }) => {
    try {
        const creator = serializeNonPOJOs(await locals.pb.collection('users').getFirstListItem(`username="${params.username}"`))

        const agent = serializeNonPOJOs(await locals.pb.collection('agents').getOne(params.agentId, {
            expand: 'creator',
        }))

        const chats = serializeNonPOJOs(await locals.pb.collection('chats').getFullList({
            sort: '-last_interacted',
            filter: ` agent = "${agent.id}"`,
        }))

        // console.log(agent)
        // const covers = serializeNonPOJOs(await locals.pb.collection('covers').getFullList());

        // for (let i = 0; i < covers.length; i++) {
        //     covers[i].url = getImageURL(covers[i].collectionId, covers[i].id, covers[i].cover)
        // }

        // if (!agent.cover) {
        //     agent.cover_url = getImageURL(covers[0].collectionId, covers[0].id, covers[0].cover)
        // }

        if (!agent.public) {
            throw redirect(303, '/')
        }

        if (!creator) {
            throw redirect(303, '/')
        }

        agent.cover_url = agent.cover ? getImageURL(agent.collectionId, agent.id, agent.cover) : undefined
        

        const thereIsAnUser = locals.user ? true : false;

        // console.log(agent)

        return {
            creator: creator,
            thereIsAnUser: thereIsAnUser,
            agent: agent,
            // covers: covers,
            chats: chats
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
    },

    deletePublicAgent: async ({ request, locals, params }) => {

        try {
            await locals.pb.collection('agents').delete(params.agentId);   

        } catch (err) {
            console.log("Error: ", err)
            throw error(err.status, err.message)
        }

        throw redirect(303, '/')
    },

    createChat: async ({ request, locals, params }) => {
        const data = Object.fromEntries(await request.formData());

        const chatData = {
            "title": data.name,
            "user": locals.user ? locals.user.id : undefined,
            "agent": data.agentId,
            "last_interacted": new Date(),
            "msg_count": 0,
            // "eval": "RELATION_RECORD_ID"
        };

        const newChat = await locals.pb.collection('chats').create(chatData);

         // get Agent
         const agent = await locals.pb.collection('agents').getOne(data.agentId);

         const systemTrainingData = {
             "content": agent.training,
             "role": "system",
             "usage": "JSON",
             "chat": newChat.id,
             "user": locals.user ? locals.user.id : ''
         };
 
         const systemMessage = await locals.pb.collection('messages').create(systemTrainingData);
         // console.log(systemMessage);

         throw redirect(303, `/${params.username}/public/${data.agentId}/${newChat.id}`)
    }
}