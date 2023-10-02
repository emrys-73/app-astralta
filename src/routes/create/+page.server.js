/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// import { Configuration, OpenAIApi } from 'openai';
// import { OPENAI_KEY} from '$env/static/private'
import { error, redirect } from '@sveltejs/kit';


// const configuration = new Configuration({
//     apiKey: OPENAI_KEY,
//   });

// const openai = new OpenAIApi(configuration);

const serializeNonPOJOs = (/** @type {any} */ obj) => {
    return structuredClone(obj)
};


export const actions = {
    setPersonality: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());
    
            const personality = serializeNonPOJOs(await locals.pb.collection('personalities').getOne(data.persoID))
    
            let naming = data.name ? `Your name is ${data.name}. ` : 'Your name is Astralta. '

            let training = data.knowledge ? 
            `${naming}${personality.summary} The following is the knowledge you have expertise on. You will base all your conversations only about this: ''' ${data.knowledge} '''`
            :
            `${naming}${personality.summary} You have general knowledge about all topics.`


            const oldAgentData = {
                "creator": locals.user.id,
                "users": [
                    locals.user.id
                ],
                "name": data.name ? data.name : 'Astralta AI',
                "personality": data.persoID,
                "training": training,
                // "bio": "test", - Former Summary
                "model": "gpt-3.5-turbo",
                "public": data.publicAI,
                "importable": false,
                "import_count": 0,
                "likes": 0,
                "bg": data?.bg,
                "accent": data?.accent,
                // "CTA_name": data.cta_name === '' ? undefined : data.cta_name,
                // "CTA_URL": data.cta_url === '' ? undefined : data.cta_url,
                "last_interaction": new Date(),
                "chat_count": 0,
                "msg_count": 0,
            };


            const agentData = {
                "creator": locals.user.id,
                "users": [
                    locals.user.id,
                ],
                "name": data.name ? data.name : 'Astralta AI',
                "personality": data.persoID,
                "training": training,
                "bio": "",
                "model": data.AIMax ? 'gpt-4' : "gpt-3.5-turbo",
                "public": data.publicAI,
                "save_count": 0,
                "like_count": 0,
                "bg": data?.bg,
                "accent": data?.accent,
                "text_color": data.accent === 'white_titanium' ? 'black' : 'white',
                // "CTA_name": data.cta_name === '' ? undefined : data.cta_name,
                // "CTA_URL": data.cta_url === '' ? undefined : data.cta_url,
                "last_interaction": new Date(),
                "chat_count": 0,
                "msg_count": 0,
                "restricted": false,
                "access_key": "OnlyJesus",
                "action_prompt": data.actionPrompt,
                "store_messages": data.storeMessages
            };

            // console.log(agentData)
            
            // newAgentData.set(agentData)

            // const newAgent = await locals.pb.collection('agents').create(agentData);

            console.log(agentData)
            
            // throw redirect(303, `/create/${newAgent.id}`)


    }
}