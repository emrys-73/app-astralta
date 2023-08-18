/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck


import { redirect } from '@sveltejs/kit'

export const load = async ({ locals, params }) => {
    try {
        const user = await locals.pb.collection('users').getFirstListItem(`username="${params.username}"`);

        if (!user) {
            console.log("oh no")
        }

    } catch (err) {
        console.log("Error finding User")
        throw redirect(303, '/')
    }


    try {
        const agent = await locals.pb.collection('agents').getOne(params.agentId);

        // console.log(agent)

        const chatData = {
            "title": agent.name,
            "user": agent.user,
            "agent": params.agentId
        };

        const newChat = await locals.pb.collection('chats').create(chatData);

        console.log(newChat)

        const url = `/${params.username}/public/${params.agentId}/${newChat.id}`
        console.log(url)

        return {
            url: url
        }
        
        
    } catch (err) {
        console.log("Error creating agent")
        throw redirect(303, '/')
    }
}