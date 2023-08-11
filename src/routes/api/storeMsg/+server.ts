/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { json } from '@sveltejs/kit';


export async function POST({ request, locals }) {
    const { ChatID, UserMessage, AIMessage } = await request.json();

    const chat = await locals.pb.collection('chats').getFirstListItem(`id="${ChatID}"`);

    console.log(chat)

    const UserMessageData = {
        "content": `${UserMessage}`,
        "role": "user",
        "usage": "JSON",
        "chat": `${ChatID}`,
        "user": `${chat.user}`
    };

    const UMsg = await locals.pb.collection('messages').create(UserMessageData);


    const AIMessageData = {
        "content": `${AIMessage}`,
        "role": "assistant",
        "usage": "JSON",
        "chat": `${ChatID}`,
        "user": `${chat.user}`
    };

    const AIMsg = await locals.pb.collection('messages').create(AIMessageData);


    const result = {
        "ChatID": ChatID,
        "Given": {
            "UserMessage": UserMessage,
            "AIMessage": AIMessage,
        },
        "Stored": {
            "UserMessage": UMsg,
            "AIMessage": AIMsg
        }
    }

    console.log(result)
    return json(result)
}