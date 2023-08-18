/* eslint-disable @typescript-eslint/no-unused-vars */

export const load = ({ locals, params }) => {
    return {
        user: {
            username: params.username
        }
    }
}