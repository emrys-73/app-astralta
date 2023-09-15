/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { error } from '@sveltejs/kit';
import { getImageURL } from '$lib/utils.js';



export const load = ({ locals, params }) => {
    const serializeNonPOJOs = (/** @type {any} */ obj) => {
        return structuredClone(obj)
    };

    const getAgent = async (agentId) => {
        try {
            const agent = serializeNonPOJOs(await locals.pb.collection('agents').getOne(agentId))

            if (agent.cover) {
                agent.avatarUrl = getImageURL(agent.collectionId, agent.id, agent.cover)
            } else {
                agent.avatarUrl = `https://ui-avatars.com/api/?name=${agent.name}`
            }
            // console.log(agent)
            return agent;
        } catch (err) {
            console.log("Error: ", err)
            throw error(err.status, err.message)
        }
    }

    const getMessages = async (chatId) => {
        try {
            const messages = serializeNonPOJOs(await locals.pb.collection('messages').getFullList({
                sort: '+created',
                filter: `chat="${chatId}"`
            }));

            
            // console.log(messages)

            return messages
        } catch (err) {
            console.log("Error: ", err)
            throw error(err.status, err.message)
        }
    }
    
    const getChat = async (chatId) => {
        try {
            const chat = serializeNonPOJOs(await locals.pb.collection('chats').getOne(chatId));
            return chat
        } catch (err) {
            console.log("Error: ", err)
            throw error(err.status, err.message)
        }
    };
    

    return {
        agent: getAgent(params.agentId),
        chat: getChat(params.chatId),
        messages: getMessages(params.chatId),
    }

}


// export const actions = {
//     updateTitle: async ({ request, locals }) => {

//         const data = Object.fromEntries(await request.formData());


//         const titleData = {
//             "title": "test",
//             "user": "RELATION_RECORD_ID",
//             "agent": "RELATION_RECORD_ID"
//         };
        


//         return {}
//     }
// }