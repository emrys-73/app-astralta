<script lang="ts">
  // @ts-nocheck
  import { useChat } from "ai/svelte";
  import { toggleTalk } from "../../../../stores";
	import { onMount } from "svelte";
  

  const { messages, handleSubmit, input } = useChat({
    api: "/chat",
  });

  let message = "";
  const MAX_ROWS = 6;


  $: rows = message.length > 0 ? Math.min(Math.ceil(message.length / 80), MAX_ROWS) : 1;
  $: rounded = rows > 1 ? "rounded-lg" : "rounded-full";

</script>

<div class="flex justify-center w-full h-full relative">
  <div class="min-w-[350px] sm:max-w-[700px] md:max-w-[80] lg:max-w-[900] xl:max-w-[1000px] m-6 rounded-xl flex justify-center items-center bg-black bg-opacity-0 mb-20 overflow-auto max-h-[800px]">
    <div class="row-span-5 overflow-auto">
      <ul>
        {#each $messages as message}
        <li>
          {#if message.role == 'user'}
          <div class="text-left text-true-white text-md bg-true-white rounded-xl bg-opacity-20 backdrop-blur-md my-2">
  
            <p class="w-full p-2 px-4 overflow-auto">
              {message.content}
            </p>
          </div>
          {:else}
          <div class="text-left text-true-white text-md bg-black rounded-xl bg-opacity-60 backdrop-blur-md my-2">
            <p class="w-full p-2 px-4 overflow-auto">
              {message.content}
            </p>
          </div>
          {/if}
        </li>
        {/each}
      </ul>
    </div>
    <div class="row-span-1 pb-2 absolute bottom-2">
      <form on:submit={handleSubmit}>
        <div class="grid grid-cols-10">
          <div class="col-span-9">
            <textarea rows={rows} name="message" class="{rounded} overflow-auto resize-none min-h-[40px] s-apple-input bg-black bg-opacity-40 w-full font-regular force-opaque-sm text-sm focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none" placeholder="Send a message" bind:value={$input}></textarea>
          </div>
          <div class="col-span-1 px-1">
            <button class="btn bg-true-black text-xl bg-opacity-50 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md border-none normal-case drop-shadow-2xl h-[40px] apple-btn w-full" type="submit">
              ➤
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</div>



<!-- 
<div class="  min-w-[350px] sm:max-w-[700px] md:max-w-[80] lg:max-w-[900] xl:max-w-[1000px] m-6 rounded-xl items-center px-4 content-center grid grid-rows-6 bg-black bg-opacity-90 absolute bottom-2">
  <div class="row-span-5 overflow-auto max-h-96">
    <ul>
      {#each $messages as message}
      <li>
        {#if message.role == 'user'}
        <div class="text-left text-true-white text-md bg-true-white rounded-xl bg-opacity-20 backdrop-blur-md my-2">

          <p class="w-full p-2 px-4 overflow-auto">
            {message.content}
          </p>
        </div>
        {:else}
        <div class="text-left text-true-white text-md bg-black rounded-xl bg-opacity-60 backdrop-blur-md my-2">
          <p class="w-full p-2 px-4 overflow-auto">
            {message.content}
          </p>
        </div>
        {/if}
      </li>
      {/each}
    </ul>
  </div>
  <div class="row-span-1 pb-2">
    <form on:submit={handleSubmit}>
      <div class="grid grid-cols-10">
        <div class="col-span-9">
          <textarea rows={rows} name="message" class="{rounded} overflow-auto resize-none min-h-[40px] s-apple-input bg-black bg-opacity-40 w-full font-regular force-opaque-sm text-sm focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none" placeholder="Send a message" bind:value={$input} on:keydown={handleKeyDown}></textarea>
        </div>
        <div class="col-span-1 px-1">
          <button class="btn bg-true-black text-xl bg-opacity-50 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md border-none normal-case drop-shadow-2xl h-[40px] apple-btn w-full" type="submit">
            ➤
          </button>
        </div>
      </div>
    </form>
  </div>
</div> -->
