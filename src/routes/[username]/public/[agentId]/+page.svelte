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

    let coverUrl = 'bg-white'

    onMount(() => {
        if (data.agent.cover_url) {
          coverUrl = `bg-[url('${data.agent.cover_url}')]`
        } else {
          let pedrito = getRandomNumber(1)
          switch (pedrito) {
            case 0:
              coverUrl = `bg-[url('/ghost_two.gif')]`
              break;

            case 1:
              coverUrl = `bg-[url('/ghost_one.gif')]`
              break;
          
            default:
              break;
          }
        }
        coverUrl = `bg-[url('/bg/forest.png')]`
        displayDeleteConfirmation = false;
        adminRightEval()
    })

    const getRandomNumber = (n) => {
      const randomDecimal = Math.random();
      const randomNumber = randomDecimal * n;
      return Math.floor(randomNumber);
    };

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

<div class="w-full h-full flex justify-center items-center bg-white">
  <div>
    <div class="{coverUrl} h-96 lg:h-[500px] w-96 lg:w-[500px] cover-image altashadow-max rounded-lg"></div>
  </div>



</div>