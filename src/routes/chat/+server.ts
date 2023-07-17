import type { RequestHandler } from './$types'
import { Configuration, OpenAIApi } from 'openai-edge';
// import { OPENAI_KEY } from '$env/static/private';
import { OPENAI_KEY} from '$env/static/private'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { experience } from '../../stores';


// let xp = "";
// textTrainining.subscribe((value) => {xp = value})




const config = new Configuration({
    apiKey: OPENAI_KEY
})

const openai = new OpenAIApi(config);


export const POST: RequestHandler = async ({ request })  => {

    let xp;
    experience.subscribe((value) => xp = value)
    const intro = {"role": "system", "content": xp}

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

