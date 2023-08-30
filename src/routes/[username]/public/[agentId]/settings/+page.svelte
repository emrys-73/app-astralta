<script>
// @ts-nocheck

    import { AltaCard, InfoModal } from "$lib/components";
    import { darkMode } from "../../../../../stores";
    import { onMount } from 'svelte';

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


</script>

<div clasS="w-full h-full my-8 flex justify-center items-center">
    <AltaCard>
        <div>
            <h3>
                {data?.agent.name}
            </h3>
        </div>
        <div class="flex flex-row jsutify-center items-center pt-4 gap-2">
            <div>
                <button on:click={showConfirmDelete(data?.agent.id)} class="{$darkMode ? 'bg-black bg-opacity-20' : 'bg-black bg-opacity-5' } px-4 py-1 rounded-2xl hover:bg-red-500 hover:bg-opacity-100">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                      </svg>
                      
                  </button>
            </div>
            <!-- <div>
                <button class="{$darkMode ? 'bg-black bg-opacity-20' : 'bg-black bg-opacity-5' } px-4 py-1 rounded-2xl hover:bg-true-white hover:bg-opacity-10">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                      </svg>                      
                      
                  </button>
            </div> -->
        


        </div>
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

</div>