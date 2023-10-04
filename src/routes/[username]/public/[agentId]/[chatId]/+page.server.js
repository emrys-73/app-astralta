/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { error, redirect } from '@sveltejs/kit';



export const load = ({ locals, params }) => {
    const serializeNonPOJOs = (/** @type {any} */ obj) => {
        return structuredClone(obj)
    };

    const getData = async (chatId) => {
        try {
            const chat = serializeNonPOJOs(await locals.pb.collection('chats').getOne(chatId, {
                expand: 'agent'
            }));

            const agent = chat.expand.agent

            const messages = serializeNonPOJOs(await locals.pb.collection('messages').getFullList({
                sort: '+created',
                filter: `chat="${chatId}"`
            }));


            return {
                agent: agent,
                chat: chat,
                messages: messages,
                username: params.username
            }
            
        } catch (err) {
            console.log("Error: ", err)
            throw error(err.status, err.message)
        }
    }

    return getData(params.chatId)

}