/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_KEY} from '$env/static/private'
import { redirect } from '@sveltejs/kit';


const configuration = new Configuration({
    apiKey: OPENAI_KEY,
  });

const openai = new OpenAIApi(configuration);

export const actions = {
    createAgent: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());

        const rawPersonality = await locals.pb.collection('personalities').getOne(data.persoID)

        const personalityJSON = {
            "curiosity": rawPersonality.curiosity,
            "empathy": rawPersonality.empathy,
            "humor": rawPersonality.humor,
            "optimism": rawPersonality.optimism,
            "politeness": rawPersonality.politeness,
            "tone": rawPersonality.tone,
        }

        let fine_tune = ""

        let naming = data.name === '' ? 'Your name is Astralta. ' : `Your name is ${data.name}. `

        const completion = await openai.createChatCompletion({
            model: "gpt-4",
            temperature: 0.73,
            messages: [{"role": "system", "content": "Transform the following JSON with personality traits and weights from 0 to 10 into a system prompt for an OpenAI Model that describes the personality of it in imperative second person narrative so that it trains the bot. Optimise it so it makes absolutely sure that the generated system prompt will change how the model to be trained acts. [JSON]: ''' { curiosity: 9, empathy: 7, humor: 6, optimism: 9, politeness: 1, tone: ['casual'] } ''' [Personality]: '''You are strongly curious and will ask a lot of questions. You have decent empathy so will relate to the user and validate their feelings. Your humor is at 6 so you will joke every now and then. You are very optimistic so you'll nearly always support the user. Your politeness is low so you will mock and roast the user on almost every chance like a best friend would do. Your tone is casual ''' "
        
            }, {role: "user", content: JSON.stringify(personalityJSON)}],
          });

          
        let personality = completion.data.choices[0].message.content

        const agentData = {
                "user": locals.user.id,
                "name": data.name === "" ? "Astralta Agent" : data.name,
                "personality": data.persoID,
                "training": `${naming}${personality}${fine_tune} The following is the knowledge you have. You will base all your conversations only about this: ${data.knowledge}`,
                // "model": data.pro ? 'gpt-4' : 'gpt-3.5-turbo',
                "model": 'gpt-3.5-turbo',
                "public": data.publicAI,
                "CTA_name": data.cta_name === '' ? undefined : data.cta_name,
                "CTA_URL": data.cta_url === '' ? undefined : data.cta_url,
                // "summary": summary,
            };

        const newAgent = await locals.pb.collection('agents').create(agentData);


        // const training = `${naming}${personality}${fine_tune} You will base the entire conversation ONLY about thefollowing content. Your goal is to work only with the provided knowledge. [Content]: ${data.knowledge}`;


        // const summaryCompletion = await openai.createChatCompletion({
        //     model: "gpt-4",
        //     temperature: 0.73,
        //     messages: [{"role": "system", "content": "You will reply only with a summary in one sentence written in first person of whatever I give you. This will contain the personality description of the AI and its knowledge."}
        //     , {"role": "user",
        //     "content": `${training}`
        //     }
        // ]
        // })
        
        // let summary = summaryCompletion.data.choices[0].message.content

        // const agentData = {
        //     "user": locals.user.id,
        //     "name": data.name === "" ? "Astralta Agent" : data.name,
        //     "personality": data.persoID,
        //     "training": `${naming}${personality}${fine_tune} The following is the knowledge you have. You will base all your conversations only about this: ${data.knowledge}`,
        //     // "model": data.pro ? 'gpt-4' : 'gpt-3.5-turbo',
        //     "model": 'gpt-3.5-turbo',
        //     "public": data.publicAI,
        //     "CTA_name": data.cta_name === '' ? undefined : data.cta_name,
        //     "CTA_URL": data.cta_url === '' ? undefined : data.cta_url,
        //     "summary": summary,
        // };

        // const newAgent = await locals.pb.collection('agents').create(agentData);

        // if (newAgent.public) {
        //     throw redirect(303, `/${locals.user.username}/public/${newAgent.id}`)
        // }
        // throw redirect(303, `/agents/${newAgent.id}`)
    }
}