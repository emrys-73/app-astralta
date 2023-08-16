<script>
    // @ts-nocheck
        import { AltaCard } from "$lib/components";
        import { darkMode } from "../../stores";
        import { SlideToggle } from '@skeletonlabs/skeleton';
        import { superForm } from 'sveltekit-superforms/client'
        import SuperDebug from 'sveltekit-superforms/client/SuperDebug.svelte'

        export let data

        const { form } = superForm(data.form)

        let proMode = false;
        let publicAI = false;

    </script>


<div class="w-full h-full flex justify-center items-center flex-col my-10">
    <!-- <div class="w-full">
        <SuperDebug data={$form} />
    </div> -->
        <div>
            <h1 class="text-true-white text-center text-2xl font-bold">
                New AI
            </h1>
        </div>
    
        <!-- Form -->
        <form action="?/createAgent" method="POST">
            <div>
                <AltaCard>
                    <input type="text" id="name" name="name" placeholder="Name" bind:value={$form.name} class="bg-black bg-opacity-20 rounded-full min-w-[350px] apple-input my-2 mt-4">

                    <div class="flex flex-row justify-center gap-6 items-center my-2">
                        <!-- <div class="my-2 justify-center items-center flex gap-2 flex-row">
                            <h4 class="text-md font-semibold">
                                Astralta PRO
                            </h4>
                            <SlideToggle name="pro" bind:checked={proMode} active=" bg-green-500" class="bg-white bg-opacity-20 " size="sm" />
                            <input type="checkbox" name="pro" value={proMode} class="hidden" checked>

                        </div> -->

                        <!-- Default for gpt-3.5-tubro -->
                        <input type="checkbox" name="pro" value={proMode} class="hidden" checked>
                        <div class="my-2 justify-center items-center flex gap-2 flex-row">
                            <h4 class="text-md font-semibold">
                                Public
                            </h4>
                            <SlideToggle name="publicMode" bind:checked={publicAI} active=" bg-green-500" class="bg-white bg-opacity-20 " size="sm" />
                            <input type="checkbox" name="publicAI" value={publicAI} class="hidden" checked>

                        </div>

                        <!-- We need to add another toggle for the base Info later -->
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
                    
                    <div class="flex flex-col md:flex-row justify-center items-center gap-2">
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
                </AltaCard>
                    
                <AltaCard>
                    <div>
                        <h2 class="font-bold text-xl">
                            Action Button
                        </h2>
                    </div>
                    <div class="flex flex-col gap-3 my-4">
                        <div>
                            <input type="text" id="cta_name" name="cta_name" placeholder="Action Name" bind:value={$form.cta_name} class="bg-black bg-opacity-20 rounded-full min-w-[350px] apple-input ">
                        </div>
                        <div>
                            <input type="text" id="cta_url" name="cta_url" placeholder="Action Link" bind:value={$form.cta_url} class="bg-black bg-opacity-20 rounded-full min-w-[350px] apple-input ">            
                        </div>
                    </div>
                   
                </AltaCard>
                
                <AltaCard>
                    <div>
                        <h2 class="font-bold text-xl">
                            Knowledge
                        </h2>
                    </div>

                    <textarea id="knowledge" name="knowledge" class="bg-black w-3/4 my-4 h-full min-h-[100px] bg-opacity-30 rounded-2xl" oninput="autoResize(this)"></textarea>



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
        
    
    
    </div>