<script>
// @ts-nocheck

    import { AltaCard, LiveCard } from "$lib/components";
	import { onDestroy, onMount } from "svelte";
    import { darkMode, header, newAgentData } from "../../../stores.js";
    import { SlideToggle } from '@skeletonlabs/skeleton';

    export let data

    let proMode = false;
    let publicAI = false;

    onMount(() => {
        header.set(`Training`)
    })

    onDestroy(() => {
        header.set("Astralta")
    })

</script>


<div class="w-full h-full flex justify-center items-center flex-col my-10 p-4">
    <form action="?/createAgent" method="POST" class="justify-center flex items-center w-full h-full flex-col pt-4">

    <AltaCard>
            <div class="">
                <h2 class="font-bold text-xl">
                    Knowledge
                </h2>
            </div>
    
            <textarea id="knowledge" name="knowledge" class="bg-black w-full my-4 h-full min-h-[200px] bg-opacity-30 rounded-2xl min-w-[300px] md:w-[600px] xl:min-w-[800px]" ></textarea>


            
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
        
    </form>
</div>