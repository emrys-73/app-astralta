<script>
// @ts-nocheck

  import { InfoModal, LiveCard } from '$lib/components';
  import { darkMode } from '../stores.js';
  export let data;

</script>


 <div class="h-full text-center text-true-white content-center flex justify-center items-center mx-4">
  
  <div class="relative">
    <a href="/train">
      <div class="my-4 flex flex-row text-center items-center justify-center gap-2  backdrop-blur-md {$darkMode ? 'bg-black bg-opacity-80' : 'bg-black bg-opacity-30'} drop-shadow-xl text-true-white p-4 min-w-[350px] hover:bg-true-white hover:bg-opacity-5 hover:cursor-pointer rounded-2xl transition duration-700 ease-in-out">
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
    
    {#each data?.chats as chat}
    <a href='/chats/{chat.id}'>
      <LiveCard class="">
        <div class="flex flex-row gap-3 justify-center px-14">
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
              <button class="{$darkMode ? 'bg-black bg-opacity-40' : 'bg-black opacity-5' } px-4 py-1 rounded-2xl hover:bg-true-white hover:bg-opacity-10">
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