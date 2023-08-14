/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { redirect } from '@sveltejs/kit';


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

    deleteAgent: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());

        await locals.pb.collection('chats').delete(data.agentId);
    },
    

}