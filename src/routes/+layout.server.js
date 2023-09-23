/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { error } from '@sveltejs/kit';
import { serializeNonPOJOs } from '$lib/utils.js';

export const load = async ({ locals }) => {

    locals.pb.autoCancellation(false);

    const getChats = async () => {
        try {
            
            const userId = locals.pb.authStore.model.id

            const chats = serializeNonPOJOs(await locals.pb.collection('chats').getFullList({
                sort: '-updated',
                filter: `user="${userId}"`
            }));

            return chats

        } catch (err) {
            console.log("Chat Error: ", err)
            throw error(err.status, err.message)
        }
    };

    const getLocalAgents = async () => {
        try {

            const userId = locals.pb.authStore.model.id

            const agents = serializeNonPOJOs(await locals.pb.collection('agents').getFullList({
                sort: '-updated',
                filter: `public = false && users~"${userId}"`
            }));

            return agents

        } catch (err) {
            console.log("Agent Error: ", err)
            throw error(err.status, err.message)
        }
    };

    const getAllAgents = async () => {
        try {

            const userId = locals.pb.authStore.model.id

            const agents = serializeNonPOJOs(await locals.pb.collection('agents').getFullList({
                sort: '-updated',
                filter: `users~"${userId}"`
            }));

            return agents

        } catch (err) {
            console.log("Agent Error: ", err)
            throw error(err.status, err.message)
        }
    };

    const getPublicAgents = async () => {
        try {

            const userId = locals.pb.authStore.model.id

            const agents = serializeNonPOJOs(await locals.pb.collection('agents').getFullList({
                sort: '-updated',
                filter: ` public = true && users~"${userId}"`
            }));

            return agents

        } catch (err) {
            console.log("Agent Error: ", err)
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
            console.log("Personality Error: ", err)
            throw error(err.status, err.message)
        }
    };


    try {
        if (locals.user) {
            return {
                user: locals.user,
                chats: getChats(),
                agents: getAllAgents(),
                localAgents: getLocalAgents(),
                publicAgents: getPublicAgents(),
                personalities: getPersonalities(),
            }
        }
        return {
            user: undefined,
            chats: undefined,
            agents: undefined,
            localAgents: undefined,
            publicAgents: undefined,
            personalities: undefined,
        }

    } catch (err) {
        console.log("Retrieval Error")
        throw error(err.status, err.message)
    }
}