

export const actions = {
    createAgent: async ({ request, locals }) => {
        const data = Object.fromEntries(await request.formData());

        console.log(data)
    }


}