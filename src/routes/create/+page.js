/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { redirect, error } from '@sveltejs/kit'

export const load = ({ locals }) => {

    const serializeNonPOJOs = (/** @type {any} */ obj) => {
        return structuredClone(obj)
    };

}