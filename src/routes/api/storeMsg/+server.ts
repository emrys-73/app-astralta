/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { json } from '@sveltejs/kit';


export async function POST({ request, locals }) {
    const { ChatID, UserMessage, AIMessage } = await request.json();


    const UserMessageData = {
        "content": `${UserMessage}`,
        "role": "user",
        "usage": "JSON",
        "chat": `${ChatID}`
    };

    const UMsg = await locals.pb.collection('messages').create(UserMessageData);


    const AIMessageData = {
        "content": `${AIMessage}`,
        "role": "assistant",
        "usage": "JSON",
        "chat": `${ChatID}`
    };

    const AIMsg = await locals.pb.collection('messages').create(AIMessageData);


    const result = {
        "ChatID": ChatID,
        "Stored": {
            "UserMessage": UMsg,
            "AIMessage": AIMsg
        }
    }

    // console.log(result)
    return json(result)
}