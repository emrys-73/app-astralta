/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { error } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    const serializeNonPOJOs = (/** @type {any} */ obj) => {
        return structuredClone(obj)
    };

    const getChats = async () => {
        try {
            locals.pb.autoCancellation(false);
            const userId = locals.pb.authStore.model.id
            const chats = serializeNonPOJOs(await locals.pb.collection('chats').getFullList({
                sort: '-updated',
                filter: `user="${userId}"`
            }));
            return chats
        } catch (err) {
            console.log("Error: ", err)
            throw error(err.status, err.message)
        }
    };

    let waitlist = true;


    try {
        if (locals.user) {
            return {
                user: locals.user,
                chats: getChats(),
                waitlist: false,
            }
        }
        return {
            user: undefined,
            chats: undefined,
            waitlist,
        }

    } catch (err) {
        throw error(err.status, err.message)
    }
}