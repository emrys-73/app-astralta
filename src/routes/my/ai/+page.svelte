<script>
  // @ts-nocheck
  
      import { goto } from "$app/navigation";
      import { page } from "$app/stores";
      import { redirect } from "@sveltejs/kit";
      import { textTrainining, toggleTalk } from "../../../stores";
      import { useChat } from "ai/svelte";
      import { GlassCard } from "$lib/components";
      import { experience } from "../../../stores";
      // import { marked } from 'marked';

      let training;
      $: training = "";

      // let xp;
      // let xp;
      // experience.subscribe((value) => {xp = value})

      const train = () => {
        experience.update(() => training)
        console.log("Trained succesfully")
        // toggleTT()
      }
  
      let talking = true;
      $: talking;
  
      toggleTalk.subscribe((value) => {talking = value})
  
  
      const toggleTT = () => {
          toggleTalk.update((state) => !state)
          }

      // talk
      const { messages, handleSubmit, input } = useChat({
        api: "/chat",
      });

      let message = "";
      const MAX_ROWS = 6;


      $: rows = message.length > 0 ? Math.min(Math.ceil(message.length / 80), MAX_ROWS) : 1;
      $: rounded = rows > 1 ? "rounded-lg" : "rounded-full";

      // train
      let selectedFile = null;

      function dragOver(e) {
          e.preventDefault();
      }

      function dropHandler(e) {
          e.preventDefault();
          if (e.dataTransfer.items) {
          if (e.dataTransfer.items[0].kind === 'file') {
              selectedFile = e.dataTransfer.items[0].getAsFile();
          }
          } else {
          selectedFile = e.dataTransfer.files[0];
          }
      }

      function handleChange(e) {
          selectedFile = e.target.files[0];
      }

      function formatMessageContent(content) {
        const formattedContent = content.replace(/\n/g, "<br/>");
        return formattedContent;
      }
  </script>


<div class="flex flex-col items-center h-full w-full text-true-white bg-gradient-to-b from-transparent to-black">
  <input class="check" type="checkbox" id="checkbox_toggle">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="checkbox lg:xlcheckbox border-none font-medium max-w-[190px] rounded-full" on:click={toggleTT}>
    <label for="checkbox_toggle" class="slide bg-black bg-opacity-40 text-true-white">
      <label for="checkbox_toggle" class="toggle_box bg-true-white bg-opacity-10"></label>
      <label for="checkbox_toggle" class="text -ml-2 {!talking ? 'opacity-40 transition-opacity' : 'transition-opacity'}">Talk</label>
      <label for="checkbox_toggle" class="text -ml-6 {talking ? 'opacity-40 transition-opacity' : 'transition-opacity'}">Train</label>
    </label>
    
  </div>
  {#if talking} 

  <div class="flex justify-center h-full relative">
    <div class="min-w-[350px] sm:max-w-[700px] md:max-w-[80] lg:max-w-[900] xl:max-w-[1000px] m-6 rounded-xl flex justify-center items-center bg-black bg-opacity-0 mb-20 overflow-y-auto h-[500px]">
      <div class="row-span-5 overflow-auto">
        <ul>
          {#each $messages as message}
          <li>
            {#if message.role == 'user'}
            <div class="text-left text-true-white text-md bg-true-white rounded-xl bg-opacity-5 backdrop-blur-md my-2">
    
              <p class="w-full p-2 px-4 overflow-auto">
                {message.content}
              </p>
            </div>
            {:else}
            <div class="text-left text-true-white text-md bg-black rounded-xl bg-opacity-60 backdrop-blur-md my-2">
              <p class="w-full p-2 px-4 overflow-auto" innerHTML="{formatMessageContent(message.content)}">
                {message.content}
              </p>
            </div>
            {/if}
          </li>
          {/each}
        </ul>
      </div>
      <div class="row-span-1 pb-2 absolute bottom-2 px-2">
        <form on:submit={handleSubmit}>
          <div class="grid grid-cols-10">
            <div class="col-span-9">
              <textarea rows={rows} name="message" class="{rounded} overflow-auto appearance-none touch-manipulation  select-none resize-none min-h-[40px] 
                s-apple-input bg-black bg-opacity-40 w-full font-regular force-opaque-sm text-[15px]
                 focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque
                  focus:border-none" placeholder="Send a message" bind:value={$input}></textarea>
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
  

  {:else}

<div class="items-center justify-center content-center">
  <div class="justify-center ">
  <GlassCard 
      on:dragover="{dragOver}"
      on:drop="{dropHandler}"
      >

      {#if selectedFile}
          <p>File: {selectedFile.name}</p>
      {:else}

        <!-- <p>Drop a PDF file here or click to select</p> -->
        <p>Train with PDF</p>
        <input type="file" accept="application/pdf" on:change="{handleChange}" class="hidden" id="fileInput">
        <label for="fileInput" class="cursor-pointer text-system-cyan pt-2">Select a file</label>
        {/if}
      </GlassCard>
    </div>
  <GlassCard>

      {#if selectedFile}
          <p>File: {selectedFile.name}</p>
      {:else}
          <!-- <p>Drop a PDF file here or click to select</p> -->
          <p>Train with Website</p>
          <!-- <input type="file" accept="application/pdf" on:change="{handleChange}" class="hidden" id="fileInput">
          <label for="fileInput" class="cursor-pointer text-system-cyan pt-2">Select a file</label> -->
      {/if}
  </GlassCard>
  <GlassCard>
    <div class="grid grid-rows-3">
      <div class="">

        <span class="">
          Train with Text
        </span>
      </div>
      <div>

        <input type="text" name="textinput" class="apple-input rounded-full text-sm bg-black bg-opacity-40 w-full max-w-md font-regular force-opaque p-1 focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none"  placeholder="input" bind:value={training}/>
      </div>
      <div>
        {#if training.length > 3}
        <button class="btn bg-true-white bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl" on:click={train}>
          Train
        </button>
        {/if}
      </div>
    </div>
    

  </GlassCard>
</div>
  {/if}
</div>

