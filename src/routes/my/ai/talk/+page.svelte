<script lang="ts">
  // @ts-nocheck
    import { onMount } from "svelte"; 
    import { useChat } from "ai/svelte";

    const { messages, handleSubmit, input } = useChat({
      api: "/chat",
    });


    let message = ""
  
    /**
     * @type {import("openai").ChatCompletionResponseMessage | undefined}
     */
    let response;
  
    let preventSubmit = false;
    const MAX_ROWS = 6;
  
 
  
    onMount(() => {
       const input = document.querySelector("textarea[name=message]"); 
       input.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) 
       { e.preventDefault(); chat(); } }); }); 
  
       const handleKeyDown = (e) => {
          if(e.key === 'Enter' && e.shiftKey) {
              preventSubmit = true;
          } else {
              preventSubmit = false;
          }
      }
  
      $: rows = message.length > 0 ? Math.min(Math.ceil(message.length / 80), MAX_ROWS) : 1;
      $: rounded = rows > 1 ? 'rounded-lg' : 'rounded-full';
  
  </script>


<div class="min-h-[400px] min-w-[800px] m-6 bg-black bg-opacity-30 backdrop-blur-md rounded-xl items-center px-20 content-center flex flex-row">
  <ul>
    {#each $messages as message}
      <li>
        {message.role} says... {message.content}
      </li>

    {/each}
  </ul>


  <form on:submit={handleSubmit}>
    <input bind:value={$input}/>
    <button type="submit">Send</button>
  </form>
</div>
<!-- 
<div class="text-center text-true-white text-md  md:max-w-[500px] xl:max-w-[800px] bg-black max-h-[600px] rounded-xl bg-opacity-40 backdrop-blur-sm">
  {#if response} 
  <p class=" w-full p-2 px-4">
    {response}
  </p>
  {:else}
    <p class=" w-full p-2 px-4">
      Good day, Sir!
    </p>
  {/if}
</div>
 -->


<div class="w-full sm:max-w-[600px] lg:max-w-[800px] grid grid-cols-12 absolute bottom-2 xl:bottom-4 content-center items-center justify-center">
  <div class="col-span-2">
    <a href="https://astralta.com">
      <div class="hover:-translate-y-0.5 transition ease-in-out h-[40px] lg:ml-10">
        <button class="btn bg-true-black bg-opacity-50 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:w-16 border-none normal-case drop-shadow-2xl h-[40px] ml-4 apple-btn w-[50px]">
          <img src="/logo_white.png" alt="cta" class="h-[30px] w-[30px]"/>
        </button>
      </div>
    </a>
  </div>
  <div class="col-span-8 mt-1.5">
    <textarea rows={rows} name="message" class="{rounded} overflow-auto resize-none min-h-[40px] s-apple-input bg-black bg-opacity-40 w-full font-regular force-opaque-sm text-sm focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none" placeholder="Send a message" bind:value={message} on:keydown={handleKeyDown}></textarea>
  </div>
  <div class="col-span-2">
    <div class="hover:-translate-y-0.5 transition ease-in-out">
      <button class="btn bg-true-black  text-xl bg-opacity-50 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:w-16 border-none normal-case drop-shadow-2xl h-[40px] ml-4 apple-btn w-[50px]" type="submit">
        ➤
      </button>
    </div>
  </div>
</div>