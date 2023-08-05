<script>
// @ts-nocheck

    import { LiveCard } from '$lib/components';
    import { darkMode } from '../../../stores.js';
    export let data

    let debugMode = false;
</script>


<div class="h-full flex justify-center relative">
    <div class="min-w-[350px] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[900px] xl:max-w-[1200px] m-6 rounded-xl flex justify-center items-center mb-32 overflow-y-auto">
        <div class="row-span-5 overflow-auto">
            <ul>
                {#each data?.messages as message}
                <li>
                  {#if message.role == 'user'}
                  <div class="text-left text-true-white text-md bg-true-white bg-opacity-5 rounded-xl  backdrop-blur-xl my-2 drop-shadow-xl"><pre class="w-full p-2 px-4 overflow-auto whitespace-pre-wrap ">{message.content}<pre/></div>
                  {:else if message.role == 'assistant'}
                  <div class="text-left text-true-white text-md {$darkMode ? ' bg-black bg-opacity-60' : 'bg-black bg-opacity-20'} rounded-xl  backdrop-blur-xl my-2 drop-shadow-xl">
                    <!-- <pre class="w-full p-2 px-4 overflow-y-auto whitespace-pre-wrap"><CodeBlock language="ts" code={message.content}></CodeBlock></pre></div> -->
                    <pre class="w-full p-2 px-4 overflow-y-auto whitespace-pre-wrap">{message.content}</pre></div>
                  {:else}
                  <div class="text-left text-true-white text-md bg-black rounded-xl bg-opacity-60 backdrop-blur-xl my-2 drop-shadow-xl {debugMode ? '' : 'hidden'}">
                    <h2 class="text-2xl text-true-white text-center">
                      System training:
                    </h2>
                    <pre class="w-full p-2 px-4 overflow-y-auto whitespace-pre-wrap">{message.content}</pre></div>
                  {/if}
                </li>
                {/each}
              </ul>
        </div>
    </div>
</div>
