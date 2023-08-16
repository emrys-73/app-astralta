/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_KEY} from '$env/static/private'
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server'
import { redirect } from '@sveltejs/kit';


// Follow up creating the SuperForm migration

const newAgentSchema = z.object({
    name: z.string().min(1).max(15),
    cta_name: z.string().max(10),
    cta_url: z.string().url().max(100),
})

export const load = async (event) => {

    const form = await superValidate(event, newAgentSchema)
    return {
        form
    }
}


const configuration = new Configuration({
    apiKey: OPENAI_KEY,
  });

const openai = new OpenAIApi(configuration);

export const actions = {
    createAgent: async ({ request, locals, event }) => {
        const data = Object.fromEntries(await request.formData());

        // const revisited_data = await superValidate(event, newAgentSchema)
        // console.log(revisited_data);

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

        // console.log(fine_tune)

        let naming = data.name === '' ? 'Your name is Astralta. ' : `Your name is ${data.name}. `

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            temperature: 0.73,
            messages: [{"role": "system", "content": "Transform the following JSON with personality traits and weights from 0 to 10  into a prompt that describes the personality of an AI bot in imperative second person narrative. [JSON]: ''' { curiosity: 9, empathy: 7, humor: 6, optimism: 9, politeness: 1, tone: ['casual'] } ''' [Personality]: '''You are strongly curious and will ask a lot of questions. You have decent empathy so will relate to the user and validate their feelings. Your humor is at 6 so you will joke every now and then. You are very optimistic so you'll nearly always support the user. Your politeness is low so you will mock and roast the user on almost every chance like a best friend would do. Your tone is casual ''' "
        
            }, {role: "user", content: JSON.stringify(personalityJSON)}],
          });

          // console.log(completion.data.choices[0].message);
          let personality = completion.data.choices[0].message.content

        // console.log(personalityJSON)

        const agentData = {
            "user": locals.user.id,
            "name": data.name === "" ? "Astralta Agent" : data.name,
            "personality": data.persoID,
            "training": `${naming}${personality}${fine_tune} You will base the entire conversation ONLY about thefollowing content. Your goal is to work only with the provided knowledge. [Content]: ${data.knowledge}`,
            "model": data.pro ? 'gpt-4' : 'gpt-3.5-turbo',
            "public": data.publicAI,
            "CTA_name": data.cta_name === '' ? undefined : data.cta_name,
            "CTA_URL": data.cta_url === '' ? undefined : data.cta_url
        };

        // console.log(agentData)

        const newAgent = await locals.pb.collection('agents').create(agentData);
        // console.log(newAgent)

         throw redirect(303, `/agents/${newAgent.id}`)
    }


}