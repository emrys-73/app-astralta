<script>
    // @ts-nocheck
        import { AltaCard } from "$lib/components";
        import { onDestroy, onMount } from "svelte";
        import { darkMode, header } from "../../stores";
        import { SlideToggle } from '@skeletonlabs/skeleton';
        import { useChat } from "ai/svelte";

        export let data

        let proMode = false;
        let publicAI = false;

        onMount(() => {
            header.set("New AI")
        })

        onDestroy(() => {
            header.set("Astralta")
        })


        let chatOptions = {
            api: "/x-engine/perso",
            initialMessages: [
                {
                    "role": "system",
                    "content": "Transform the following JSON with personality traits and weights from 0 to 10 into a system prompt for an OpenAI Model that describes the personality of it in imperative second person narrative so that it trains the bot. Optimise it so it makes absolutely sure that the generated system prompt will change how the model to be trained acts. [JSON]: ''' { curiosity: 9, empathy: 7, humor: 6, optimism: 9, politeness: 1, tone: ['casual'] } ''' [Personality]: '''You are strongly curious and will ask a lot of questions. You have decent empathy so will relate to the user and validate their feelings. Your humor is at 6 so you will joke every now and then. You are very optimistic so you'll nearly always support the user. Your politeness is low so you will mock and roast the user on almost every chance like a best friend would do. Your tone is casual ''' "
            }
            ],
          }

        const { messages, handleSubmit, input, isLoading, reload, stop, setMessages } = useChat(chatOptions);
          

        const accents = [
            {
                "name": "Astralta",
                "realName": "astralta",
                "hex": "#4930FF",
                "bg": `hover:bg-[#4930FF]`,
            },
            {
                "name": "Punch",
                "realName": "astralta",
                "hex": "#E02020",
                "bg": `hover:bg-[#E02020]`,
            },
            {
                "name": "Tangerine",
                "realName": "orange",
                "hex": "#D94800",
                "bg": `hover:bg-[#D94800]`,
            },
            {
                "name": "Oceans",
                "realName": "blue",
                "hex": "#0066FF",
                "bg": `hover:bg-[#0066FF]`,
            },
            {
                "name": "Vampire",
                "realName": "purple",
                "hex": "#9300E2",
                "bg": `hover:bg-[#9300E2]`,
            },
            {
                "name": "Candy",
                "realName": "pink",
                "hex": "#DB33C5",
                "bg": `hover:bg-[#DB33C5]`,
            },
            {
                "name": "Forest",
                "realName": "green",
                "hex": "#00754C",
                "bg": `hover:bg-[#00754C]`,
            },
            {
                "name": "Mono",
                "realName": "gray",
                "hex": "#4D4D4D",
                "bg": `hover:bg-[#4D4D4D]`,
            },
        ]


        const backgrounds = [
            {
                "name": "Dark",
                "realName": "dark",
                "hex": "#000000",
                "bg": `hover:bg-[#000000]`,
            },
            {
                "name": "NotionDark",
                "realName": "notionDark",
                "hex": "#000000",
                "bg": `hover:bg-[#191919]`,
            },
        ]
    </script>

<div class="w-full h-full flex flex-col justify-center items-center pb-12">
    <div class="w-full h-[200px] bg-[url('/banner/alta_studio.png')] bg-image top-0 fixed z-40 blur-2xl">

    </div>
    <div class="w-full h-[200px] bg-[url('/banner/alta_studio.png')] bg-image bg-top top-0 fixed z-40">

    </div>

    <div class="fixed top-44 md:left-20 left-4 flex flex-row justify-center items-center z-40">
        <div class="text-white font-semibold text-3xl tracking-widest flex flex-col justify-center items-center gap-0">
            <div>
              <span>
                Astralta Studio
              </span>
            </div>
            <div class="flex flex-row items-center gap-1 opacity-90 font-light text-sm w-full rounded-full  backdrop-blur-lg">
              <span class="">
                Create your AI
              </span>
            </div>
          </div>
    </div>

    <div class=" mt-60 flex flex-col justify-start py-8 h-full w-full items-center">
        <form action="?/setPersonality" method="POST" class="w-full px-6 md:px-20 md:w-3/4 text-white">
        
            <input type="text" id="name" name="name" placeholder="Name" class="bg-black rounded-full w-full border-white outline-none">
        

            <div class="flex flex-row justify-center gap-6 items-center my-2">

                <input type="checkbox" name="pro" value={proMode} class="hidden" checked>
                <div class="my-2 justify-center items-center flex gap-2 flex-row">
                    <h4 class="text-md font-semibold">
                        Public
                    </h4>
                    <SlideToggle name="publicAI" bind:checked={publicAI} active=" bg-green-500" class="bg-white bg-opacity-20 " size="sm" />
                    <input type="checkbox" name="publicAI" value={publicAI} class="hidden" checked>

                </div>

                
            </div>


            <div>
                <!-- Appearance -->
                <div class="py-8">
                    
                        <div>
                            <h2 class="font-bold text-xl my-2 mb-6 md:mb-2">
                                Appearance
                            </h2>
                        </div>
                    
    
                        <div class="text-white font-bold my-4 text-center">
                            Accent
                        </div>
                        <div class="flex md:flex-row justify-center items-center gap-2 flex-wrap">

                            {#each accents as accent}
                            <div class="flex flex-wrap justify-center items-center gap-1 font-light">
                                <div class="flex">
                                    {#if accent.name === "Astralta"}
                                    <input type="radio" name="accent" value={accent.realName} class="bg-black bg-opacity-40" checked>
                                    {:else }
                                        <input type="radio" name="accent" value={accent.realName} class="bg-black bg-opacity-40">
                                    {/if}
                                </div>
                                <div class="flex {accent.bg} rounded-full px-2">
                                    <label for="accent">{accent.name}</label>
                                </div>
                            </div>
                                {/each}
                            
                        </div>

                        <div class="text-white font-bold mt-12 mb-4 text-center">
                            Background
                        </div>
                        <div class="flex md:flex-row justify-center items-center gap-2 flex-wrap">

                            {#each backgrounds as bg}
                            <div class="flex flex-wrap justify-center items-center gap-1 font-light">
                                <div class="flex">
                                    {#if bg.name === "Dark"}
                                    <input type="radio" name="bg" value={bg.realName} class="bg-black bg-opacity-40" checked>
                                    {:else }
                                        <input type="radio" name="bg" value={bg.realName} class="bg-black bg-opacity-40">
                                    {/if}
                                </div>
                                <div class="flex {bg.bg} rounded-full px-2">
                                    <label for="accent">{bg.name}</label>
                                </div>
                            </div>
                                {/each}
                            
                        </div>


                </div>

                <!-- Personality -->
                <div class="py-8">
                    <a href="/personalities">
                        <div>
                            <h2 class="font-bold text-xl my-2 mb-6 md:mb-2">
                                Personality
                            </h2>
                        </div>
                    </a>
    
                    <div class="flex md:flex-row justify-center items-center gap-3 flex-wrap">
                        {#each data?.personalities as perso}
                        <div class="flex flex-wrap justify-center items-center gap-2 font-light">
                            <div class="flex">
                                {#if perso.name === "Personal Assistant"}
                                <input type="radio" name="persoID" value={perso.id} class="bg-black bg-opacity-40" checked>
                                {:else }
                                    <input type="radio" name="persoID" value={perso.id} class="bg-black bg-opacity-40">
                                {/if}
                            </div>
                            <div class="flex">
                                <label for="persoID">{perso.name}</label>
                            </div>
                        </div>
                            {/each}
                        
                        <a href="/create/perso">
                            <button class="btn bg-black my-2 bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md  border-none normal-case transition ease-in-out duration-300">  
                                <span>
                                    + New Personality
                                </span>
                            </button>
                        </a>
                    </div>
                </div>

                <!-- Knowledge -->
                <div class="py-6">
                    <div>
                        <h2 class="font-bold text-xl">
                            Knowledge
                        </h2>
                    </div>
    
                    <textarea id="knowledge" name="knowledge" class="bg-black w-full my-4 h-full min-h-[100px] bg-opacity-30 rounded-2xl" ></textarea>
                </div>

                


            </div>

            <!-- Submit -->
            <div class="flex flex-col justify-center items-center">
                <button type="submit" class="my-4 flex flex-row text-center items-center justify-center gap-2 backdrop-blur-md {$darkMode ? 'bg-black bg-opacity-80' : 'bg-black bg-opacity-60'} altashadow text-true-white p-2 min-w-[350px] hover:bg-true-black hover:bg-opacity-40 hover:cursor-pointer border-opacity-0 border-white border-[1px] hover:border-opacity-100 rounded-full transition duration-300 ease-in-out">
                    <div class="flex flex-row gap-3 justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                        </svg>                          
                        <h1 class="text-true-white text-lg text-center">
                            Next Step
                        </h1>
                    </div>
                </button>
            </div>

        </form>
        
    </div>

</div>



<!-- <div class="w-full h-full flex justify-center items-center flex-col my-10 md:px-10 lg:px-16 xl:px-20">
        <form action="?/setPersonality" method="POST">
            <div class="px-4 lg:px-20 xl:px-40">
                <AltaCard>
                    <input type="text" id="name" name="name" placeholder="Name" class="bg-black bg-opacity-20 rounded-full min-w-[350px] apple-input my-2 mt-4">

                    <div class="flex flex-row justify-center gap-6 items-center my-2">

                        <input type="checkbox" name="pro" value={proMode} class="hidden" checked>
                        <div class="my-2 justify-center items-center flex gap-2 flex-row">
                            <h4 class="text-md font-semibold">
                                Public
                            </h4>
                            <SlideToggle name="publicAI" bind:checked={publicAI} active=" bg-green-500" class="bg-white bg-opacity-20 " size="sm" />
                            <input type="checkbox" name="publicAI" value={publicAI} class="hidden" checked>

                        </div>

                        
                    </div>
                </AltaCard>
    
                
                <AltaCard>
                    <a href="/personalities">
                        <div>
                            <h2 class="font-bold text-xl my-2 mb-6 md:mb-2">
                                Personality
                            </h2>
                        </div>
                    </a>
                    
                    <div class="flex flex-col md:flex-row justify-center items-center gap-2 flex-wrap">
                        {#each data?.personalities as perso}
                        <div class="flex flex-row justify-center items-center gap-2">
                            <div class="flex">
                                {#if perso.name === "Personal Assistant"}
                                <input type="radio" name="persoID" value={perso.id} class="bg-black bg-opacity-40" checked>
                                {:else }
                                    <input type="radio" name="persoID" value={perso.id} class="bg-black bg-opacity-40">
                                {/if}
                            </div>
                            <div class="flex">
                                <label for="persoID">{perso.name}</label>
                            </div>
                        </div>
                            {/each}
                        
                        <a href="/create/perso">
                            <button class="btn bg-black my-2 bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md  border-none normal-case transition ease-in-out duration-300">  
                                <span>
                                    + New Personality
                                </span>
                            </button>
                        </a>
                    </div>
                </AltaCard>
                
                <AltaCard>
                    <div>
                        <h2 class="font-bold text-xl">
                            Knowledge
                        </h2>
                    </div>

                    <textarea id="knowledge" name="knowledge" class="bg-black w-3/4 my-4 h-full min-h-[100px] bg-opacity-30 rounded-2xl" ></textarea>

                </AltaCard>
                
                <div class="flex flex-col justify-center items-center my-2">
                    <button type="submit" class="my-4 flex flex-row text-center items-center justify-center gap-2 backdrop-blur-md {$darkMode ? 'bg-black bg-opacity-80' : 'bg-black bg-opacity-60'} altashadow text-true-white p-2 min-w-[350px] hover:bg-true-black hover:bg-opacity-40 hover:cursor-pointer rounded-full transition duration-300 ease-in-out">
                        <div class="flex flex-row gap-3 justify-center items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                            </svg>                          
                            <h1 class="text-true-white text-lg text-center">
                                Create AI
                            </h1>
                        </div>
                    </button>
                </div>
                
                
            </div>
        </form>
        

    
    
    </div> -->