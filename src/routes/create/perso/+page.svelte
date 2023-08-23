<script>
    import { LiveCard, AltaCard, InfoModal } from "$lib/components";
    import { darkMode } from "../../../stores";

    // export let data


    const tones = ["casual", "friendly", "professional"]

    let traits = {
        "humor": 5,
        "politeness": 5,
        "empathy": 5,
        "optimism": 5,
        "curiosity": 5,
    }

</script>

<div class="w-full h-full text-true-white">
    <div class="flex justify-center items-center my-20 flex-col">
        <div>
            <h1 class="text-xl text-center font-bold">
                New Personality
            </h1>
        </div>
        <form action="?/createPersonality" method="POST" class="w-full px-4 md:w-3/4 py-2">
            <div class="w-full">
                <AltaCard>
                    <input type="text" id="name" name="name" placeholder="Name" class="bg-black bg-opacity-20 rounded-full min-w-[350px] apple-input my-2 mt-4">
    
                    <h3 class="py-4 font-semibold">
                        Tone
                    </h3>
    
                    <div class="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 ">
                        {#each tones as tone}
                            <div class="flex flex-row justify-center items-center gap-2">
                                <div class="flex">
                                    <input type="radio" name="tone" value={tone} class="bg-black bg-opacity-40" checked={tone === "casual"}>
                                </div>
                                <div class="flex">
                                    <label for="tone">{tone}</label>
                                </div>
                            </div>
                        {/each}
                    </div>
    
    
                </AltaCard>
                <AltaCard>
                    <div class="py-2 w-full md:w-3/4 text-center">
                        <h3 class="py-2">
                            Humor
                        </h3>
                        <div class="w-full">
                            <input type="range" min="0" max="10" bind:value={traits.humor} class="range" name="humor" step="1" />
                                <div class="w-full flex justify-between text-xs px-2">
                                <span>0</span>
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                                <span>5</span>
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                                <span>10</span>
                                </div>
                        </div>
                    </div>
                    <div class="py-2 w-full md:w-3/4 text-center">
                        <h3 class="py-2">
                            Politeness
                        </h3>
                        <div class="w-full">
                            <input type="range" min="0" max="10" bind:value={traits.politeness} class="range" name="politeness" step="1" />
                                <div class="w-full flex justify-between text-xs px-2">
                                <span>0</span>
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                                <span>5</span>
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                                <span>10</span>
                                </div>
                        </div>
                    </div>
                    <div class="py-2 w-full md:w-3/4 text-center">
                        <h3 class="py-2">
                            Empathy
                        </h3>
                        <div class="w-full">
                            <input type="range" min="0" max="10" bind:value={traits.empathy} class="range" name="empathy" step="1" />
                                <div class="w-full flex justify-between text-xs px-2">
                                <span>0</span>
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                                <span>5</span>
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                                <span>10</span>
                                </div>
                        </div>
                    </div>
                    <div class="py-2 w-full md:w-3/4 text-center">
                        <h3 class="py-2">
                            Optimism
                        </h3>
                        <div class="w-full">
                            <input type="range" min="0" max="10" bind:value={traits.optimism} class="range" name="optimism" step="1" />
                                <div class="w-full flex justify-between text-xs px-2">
                                <span>0</span>
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                                <span>5</span>
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                                <span>10</span>
                                </div>
                        </div>
                    </div>
                    <div class="py-2 w-full md:w-3/4 text-center">
                        <h3 class="py-2">
                            Curiosity
                        </h3>
                        <div class="w-full">
                            <input type="range" min="0" max="10" bind:value={traits.curiosity} class="range" name="curiosity" step="1" />
                                <div class="w-full flex justify-between text-xs px-2">
                                <span>0</span>
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                                <span>5</span>
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                                <span>|</span>
                                <span>10</span>
                                </div>
                        </div>
                    </div>
                </AltaCard>
                <AltaCard>
                    <h3 class="py-4 font-semibold">
                        Fine Tuning
                    </h3>

                    <textarea id="fine_tune" name="fine_tune" class="bg-black w-3/4 my-4 h-full min-h-[100px] bg-opacity-30 rounded-2xl" ></textarea>

                </AltaCard>
            </div>
            <div class="flex flex-col justify-center items-center my-2">
                <button type="submit" class="my-4 flex flex-row text-center items-center justify-center gap-2 backdrop-blur-md {$darkMode ? 'bg-black bg-opacity-80' : 'bg-black bg-opacity-60'} altashadow text-true-white p-2 min-w-[350px] hover:bg-true-black hover:bg-opacity-40 hover:cursor-pointer rounded-full transition duration-300 ease-in-out">
                    <div class="flex flex-row gap-3 justify-center items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                          </svg>                          
                      <h1 class="text-true-white text-lg text-center">
                        Create Personality
                    </h1>
                    </div>
                </button>
            </div>
        </form>

    </div>
</div>


