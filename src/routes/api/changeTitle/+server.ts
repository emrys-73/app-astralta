/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { json } from '@sveltejs/kit';


export async function POST({ request, locals }) {
    const { ChatID, NewTitle } = await request.json();

    const ChatData = {
        "title": `${NewTitle}`,
        "user": `${locals.user.id}`,
        "ai_model": "gpt-3.5-turbo"
    };

    const UpdatedChat = await locals.pb.collection('chats').update(ChatID, ChatData);


    const result = {
        "ChatID": ChatID,
        "UpdatedChat": UpdatedChat
    }

    console.log(result)
    return json(result)
}