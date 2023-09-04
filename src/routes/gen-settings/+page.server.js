/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { error, redirect } from "@sveltejs/kit";
import { bg, back } from "../../stores.js";


export const load = ({ locals }) => {

    if (!locals.user) {
        throw redirect(303, '/')
    }

    const serializeNonPOJOs = (/** @type {any} */ obj) => {
        return structuredClone(obj)
    };
    

    const getUser = async (userId) => {
        try {
            const user = serializeNonPOJOs(await locals.pb.collection('users').getOne(userId));

            return user;
        } catch (err) {
            console.log("Whoops")
        }
    }
    

    return {
        uesr: getUser(locals.user.id)
    }


}

export const actions = {
    // System Settings
        // AI Model (gpt3.5, gpt4, claude, etc)
        // AI Name
        updateAIName: async ({ request, locals }) => {
            const data = Object.fromEntries(await request.formData());
    
            try {
                const { ainame } = await locals.pb
                            .collection('users')
                            .update(locals.user.id, { ainame: data.ainame });
                        locals.user.ainame = ainame;
                        return {
                            success: true
                        };
            } catch (err) {
                console.log('Error: ', err);
                throw error(err.status, err.message);
            }
        },
        // Background

    // User
        // EMail
        // Password
        // Avatar
        // Username
        updateUsername: async ({ request, locals }) => {
            const data = Object.fromEntries(await request.formData());
    
            try {
                await locals.pb.collection('users').getFirstListItem(`username = "${data.username}"`);
            } catch (err) {
                if (err.status === 404) {
                    try {
                        const { username } = await locals.pb
                            .collection('users')
                            .update(locals.user.id, { username: data.username });
                        locals.user.username = username;
                        return {
                            success: true
                        };
                    } catch (err) {
                        console.log('Error: ', err);
                        throw error(err.status, err.message);
                    }
                }
                console.log('Error: ', err);
                throw error(err.status, err.message);
            }
        },
        // Name 
        updateName: async ({ request, locals }) => {
            const data = Object.fromEntries(await request.formData());
    
            try {
                const { name } = await locals.pb
                            .collection('users')
                            .update(locals.user.id, { name: data.name });
                        locals.user.name = name;
                        return {
                            success: true
                        };
            } catch (err) {
                console.log('Error: ', err);
                throw error(err.status, err.message);
            }
        },

        updateBg: async ({ request, locals }) => {
            const data = Object.fromEntries(await request.formData());

            console.log(data.bg)
            back.set(data.bg)
            
        
        },

        updateBaseData: async ({ request, locals }) => {
            const data = Object.fromEntries(await request.formData());

            console.log(data)

            // try {
            //     const { baseData } = await locals.pb
            //                 .collection('users')
            //                 .update(locals.user.id, { baseData: data.baseData });
                        
            //             return {
            //                 success: true
            //             };
            // } catch (err) {
            //     console.log('Error: ', err);
            //     throw error(err.status, err.message);
            // }

        }
        
}