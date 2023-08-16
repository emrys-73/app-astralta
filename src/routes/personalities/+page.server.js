/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck


export const load =  async ({ locals }) => {

    const serializeNonPOJOs = (/** @type {any} */ obj) => {
        return structuredClone(obj)
    };

    const personalities = serializeNonPOJOs(await locals.pb.collection('personalities').getFullList({
        sort: '+created',
    }))

    // console.log(personalities)

    return {
        personalities: personalities
    }
}


export const actions = {
    deletePerso: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());

        try {
            await locals.pb.collection('personalities').delete(data.persoId);
        } catch (err) {
            console.log("Error deleting personality")
        }

    },  
}