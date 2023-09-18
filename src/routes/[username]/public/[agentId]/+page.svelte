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

    let coversLength = data?.covers.length;


    function random(max) {
      return Math.floor(Math.random() * (max + 1));
    }

    let bgUrl = data.agent.cover ? data.agent.cover_url : data?.covers[random(coversLength)].url

    // let coverClass = `bg-[url('http://139.144.176.23:80/api/files/oo1sg8k1kzp3p2q/u770asbvqwpzxlg/ezgif_com_video_to_gif_y2l1FVZ1Q1.gif?thumb=0x0')]`

    let coverClass = `bg-[url('${bgUrl}')]`

</script>


<div class="w-full h-full relative flex items-center flex-col mb-24">
  <!-- <img src={bgUrl} alt="bg" class="w-full h-full cover blur-3xl fixed z-10"> -->
  <div class="{coverClass} lg:blur-lg cover-image h-[550px] w-full relative">
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
        {#if !data?.agent?.importable}
          <div class="bg-white bg-opacity-5 text-white px-4 py-2 rounded-lg backdrop-blur-md flex flex-row justify-center items-center gap-1 hover:cursor-pointer hover:bg-opacity-20 transition-all duration-300 ease-in-out w-32">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
            </svg>
            
            
            
            Import
          </div>
        {/if}
        <div class="bg-white bg-opacity-5 text-white px-4 py-2 rounded-lg backdrop-blur-md flex flex-row justify-center items-center gap-1 hover:cursor-pointer hover:bg-opacity-20 transition-all duration-300 ease-in-out w-32">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          
          
          Chat
        </div>
      </div>
    </div>

  

    <div class=" bg-gradient-to-b from-transparent to-black h-32 w-full absolute bottom-0">
  
    </div>
  </div>

  <div class="justify-center items-center absolute top-32 lg:flex hidden ">
    <img src={bgUrl} alt="bg" class=" w-96 h-96 z-40 altashadow">
  </div>
  <div class="w-full md:w-3/4 h-64 px-6 md:px-8 my-4">
    <div class="bg-white bg-opacity-0 text-[11pt] rounded-2xl px-6 py-2 overflow-y-auto h-20 text-white text-center">
      {data?.agent?.bio}
    </div>
  </div>


  
  <div class="z-30 flex flex-col mx-6 md:mx-20 bg-red-500">

    <div class="">
      <div class="text-white text-opacity-80 bg-red-500">
        <!-- {data?.agent?.bio} -->
        <!-- <img src={bgUrl} alt="bg" class=" w-96 h-96 z-40 altashadow "> -->
        <!-- <div class="absolute bottom-3 right-3  hover:opacity-0">
          
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" class="w-6 h-6" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/></svg>
          
        </div>
        <div class="absolute bottom-3 right-3 opacity-0 hover:opacity-100 hover:cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" class="w-6 h-6 " viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/></svg>
        </div> -->
      </div>

      <!-- <div class="text-white text-3xl font-semibold text-center mt-8">
        {data?.agent?.name}
      </div>
      <div class="text-center text-light-gray text-md">
          by <a href={`/${data?.agent.expand.creator.username}`} class=" hover:text-white">
            @{data?.agent.expand.creator.username}
          </a>
      </div> -->
    </div>
<!-- 
    <div class="my-4 max-h-32 overflow-y-auto p-3 px-6 bg-white bg-opacity-10 rounded-2xl md:w-3/4 backdrop-blur-md">
      {#if data?.agent?.summary}
      <span class="text-white justify-center text-center items-center flex">
        {data?.agent?.summary}
      </span>
      {/if}
    </div> -->

    <!-- <div class="flex flex-row w-3/4 justify-center items-center gap-6 my-4">
      <button class="rounded-full py-0 px-6 flex border-opacity-20 hover:border-opacity-50 justify-center items-center hover:cursor-pointer bg-transparent border-white border-2 hover:bg-white hover:bg-opacity-10 text-center flex-row gap-1 text-white text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        
        Import
      </button>
      <button class="rounded-full py-0 px-6 flex border-opacity-20 hover:border-opacity-50 justify-center items-center hover:cursor-pointer bg-transparent border-white border-2 hover:bg-white hover:bg-opacity-10 text-center flex-row gap-1 text-white text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        
        Chat
      </button>
    </div>
     -->

  </div>
</div>


<!-- 
<div class="w-full h-full flex justify-center items-center px-4">
        <AltaCard>
            <div class="flex flex-row gap-3">
              <div>
                <h1 class="text-xl font-bold uppercase text-center mt-2">
                    {data?.agent.name}
                </h1>
              </div>
            </div>
            <div class="md:grid md:grid-cols-6 md:gap-0 flex flex-col justify-center items-center">
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
                    </div>
                    {/if}
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

        {#if agentCopied}
          <div class="toast toast-center ">
            <div class="alert alert-success rounded-2xl bg-green-500 text-white ">
              <span class="text-white ">AI Link copied to Clipboard!</span>
            </div>
          </div>
        {/if}
</div> -->