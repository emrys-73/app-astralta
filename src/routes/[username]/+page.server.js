export const load = ({ locals, params }) => {
    return {
        user: {
            username: params.username
        }
    }
}