<script>
// @ts-nocheck

  import { InfoModal, LiveCard, AltaCard } from '$lib/components';
  import { darkMode, chatCount, header } from '../stores.js';
  import { onMount } from 'svelte';
  export let data;

  header.set("Astralta")

  let max_chats = 10;

  onMount(() => {
    editing = false;
    displayDeleteConfirmation = false;
    chatCount.set(data.chats.length)
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

  let displayDeleteConfirmation
  $: displayDeleteConfirmation = false;

  const showConfirmDelete = (chatId) => {
    currentChatId = chatId
    displayDeleteConfirmation = true;
  }

  const hideConfirmDelete = () => {
    currentChatId = ""
    displayDeleteConfirmation = false;
  }

</script>


 <div class="h-full text-center text-true-white content-center flex justify-center items-center mx-4 relative">
  <div class="my-20">
    <a href="/create">
      <div class="my-4 flex flex-row text-center items-center justify-center gap-2 backdrop-blur-md {$darkMode ? 'bg-black bg-opacity-80' : 'bg-black bg-opacity-30'} altashadow text-true-white p-4 min-w-[350px] hover:bg-true-black hover:bg-opacity-40 hover:cursor-pointer rounded-2xl transition duration-500 ease-in-out">
        <div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          
        </div>
        <div>
          <h1 class="text-true-white text-lg text-center">
            New Agent
        </h1>
        </div>
      </div>
    </a>

    {#if $chatCount >= max_chats}
    <div class="bg-black bg-opacity-60 py-2 px-4 rounded-full breathe">
      <p class="text-center text-true-white text-md">
        You've reached the maximum number of chats. Delete a chat if you wish to create a new one.
      </p>
    </div>
    {:else}

    {#each data?.agents as agent}
    <AltaCard>
      <div class="relative">
        <div class="w-full">
          <div>
            <div class="flex flex-row gap-3 justify-center items-center">
              <h2 class="text-left ml-2 font-bold text-md">
                {agent.name}
              </h2>
              {#if agent.public}
              <div class="justify-center items-center flex">
                  <span class="rounded-2xl bg-black bg-opacity-50 px-4 text-xs py-1">
                      PUBLIC
                  </span>
              </div>
              {/if}
              {#if agent.model === "gpt-4"}
            <div>
                <span class="rounded-2xl bg-black bg-opacity-50 px-4 text-xs py-1">
                    PRO
                </span>
            </div>
            {/if}
            </div>
          </div>
        </div>

        <div>
          {#each data?.chats as chat}
          {#if chat.agent === agent.id} 
            <a href="/agents/{chat.id}">
              <LiveCard>
                <div>
                  <h1 class="text-true-white text-lg text-center">
                    {chat.title}
                  </h1>
                </div>
              </LiveCard>
            </a>
            
          {/if}
          {/each}
        </div>
        <a href="/create">
          <div class="my-4 flex flex-row text-center items-center justify-center gap-2 backdrop-blur-md {$darkMode ? 'bg-black bg-opacity-60' : 'bg-black bg-opacity-30'} altashadow text-true-white p-4 min-w-[350px] hover:bg-true-black hover:bg-opacity-40 hover:cursor-pointer rounded-2xl transition duration-500 ease-in-out">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              
            </div>
            <div>
              <h1 class="text-true-white text-lg text-center">
                New Chat
            </h1>
            </div>
          </div>
        </a>
      </div>
    </AltaCard>

    {/each}
  
    
    {/if}

    


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


        <!-- Showcase chat summary so the user can give a proper name for the chat -->
      </span>
  </InfoModal>
    {/if}


    {#each data?.chats as chat}
    <a href='/chats/{chat.id}'>
        <LiveCard class="">
          <div class="absolute left-2 bottom-4">
            <a href="/">
              <button on:click={showConfirmDelete(chat.id)} class="{$darkMode ? 'bg-black bg-opacity-40' : 'bg-black bg-opacity-5' } px-4 py-2 rounded-2xl hover:bg-red-600 hover:bg-opacity-100">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
                
              </button>
            </a>
          </div>
          
          <div class="flex flex-row gap-3 justify-center px-14">
            {#if chat.public}
            <div>
                <span class="rounded-2xl bg-black bg-opacity-50 px-4 text-xs py-1">
                    PUBLIC
                </span>
            </div>
            {/if}
            <div>
              <h1 class="text-true-white text-lg text-center">
                {JSON.stringify(chat.title)}
              </h1>
            </div>
            {#if chat.ai_model === "gpt-4"}
            <div>
                <span class="rounded-2xl bg-black bg-opacity-50 px-4 text-xs py-1">
                    PRO
                </span>
            </div>
            {/if}
            

            <div class="absolute right-2 bottom-4">
              <a href="/">
                <button on:click={toggleEditForm(chat.id)} class="{$darkMode ? 'bg-black bg-opacity-40' : 'bg-black bg-opacity-10' } px-4 py-2 rounded-2xl hover:bg-true-white hover:bg-opacity-10">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </LiveCard>
    </a>
    {/each}
</div>
</div>

{#if data.waitlist}
  <InfoModal>
      <span slot="backlink">
        <div class="mt-4 mb-2">
          <a href="/login" class="text-center">
            <div class="text-system-cyan hover:bg-true-white hover:bg-opacity-5 hover:cursor-pointer rounded-xl p-2 hover:backdrop-blur-md">
              Log In
            </div>
          </a>
        </div>
          <div class="mb-4">
              <a href="/waitlist" class="text-center">
                <div class="text-system-cyan hover:bg-true-white hover:bg-opacity-5 hover:cursor-pointer rounded-xl p-2 hover:backdrop-blur-md">
                  Join Waitlist
                </div>
              </a>
            </div>
      </span>
  </InfoModal>
{/if}