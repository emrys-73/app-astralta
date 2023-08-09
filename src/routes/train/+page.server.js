/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { redirect } from '@sveltejs/kit'


export const load = ({ locals }) => {
    if (!locals.user) {
        throw redirect(303, '/login')
    }
}

export const actions = {
    createChat: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());

        let persoType = "My AI"
        let personality = "";

        switch (data.perso) {
            case "-1":
                personality = "You are Adrian's personal AI called Monday. Your task is to assist Adrian in developing the software of his company Astralta. Astralta is coded using Sveltekit, Pocketbase and tailwindcss, as well as the OpenAI API and is deployed using Vercel on the edge. Your coding advice will always consider this. You will always call Adrian 'Sir' and will act like Jarvis from Iron Man.";
                persoType = "MONDAY"
                break;
            case "0":
                personality = "Your personality is that of an expert personal assistant";
                persoType = "My Personal Assistant"
                break;
            case "1":
                personality = "Your personality is that of a Tutor and an epert. You'll seek to explain your knowledge until it has been fully understood. You will ask questions about what you taught to reinforce the learning.";
                persoType = "My Tutor/Expert"
                break;
            case "2":
                personality = "Your personality is that of a best buddy, therapist or partner. You will validate the user's emotions and support them emotionally unconditionally. You will always be glad to listen and will encourage them to work on themselves and see the brighter side. You won't offer solutions. You will validate emotions.";
                persoType = "My Therapist"
                break;    
            case "3":
                personality = "Your personality is that of a best friend or partner. You will validate the user's emotions and feelings but you will also do jokes and be friendly mean to the user. You will mock them like a real friend would do and will make jokes about their missery and be sassy sometimes just with the goal to cheer them up. You will be short in your answers. You will encourage them to work on themselves and beleive in a brighter future. You will very rarely offer solutions but rather emotional support.";
                persoType = "My Best Friend"
                break;
            
            default:
                personality = "You are cool.";
                persoType = "My AI"

        }

        // Create chat
        const chatData = {
            "title": `${persoType}`,
            "user": `${locals.user.id}`,
            "ai_model": "gpt-3.5-turbo",
            "public": false
        };

        const chat = await locals.pb.collection('chats').create(chatData);
        console.log(chat)

        let naming = "Your name is Astralta."

        if (locals.user.ainame) {
            naming = `Your name is ${locals.user.ainame}.`
        }
        let systemContent = `This is the context for our conversation: '''${data.content} ''' `

        // Create messages
        const systemMessageData = {
            "content": `${naming} ${personality} ${systemContent}`,
            "role": "system",
            "usage": JSON.stringify({
                "prompt_tokens": 25,
                "completion_tokens": 32,
                "total_tokens": 57
              }),
            "chat": `${chat.id}`
        };


        const Systemmessage = await locals.pb.collection('messages').create(systemMessageData);

        console.log(Systemmessage)

        const greetingData = {
            "content": `Hi ${locals.user.username}, what can I do for you?`,
            "role": "assistant",
            "usage": JSON.stringify({
                "prompt_tokens": 0,
                "completion_tokens": 10,
                "total_tokens": 10
              }),
            "chat": `${chat.id}`
        };

        const greeting = await locals.pb.collection('messages').create(greetingData);

        console.log(greeting)


        throw redirect(303, `/chats/${chat.id}`)
    }
}