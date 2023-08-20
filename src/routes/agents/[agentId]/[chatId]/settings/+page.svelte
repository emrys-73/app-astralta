<script>
    // @ts-nocheck
    
        import { InfoModal, AltaCard, LiveCard } from "$lib/components";
        import { darkMode } from "../../../../../stores.js";
        import { onMount } from 'svelte';


        export let data

        let displayDeleteConfirmation
        $: displayDeleteConfirmation = false;

        onMount(() => {
            editing = false;
            displayDeleteConfirmation = false;
        })

        let editing;
        $: editing = false;

        let currentChatId;
        $: currentChatId = "hi"

        const toggleEditForm = (chatId) => {
            currentChatId = chatId
            editing = true;
        }

        const hideEditForm = () => {
            currentChatId = ""
            editing = false;
        }

        const showConfirmDelete = (chatId) => {
            currentChatId = chatId
            displayDeleteConfirmation = true;
        }

        const hideConfirmDelete = () => {
            currentChatId = ""
            displayDeleteConfirmation = false;
        }
        
    
    </script>
    
    <div class="w-full h-full justify-center items-center flex">
        <AltaCard>
            <div class="flex flex-col">
                <div class="flex flex-row gap-3 justify-center items-center">
                    <div class="">
                        <h2 class="text-center font-semibold ">
                            {data?.chat.title}
                        </h2>
                    </div>
        
                    <div class="">
                            <a href="/agents/{data?.agent?.id}">
                            <button class="{$darkMode ? 'bg-black bg-opacity-20' : 'bg-black bg-opacity-5' } px-4 py-1 rounded-2xl hover:bg-true-white hover:bg-opacity-10">
                              {data?.agent.name}
                            </button>
                        </a>
                    </div>
                </div>


                <div>
                    <!-- Delete, rename, chat -->
                    <div class="flex flex-row justify-center items-center gap-2 mt-4">
                        <!-- Delete -->
                        <div>
                            <button on:click={showConfirmDelete(data?.chat.id)} class="{$darkMode ? 'bg-black bg-opacity-40' : 'bg-black bg-opacity-5' } px-4 py-2 rounded-2xl hover:bg-red-600 hover:bg-opacity-100">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                </svg>
                                
                              </button>
                        </div>

                        <!-- Rename -->
                        <div>
                            <button on:click={toggleEditForm(data?.chat.id)} class="{$darkMode ? 'bg-black bg-opacity-40' : 'bg-black bg-opacity-10' } px-4 py-2 rounded-2xl hover:bg-true-white hover:bg-opacity-10">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                  </svg>      
                              </button>
                 
                        </div>

                        <!-- Chat -->
                        <div>
                            <a href="/agents/{data?.agent.id}/{data?.chat.id}">
                                <button on:click={toggleEditForm(data?.chat.id)} class="{$darkMode ? 'bg-black bg-opacity-40' : 'bg-black bg-opacity-10' } px-4 py-2 rounded-2xl hover:bg-true-white hover:bg-opacity-10">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                                      </svg>    
                                  </button>
                                
                            </a>

                        </div>
                    </div>
                </div>
            </div>
            
        </AltaCard>

        {#if editing}
        <InfoModal>
          <span>
            <AltaCard>
              <form action="?/changeTitle" method="POST">
                <div class="justify-center flex flex-col items-center ">
                  <h3 class="text-center text-true-white text-lg font-semibold  py-4">
                    Change Title
                  </h3>
                 <input id="chatId" label="chatId" type="text" name="chatId" value={currentChatId} hidden/>
                 <input 
                    id="newTitle" 
                    label="newTitle" 
                    type="text" 
                    name="newTitle" 
                    placeholder="New Title"
                    class=" {$darkMode ? 'bg-black bg-opacity-40 text-opacity-80' : 'bg-black bg-opacity-5 text-opacity-90'} rounded-full mb-4 apple-input w-[30vh] font-regular force-opaque p-1.5 text-md text-opacity-50 focus:text-opacity-100 focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-text text-true-white" 
                 />
                 
                 <div class="w-full px-4 flex flex-row gap-2 justify-center items-center">
                  <div>
                    <button on:click={hideEditForm} class="{$darkMode ? 'bg-black bg-opacity-20' : 'bg-black bg-opacity-5' } px-4 py-1 mb-4 rounded-2xl hover:bg-red-600 hover:bg-opacity-100">
                      Cancel
                    </button>
                  </div>
                  <div>
                    <button type="submit" class="{$darkMode ? 'bg-black bg-opacity-40' : 'bg-black opacity-5' } px-4 py-1 mb-4 rounded-2xl hover:bg-true-white hover:bg-opacity-10">
                      Confirm
                    </button>
                  </div>
                 </div>
                 
                </div>
               </form>
            </AltaCard>
            <!-- Showcase chat summary so the user can give a proper name for the chat -->
          </span>
        </InfoModal>
        {/if}
    
        {#if displayDeleteConfirmation}
        <InfoModal>
          <span>
            <AltaCard>
              <form action="?/deleteChat" method="POST">
                <div class="justify-center flex flex-col items-center ">
                  <h3 class="text-center text-true-white text-lg font-semibold  py-4">
                    Are you sure you want to delete this chat?
                  </h3>
                 <input id="chatId" label="chatId" type="text" name="chatId" value={currentChatId} hidden/>
                 
                 
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
    