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
            // const { xp } = await locals.pb
            // .collection('users')
            // .update(locals.user.id, { xp: data.xp });

            const trainedXP = `Your task is to be an expert in the following content and answer to any questions related to it. You will identify the type of content and suggest things you can be helpful with related to it. Content: ${ data.xp }`
			
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
}