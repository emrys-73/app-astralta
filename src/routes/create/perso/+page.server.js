/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { redirect } from '@sveltejs/kit';

export const load = async () => {
    return {}
}

export const actions = {
    createPersonality: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());

        if (data.name === "") {
            data.name = "New Peresonality"
        }

        const personalityData = {
            "created_by": locals.user.id,
            "name": data.name,
            "tone": [
                data.tone
            ],
            "humor": data.humor,
            "politeness": data.politeness,
            "empathy": data.empathy,
            "optimism": data.optimism,
            "curiosity": data.curiosity,
        };

        // console.log(personalityData)

        const newPersonality = await locals.pb.collection('personalities').create(personalityData);
        console.log(newPersonality)

        throw redirect(303, '/create')
    }
}