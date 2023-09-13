/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */
import { error, redirect } from "@sveltejs/kit";
import { getImageURL } from "$lib/utils.js";

const serializeNonPOJOs = (/** @type {any} */ obj) => {
    return structuredClone(obj)
};



export const load = async ({ locals, params }) => {

    const getAgents = async () => {
        try {
            const agents = serializeNonPOJOs(await locals.pb.collection('agents').getFullList({
                filter: 'public = true',
            }));

            return agents;
        } catch (err) {
            console.log("Whoops")
        }

    }

    const getCategories = async () => {
        try {
            const cats = serializeNonPOJOs(await locals.pb.collection('categories').getFullList());

            for (let i = 0; i < cats.length; i++) {
                cats[i].image_url = getImageURL(cats[i].collectionId, cats[i].id, cats[i].image)
            }

            // console.log(cats)
            return cats;
        } catch (err) {
            console.log("Whoops")
        }

    }


    
    return {
        agents: getAgents(),
        cats: getCategories(),
    }


}