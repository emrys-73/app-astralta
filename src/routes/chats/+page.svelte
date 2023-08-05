<script>
    // @ts-nocheck
    
        import { LiveCard } from '$lib/components';
        export let data
    </script>
    
    
    <div class="h-full justify-center flex items-center flex-col w-full">
        <div class="">
            {#each data?.chats as chat}
            {#if chat.ai_model === "gpt-4"}
            <LiveCard class="">
                <div class="flex flex-row gap-3 justify-center">
                    <div>
                        <h1 class="text-white text-lg text-center">
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
    