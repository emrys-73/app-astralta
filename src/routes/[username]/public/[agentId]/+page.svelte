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
        adminRightEval()
        setImportable()
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

    let coversLength = data?.covers.length;


    function random(max) {
      return Math.floor(Math.random() * (max + 1));
    }

    let bgUrl = data.agent.cover ? data.agent.cover_url : data?.covers[random(coversLength)].url

    // let coverClass = `bg-[url('http://139.144.176.23:80/api/files/oo1sg8k1kzp3p2q/u770asbvqwpzxlg/ezgif_com_video_to_gif_y2l1FVZ1Q1.gif?thumb=0x0')]`

    let coverClass = `bg-[url('${bgUrl}')]`

    let adminRights = false;

    const adminRightEval = () => {
      if (!data?.user) {
        adminRights = false;
      } else {
        if (data?.user.id === data?.agent?.creator) {
          adminRights = true
        }
      }
    }

    let importable = false;

    const setImportable = () => {
      if (data?.agent?.importable) {
        importabel = false
      }
      importable = false
    }

</script>


<div class="w-full h-full relative flex items-center flex-col mb-24">
  <!-- <img src={bgUrl} alt="bg" class="w-full h-full cover blur-3xl fixed z-10"> -->
  <div class="{coverClass} blur-max cover-image h-[550px] w-full relative">
    <div class="absolute bottom-0 justify-center flex flex-col items-center w-full mb-32 ">
      <div class="text-white text-3xl font-semibold text-center mt-8 tracking-wider">
        {data?.agent?.name}
      </div>


      <div class="text-center text-white opacity-60 hover:opacity-100 text-md">
        <a href={`/${data?.agent.expand.creator.username}`} class=" hover:text-white">
          @{data?.agent.expand.creator.username}
        </a>
      </div>


      <div class="flex flex-row gap-4 justify-center items-center mt-3">
        {#if importable}
          <div class="bg-white bg-opacity-5 text-white px-4 py-2 rounded-lg backdrop-blur-md flex flex-row justify-center items-center gap-1 hover:cursor-pointer hover:bg-opacity-20 transition-all duration-300 ease-in-out w-32">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            
            
            
            Import
          </div>
        {/if}
        <form action="?/createChat" method="POST" class="justify-center flex ">
          <input type="text" id="agentId" name="agentId" value={data?.agent.id} class="hidden">
          <input type="text" id="name" name="name" value={data?.agent.name} class="hidden">
          <button type="submit" class="bg-white bg-opacity-5 text-white px-4 py-2 rounded-lg backdrop-blur-md flex flex-row justify-center items-center gap-1 hover:cursor-pointer hover:bg-opacity-20 transition-all duration-300 ease-in-out w-32">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            
            
            Chat
          </button>
        </form>
      </div>
    </div>

  

    <div class=" bg-gradient-to-b from-transparent to-black h-32 w-full absolute bottom-0">
  
    </div>
  </div>

  <div class="justify-center items-center absolute top-32 lg:flex hidden flex-col">
    <img src={bgUrl} alt="bg" class=" w-96 h-96 z-20 altashadow">
    <div class="z-30 -mt-44">
      <div class="text-white text-3xl font-semibold text-center mt-8 tracking-wider">
        {data?.agent?.name}
      </div>
  
      <div class="text-center text-white opacity-60 hover:opacity-100 text-md">
        <a href={`/${data?.agent.expand.creator.username}`} class=" hover:text-white">
          @{data?.agent.expand.creator.username}
        </a>
      </div>
  
      <div class="flex flex-row gap-4 justify-center items-center mt-3">
        {#if importable}
          <div class="bg-white bg-opacity-5 text-white px-4 py-2 rounded-lg backdrop-blur-md flex flex-row justify-center items-center gap-1 hover:cursor-pointer hover:bg-opacity-20 transition-all duration-300 ease-in-out w-32">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            
            
            
            Import
          </div>
        {/if}
        <form action="?/createChat" method="POST" class="justify-center flex ">
          <input type="text" id="agentId" name="agentId" value={data?.agent.id} class="hidden">
          <input type="text" id="name" name="name" value={data?.agent.name} class="hidden">
          <button type="submit" class="bg-white bg-opacity-5 text-white px-4 py-2 rounded-lg backdrop-blur-md flex flex-row justify-center items-center gap-1 hover:cursor-pointer hover:bg-opacity-20 transition-all duration-300 ease-in-out w-32">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            
            
            Chat
          </button>
        </form>
      </div>

    </div>

  </div>
  <div class="w-full md:w-3/4 h-32 px-6 md:px-8 my-8">
    <div class="bg-white bg-opacity-0 text-[11pt] rounded-2xl px-6 py-2 overflow-y-auto h-20 text-white text-center">
      {data?.agent?.bio}
    </div>
  </div>

  {#if adminRights}    
  <div class="w-full md:w-3/4">
    <div class="mx-6 h-full">

      <!-- <div class="h-12 w-full flex flex-row gap-4 justify-center items-center text-white text-sm">
        <div class=" border-b-2 border-system-cyan hover:border-system-blue px-4 hover:cursor-pointer">
          Local
        </div>
        <div class=" border-b-2 border-system-cyan hover:border-system-blue px-4 hover:cursor-pointer">
          Public
        </div>
      </div> -->

      {#each data?.chats as chat }
      {#if chat.agent === data?.agent.id}
      <a href={`/agents/${data?.agent.id}/${chat.id}`}>
        <div class="w-full px-4 bg-white bg-opacity-10 rounded-2xl py-2 hover:bg-opacity-20 hover:cursor-pointer hover:text-lg transition-all ease-in-out duration-300 my-1 flex flex-row relative">
          <div class="text-white ">
            {chat.title}
          </div>
          <a href={`/agents/${data?.agent.id}/${chat.id}/settings`}>
            <div class="text-white absolute right-4 opacity-50 hover:opacity-100 ">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              
            </div>
          </a>
        </div>
      </a>
      {/if}
      {/each}
    </div>
  </div>
  {/if}

 </div>