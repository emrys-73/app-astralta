import type { RequestHandler } from './$types'
import { Configuration, OpenAIApi } from 'openai-edge';
// import { OPENAI_KEY } from '$env/static/private';
import { OPENAI_KEY} from '$env/static/private'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { experience } from '../../stores';

let setup = "Your task is to transform the content I give you into a training instruction in imperative describing the field of expertise expected. [content]: There are white wales in the lake. [instruction]: You are an expert in wales and learned that there are white wales in the lake. ";

experience.subscribe((value) => {setup = value})
const intro = {"role": "system", "content": setup}


const config = new Configuration({
    apiKey: OPENAI_KEY
})

const openai = new OpenAIApi(config);


export const POST: RequestHandler = async ({ request })  => {

    const { messages } = await request.json();

    const augmentedMessages = [intro, ...messages];

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        // model: 'gpt-4',
        stream: true,
        messages: augmentedMessages
    })

    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)
}

