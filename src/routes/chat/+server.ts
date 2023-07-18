import type { RequestHandler } from './$types'
import { Configuration, OpenAIApi } from 'openai-edge';
// import { OPENAI_KEY } from '$env/static/private';
import { OPENAI_KEY} from '$env/static/private'
import { OpenAIStream, StreamingTextResponse } from 'ai'
// import { experience } from '../../stores';


// let xp = "";
// textTrainining.subscribe((value) => {xp = value})




const config = new Configuration({
    apiKey: OPENAI_KEY
})

const openai = new OpenAIApi(config);


// const get_current_weather = (locaton, ) => {
//     return {}
// }


export const POST: RequestHandler = async ({ request })  => {

    const { messages } = await request.json();

    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        // model: 'gpt-3.5-turbo-0613',
        // model: 'gpt-4',
        stream: true,
        messages: messages,
        // functions: [
        //     {
        //         "name": "get_current_weather",
        //         "description": "Get the current weather in a given location",
        //         "parameters": {
        //             "type": "object",
        //             "properties": {
        //                 "location": {
        //                     "type": "string",
        //                     "description": "The city and state, e.g. San Francisco, CA",
        //                 },
        //                 "unit": {"type": "string", "enum": ["celsius", "fahrenheit"]},
        //             },
        //             "required": ["location"],
        //         },
        //     }
        // ],
        // function_call:"auto",
    })

    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)
}

