/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
/* eslint-disable @typescript-eslint/no-unused-vars */

export const load = ({ locals, params }) => {
    return {
        user: {
            username: params.username
        }
    }
}