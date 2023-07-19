<script>
  // @ts-nocheck
  
      import { goto } from "$app/navigation";
      import { page } from "$app/stores";
      import { redirect } from "@sveltejs/kit";
      import { textTrainining, toggleTalk, darkMode } from "../../../stores";
      import { Input, Modal } from '$lib/components';
      import { useChat } from "ai/svelte";
      import { GlassCard, AltaCard } from "$lib/components";
      import { experience } from "../../../stores";
      import { enhance, applyAction } from '$app/forms';
      export let data;
      export let form;
      // import { marked } from 'marked';

      let darkModeState;
      darkMode.subscribe((value) => {darkModeState = value})

      let debugMode = false

      let training;
      $: training = "You are my AI";

      

      let xp;
      $: xp = "None"

      experience.subscribe((value) => xp = value)

      // let xp;
      // let xp;
      // experience.subscribe((value) => {xp = value})

      const train = () => {
        text = training
        handleSubmit()
        // experience.update(() => training)
        // console.log("Trained succesfully")

        // toggleTT()
      }
  
      let talking = true;
      $: talking;
  
      toggleTalk.subscribe((value) => {talking = value})
  
  
      const toggleTT = () => {
          toggleTalk.update((state) => !state)
          }

      // talk
      let text = "you are mine"

      text = data?.user?.username

      let userexperience = data?.user?.xp

      const username = data?.user?.username
      $: text;

      let greeting = `Hi ${username}, what can I do for you?`

      const { messages, handleSubmit, input } = useChat({
        api: "/chat",
        initialMessages: [{"role": "system", "content": userexperience}, {"role": "assistant", "content": greeting}],
      });

      
      let message;

      input.subscribe((value) => message = value)
      const MAX_ROWS = 10;


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

      // Experience Engine Logic

      let xpModalOpen;
      $: xpModalOpen = false;

      let loading;
      $: loading = false;


      const submitUpdateXP = () => {
      // loading = true;
      // xpModalOpen = true;
      
      return async ({ result }) => {
        switch (result.type) {
          case 'success':
            await invalidateAll();
            // xpModalOpen = false;
            break;
          case 'error':
            break;
          default:
            await applyAction(result);
        }
        // loading = false;
      };
    };

  </script>


<div class="flex flex-col items-center h-full w-full text-true-whit">
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
    <div class="min-w-[350px] sm:max-w-[700px] md:max-w-[80] lg:max-w-[900] xl:max-w-[1000px] m-6 rounded-xl flex justify-center items-center bg-black bg-opacity-0 mb-20 overflow-y-auto">
      <div class="row-span-5 overflow-auto">
        <ul>
          {#each $messages as message}
          <li>
            {#if message.role == 'user'}
            <div class="text-left text-true-white text-md bg-true-white rounded-xl bg-opacity-10 backdrop-blur-xl my-2 drop-shadow-xl"><pre class="w-full p-2 px-4 overflow-auto whitespace-pre-wrap">{message.content}<pre/></div>
            {:else if message.role == 'assistant'}
            <div class="text-left text-true-white text-md bg-black rounded-xl bg-opacity-60 backdrop-blur-xl my-2 drop-shadow-xl">
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
      <div class="row-span-1 py-3 bottom-0 mb-2 xl:mb-4 rounded-2xl px-6 fixed backdrop-blur-lg">
        <form on:submit={handleSubmit}>
          <div class="grid grid-cols-10">
            <div class="col-span-9">
              <textarea rows={rows} name="message" class="{rounded} overflow-auto appearance-none touch-manipulation {message.length > 0 ? '' : 'breathe'} select-none resize-none min-h-[40px] 
                s-apple-input bg-black bg-opacity-40 w-full font-regular force-opaque-sm text-[15px]
                 focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque
                  focus:border-none" placeholder="Send a message" bind:value={$input} on:keydown={(event) => {
                    if (event.key === 'Enter' && !event.shiftKey) {
                      event.preventDefault();
                      handleSubmit(event);
                    }}}></textarea>
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

  {#if debugMode}
  <div class="items-center justify-center content-center">
    <div class="justify-center ">
      <div class="mt-6">
        <h1 class="text-true-white text-center">
          Select how you want to train your AI
        </h1>
      </div>
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
    
    <div>
      <h2 class="text-lg font-regular text-true-white text-center my-2">XP</h2>

      <input id="xp" label="XP" type="text" name="xp" class="apple-input rounded-full mb-4 bg-black bg-opacity-40 w-[50vh] font-semibold force-opaque p-2 text-lg focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-not-allowed text-true-white text-opacity-60" value="{data?.user?.xp}" disabled />

      <Modal label="change-xp" checked={xpModalOpen}>
        <span slot="trigger" class="btn bg-true-white bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">Change XP</span>
        <h3 slot="heading">XP</h3>
        <form
          action="?/updateXP"
          method="POST"
          class="text-true-white"
          use:enhance={submitUpdateXP}
        >
        <div class="mb-8 items-center">
          <!-- ID defines what to retrieve from data later -->
          <Input
            id="xp" 
            type="text"
            label="Enter new XP"
            required={true}
            value={form?.data?.xp}
            disabled={loading}
          />
        </div>
          <div class="">
            <button type="submit" class="btn bg-true-white bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl" disabled={loading}
              >Change my name</button
            >
          </div>
        </form>
        
      </Modal>
    </div>
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
  <AltaCard>
    <div class="mb-2">
      <h2>
        Text
      </h2>
    </div>
    <div class="my-2">
      <form 
        action="?/updateXP"
        method="POST"
        use:enhance={submitUpdateXP}>
        
        <input 
          id="xp" 
          label="XP" 
          type="text" 
          name="xp"
          class="apple-input rounded-full bg-black bg-opacity-40 font-regular force-opaque p-2 text-md w-[50vh] focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-text text-true-white text-opacity-60"  
        />

        <div class="mt-3">
          <button type="submit" class="btn bg-black bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl" disabled={loading}
            >Run training</button
          >
        </div>
      
      </form>
    </div>


  </AltaCard>

  <div class="text-true-white text-center text-sm italic my-4">
    <p>Reload the page to apply the new training</p>
  </div>

  {/if}
</div>

