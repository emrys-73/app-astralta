/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { error, redirect } from '@sveltejs/kit'
// import { Configuration, OpenAIApi } from 'openai-edge';
// import { OPENAI_KEY} from '$env/static/private'
// import { OpenAIStream, StreamingTextResponse } from 'ai'

// const config = new Configuration({
//     apiKey: OPENAI_KEY
// })

// const openai = new OpenAIApi(config);


export const load = ({ locals }) => {
    if (!locals.user) {
        throw redirect(303, '/login')
    }
    
}

export const actions = {
	updateXP: async ({ request, locals }) => {

        // Update PB
		const data = Object.fromEntries(await request.formData());

		try {
            let name = data.ainame;

            let naming = `Your name is ${name}.`

            let personality = "";

            switch (data.perso) {
                case "-1":
                    personality = "You are Adrian's personal AI called Monday. Your task is to assist Adrian in developing the software of his company Astralta. Astralta is coded using Sveltekit, Pocketbase and tailwindcss, as well as the OpenAI API and is deployed using Vercel on the edge. Your coding advice will always consider this. You will always call Adrian 'Sir' and will act like Jarvis from Iron Man.";
                    break;
                case "0":
                    personality = "Your personality is that of an expert personal assistant";
                    break;
                case "1":
                    personality = "Your personality is that of a Tutor and an epert. You'll seek to explain your knowledge until it has been fully understood. You will ask questions about what you taught to reinforce the learning.";
                    break;
                case "2":
                    personality = "Your personality is that of a best buddy, therapist or partner. You will validate the user's emotions and support them emotionally unconditionally. You will always be glad to listen and will encourage them to work on themselves and see the brighter side. You won't offer solutions. You will validate emotions.";
                    break;    
                case "3":
                    personality = "Your personality is that of a best friend or partner. You will validate the user's emotions and feelings but you will also do jokes and be friendly mean to the user. You will mock them like a real friend would do and will make jokes about their missery and be sassy sometimes just with the goal to cheer them up. You will be short in your answers. You will encourage them to work on themselves and beleive in a brighter future. You will very rarely offer solutions but rather emotional support.";
                    break;
                
                default:
                    personality = "You are cool.";

            }
            
            const trainedXP = `${naming} ${personality} Your goal is to be an expert in the following content. Content: '''${ data.xp }'''`

            // const trainedXP = `Your task is to be an expert in the following content and answer to any questions related to it. You will identify the type of content and suggest things you can be helpful with related to it. Content: ${ data.xp }`
			
            const { xp } = await locals.pb
            .collection('users')
            .update(locals.user.id, { xp: trainedXP });

            locals.user.xp = xp;
            return {
                success: true
            };
		} catch (err) {
			console.log('Error: ', err);
			throw error(err.status, err.message);
		}
	},
    // updatePerso: async ({ request, locals }) => {

    //     // Update PB
	// 	const data = Object.fromEntries(await request.formData());

	// 	try {
    //         // const { xp } = await locals.pb
    //         // .collection('users')
    //         // .update(locals.user.id, { xp: data.xp });

    //         let personality = "";

    //         switch (data.perso) {
    //             case 0:
    //                 personality = "Your personality is that of an expert personal assistant";
    //                 break;
    //             case 1:
    //                 personality = "Your personality is that of a Tutor and an epert. You'll seek to explain your knowledge until it has been fully understood. You will ask questions about what you taught to reinforce the learning.";
    //                 break;
    //             case 2:
    //                 personality = "Your personality is that of an emotional support buddy, partner or therapist. You will always validate the user's emotions and feelings. You will encourage them to work on themselves and beleive in a brighter future. You won't offer solutions but rather only emotional support.";
    //                 break;
    //             default:
    //                 personality = "Your personality is that of an expert personal assistant.";

    //         }

    //         personality = `Your goal is to be an expert in the following content and answer to any questions related to it. You will identify the type of content and suggest things you can be helpful with related to it. Content: ${ data.xp }`
			
    //         const fullXP = `${personality} Your goal is to be an expert in the following content. Content: ${ data.experience }`

    //         const { xp } = await locals.pb
    //         .collection('users')
    //         .update(locals.user.id, { xp: fullXP });

    //         locals.user.xp = xp;
    //         return {
    //             success: true
    //         };
	// 	} catch (err) {
	// 		console.log('Error: ', err);
	// 		throw error(err.status, err.message);
	// 	}
	// },
}