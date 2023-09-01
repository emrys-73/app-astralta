/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck


export const load =  async ({ locals }) => {

    const serializeNonPOJOs = (/** @type {any} */ obj) => {
        return structuredClone(obj)
    };

    const personalities = serializeNonPOJOs(await locals.pb.collection('personalities').getFullList({
        sort: '-updated',
        filter: `created_by="${locals.user.id}"`
    }));

    const defaultPersonalities = serializeNonPOJOs(await locals.pb.collection('personalities').getFullList({
        sort: '-updated',
        filter: `created_by="0d4sgup0fhmau4p"`
    }));

    // console.log(personalities)

    return {
        personalities: [...defaultPersonalities, ...personalities]
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