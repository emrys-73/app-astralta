/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { error, redirect } from '@sveltejs/kit';
import { Configuration, OpenAIApi } from 'openai';
import { OPENAI_KEY} from '$env/static/private'
import { getImageURL } from '$lib/utils.js';


const configuration = new Configuration({
    apiKey: OPENAI_KEY,
  });

const openai = new OpenAIApi(configuration);



export const load = async ({ locals, params }) => {
    const serializeNonPOJOs = (/** @type {any} */ obj) => {
        return structuredClone(obj)
    };

    // let summary = ""

    const getAgent = async (agentId) => {
        try {
            const agent = serializeNonPOJOs(await locals.pb.collection('agents').getOne(agentId, {
                expand: 'personality',
            }))

            const covers = serializeNonPOJOs(await locals.pb.collection('covers').getFullList());


            for (let i = 0; i < covers.length; i++) {
                covers[i].url = getImageURL(covers[i].collectionId, covers[i].id, covers[i].cover)
            }

            if (!agent.cover) {
                agent.cover_url = getImageURL(covers[0].collectionId, covers[0].id, covers[0].cover)
                console.log(agent)

                agent.cover = "praiseTheLord"

            }



            let summary = ""

            if (!agent.summary) {
                // console.log("No agent foun")
                const completion = await openai.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    temperature: 0.8,
                    messages: [{
                        "role": "system",
                        "content": agent.training
                    },
                    {
                        "role": "user",
                        "content": "Summarise your personality and your knowledge in two sentences in a first person view and do not include anything else than the prue description"
                    }
                ]
                })

                summary = completion.data.choices[0].message.content

                const agentData = {
                    "summary": summary
                };

                const updatedAgent = await locals.pb.collection('agents').update(agent.id, agentData);
                console.log(updatedAgent)


                // agent = serializeNonPOJOs(await locals.pb.collection('agents').getOne(agentId, {
                //     expand: 'personality',
                // }))

            }
            // console.log(agent)

            // if (agent.training === "") {
            //     agent.training = "Your name is Astralta and you are a custom-made AI Assistant"
            // }

            // const completion = await openai.createChatCompletion({
            //     model: "gpt-3.5-turbo",
            //     temperature: 0.8,
            //     messages: [{
            //         "role": "system",
            //         "content": agent.training
            //     },
            //     {
            //         "role": "user",
            //         "content": "Summarise your personality and your knowledge in two sentences in a first person view and do not include anything else than the prue description"
            //     }
            //     ]
            // })
            
            // summary = completion.data.choices[0].message.content
            // console.log(summary)




            return {
                agent: agent,
                covers: covers,
                // summary: summary
            }
        } catch (err) {
            console.log("Error: ", err)
            throw error(err.status, err.message)
        }
    }

    

    return getAgent(params.agentId)
}


export const actions = {
    deleteAgent: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());

        try {
            await locals.pb.collection('agents').delete(data.agentId);   
        } catch (err) {
            console.log("Error: ", err)
            throw error(err.status, err.message)
        }

        throw redirect(303, '/')
    },

    createChat: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());

        const chatData = {
            "title": data.name,
            "user": locals.user.id,
            "agent": data.agentId
        };

        const newChat = await locals.pb.collection('chats').create(chatData);


        // get Agent
        const agent = await locals.pb.collection('agents').getOne(data.agentId);

        const systemTrainingData = {
            "content": agent.training,
            "role": "system",
            "usage": "JSON",
            "chat": newChat.id,
            "user": locals.user.id
        };

        const systemMessage = await locals.pb.collection('messages').create(systemTrainingData);
        // console.log(systemMessage);

        if (agent.public) {
            throw redirect(303, `/${locals.user.username}/public/${data.agentId}/${newChat.id}`)    
        }

        throw redirect(303, `/agents/${data.agentId}/${newChat.id}`)
        
    },
}