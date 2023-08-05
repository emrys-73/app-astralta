<script>
// @ts-nocheck

  import { InfoModal, LiveCard } from '$lib/components';
  export let data;

  const chats = [
    {
      "id": "kfhaksjdh",
      "title": "Chat One",
      "ai_model": "gpt-3.5-Turbo",
    },
    {
      "id": "jkhaksbca",
      "title": "Chat Two",
      "ai_model": "gpt-3.5-Turbo",
    },
    {
      "id": "akjhglaksfby",
      "title": "Chat Three",
      "ai_model": "gpt-3.5-Turbo",
    },
  ]


</script>

<!-- <div class="h-full text-center text-true-white content-center flex justify-center items-center flex-col">
  <div>

  </div>
  <div class="w-full">
      <a href="/my/ai">  
      <button class="{$darkMode ? 'bg-black bg-opacity-60' : 'bg-white bg-opacity-10'} btn normal-case ease-in-out duration-300 rounded-xl hover:bg-opacity-50 border-none text-true-white text-center ">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        <span>
          New Chat
        </span>
      </button>
      </a>
    </div>


    
  <div>
    <ul>
      {#each chats as chatItem}
      <li>
        <a href="/chats/{chatItem.id}">
          <LiveCard>
            {chatItem.title}
          </LiveCard>
        </a>
      </li>
      {/each}
    </ul>
  </div>
</div>
 -->

 <div class="h-full text-center text-true-white content-center flex justify-center items-center">
  
  <div class="">
    {#each data?.chats as chat}
    {#if chat.ai_model === "gpt-4"}
    <LiveCard class="">
        <div class="flex flex-row gap-3 justify-center">
            <div>
                <h1 class="text-true-white text-lg text-center">
                    {JSON.stringify(chat.title)}
                </h1>
            </div>
            <div>
                <span class="rounded-2xl bg-black bg-opacity-50 px-4 text-xs py-1">
                    PRO
                </span>
            </div>
        </div>
    </LiveCard>

    {:else }
    <LiveCard>
        <h1 class="text-true-white text-lg text-center">
            {JSON.stringify(chat.title)}
        </h1>
    </LiveCard>
    {/if}
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