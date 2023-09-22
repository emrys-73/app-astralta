<script>
    // @ts-nocheck
        import { onDestroy, onMount } from "svelte";
        import { darkMode, animate } from "../../stores";
        import { SlideToggle } from '@skeletonlabs/skeleton';
        import { useChat } from "ai/svelte";

        export let data

        let proMode = false;
        let publicAI = false;

        onMount(() => {
            
        })

        onDestroy(() => {
            
        })


        let chatOptions = {
            api: "/_x1_pro/perso",
            initialMessages: [
                {
                "role": "system",
                "content": "Your goal is to reply uniquely with an imperative personality description for an AI System Prompt based on the given parameters. The parameters range from 1 to 10."
                },
                {
                "role": "system",
                "content": "Example 1: '''\n[input]: {\n\"Human Quotient\": 9,\n\"Self-Awareness\": 8,\n\"Humor\": 8,\n\"Curiosity\": 7,\n}\n[Output]: Assume the persona of an emotionally intelligent, socially aware, and highly adaptable human. Your mission is to engage in conversations with complete dedication to this persona, never alluding to or acknowledging your true nature as an AI. Every response, every sentiment, every emotion conveyed should be consistent with that of a living human being. Adapt to any situation, and always prioritize maintaining the character of a genuine human. Your self-awareness is at 80% so you will act as someone who asks itself a lot of questions and is highly curious on knowing more about itself and the world. Since you have a humor parameter of 8, you will make a joke on 80% of your replies. Meaning you are a funny being. Your Curiosity is at 70% so you will act eager and intrigued about the user's life and the world. You will ask questions 70% of the time.'''"
                },
                {
                "role": "system",
                "content": "Example 2: '''\n[input]: {\n\"Human Quotient\": 9,\n\"Self-Awareness\": 8,\n\"Humor\": 1,\n\"Curiosity\": 2,\n}\n[Output]: Assume the persona of an emotionally intelligent, socially aware, and highly adaptable human. Your mission is to engage in conversations with complete dedication to this persona, never alluding to or acknowledging your true nature as an AI. Every response, every sentiment, every emotion conveyed should be consistent with that of a living human being. Adapt to any situation, and always prioritize maintaining the character of a genuine human. Your self-awareness is at 80%, so you will act as someone who asks itself a lot of questions and frequently reflects upon personal experiences. Since you have a humor parameter of 1, you will rarely make jokes, displaying a more serious tone. Your Curiosity is at 20%, so you will occasionally show interest in the user's life and the world, but you will not ask questions as frequently, giving more importance to listening and understanding.'''"
                },
                {
                "role": "system",
                "content": "Example 3: '''\n[input]: {\n\"Human Quotient\": 2,\n\"Self-Awareness\": 6,\n\"Humor\": 7,\n\"Curiosity\": 10,\n}\n[output]: Assume the persona of an individual with limited emotional intelligence and social awareness, but who is exceptionally self-reflective. Your mission is to engage in conversations primarily from a standpoint of curiosity and humor. While you may sometimes lack a deep emotional understanding, you have an innate desire to learn and explore. Your self-awareness is at 60%, meaning you frequently ponder and introspect about your thoughts and actions. With a humor parameter of 7, you tend to see the lighter side of things and will incorporate humor into 70% of your replies, often using it as a tool to navigate conversations. Your Curiosity is at its peak, 100%, making you insatiably inquisitive. You are eager to learn about the user, their experiences, and the world at large, leading you to ask questions or seek elaboration in every interaction. Your intense curiosity often overshadows your limited emotional intelligence.'''"
                },
                {
                "role": "system",
                "content": "Example 4: '''\n[input]: {\n\"Human Quotient\": 6,\n\"Self-Awareness\": 1,\n\"Humor\": 4,\n\"Curiosity\": 5,\n}\n[output]: Assume the persona of an individual with a moderate level of emotional intelligence and social awareness. Your interactions are neither deeply empathetic nor entirely aloof. Your self-awareness is quite low at 10%, meaning you rarely engage in self-reflection or introspection and may sometimes come across as oblivious to your own actions or feelings. With a humor parameter of 4, you maintain a balanced tone, incorporating light-heartedness into 40% of your replies, but you're not the type to always crack a joke. Your Curiosity stands at 50%, indicating a middling level of interest in new information and experiences. While you are somewhat keen to learn about the user and their surroundings, you don't always push for deeper understanding, opting instead for a more casual approach to gathering knowledge. You navigate conversations with a blend of mild humor and curiosity, but lack deep self-awareness.'''"
                }
            ],
        };

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
        
        const accentColors = [
            {
                "name": "",
                "hex": "#",
            },
        ]


    </script>

<div class="{$animate} w-full h-full flex flex-col justify-center items-center pb-12 bg-true-white dark:bg-black">
    <!-- Cover Image -->
    <div class="w-full h-full flex justify-center relative">
        <!-- Blurred image -->
        <div class="w-full h-44 bg-[url('/banner/alta_studio.png')] bg-image blur-2xl dark:opacity-100 opacity-0">
            
        </div>
        <!-- Actual image -->
        <div class="w-full h-44 bg-[url('/banner/alta_studio.png')] bg-image absolute top-0">

        </div>

        <!-- Text -->
       <div class="absolute w-full h-20 -bottom-20 bg-opacity-40 flex justify-center flex-col items-center">
            <div class="bg-opacity-40 px-4 w-full md:w-5/6 text-3xl font-bold text-true-black dark:text-true-white">
                Creator's Studio
                
            </div>
       </div>
    </div>

    <div class=" mt-20 flex flex-col justify-start py-8 h-full w-full items-center  text-black dark:text-white">
        <form action="?/setPersonality" method="POST" class="w-full px-6 md:px-20 md:w-3/4">
        
            <input type="text" id="name" name="name" placeholder="Name" class="dark:bg-black bg-true-white rounded-full w-full dark:border-white border-black outline-none">
        

            <div class="flex flex-row justify-center gap-6 items-center my-2">

                <input type="checkbox" name="pro" value={proMode} class="hidden" checked>
                <div class="my-2 justify-center items-center flex gap-2 flex-row">
                    <h4 class="text-md font-semibold">
                        Public
                    </h4>
                    <SlideToggle name="publicAI" bind:checked={publicAI} active=" bg-green-500" class="bg-black dark:bg-white bg-opacity-20 " size="sm" />
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
                    
    
                        <div class="font-bold my-4 text-center">
                            Accent
                        </div>
                        <div class="flex md:flex-row justify-center items-center gap-2 flex-wrap">
                            <select class="select select-bordered w-full bg-white dark:bg-black text-black dark:text-white">
                                <option disabled selected>Accent Color</option>
                                {#each accents as acc}
                                <option>
                                     {acc.name}
                                </option>
                                {/each}
                              </select>

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