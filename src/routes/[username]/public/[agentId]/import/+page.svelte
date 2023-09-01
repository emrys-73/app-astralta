<script>
    import { AltaCard } from "$lib/components";
    import { darkMode, header } from "../../../../../stores";
    import { onMount } from "svelte";

    export let data;

    onMount(() => {
        header.set(`Import ${data.agent.name}`)
    })




</script>


<div class="w-full h-full flex flex-col justify-center items-center px-4 xl:pg-20 lg:px-16 md:px-12 relative">
    <div class="fixed top-0 h-16 backdrop-blur-md w-full justify-center text-center items-center flex z-50">
        <h2 class="text-white uppercase font-bold text-2xl">
            {$header}
        </h2>
    </div>
    <div class="max-w-[600px] xl:max-w-[800px]">
        <AltaCard>
            <h3 class="text-true-white text-lg font-regular text-center">
                <!-- {`Do you wish to import ${data.agent.name} from ${data.username}?`} -->
                Do you wish to import 
                <span class=" font-semibold">
                    {data.agent.name}
                </span>
                from
                <span class=" font-semibold">
                    {data.username}
                </span>
                ?
            </h3>
    
            <div class="">
                <AltaCard>
                    {data.agent.summary}
                </AltaCard>
            </div>
    
            <form action="?/importAI" method="POST">
                <button class="">
                      <div class="my-4 flex flex-row text-center items-center justify-center gap-2 backdrop-blur-md {$darkMode ? 'bg-black bg-opacity-80' : 'bg-black bg-opacity-30'} altashadow text-true-white p-4 min-w-[350px] hover:bg-true-black hover:bg-opacity-40 hover:cursor-pointer rounded-2xl transition duration-500 ease-in-out">
                        <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                              </svg>
                        </div>
                        <div>
                          <h1 class="text-true-white text-md text-center">
                            Import AI
                        </h1>
                        </div>
                      </div>
                    </button>
            </form>
        </AltaCard>
    </div>
</div>