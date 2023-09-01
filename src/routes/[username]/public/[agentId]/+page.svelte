<script>
// @ts-nocheck

    import { AltaCard, InfoModal } from '$lib/components/index.js';
    import { darkMode } from '../../../../stores.js';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';


    export let data;

    let displayDeleteConfirmation
    $: displayDeleteConfirmation = false;

    let currentAgentId;
    $: currentAgentId = "hi"

    onMount(() => {
        // editing = false;
        displayDeleteConfirmation = false;
    })

    const showConfirmDelete = (agentId) => {
        currentAgentId = agentId
        displayDeleteConfirmation = true;
    }

    const hideConfirmDelete = () => {
        currentAgentId = ""
        displayDeleteConfirmation = false;
    }

    let agentCopied = false;

    async function copyToClipboard(content) {
      try {
        await navigator.clipboard.writeText(content);
        agentCopied = true
        // ALERT COPIED TO CLIPBOARD
        console.log('Content copied successfully!');
      } catch (error) {
        console.error('Failed to copy content to clipboard:', error);
      }
    }


    setTimeout(() => {
      agentCopied = false;
    }, 5000);



</script>

<div class="w-full h-full flex justify-center items-center px-4">
        <AltaCard>
            <div class="flex flex-row gap-3">
              <div>
                <h1 class="text-xl font-bold uppercase text-center mt-2">
                    {data?.agent.name}
                </h1>
              </div>
              <!-- {#if data?.agent.model === "gpt-4"}
                <div class="justify-center items-center flex">
                  <span class="rounded-2xl bg-black bg-opacity-50 px-4 text-xs py-1">
                      PRO
                  </span>
                </div>
                {/if} -->
            </div>
            <div class="md:grid md:grid-cols-6 md:gap-0 flex flex-col justify-center items-center">
                <!-- <div>
                    <div class="justify-center items-center flex flex-col">
                        {#if data?.agent?.summary}
                        <div>
                            <div class="bg-black bg-opacity-20 rounded-2xl backdrop-blur-md text-center p-2">
                                {data?.agent.summary}
                            </div>
                        </div>
                        {/if}
                      </div>
                </div> -->
                <div class="col-span-6">
                    <form action="?/createPublicAgent" method="POST" class="justify-center flex ">

                      <button type="submit" class="my-4 flex flex-row text-center items-center justify-center gap-2 backdrop-blur-md {$darkMode ? 'bg-black bg-opacity-60' : 'bg-black bg-opacity-30'} altashadow text-true-white p-4 hover:bg-true-black hover:bg-opacity-40 hover:cursor-pointer rounded-2xl transition duration-500 ease-in-out">
                        <div>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                          
                        </div>
                        <div>
                          <h1 class="text-true-white text-md text-center">
                            Start Chat
                        </h1>
                        <!-- {$publicUrl} -->
                        </div>
                      </button>
                    </form>
                    
                    {#if data?.thereIsAnUser}
                    <div class="w-full justify-center items-center flex pt-2 gap-2">
                      <div>
                        <button on:click={showConfirmDelete(data?.agent.id)} class="{$darkMode ? 'bg-black bg-opacity-20' : 'bg-black bg-opacity-5' } transition-all duration-300 ease-in-out px-4 py-1 rounded-2xl hover:bg-red-500 hover:bg-opacity-100">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                          
                        </button>
                      </div>
                      <a href="/">
                        <div>
                          <button class="{$darkMode ? 'bg-black bg-opacity-20' : 'bg-black bg-opacity-5' } transition-all duration-300 ease-in-out px-4 py-1 rounded-2xl hover:bg-white hover:bg-opacity-10">
                          
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                            </svg>
                          </button>
                        </div>
                      </a>
                      <div>
                        <button on:click={copyToClipboard(`${$page.url}/import`)} class="{$darkMode ? 'bg-black bg-opacity-20' : 'bg-black bg-opacity-5' } transition-all duration-300 ease-in-out px-4 py-1 rounded-2xl hover:bg-white hover:bg-opacity-10">
                        
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15" />
                          </svg>
                          
                        </button>
                      </div>

                      
                        <!-- <div class="text-system-cyan hover:bg-true-white hover:bg-opacity-5 hover:cursor-pointer rounded-full p-2 px-4 transition-all duration-500 ease-in-out">
                          Go back home
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                        </svg>
                         -->
                         
                    </div>
                    {/if}
                </div>
                
                <!-- <div class="col-span-4 justify-center items-center flex flex-col">
                    <div class="justify-center items-center flex flex-col">
                      {#if data?.agent?.summary}
                      <div>
                          <div class="bg-black bg-opacity-20 rounded-2xl backdrop-blur-md text-center p-4">
                              {data?.agent.summary}
                          </div>
                      </div>
                      {/if}
    
    
                    </div>
                </div>
                
                
            </div> -->
        </AltaCard>

        {#if displayDeleteConfirmation}
        <InfoModal>
          <span>
            <AltaCard>
              <form action="?/deletePublicAgent" method="POST">
                <div class="justify-center flex flex-col items-center ">
                  <h3 class="text-center text-true-white text-lg font-semibold  py-4">
                    Are you sure you want to delete this public agent?
                  </h3>
                 <input id="agentId" label="agentId" type="text" name="agentId" value={currentAgentId} hidden/>
                 
                 
                 <div class="w-full px-4 flex flex-row gap-2 justify-center items-center">
                  <div>
                    <button on:click={hideConfirmDelete} class="{$darkMode ? 'bg-black bg-opacity-20' : 'bg-black bg-opacity-5' } px-4 py-1 mb-4 rounded-2xl hover:bg-true-white hover:bg-opacity-10">
                      Cancel
                    </button>
                  </div>
                  <div>
                    <button type="submit" class="{$darkMode ? 'bg-black bg-opacity-40' : 'bg-black opacity-5' } px-4 py-1 mb-4 rounded-2xl hover:bg-red-600 hover:bg-opacity-100">
                      Confirm
                    </button>
                  </div>
                 </div>
                 
                </div>
               </form>
            </AltaCard>
          </span>
        </InfoModal>
        {/if}

        {#if agentCopied}
          <div class="toast toast-center ">
            <div class="alert alert-success rounded-2xl bg-green-500 text-white ">
              <span class="text-white ">AI Link copied to Clipboard!</span>
            </div>
          </div>
        {/if}
</div>