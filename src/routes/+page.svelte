<script>
// @ts-nocheck

  import { InfoModal, LiveCard, AltaCard } from '$lib/components';
  import { darkMode, chatCount, header, publicUrl } from '../stores.js';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  export let data;

  let debugMode = false

  let agentCopied = false;

  header.set("Astralta")

  let max_chats = 100;

  onMount(() => {
    editing = false;
    displayDeleteConfirmation = false;
    chatCount.set(data?.chats?.length);  
    countPublic();
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

  let currentAgentId;
  $: currentAgentId = ""

  let pinnedChatUrl;
  $: pinnedChatUrl = ""

  const pinChat = (url) => {
    pinnedChatUrl = url
  }

  const unpinChat = () => {
    pinnedChatUrl = ""
  }

  let existUnassigned;
  $: existUnassigned = false;

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

  let publicCount;
  $: publicCount = 0;

  const countPublic = () => {
    for (let i = 0; i < data.agents.length; i++) {
      if (data.agents[i].public) {
        console.log("hi")
        publicCount = publicCount + 1;
      }
    }
  }
  
  
  const checkUnassigned = () => {
    for (let i = 0; i < data.chats; i++) {
      console.log(data.chats[i].agent)
      if (!data.chats[i].agent) {
        existUnassigned = true;
      }
    }

  }

  // setTimeout(() => {
  //     const toast = document.querySelector('.toast');
  //     toast.style.display = 'none';
  //   }, 5000); // 3000 milliseconds = 3 seconds

  setTimeout(() => {
    agentCopied = false;
  }, 4000);


</script>


 <div class="h-full w-full text-center text-true-white flex justify-center items-center relative px-4 xl:px-36 lg:px-24 md:px-20">
  <div class="grid grid-cols-12 gap-4 ">
    <div class="{debugMode ? 'col-span-4' : 'col-span-12'}">
      <div class="mt-20">
        <a href="/create">
          <div class="my-4 flex flex-row text-center items-center justify-center gap-2 backdrop-blur-md {$darkMode ? 'bg-black bg-opacity-80' : 'bg-black bg-opacity-30'} altashadow text-true-white p-4 min-w-[350px] hover:bg-true-black hover:bg-opacity-40 hover:cursor-pointer rounded-2xl transition duration-500 ease-in-out">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              
            </div>
            <div>
              <h1 class="text-true-white text-md text-center">
                New AI
            </h1>
            </div>
          </div>
        </a>
      </div>
      <div class="my-4 w-full gap-4 flex flex-wrap flex-row justify-center items-center">
    
        {#if $chatCount >= max_chats}
        <div class="bg-black bg-opacity-60 py-2 px-4 rounded-full breathe">
          <p class="text-center text-true-white text-md">
            You've reached the maximum number of chats. Delete a chat if you wish to create a new one.
          </p>
        </div>
        {:else}
        <div class="w-full flex flex-col gap-2">
          {#if publicCount > 0}
          <div class="">
            <div class="">
              <AltaCard>
                <div class="">
                  <div class="justify-center items-center flex gap-2">
                    <h2 class="text-left ml-2 font-bold text-md">
                      Public
                    </h2>
                  </div>
                  <div class="flex flex-row flex-wrap gap-x-4 justify-center gap-y-0 items-center">
                    {#each data?.agents as agent}
                    {#if agent.public}
                    <AltaCard>
                      <div class="flex flex-row gap-2">
                        <div class="justify-center items-center flex">
                          <a href={`/${data?.user?.username}/public/${agent.id}`}>
                            <h3 class="text-left ml-2 font-bold text-md">
                              {agent.name}
                            </h3>
                            </a>
                          </div>
                          <div class="">
                            <button on:click={copyToClipboard(`${$page.url}${data?.user?.username}/public/${agent.id}`)} class="{$darkMode ? 'bg-black bg-opacity-40' : 'bg-black bg-opacity-10' } px-4 py-2 rounded-2xl hover:bg-true-white hover:bg-opacity-10">
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5A3.375 3.375 0 006.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0015 2.25h-1.5a2.251 2.251 0 00-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 00-9-9z" />
                              </svg>
                            </button>
                          
                          </div>
                          <div class="">
                            <a href="/{data?.user?.username}/public/{agent.id}/settings">
                              <button class="{$darkMode ? 'bg-black bg-opacity-40' : 'bg-black bg-opacity-10' } px-4 py-2 rounded-2xl hover:bg-true-white hover:bg-opacity-10">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                  <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                </svg>
                                
                              </button>
                            </a>
                          </div>
                        </div>
                      </AltaCard>
                    {/if}
                    {/each}
                  </div>
                </div>
              </AltaCard>
              
            </div>
          </div>
          {/if}
          <div class="gap-x-6 gap-y-0 flex flex-wrap justify-center items-center">
            {#each data?.agents as agent}
              {#if !agent.public}
              <AltaCard>
                <div class="relative">
                  <div class="w-full">
                    <div>
                      <a href="/agents/{agent.id}">
                        <div class="flex flex-row gap-2 justify-center items-center">
                          <div>
                            <h2 class="text-left ml-2 font-bold text-md">
                              {agent.name}
                            </h2>
                          </div>
                          <div class="gap-1 flex flex-row ">
                            {#if agent.model === "gpt-4"}
                            <div class="justify-center items-center flex">
                                <span class="rounded-2xl bg-black bg-opacity-50 px-4 text-xs py-1">
                                    PRO
                                </span>
                            </div>
                            {/if}
                          </div>
                        </div>
                      </a>
                      </div>
                    </div>
                    
            
                    <div>
                      {#each data?.chats as chat}
                      {#if chat.agent === agent.id} 
                        <a href="/agents/{agent.id}/{chat.id}" class="min-w-[350px] hover:opacity-60 hover:cursor-pointer">
                          <LiveCard>
                            <div>
                              <h1 class="text-true-white text-md text-center">
                                {chat.title}
                              </h1>
                            </div>
                            <div class="absolute right-2 bottom-3">
                              <a href="/agents/{agent.id}/{chat.id}/settings">
                                <button class="{$darkMode ? 'bg-black bg-opacity-40' : 'bg-black bg-opacity-10' } px-4 py-2 rounded-2xl hover:bg-true-white hover:bg-opacity-10">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                  </svg>
                                  
                                </button>
                              </a>
                            </div>
                          </LiveCard>
                        </a>
                        
                      {/if}
                      {/each}
                    </div>
          
                      <form action="?/createChat" method="POST" class="z-50 justify-center items-center flex">
                        <input type="text" id="name" value="Astralta" name="name" class="hidden">
                        <input type="text" id="agentId" value={agent.id} name="agentId" class="hidden"> 
            
                        <button type="submit" class="my-4 flex flex-row text-center items-center justify-center gap-2 backdrop-blur-md {$darkMode ? 'bg-black bg-opacity-60' : 'bg-black bg-opacity-30'} altashadow text-true-white p-4 min-w-[350px] hover:bg-true-black hover:bg-opacity-40 hover:cursor-pointer rounded-2xl transition duration-500 ease-in-out">
                          <div>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            
                          </div>
                          <div class="">
                            <h1 class="text-true-white text-md text-center justify-center">
                              New Chat
                          </h1>
                          </div>
                        </button>
                      </form>
                    
                    
                  </div>
              </AltaCard>
          
              {/if}
        {/each}

          </div>
        </div>

        {#if false}
        <AltaCard>
          <div class="relative">
            <div class="w-full">
              <div>
                <div class="flex flex-row gap-3 justify-center items-center min-w-[350px]">
                  <h2 class="text-left ml-2 font-bold text-md ">
                    Unassigned
                  </h2>
                </div>
              </div>
            </div>
    
            <div>
              {#each data?.chats as chat}
              
              {#if !chat.agent} 
                <a href="/agents/unassigned/{chat.id}">
                  <LiveCard>
                    <div class="absolute left-2 bottom-3">
                      <a href="/">
                        <button on:click={showConfirmDelete(chat.id)} class="{$darkMode ? 'bg-black bg-opacity-40' : 'bg-black bg-opacity-5' } px-4 py-2 rounded-2xl hover:bg-red-600 hover:bg-opacity-100">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                          </svg>
                          
                        </button>
                      </a>
                    </div>
                    <div>
                      <h1 class="text-true-white text-md text-center">
                        {chat.title}
                      </h1>
                    </div>
                    <div class="absolute right-2 bottom-3">
                      <a href="/">
                        <button on:click={toggleEditForm(chat.id)} class="{$darkMode ? 'bg-black bg-opacity-0' : 'bg-black bg-opacity-0' } px-4 py-2 rounded-2xl hover:bg-true-white hover:bg-opacity-10">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                          </svg>
                        </button>
                      </a>
                    </div>
                  </LiveCard>
                </a>
                
              {/if}
              {/each}
            </div>
            
          </div>
    
        </AltaCard>
        {/if}

        
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
          </span>
        </InfoModal>
        {/if}
    
      </div>
    </div>
    {#if debugMode}

    {#if pinnedChatUrl}
    <div class="col-span-8 grid grid-rows-6">
      <div class="row-span-4">
        <div class="mt-24 h-full w-full justify-center flex">
          <iframe src="/agents/zvu3k33r0xkffz5/euocoylvi8ohci7" title="QuickChat" class="w-full h-3/4  rounded-2xl altashadow"></iframe>
        </div>
      </div>
      <div class="row-span-2">

      </div>
    </div>

    {:else }
    <div class="col-span-8 flex z-0">
      <div class="mt-24 w-full justify-center flex">
        <form action="?/pinChat" method="POST" class="z-50">
          <input type="text" id="name" value="My Chat" name="name" class="hidden">
          <input type="text" id="agentId" value="hi" name="agentId" class="hidden"> 
    
          <button type="submit" class="my-4 flex flex-row text-center items-center justify-center gap-2 backdrop-blur-md {$darkMode ? 'bg-black bg-opacity-60' : 'bg-black bg-opacity-30'} altashadow text-true-white p-4 min-w-[350px] hover:bg-true-black hover:bg-opacity-40 hover:cursor-pointer rounded-2xl transition duration-500 ease-in-out">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
              
            </div>
            <div>
              <h1 class="text-true-white text-md text-center">
                Pin Chat
            </h1>
            </div>
          </button>
        </form>
      </div>
    </div>
    {/if}

    {/if}

  </div>

  {#if agentCopied}
    <div class="toast toast-center ">
      <div class="alert alert-success rounded-2xl bg-green-500">
        <span>Agent Link copied to Clipboard!</span>
      </div>
    </div>
  {/if}
  
</div>