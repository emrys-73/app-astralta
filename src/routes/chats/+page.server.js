/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { error } from '@sveltejs/kit';




export const load = ({ locals }) => {
    const serializeNonPOJOs = (/** @type {any} */ obj) => {
        return structuredClone(obj)
    };
    
    const getChats = async () => {
        try {
            const userId = locals.pb.authStore.model.id
            const chats = serializeNonPOJOs(await locals.pb.collection('chats').getFullList({
                sort: '-created',
                filter: `user="${userId}"`
            }));
            return chats
        } catch (err) {
            console.log("Error: ", err)
            throw error(err.status, err.message)
        }
    };

    return {
        chats: getChats()
    }

}