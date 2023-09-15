<script>
// @ts-nocheck

    import { InfoModal, AltaCard, LiveCard } from "$lib/components";
    import { darkMode } from "../../../stores.js";
    export let data

    let curAgentId;
    $: curAgentId = "hi"

    let displayDeleteConfirmation
    $: displayDeleteConfirmation = false;


    const showConfirmDelete = (agentId) => {
        curAgentId = agentId
        displayDeleteConfirmation = true;
    }

    const hideConfirmDelete = () => {
        curAgentId = ""
        displayDeleteConfirmation = false;
    }

    let summaryMessage = data?.agent?.summary ? 'Regenerate Summary' : 'Generate Summary'

    let coversLength = data?.covers.length;


    function random(max) {
      return Math.floor(Math.random() * (max + 1));
    }

    let bgUrl = data.agent.cover ? data.agent.cover_url : data?.covers[random(coversLength)].url
   
</script>

<div class="w-full h-full relative justify-center flex items-center flex-col mb-24">
  <img src={bgUrl} alt="bg" class="w-full h-full cover blur-2xl fixed top-0 z-10">

  
  <div class="z-30  justify-center items-center flex flex-col mx-6 md:mx-20 my-16">

    <div class="">
      <div class="relative text-white text-opacity-80">
        <img src={bgUrl} alt="bg" class=" w-96 h-96 z-40 altashadow ">
        <!-- <div class="absolute bottom-3 right-3  hover:opacity-0">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="white" class="w-6 h-6" viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/></svg>
          
        </div>
        <div class="absolute bottom-3 right-3 opacity-0 hover:opacity-100 hover:cursor-pointer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" class="w-6 h-6 " viewBox="0 0 24 24"><path d="M12 4.248c-3.148-5.402-12-3.825-12 2.944 0 4.661 5.571 9.427 12 15.808 6.43-6.381 12-11.147 12-15.808 0-6.792-8.875-8.306-12-2.944z"/></svg>
        </div> -->
      </div>

      <div class="text-white text-3xl font-semibold text-center mt-8">
        {data?.agent?.name}
      </div>
      <div class="text-center text-gray-400 text-md">
          by <a href={`/${data?.user?.username}`} class=" hover:text-white">
            @{data?.user.username}
          </a>
      </div>
    </div>

    <div class="my-4 max-h-32 overflow-y-auto p-3 px-6 bg-white bg-opacity-10 rounded-2xl md:w-3/4 backdrop-blur-md">
      {#if data?.agent?.summary}
      <span class="text-white justify-center text-center items-center flex">
        {data?.agent?.summary}
      </span>
      {/if}
    </div>

    <div class="flex flex-row w-3/4 justify-center items-center gap-6 my-4">
      <!-- <button class="rounded-full py-0 px-6 flex border-opacity-20 hover:border-opacity-50 justify-center items-center hover:cursor-pointer bg-transparent border-white border-2 hover:bg-white hover:bg-opacity-10 text-center flex-row gap-1 text-white text-lg">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
        
        Import
      </button> -->

      <form action="?/createChat" method="POST" class="justify-center flex ">
        <input type="text" id="agentId" name="agentId" value={data?.agent.id} class="hidden">
        <input type="text" id="name" name="name" value="Astralta" class="hidden">

        <button type="submit" class="rounded-full py-0 px-6 flex border-opacity-20 hover:border-opacity-50 justify-center items-center hover:cursor-pointer bg-transparent border-white border-2 hover:bg-white hover:bg-opacity-10 text-center flex-row gap-1 text-white text-lg">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          
          Chat
        </button>
      </form>
    </div>

    <div class=" w-full md:w-5/6 h-64 my-4">
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
</div>


<!-- <div class="w-full h-full justify-center items-center flex px-4">
    <div class=" py-20 md:w-3/4 xl:w-3/4">
        <AltaCard>
            <div class="flex flex-row pb-2 gap-3">
              <div>
                <h1 class="text-xl font-bold uppercase text-center mt-6">
                    {data?.agent.name}
                </h1>
              </div>
              {#if data?.agent.model === "gpt-4"}
                <div class="justify-center items-center flex">
                  <span class="rounded-2xl bg-black bg-opacity-50 px-4 text-xs py-1">
                      PRO
                  </span>
                </div>
                {/if}
            </div>
            <div class="py-4 md:grid md:grid-cols-6 md:gap-4 flex flex-col justify-center items-center">
                <div class="col-span-2">
                    {#each data?.chats as chat}
                        {#if chat.agent === data?.agent.id}
                        <a href="/agents/{data.agent.id}/{chat.id}">
                            <div class="">
                                <LiveCard>
                                    <div class="justify-center items-center text-center flex">
                                        <span class="text-center px-16">
                                            {chat.title}
                                        </span>
                                    </div>
                                    <div class="absolute right-2 bottom-3">
                                      <a href="/agents/{data?.agent.id}/{chat.id}/settings">
                                        <button class="{$darkMode ? 'bg-black bg-opacity-40' : 'bg-black bg-opacity-10' } px-4 py-2 rounded-2xl hover:bg-true-white hover:bg-opacity-10">
                                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                                          </svg>
                                          
                                        </button>
                                      </a>
                                    </div>
                                </LiveCard>
                            </div>
                        </a>

                        {/if}
                    {/each}
                    <form action="?/createChat" method="POST" class="justify-center flex ">
                      <input type="text" id="agentId" name="agentId" value={data?.agent.id} class="hidden">
                      <input type="text" id="name" name="name" value="Astralta" class="hidden">

                      <button tyoe="submit" class="my-4 flex flex-row text-center items-center justify-center gap-2 backdrop-blur-md {$darkMode ? 'bg-black bg-opacity-60' : 'bg-black bg-opacity-30'} altashadow text-true-white p-4 hover:bg-true-black hover:bg-opacity-40 hover:cursor-pointer rounded-2xl transition duration-500 ease-in-out">
                        <div>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                          
                        </div>
                        <div>
                          <h1 class="text-true-white text-md text-center">
                            New Chat
                        </h1>
                        </div>
                      </button>
                    </form>
                      
                </div>
                <div class="col-span-4 justify-center items-center flex flex-col">
                    <div class="justify-center items-center flex flex-col">
                      {#if data?.agent?.summary}
                      <div class="py-4 sm:py-0">
                          <div class="bg-black bg-opacity-20 rounded-2xl backdrop-blur-md text-center p-4 mb-4">
                              {data?.agent.summary}
                          </div>
                      </div>
                      
                      {/if}
                      <div class="justify-center flex items-center flex-row gap-2 w-full">
                        <a href={`/create/${data.agent.id}`}>
                          <div class="">
                            <button class="{$darkMode ? 'bg-black bg-opacity-40' : 'bg-black bg-opacity-5' } text-md px-4 py-1 rounded-full hover:bg-white hover:bg-opacity-10 transition ease-in-out duration-500">
                              {summaryMessage}
                            </button>
                          </div>
                        </a>
                        <div class="">
                            <button on:click={showConfirmDelete(data.agent.id)} class="{$darkMode ? 'bg-black bg-opacity-40' : 'bg-black bg-opacity-5' } text-md px-4 py-1 rounded-full hover:bg-red-600 hover:bg-opacity-100 transition ease-in-out duration-500">
                              Delete AI
                            </button>
                        </div>
                      </div>
                    </div>
                </div>
                
                
            </div>
        </AltaCard>
    </div>

    {#if displayDeleteConfirmation}
    <InfoModal>
      <span>
        <AltaCard>
          <form action="?/deleteAgent" method="POST">
            <div class="justify-center flex flex-col items-center ">
              <h3 class="text-center text-true-white text-lg font-semibold  py-4">
                Are you sure you want to delete this AI?
              </h3>
             <input id="agentId" label="agentId" type="text" name="agentId" value={curAgentId} hidden/>
             
             
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
</div> -->