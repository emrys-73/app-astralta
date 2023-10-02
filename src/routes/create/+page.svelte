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


        const colors = [
    {
        "name": "Black Titanium",
        "hex": "393B3C",
        "bg-hex": "bg-[#393B3C]",
        "text": "text-white",
        "bg_suggestion": "dark",
        "base_name": "black_titanium"
    },
    {
        "name": "Natural Titanium",
        "hex": "9D968B",
        "bg-hex": "bg-[#9D968B]",
        "text": "text-white",
        "bg_suggestion": "dark",
        "base_name": "natural_titanium"
    },
    {
        "name": "Blue Titanium",
        "hex": "373F4F",
        "bg-hex": "bg-[#373F4F]",
        "text": "text-white",
        "bg_suggestion": "dark",
        "base_name": "blue_titanium"
    },
    {
        "name": "White Titanium",
        "hex": "F2F1EA",
        "bg-hex": "bg-[#F2F1EA]",
        "text": "text-black",
        "bg_suggestion": "dark, both",
        "base_name": "white_titanium"
    },
    {
        "name": "Space Black",
        "hex": "302E2D",
        "bg-hex": "bg-[#302E2D]",
        "text": "text-white",
        "bg_suggestion": "dark",
        "base_name": "space_black"
    },
    {
        "name": "Deep Purple",
        "hex": "4A4055",
        "bg-hex": "bg-[#4A4055]",
        "text": "text-white",
        "bg_suggestion": "dark",
        "base_name": "deep_purple"
    },
    {
        "name": "Alpine Green",
        "hex": "485A47",
        "bg-hex": "bg-[#485A47]",
        "text": "text-white",
        "bg_suggestion": "dark, both",
        "base_name": "alpine_green"
    },
    {
        "name": "Sierra Blue",
        "hex": "87A3BB",
        "bg-hex": "bg-[#87A3BB]",
        "text": "text-white",
        "bg_suggestion": "light, both",
        "base_name": "sierra_blue"
    },
    {
        "name": "Graphite",
        "hex": "454340",
        "bg-hex": "bg-[#454340]",
        "text": "text-white",
        "bg_suggestion": "dark, both",
        "base_name": "graphite"
    },
    {
        "name": "Pacific Blue",
        "hex": "1D3F4D",
        "bg-hex": "bg-[#1D3F4D]",
        "text": "text-white",
        "bg_suggestion": "dark",
        "base_name": "pacific_blue"
    },
    {
        "name": "Rose Gold",
        "hex": "DFB5B1",
        "bg-hex": "bg-[#DFABA6]",
        "text": "text-white",
        "bg_suggestion": "dark",
        "base_name": "rose_gold"
    },
]



        const backgrounds = [
            {
                "name": "Classic",
                "realName": "Classic",
                "hex": "#000000",
                "bg": `hover:bg-[#000000]`,
            },
            {
                "name": "Notion",
                "realName": "Notion",
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


        // Color selection
        let selectedColor = null;
        let accent = undefined;  // This variable is bound to the input field and will hold the base_name
        // This function finds the selected color object based on the color name
        const findColorByName = (name) => colors.find(color => color.name === name);

        // This is a reactive statement that watches the selectedColor variable
        $: selectedColorObj = selectedColor ? findColorByName(selectedColor) : null;
        // Updating the accent variable whenever selectedColorObj changes
        $: if (selectedColorObj) {
            accent = selectedColorObj.base_name;
        }


        let selectedBackgroundColor = null;
        const findBgColorByName = (name) => backgrounds.find(bg => bg.name === name);
        $: selectedBackgroundColorObj = selectedBackgroundColor ? findBgColorByName(selectedBackgroundColor) : null;

        let storeMessages = true;

        let actionPrompt = undefined

        let AIMax = false

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
        

            <div class="flex flex-row justify-center items-center my-2">

                <!-- <input type="checkbox" name="pro" value={proMode} class="" checked> -->
                <div class="my-4 justify-center items-center flex flex-wrap gap-x-20 flex-row px-6">
                    <!-- <div class="flex flex-row">

                        <h4 class="text-md font-semibold">
                            Public
                        </h4>
                        <SlideToggle name="publicAI" bind:checked={publicAI} active=" bg-green-500" class="bg-black dark:bg-white bg-opacity-20 " size="sm" />
                        <input type="checkbox" name="publicAI" value={publicAI} class="hidden" checked>
                        
                    </div> -->
                    <div>

                        <input type="checkbox" name="publicAI" value={publicAI} class="hidden" checked>
                        <div class="my-4 justify-center items-center flex gap-2 flex-row">
                            <h4 class="text-md font-semibold">
                                Public
                            </h4>
                            <SlideToggle name="publicAI" bind:checked={publicAI} active=" bg-green-500" class="bg-black dark:bg-white bg-opacity-20 " size="sm" />
                            <input type="checkbox" name="publicAI" value={publicAI} class="hidden" checked>
    
                        </div>

                    </div>

                    <div>

                        <input type="checkbox" name="storeMessages" value={storeMessages} class="hidden" checked>
                        <div class="my-4 justify-center items-center flex gap-2 flex-row">
                            <h4 class="text-md font-semibold">
                                Store Messages
                            </h4>
                            <SlideToggle name="storeMessages" bind:checked={storeMessages} active=" bg-green-500" class="bg-black dark:bg-white bg-opacity-20 " size="sm" />
                            <input type="checkbox" name="storeMessages" value={storeMessages} class="hidden" checked>
    
                        </div>

                    </div>

                    <!-- <div>

                        <input type="checkbox" name="max" value={AIMax} class="hidden" checked>
                        <div class="my-4 justify-center items-center flex gap-2 flex-row">
                            <h4 class="text-md font-semibold">
                                AI-Max
                            </h4>
                            <SlideToggle name="AIMax" bind:checked={AIMax} active=" bg-green-500" class="bg-black dark:bg-white bg-opacity-20 " size="sm" />
                            <input type="checkbox" name="AIMax" value={AIMax} class="hidden" checked>
    
                        </div>

                    </div> -->


                </div>

                
            </div>


            <div>
                <!-- Appearance -->
                <div class="">
                    
                        <div class="mt-12">
                            <h2 class="font-bold text-xl py-2 md:py-0">
                                Appearance
                            </h2>
                            <span class="opacity-60">
                                Customise the colors for the chat.
                            </span>
                        </div>

                        <div class=" font-bold mt-12 mb-4 text-center">
                            Background
                        </div>
                        <div class="flex md:flex-row justify-center items-center gap-2 flex-wrap">

                            {#each backgrounds as bg}
                            <div class="flex flex-wrap justify-center items-center gap-1 font-light">
                                <div class="flex">
                                    {#if bg.name === "Classic"}
                                    <input type="radio" name="bg" value={bg.realName} class="bg-black bg-opacity-40" checked>
                                    {:else }
                                        <input type="radio" name="bg" value={bg.realName} class="bg-black bg-opacity-40">
                                    {/if}
                                </div>
                                <div class="flex rounded-full px-2">
                                    <label for="bg">{bg.name}</label>
                                </div>
                            </div>
                                {/each}
                            
                        </div>
                    
    
                        <div class="font-bold text-center mt-12 mb-4">
                            Accent Color
                        </div>
                        <div class="flex flex-col justify-center items-center gap-2">
                            <div class="w-full">
                                <input type="text" name="accent" bind:value={accent} class="bg-black" hidden />
                                <select bind:value={selectedColor} class="select select-bordered w-full bg-white dark:bg-black text-black dark:text-white">
                                    <option disabled selected>Accent Color</option>
                                    {#each colors as color}
                                        <option value={color.name}>
                                            {color.name}
                                        </option>
                                    {/each}
                                </select>
                            </div>
                            <div>
                                <div class="justify-center flex items-center my-4  p-6 {`${selectedBackgroundColorObj ? selectedBackgroundColor : ''}`}">
                                    <!-- This button's class changes based on the selected color -->
                                    <div class="{`${selectedColorObj ? selectedColorObj['bg-hex'] : 'bg-true-black'} ${selectedColorObj ? selectedColorObj.text : 'text-white'}`} altashadow px-6 py-2 hover:cursor-auto font-normal lowercase tracking-wider rounded-full border-none {$animate}">
                                        <span class="text-sm">
                                            This is how your messages will look like
                                        </span>
                                    </div>
                                </div>
                            </div>

                            
                        </div>

                    


                </div>

                <!-- Personality -->
                <div class="pt-10 pb-20">
                    <a href="/personalities">
                        <div class="my-6">
                            <h2 class="font-bold text-xl py-2 md:py-0">
                                Personality
                            </h2>
                            <span class="opacity-60">
                                This defines how your AI will act.
                            </span>
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
                        
                        <!-- <a href="/create/perso">
                            <button class="btn bg-black my-2 bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md  border-none normal-case transition ease-in-out duration-300">  
                                <span>
                                    + New Personality
                                </span>
                            </button>
                        </a> -->
                    </div>
                </div>

                <!-- Knowledge -->
                <div class="py-6">
                    <div class="my-4">
                        <h2 class="font-bold text-xl py-2 md:py-0">
                            Knowledge
                        </h2>
                        <span class="opacity-60">
                            Write here all the things you want your AI to know. 
                        </span>
                    </div>
    
                    <textarea id="knowledge" name="knowledge" class="bg-white dark:bg-black w-full h-full min-h-[100px] bg-opacity-30 rounded-2xl  placeholder:opacity-60" placeholder="For example paste here the content of a website or paper you writing about." ></textarea>
                </div>


                <div class="py-6 mb-10">
                    <div class="my-4">
                        <h2 class="font-bold text-xl py-2 md:py-0">
                            Action Prompt
                        </h2>
                        <span class="opacity-60">
                            The prompt you define here will be accessible through a click of a button in your AI.
                        </span>
                    </div>

                    <input type="text" name="actionPrompt" id="actionPrompt" placeholder="Examples: 'Keep writing', 'summarise the last message', 'explain it simpler', 'try again,..." bind:value={actionPrompt} class="w-full bg-white dark:bg-black rounded-2xl overflow-x-auto placeholder:opacity-60"/>

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


