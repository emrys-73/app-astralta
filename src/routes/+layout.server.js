/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { error } from '@sveltejs/kit';

export const load = async ({ locals }) => {
    locals.pb.autoCancellation(false);

    const serializeNonPOJOs = (/** @type {any} */ obj) => {
        return structuredClone(obj)
    };

    const getChats = async () => {
        try {
            
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

    const getAgents = async () => {
        try {

            const userId = locals.pb.authStore.model.id

            const agents = serializeNonPOJOs(await locals.pb.collection('agents').getFullList({
                sort: '-updated',
                filter: `user="${userId}"`
            }));

            return agents

        } catch (err) {
            console.log("Error: ", err)
            throw error(err.status, err.message)
        }
    };

    const getPersonalities = async () => {
        try {

            const userId = locals.pb.authStore.model.id

            const personalities = serializeNonPOJOs(await locals.pb.collection('personalities').getFullList({
                sort: '-updated',
                filter: `created_by="${userId}"`
            }));

            const defaultPersonalities = serializeNonPOJOs(await locals.pb.collection('personalities').getFullList({
                sort: '-updated',
                filter: `created_by="0d4sgup0fhmau4p"`
            }));

            return [...defaultPersonalities, ...personalities]

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
                agents: getAgents(),
                personalities: getPersonalities(),
                waitlist: false,
            }
        }
        return {
            user: undefined,
            chats: undefined,
            agents: undefined,
            personalities: undefined,
            waitlist,
        }

    } catch (err) {
        throw error(err.status, err.message)
    }
}