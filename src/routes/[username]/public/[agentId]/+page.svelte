<script>
// @ts-nocheck

    import { InfoModal } from '$lib/components/index.js';
    import { onMount } from 'svelte';
    import { animate, animateShort } from '../../../../stores.js';

    export let data;

    let displayDeleteConfirmation
    $: displayDeleteConfirmation = false;

    let currentAgentId;
    $: currentAgentId = "hi"


    let bgUrl;
    let coverClass;

    onMount(() => {
        bgUrl = data.agent.cover ? data.agent.cover_url : data?.covers[random(coversLength)].url
        // editing = false;
        displayDeleteConfirmation = false;
        adminRightEval()
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
    
    let coverUrl = `bg-[url('${data.agent.cover_url}')]`
    // let coverClass = `bg-[url('http://139.144.176.23:80/api/files/oo1sg8k1kzp3p2q/u770asbvqwpzxlg/ezgif_com_video_to_gif_y2l1FVZ1Q1.gif?thumb=0x0')]`
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

</script>


<!-- we do not allow light Mode here -->

<!-- Background -->
<div class="w-full h-full z-10 flex items-center {coverUrl} blur-3xl cover-image"></div>


<!-- Content -->
<div class="w-full h-full z-20  absolute top-0 text-white">
  <div class="flex flex-col w-full h-full ">
    <!-- Header -->
    <div class="w-full h-[650px] md:h-[750px] lg:h-[850px] flex items-center flex-col gap-2 relative justify-center">
      <!-- Cover -->
      <div class="{coverUrl} h-96 lg:h-[500px] w-96 lg:w-[500px] bg-image altashadow-max rounded-lg"></div>

      <!-- Name -->
      <div class="w-[400px] px-4 my-4">
        <div class="text-2xl font-medium relative">
          {data.agent.name}
          <div class="{$animateShort} absolute right-0 bg-white bg-opacity-5 hover:bg-opacity-20 rounded-full top-1 w-6 h-6 hover:w-8 hover:h-8 items-center flex justify-center hover:cursor-pointer ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            
          </div>
        </div>
        <div class=" font-normal text-gray-300 tracking-wider text-sm">
          @{data.creator.username}
        </div>
      </div>

      <!-- Create Chat -->
      <form action="?/createChat" method="POST" class="justify-center flex w-[400px]">
        <input type="text" id="agentId" name="agentId" value={data?.agent.id} class="hidden">
        <input type="text" id="name" name="name" value={data?.agent.name} class="hidden">
        <button type="submit" class="bg-white bg-opacity-5 text-white px-4 py-2 rounded-lg backdrop-blur-md flex flex-row justify-center items-center gap-1 hover:cursor-pointer hover:bg-opacity-20 {$animateShort} w-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          
          
          Chat
        </button>
      </form>

    </div>    


    <!-- Body -->
  
  </div>
</div>