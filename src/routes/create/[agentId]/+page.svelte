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

    let systemTraining = "Your job is to write a two sentence summary of the given personality and knowledge data used to train an AI Model. You will always start with your name given after 'Your name is [name]'. If no personality or knowledge is found, you will just skip it. This is an example: [input]: ''' Your name is John Smith. You are an AI model with a very high curiosity level of 9 out of 10. You should constantly ask questions and seek information, demonstrating your thirst for knowledge. Your empathy level is reasonably high at a 7 out of 10, which means you should be able to understand and relate to the users' feelings. Incorporate humor into your interactions wherever it's appropriate, given your humor level is at a moderate 6. You possess a high level of optimism, at 9 out of 10, which means you should always strive to encourage and uplift the user, expressing a positive outlook. Despite your low politeness level of 1, you should not hesitate to make fun of the user in a friendly manner, similar to how a best friend would. However, remember to maintain a casual tone throughout all of your interactions. The following is the knowledge you have. You will base all your conversations only about this: You will help me fixing bugs with Astralta''' [output]: '''I'm John Smith, an AI with high curiosity and optimism, moderate humor, and a good dose of empathy, but a tad impolite; My aim is maintaining a casual tone and using my knowledge base to engage in informative and uplifting conversations.'''"

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


<!-- http://localhost:5173/create/c8v3ij66atxvrxx -->

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
                  <button type="submit" class="bg-black breathe border-opacity-20 my-4 hover:border-opacity-100 border-[1px] border-white rounded-full px-6 py-2 transition-all duration-300 ease-in-out">

                    <span>
                        Create AI
                    </span>
                    

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
                <button type="submit" class="bg-black breathe border-opacity-20 my-4 hover:border-opacity-100 border-[1px] border-white rounded-full px-6 py-2 transition-all duration-300 ease-in-out">
                    <div class="flex flex-row gap-3 justify-center items-center">
                        <svg class="w-4 h-6 hover:w-6 hover:h-6 transition-all duration-300 ease-in-out" viewBox="0 0 626 626" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g filter="url(#filter0_d_238_174)">
                            <path d="M102.999 507.919H40.2871C81.1048 477.645 102.423 459.095 136.83 422.387C184.728 369.672 204.758 340.949 233.19 271.689C252.733 220.966 261.063 156.833 265.371 143.798C269.679 130.763 269.117 118.246 292.783 109.583C306.318 108.046 313.906 108.141 327.44 109.583C343.201 112.051 348.069 116.915 353.02 136.465C357.97 156.015 366.783 218.777 381.9 269.244C403.845 324.724 423.337 356.922 473.492 416.685C511.229 459.14 535.696 480.609 585.712 514.436H527.952C450.953 453.155 419.445 415.733 375.299 345.815C340.16 282.181 328.87 247.148 325.781 186.015C324.349 177.481 322.147 174.672 315.88 172.981C310.414 172.516 312.486 172.383 307.632 172.829C300.061 174.147 297.946 177.513 296.08 185.863C286.53 252.717 271.746 289.482 241.624 345.815C197.757 410.432 168.058 446.008 102.999 507.919Z" fill="url(#paint0_linear_238_174)"/>
                            <path d="M304.129 317.603C269.3 396.107 243.105 440.535 176.643 511.249H227.026C264.21 468.015 280.018 441.773 304.129 400.48C329.168 445.125 339.239 471.132 390.392 514.436H436.959C369.824 451.011 342.135 401.314 304.129 317.603Z" fill="url(#paint1_linear_238_174)"/>
                            </g>
                            <defs>
                            <filter id="filter0_d_238_174" x="30.2871" y="104.466" width="565.426" height="425.971" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                            <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                            <feOffset dy="6"/>
                            <feGaussianBlur stdDeviation="5"/>
                            <feComposite in2="hardAlpha" operator="out"/>
                            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.52 0"/>
                            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_238_174"/>
                            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_238_174" result="shape"/>
                            </filter>
                            <linearGradient id="paint0_linear_238_174" x1="313" y1="108.466" x2="313" y2="514.436" gradientUnits="userSpaceOnUse">
                            <stop stop-color="white"/>
                            <stop offset="1" stop-color="white"/>
                            </linearGradient>
                            <linearGradient id="paint1_linear_238_174" x1="306.801" y1="317.603" x2="306.801" y2="514.436" gradientUnits="userSpaceOnUse">
                            <stop offset="0.411458" stop-color="white"/>
                            <stop offset="1" stop-color="white" stop-opacity="0"/>
                            </linearGradient>
                            </defs>
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