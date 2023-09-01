/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck


import { redirect } from '@sveltejs/kit';

const serializeNonPOJOs = (/** @type {any} */ obj) => {
    return structuredClone(obj)
};


export const load = async ({ locals, params }) => {

    const perso = serializeNonPOJOs(await locals.pb.collection('personalities').getOne(params.persoId))

    return {
        perso: perso
    }
}


export const actions = {
    updatePerso: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());

        const persoData = {
            "summary": data.summary
        };

        console.log(persoData)

        const updatedPerso = await locals.pb.collection('personalities').update(data.id, persoData);

        throw redirect(303, '/create')
    }

}