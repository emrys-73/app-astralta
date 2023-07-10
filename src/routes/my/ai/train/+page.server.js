/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

export const actions = {
    login: async ({ request, locals }) => {
        const body = await Object.fromEntries(await request.formData())


        try {
            await locals.pb.collection('users').authWithPassword(body.email, body.password)
            if (!locals.pb?.authStore?.model?.verified) {
                // Log Out instantly before letting the user interact
                locals.pb.authStore.clear() 
                return {
                    notVerified: true
                }
            }

        } catch (err) {
            console.log('Error', err);
            // throw error(500, 'Something went wrong loggin in')
        } 
    }
};