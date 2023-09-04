<script>
// @ts-nocheck

    import { AltaCard, LiveCard } from "$lib/components";
    import { darkMode, header } from "../../../../stores.js";
    import { useChat } from "ai/svelte";
    import { onDestroy, onMount } from "svelte";

    export let data

    const getPersoJSON = () => {
        return JSON.stringify({ 
            curiosity: data.perso.curiosity, 
            empathy: data.perso.empathy, 
            humor: data.perso.humor, 
            optimism: data.perso.optimism, 
            politeness: data.perso.politeness, 
            tone: [`'${data.perso.tone}'`] 
        } ) + `The following is a fine tuned description of your personality which you should consider as part of the personality: ''' ${data?.perso?.fine_tune} '''`
    }

    let summaryInput;

    onMount(() => {
        header.set(data?.perso.name)
        summaryInput = getPersoJSON();
        input.set(getPersoJSON())
    })

    onDestroy(() => {
        header.set("Astralta")
    })

    let systemTraining = "Transform the following JSON with personality traits and weights from 0 to 10 into a system prompt for an OpenAI Model that describes the personality of it in imperative second person narrative so that it trains the bot. Optimise it so it makes absolutely sure that the generated system prompt will change how the model to be trained acts. [JSON]: ''' { curiosity: 9, empathy: 7, humor: 6, optimism: 9, politeness: 1, tone: ['casual'] } ''' [Personality]: '''You are strongly curious and will ask a lot of questions. You have decent empathy so will relate to the user and validate their feelings. Your humor is at 6 so you will joke every now and then. You are very optimistic so you'll nearly always support the user. Your politeness is low so you will mock and roast the user on almost every chance like a best friend would do. Your tone is casual ''' "

    let chatOptions = {
            api: "/x-engine/perso",
            initialMessages: [
                {
                    "role": "system",
                    "content": systemTraining
                },
            ],
            onFinish: () => {
                summaryCreated = true;
                summary = $messages[$messages.length - 1].content
                // input.set(getPersoJSON())
            }
          }

    const { messages, handleSubmit, input, isLoading, reload, stop, setMessages } = useChat(chatOptions);

    let summaryCreated = data?.perso.summary ? true : false;

    summaryCreated = false;

    let summary;
    $: summary = ""


</script>


<div class="w-full h-full flex justify-center items-center px-4 my-12">
    <div class="mx-4 md:mx-20 lg:mx-40">
        <AltaCard>
            <div>
                <h3 class="text-true-white text-center font-semibold text-xl">
                    Set Up {data.perso.name}
                </h3>
            </div>
            <div class="text-center justify-center flex items-center mt-2">
                <div>
                    <ul>
                      {#each $messages as message}
                      {#if message.role === 'assistant'}
                      <span class="text-center">
                          {message.content}
                      </span>
    
                      {/if}
                        <!-- <li>{message.role}: {message.content}</li> -->
                      {/each}
                    </ul>
                    
                    {#if !summaryCreated}
                    <form on:submit={handleSubmit}>
                      <input bind:value={$input} hidden/>
                      <button type="submit">
    
                        <LiveCard>
                            Generate personality instructions
                        </LiveCard>
    
                        <!-- {summaryInput} -->
                      </button>
                    </form>
                    {/if}
                  </div>
            </div>
    
    
        {#if summaryCreated}
            <div class="flex flex-col justify-center items-center my-2 mt-4">
                <form action="?/updatePerso" method="POST">
                    <input name="summary" type="text" bind:value={summary} hidden>
                    <input name="id" type="text" value={data?.perso?.id} hidden>
                    <div class="flex flex-col gap-2 justify-center items-center">
                        <!-- <div>
                            <button on:click={reload} class="my-0 flex flex-row text-center items-center justify-center gap-2 backdrop-blur-md {$darkMode ? 'bg-black bg-opacity-80' : 'bg-black bg-opacity-60'} altashadow text-true-white p-2 min-w-[350px] hover:bg-true-black hover:bg-opacity-40 hover:cursor-pointer rounded-full transition duration-300 ease-in-out">
                                <div class="flex flex-row gap-3 justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                                      </svg>
                                      <h1 class="text-true-white text-lg text-center">
                                        Try again
                                    </h1>             
                                </div>
                            </button>
                        </div> -->
                        <div>
                            <button type="submit" class="my-4 flex flex-row text-center items-center justify-center gap-2 backdrop-blur-md {$darkMode ? 'bg-black bg-opacity-80' : 'bg-black bg-opacity-60'} altashadow text-true-white p-2 min-w-[350px] hover:bg-true-black hover:bg-opacity-40 hover:cursor-pointer rounded-full transition duration-300 ease-in-out">
                                <div class="flex flex-row gap-3 justify-center items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                                    </svg>                          
                                    <h1 class="text-true-white text-lg text-center">
                                        Save personality
                                    </h1>
                                </div>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        {/if}
    
        </AltaCard>
    </div>

</div>