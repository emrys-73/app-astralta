import type { RequestHandler } from './$types'
import { Configuration, OpenAIApi } from 'openai-edge';
// import { OPENAI_KEY } from '$env/static/private';
import { OPENAI_KEY} from '$env/static/private'
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { gpt4 } from '../../stores';
// import { experience } from '../../stores';


// let xp = "";
// textTrainining.subscribe((value) => {xp = value})


let gpt4On = false;
gpt4.subscribe((value: boolean) => {gpt4On = value})

const config = new Configuration({
    apiKey: OPENAI_KEY
})

const openai = new OpenAIApi(config);


// const get_current_weather = (locaton, ) => {
//     return {}
// }


export const POST: RequestHandler = async ({ request })  => {

    const { messages } = await request.json();

    if ( gpt4On ) {
        const response = await openai.createChatCompletion({
            model: 'gpt-4',
            stream: true,
            messages: messages,
        })

        const stream = OpenAIStream(response)

        return new StreamingTextResponse(stream)
    } else {
        const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo-16k',
            stream: true,
            messages: messages,
        })

        const stream = OpenAIStream(response)

        return new StreamingTextResponse(stream)
    }    
}

