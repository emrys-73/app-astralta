/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// import { json } from '@sveltejs/kit';


export async function POST({ request, locals }) {
    const { chatID } = await request.json();

    const records = await locals.pb.collection('messages').getFullList({
        sort: '+created',
        filter: `chat="${chatID}"`
    });

    const input = JSON.stringify({ records })

    const messages = [
        {
            "role": "system", 
            "content": `Your task is to reply only giving a summary of what I am givin you as input. The input I will provide you will be some sample emssages from a conversation and you will reply with a summary of the content of the messages.`, 
        },
        {
            "role": "user", 
            "content": `Input: '''${input} '''`
        }

    ]

    const summary = await fetch('x-engine/summary', {
        method: 'POST',
        body: JSON.stringify({ messages }),
        headers: {
            'content-type': 'application/json'
        }
    })

    const result = await summary.json()

    return result
}