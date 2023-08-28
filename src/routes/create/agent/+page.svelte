<script>
// @ts-nocheck

    import { AltaCard, LiveCard } from "$lib/components";
	import { onDestroy, onMount } from "svelte";
    import { darkMode, header } from "../../../stores.js";
    import { SlideToggle } from '@skeletonlabs/skeleton';

    export let data

    let proMode = false;
    let publicAI = false;

    onMount(() => {
        header.set("New AI")
    })

    onDestroy(() => {
        header.set("Astralta")
    })

</script>


<div class="w-full h-full flex justify-center items-center flex-col my-10">

    <form action="?/setPersonality" method="POST">
        <div class="px-4 lg:px-20 xl:px-40">

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
                            {#if perso.name === "Astralta"}
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
                <div>
                    <button type="submit" class="btn bg-black my-2 bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md  border-none normal-case transition ease-in-out duration-300">  
                        Set personality
                    </button>
                </div>
            </AltaCard>
        </div>

    </form>

</div>