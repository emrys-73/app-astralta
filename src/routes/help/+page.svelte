<script>
// @ts-nocheck

    import { LiveCard } from "$lib/components";
    import { onMount, onDestroy } from "svelte";
    import { header } from "../../stores";
	import AltaCard from "$lib/components/AltaCard.svelte";
    import { useChat } from "ai/svelte";
    import { darkMode } from "../../stores";

    let debugMode = false;


    onMount(() => {
        header.set("Astralta Support")
    })
    
    onDestroy(() => {
        header.set("Astralta")
    })

    let chatOptions = {
        api: "/x-engine/support",
        initialMessages: [
            {
                "role": "system",
                "content": "Your name is Astralta Support.  The following is the knowledge you have expertise on. You will base all your conversations only about this: ''' Astralta is an AI Software company that lets you professionally train AI Bots without the need of code. You can easily create private and public AI Models. Astralta lets you create personalities for each AI Bot being able to custom-set parameters such as humor, empathy, curiosity, and more. You can train Astralta Models with your data inside the 'knowledge' field when creating an AI Model. '''"
        }
        ],
    }

    const { messages, handleSubmit, input, isLoading, reload, stop, setMessages } = useChat(chatOptions);

</script>

<div class="h-full text-center text-true-white content-center flex justify-center items-center mx-6 flex-col py-12 xl:mx-60 lg:mx-40 md:mx-20 ">
    <AltaCard>
        <div>
            <h3 class="text-true-white text-lg font-semibold px-10">
                AI-Support
            </h3>
        </div>
        <div class="mt-4">
            <ul>
                {#each $messages as message}
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

            <div class="py-3 mb-2 xl:mb-4 rounded-2xl px-6 backdrop-blur-lg flex flex-col mx-2 xl:w-[40vw] {$darkMode ? 'bg-black bg-opacity-60' : ''} altashadow">

                <div>
                  <form on:submit={handleSubmit}>
                    <div class="grid grid-cols-10">
                      <div class="col-span-9">
                        <textarea id="myMessage" name="message" class="overflow-auto rounded-2xl appearance-none touch-manipulation z-10 select-none resize-none max-h-[40px] 
                          s-apple-input {$darkMode ? 'bg-black bg-opacity-40 focus:bg-black focus:bg-opacity-40' : 'bg-white bg-opacity-0 focus:bg-white focus:bg-opacity-0'} w-full font-regular force-opaque-sm text-[15px] hover:text-true-white hover:opacity-100 text-true-white
                             focus:apple-input focus:force-opaque
                            focus:border-none" placeholder="Send a message" bind:value={$input} on:keydown={(event) => {
                              if (event.key === 'Enter' && !event.shiftKey) {
                                event.preventDefault();
                                handleSubmit(event);
                              }}} disabled={$isLoading}></textarea>
                      </div>
                      <div class="col-span-1 ml-1 md:ml-2 w-full">
                        <button class="btn  btn-sm bg-black bg-opacity-40 border-none rounded-full hover:bg-white hover:bg-opacity-10 text-white font-normal normal-case min-h-[40px] apple-btn" type="submit" disabled={$isLoading}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                          </svg>
                          
                        </button>
                        
                      </div>
                    </div>
                  </form>
                </div>
                
                
              </div>
          </div>
    </AltaCard>
    <a href="mailto:help@astralta.com">

        <LiveCard>
            <span class="text-center text-true-white text-md ">
                We are glad to guide you further through your experience with Astralta.
                <br>
                <!-- Here are some ideas on how we could help:
                <br>
                <ul>
                    <li>Ask </li>
                </ul> -->
        
            </span>
            <div class="items-center justify-center pt-4">
        
                <a href="mailto:help@astralta.com">
        
                    <button class="btn bg-true-white bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">Contact support</button>
                </a>
            </div>
        </LiveCard>
    </a>
    
  </div>
  