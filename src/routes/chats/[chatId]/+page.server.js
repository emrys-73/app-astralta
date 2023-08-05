/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { error } from '@sveltejs/kit';




export const load = ({ locals, params }) => {
    const serializeNonPOJOs = (/** @type {any} */ obj) => {
        return structuredClone(obj)
    };

    const getMessages = async (chatId) => {
        try {
            const messages = serializeNonPOJOs(await locals.pb.collection('messages').getFullList({
                sort: '+created',
                filter: `chat="${chatId}"`
            }));
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
        chat: getChat(params.chatId),
        messages: getMessages(params.chatId),
    }

}