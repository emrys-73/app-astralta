/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { json } from '@sveltejs/kit';


export async function POST({ request, locals }) {
    const { msgData } = await request.json();

    console.log(msgData)
    return json(msgData)
}