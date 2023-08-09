<script>
    // @ts-nocheck
    
        import { LiveCard } from '$lib/components';
        export let data
    </script>
    
    
    <div class="h-full justify-center flex items-center flex-col w-full">
        <div class="">
            {#each data?.chats as chat}

            <LiveCard class="">
                <div class="flex flex-row gap-3 justify-center">
                    <div>
                        <h1 class="text-white text-lg text-center">
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
                    {#if chat.public}
                    <div>
                        <span class="rounded-2xl bg-black bg-opacity-50 px-4 text-xs py-1">
                            Public
                        </span>
                    </div>
                    {/if}
                </div>
            </LiveCard>
            {/each}
        </div>
    </div>
    