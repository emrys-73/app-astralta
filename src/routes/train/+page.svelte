<script>
// @ts-nocheck

    import { AltaCard, LiveCard } from "$lib/components";
    import { darkMode, personality, chatCount } from "../../stores.js";
    import { applyAction, enhance } from "$app/forms";
	  import { invalidateAll } from "$app/navigation";


    export let data;

    let perso;
    personality.subscribe((value) => {perso = value})


    let ainame = "Astralta"
    if ( data?.user?.ainame ) { ainame = data?.user?.ainame }


    const updatePerso = () => {
      personality.update(() => value)
    }

    let value;

    const submitUpdateXP = () => {
        return async ({ result }) => {
            switch (result.type) {
                case 'success':
                    await invalidateAll();
                    break;
                case 'error':
                    break;
                default:
                    await applyAction(result);
            }
        }
    }


    // new



</script>

<div class="w-full h-full relative flex justify-center items-center px-4">

  {#if $chatCount >= 10}
  <div class="bg-black bg-opacity-60 py-2 px-4 rounded-full breathe mx-4">
    <p class="text-center text-true-white text-md">
      You've reached the maximum number of chats. Delete a chat if you wish to create a new one.
    </p>
  </div>
  {:else}
  <form action="?/createChat" method="POST">
    <div class="mt-3 flex justify-center flex-col">

      <AltaCard>
        <div class="mb-2">
          <h2>
            Personality
          </h2>
        </div>
            <input 
              id="perso" 
              label="perso" 
              type="text" 
              name="perso"
              class="hidden apple-input rounded-full bg-black bg-opacity-40 font-regular force-opaque p-2 text-md w-full min-w-[30vh] focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-text text-white"  
              value={perso}
            />
    
          <div>
            
              {#if data?.user?.username === "Sir"}
                <button on:click={() => {value = -1; updatePerso()}} class=" {value === -1 ? ' bg-true-white bg-opacity-20' : ''} {data?.user?.username === 'Sir' ? '' : 'hidden'} btn bg-black my-2 bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">
                  Monday
                </button>

              {/if}
              
                <button on:click={() => {value = 0; updatePerso()}} class="{value === 0 ? ' bg-true-white bg-opacity-20' : ''} btn bg-black my-2 bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">
                  Personal Assistant
                </button>
            
              
                <button on:click={() => {value = 1; updatePerso()}} class="{value === 1 ? ' bg-true-white bg-opacity-20' : ''} btn bg-black my-2 bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">
                  Tutor / Expert
                </button>
              
              
                <!-- <button on:click={() => {value = 2; updatePerso()}} class=" {value === 2 ? ' bg-true-white bg-opacity-20' : ''} btn bg-black my-2 bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">
                  Emotional Support
                </button> -->
    
                <button on:click={() => {value = 3; updatePerso()}} class=" {value === 3 ? ' bg-true-white bg-opacity-20' : ''} btn bg-black my-2 bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">
                  Best Friend
                </button>
            
          </div>  
      </AltaCard>


      <!-- <div class="mt-6">
        <h1 class="text-true-white text-center">
          Type in what you want to train your AI on
        </h1>
      </div>


      <AltaCard>

        <div class="my-2">
          
            
            <input 
              id="content" 
              label="content" 
              type="text" 
              name="content"
              class="apple-input rounded-full {$darkMode ? 'bg-black bg-opacity-40' : 'bg-white bg-opacity-10'} font-regular force-opaque p-2 text-md w-full focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-text text-true-white" placeholder="Type here" 
              on:keydown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                }}}
            />
    
            
          
          </div>
          
          
        </AltaCard>


      <button type="submit" class="btn bg-black bg-opacity-70 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[3rem] mt-2 border-none normal-case drop-shadow-2xl"
        >Create Chat
        </button
      > -->
    </div>
  </form>

  {/if}
</div>



