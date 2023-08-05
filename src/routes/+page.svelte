<script>
// @ts-nocheck

  import { InfoModal, LiveCard } from '$lib/components';
  export let data;

</script>


 <div class="h-full text-center text-true-white content-center flex justify-center items-center">
  
  <div class="">
    {#each data?.chats as chat}
    <a href='/chats/{chat.id}'>
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