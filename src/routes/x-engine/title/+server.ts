import type { RequestHandler } from './$types'
import { Configuration, OpenAIApi } from 'openai-edge';
// import { OPENAI_KEY } from '$env/static/private';
import { OPENAI_KEY} from '$env/static/private'
import { OpenAIStream, StreamingTextResponse } from 'ai'

const config = new Configuration({
    apiKey: OPENAI_KEY
})

const openai = new OpenAIApi(config);


export const POST: RequestHandler = async ({ request, locals })  => {

    const { messages } = await request.json();
    
    const response = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        stream: true,
        temperature: 1.2,
        messages: messages,
        
    })

    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)

    
    }    

