/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { error, redirect } from '@sveltejs/kit';
import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_KEY} from '$env/static/private'



const configuration = new Configuration({
    apiKey: OPENAI_KEY,
  });

const openai = new OpenAIApi(configuration);



export const load = async ({ locals, params }) => {
    const serializeNonPOJOs = (/** @type {any} */ obj) => {
        return structuredClone(obj)
    };

    const getChat = async (chatId) => { 
        try {
            const chat = serializeNonPOJOs(await locals.pb.collection('chats').getOne(chatId));

            return chat;

        } catch (err) {
            console.log("Error: ", err)
            throw error(err.status, err.message)
        }
    }

    const getAgent = async (agentId) => {

        try {
            const agent = serializeNonPOJOs( await locals.pb.collection('agents').getOne(agentId));

            return agent;

        } catch (err) {
            console.log("Error: ", err)
            throw error(err.status, err.message)
        }
    }
    
    return {
        chat: getChat(params.chatId),
        agent: getAgent(params.agentId),
    }
}


export const actions = {
    deleteChat: async ({ request, locals, params }) => {
        // const data = Object.fromEntries(await request.formData());

        try {
            await locals.pb.collection('chats').delete(params.chatId);   

        } catch (err) {
            console.log("Error: ", err)
            throw error(err.status, err.message)
        }

        throw redirect(303, '/')
    },

    updateName: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());

    },

    createChat: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());

        const chatData = {
            "title": "My Chat",
            "user": locals.user.id,
            "agent": data.agentId
        };

        const newChat = await locals.pb.collection('chats').create(chatData);
        throw redirect(303, `/agents/${data.agentId}/${newChat.id}`)
        
    },
    summarise: async ({ request, locals }) => {

        try {
            const completion = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                temperature: 0.8,
                messages: []
            })

        } catch (err) {
            console.log("Error: ", err)
            throw error(err.status, err.message)
        }
    }
}