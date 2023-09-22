/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { redirect } from '@sveltejs/kit';


export const load = ({ locals }) => {
    if (!locals.user) {
        throw redirect(303, '/login')
    }
}


export const actions = {
    changeTitle: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());

        const ChatData = {
            "title": data.newTitle,
            "user": locals.user.id,
            "ai_model": "gpt-3.5-turbo"
        }

        const UpdatedChat = await locals.pb.collection('chats').update(data.chatId, ChatData);

        const result = {
            "ChatID": data.chatId,
            "UpdatedChat": UpdatedChat
        }
    
        console.log(result)

        throw redirect(303, '/')
    },

    updateAgentName: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());

        const agentForm = {
            "user": locals.user.id,
            "name": data.name,
        };

        const updatedAgent = await locals.pb.collection('chats').update(data.agentId, agentForm);

        const result = {
            "ChatID": data.chatId,
            "Updated Agent": updatedAgent
        }
    
        console.log(result)

        throw redirect(303, '/')
    },


    deleteChat: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());

        await locals.pb.collection('chats').delete(data.chatId);
    },    

    createChat: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());

        const chatData = {
            "title": data.name,
            "user": locals.user.id,
            "agent": data.agentId
        };

        const newChat = await locals.pb.collection('chats').create(chatData);


        // get Agent
        const agent = await locals.pb.collection('agents').getOne(data.agentId);

        const systemTrainingData = {
            "content": agent.training,
            "role": "system",
            "usage": "JSON",
            "chat": newChat.id,
            "user": locals.user.id
        };

        const systemMessage = await locals.pb.collection('messages').create(systemTrainingData);
        // console.log(systemMessage);

        if (agent.public) {
            throw redirect(303, `/${locals.user.username}/public/${data.agentId}/${newChat.id}`)    
        }

        throw redirect(303, `/agents/${data.agentId}/${newChat.id}`)
        
    },

    createPublicChat: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());

        const chatData = {
            "title": data.name,
            "user": locals.user.id,
            "agent": data.agentId
        };

        const newChat = await locals.pb.collection('chats').create(chatData);


        // get Agent
        const agent = await locals.pb.collection('agents').getOne(data.agentId);

        const systemTrainingData = {
            "content": agent.training,
            "role": "system",
            "usage": "JSON",
            "chat": newChat.id,
            "user": locals.user.id
        };

        const systemMessage = await locals.pb.collection('messages').create(systemTrainingData);
        // console.log(systemMessage);

        if (agent.public) {
            throw redirect(303, `/${locals.user.username}/public/${data.agentId}/${newChat.id}`)    
        }

        throw redirect(303, `/agents/${data.agentId}/${newChat.id}`)
        
    },
}