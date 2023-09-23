<script>
  // @ts-nocheck
    import {  animate } from '../stores.js';
    import { page } from '$app/stores';
    export let data;
  
    let editing;
    $: editing = false;
  
    let currentChatId;
    $: currentChatId = "hi"
  
  
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
  
    
    let avatarUrl = "https://ui-avatars.com/api/?name=AI"
      if (data.user) {
          avatarUrl = `https://ui-avatars.com/api/?name=${data?.user?.name}`;
      }
  
    let showPublicAI;
    $: showPublicAI = false;
  
    const showPublic = () => { showPublicAI = true }
  
    const hidePublic = () => { showPublicAI = false }
  
  </script>
  
  
  <div class="{$animate} w-full h-full flex flex-col justify-center items-center pb-12 bg-true-white dark:bg-black">
    <!-- Banner image -->
    <div class="w-full h-[200px] bg-[url('/banner/base.jpg')] bg-image top-0 fixed z-40 blur-3xl opacity-0 dark:opacity-100">
  
    </div>
    <div class="w-full h-[200px] bg-[url('/banner/base.jpg')] bg-image top-0 fixed z-40">
  
    </div>
  
    <!-- user tag and image -->
    <div class="fixed top-[151px] md:left-20 left-4 flex flex-row justify-center items-center z-40">
        <!-- Avatar -->
        <div class="">
            <button on:click={copyToClipboard(`${$page.url}`)} class="btn border-none bg-transparent hover:bg-transparent mx-1 active:border-none avatar w-18 p-2">
                <div class="rounded-full">
                    <img src={avatarUrl} alt="avatar" id="avatar-preview">
                </div>
            </button>
        </div>
        <!-- Username -->
        <div class="text-white font-semibold text-3xl tracking-widest flex flex-col justify-center items-center gap-1">
          <div>
            <span>
                {data?.user?.name}
            </span>
          </div>
          <div class="flex flex-row items-center gap-1 opacity-50 text-sm w-full text-black dark:text-white dark:opacity-50 ">
            <span class="">
              @{data?.user?.username}
            </span>
            {#if data?.user?.verified_creator}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
              
            {/if}
          </div>
        </div>
  
        <!-- <button class="text-white fixed  right-8 md:right-24 opacity-50 hover:opacity-100 hover:cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
              
        </button> -->
  
    </div>
  
    <div class=" mt-60 flex flex-col justify-start py-8 h-full w-full items-center">
        <!-- Bio -->
    <div class="w-full px-6 pb-16 md:px-20 text-black dark:text-white">
        <!-- {#if data.user.bio}
            <div class="rounded-2xl text-white p-4 bg-white backdrop-blur-md bg-opacity-10 w-full max-h-24 overflow-y-auto">
                {data.user.bio}
            </div>
        {/if} -->
  
        <!-- Favourite AI (3) -->
    
    
        <!-- Resliche AI -->
        <div class="justify-center flex items-center h-12 flex-row gap-4 text-black dark:text-white">
          <button on:click={hidePublic} class="{showPublicAI ? '' : 'dark:border-white border-black border-b-2 opacity-80'} px-4 opacity-50">
            Local
          </button>
          <button on:click={showPublic} class="{!showPublicAI ? '' : 'dark:border-white border-black border-b-2 opacity-80'} px-4 opacity-50">
            Public
          </button>
        </div>
        <div class="items-center flex overflow-y-auto flex-col text-black dark:text-white h-full">
          {#if !showPublicAI}
            {#each data.localAgents as ai}
              <a href={`/${data.user.username}/${ai.id}`} class="dark:bg-white dark:bg-opacity-5 bg-black rounded-2xl bg-opacity-5 hover:bg-opacity-10 hover:text-lg transition-all ease-in-out duration-300 backdrop-blur-md px-6 w-full py-2 my-1">
                <span class="">
                  {ai.name}
                </span>
              </a>
            {/each}
          {:else }
            {#each data.publicAgents as ai}
              <a href={`/${data.user.username}/public/${ai.id}`} class="dark:bg-white dark:bg-opacity-5 bg-black rounded-2xl bg-opacity-5 hover:bg-opacity-10 hover:text-lg transition-all ease-in-out duration-300 backdrop-blur-md px-6 w-full py-2 my-1 flex-row flex items-center relative">
                <span class="">
                  {ai.name}
                </span>
                <div class=" px-4 text-sm rounded-full text-white bg-black bg-opacity-90 absolute right-4">
                  Public
                </div>
              </a>
            {/each}
          {/if}
        </div>
    </div>
  
    </div>
  
  </div>