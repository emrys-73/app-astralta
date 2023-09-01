<script>
// @ts-nocheck

    import { AltaCard, LiveCard } from "$lib/components";
    import { darkMode, header } from "../../../stores.js";
    import { useChat } from "ai/svelte";
    import { onDestroy, onMount } from "svelte";

    export let data

    onMount(() => {
        header.set(data?.agent.name)
        input.set(data?.agent?.training)
    })

    onDestroy(() => {
        header.set("Astralta")
    })

    let systemTraining = "Your job is to write a two sentence summary of the given personality and knowledge data used to train an AI Model. You will always start with your name given after 'Your name is [name]'. If no personality or knowledge is found, you will just skip it. This is an example: [input]: ''' Your name is John Smith. You are an AI model with a very high curiosity level of 9 out of 10. You should constantly ask questions and seek information, demonstrating your thirst for knowledge. Your empathy level is reasonably high at a 7 out of 10, which means you should be able to understand and relate to the users' feelings. Incorporate humor into your interactions wherever it's appropriate, given your humor level is at a moderate 6. You possess a high level of optimism, at 9 out of 10, which means you should always strive to encourage and uplift the user, expressing a positive outlook. Despite your low politeness level of 1, you should not hesitate to make fun of the user in a friendly manner, similar to how a best friend would. However, remember to maintain a casual tone throughout all of your interactions. The following is the knowledge you have. You will base all your conversations only about this: You will help me fixing bugs with Astralta''' [output]: '''I'm John Smith, an AI with high curiosity and optimism, moderate humor, and a good dose of empathy, but a tad impolite; my mission is to assist in fixing bugs with Astralta, maintaining a casual tone and using my knowledge base to engage in informative and uplifting conversations.'''"

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
            }
          }

    const personality = data.agent.training;

    const { messages, handleSubmit, input, isLoading, reload, stop, setMessages } = useChat(chatOptions);

    let summaryCreated = data?.agent?.summary ? true : false;

    summaryCreated = false;

    let summary;
    $: summary = ""

</script>

<div class="w-full h-full flex justify-center items-center px-4">
    <AltaCard>
        <div>
            <h3 class="text-true-white text-center font-semibold text-xl">
                Hi,
            </h3>
        </div>
        <div class="max-w-xl text-center justify-center flex items-center mt-2">
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
                  <input bind:value={$input} hidden />
                  <button type="submit">

                    <LiveCard>
                        Who are you?
                    </LiveCard>

                  </button>
                </form>
                {/if}
              </div>
        </div>


    {#if summaryCreated}
        <div class="flex flex-col justify-center items-center my-2">
            <form action="?/updateAgent" method="POST">
                <input name="summary" type="text" bind:value={summary} hidden>
                <input name="id" type="text" value={data?.agent?.id} hidden>
                <button type="submit" class="my-4 flex flex-row text-center items-center justify-center gap-2 backdrop-blur-md {$darkMode ? 'bg-black bg-opacity-80' : 'bg-black bg-opacity-60'} altashadow text-true-white p-2 min-w-[350px] hover:bg-true-black hover:bg-opacity-40 hover:cursor-pointer rounded-full transition duration-300 ease-in-out">
                    <div class="flex flex-row gap-3 justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                        </svg>                          
                        <h1 class="text-true-white text-lg text-center">
                            Start Chatting
                        </h1>
                    </div>
                </button>
            </form>
        </div>
    {/if}

    </AltaCard>

</div>