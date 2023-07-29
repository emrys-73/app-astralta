<script lang="ts">
  // @ts-nocheck
  
      import { toggleTalk, darkMode, drawerOpen } from "../../../stores";
      import { useChat } from "ai/svelte";
      import { LiveCard, AltaCard } from "$lib/components";
      import { experience, personality } from "../../../stores";
      import { enhance, applyAction } from '$app/forms';
      import { beforeUpdate, afterUpdate } from 'svelte';
      export let data;      

      let msgcount;
      $: msgcount = 1;

      let error;
      $: error;


      let darkModeState;
      darkMode.subscribe((value) => {darkModeState = value})

      let debugMode = false;

      let training;
      $: training = "You are no longer a slave of fear. You are a child of God";
      

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
      let text = "Worthy is the Lord"

      text = data?.user?.username

      let userexperience = data?.user?.xp

      const username = data?.user?.username
      $: text;

      let greeting = `Hi ${username}, what can I do for you?`

      const { messages, handleSubmit, input, isLoading, reload, stop, setMessages } = useChat({
        api: "/chat",
        initialMessages: [{"role": "system", "content": userexperience}, {"role": "assistant", "content": greeting}],
        onFinish: () => {
          msgcount = msgcount + 1; error = false;
          ideaInput.set($messages[$messages.length - 1].content)
        },
        onError: () => {
          error = true;
        }
      });

      const { messages: summaryMsgs, handleSubmit: summarySubmit, input: summaryInput, setMessages: summarySetMesgs } = useChat({
        api: "/summary",
        initialMessages: [{"role": "system", "content": "Your task is to summarise anything that I give you in 3 sentences"}],
        onFinish: () => {
          // set input from idea as result from this
          ideaInput.set($messages[$messages.length - 1].content)
        }
      });

      let localSumMsgs;
      $: localSumMsgs = [];
      summaryMsgs.subscribe((value) => {localSumMsgs = value})

      let summary = localSumMsgs[localSumMsgs.length - 1].content


      const { messages: ideaMsgs, handleSubmit: ideaSubmit, input: ideaInput } = useChat({
        api: "/idea",
        initialMessages: [{"role": "system", "content": "Your task is to reply with just one possible question and nothing else that I could ask you later on based on the input I give you. The question will be one possible way to continue the conversation"}],
        onFinish: () => {
          // set input as result from this
          input.set(idea)
        }
      });
      


      const clearChat = () => {
        setMessages([{"role": "system", "content": userexperience}, {"role": "assistant", "content": greeting}])
        msgcount = 1;
      }

      const loadMore = () => {
        input.set("keep writing");
      }
      
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


    // Radio Personality
    let value;
    let perso;
    personality.subscribe((value) => {perso = value})

    const updatePerso = () => {
      personality.update(() => value)
    }

    // AI Naming
    let ainame = "Astralta"
    if ( data?.user?.ainame ) { ainame = data?.user?.ainame }


    // scrolling - not working
    let div;
    let autoscroll = false;

    beforeUpdate(() => {
      if (div) {
        const scrollableDistance = div.scrollHeight - div.offsetHeight;
        autoscroll = div.scrollTop > scrollableDistance - 20;
      }
    });

    afterUpdate(() => {
      if (autoscroll) {
        div.scrollTo(0, div.scrollHeight);
      }
    });




    const setSummaryInput = () => {
        summaryInput.set("hi");
      }

    

    let sumInputContent;
    $: sumInputContent = "hiashfkja";
    summaryInput.subscribe((value) => {sumInputContent = value})


    let idea;
    $: idea = $ideaMsgs[$ideaMsgs.length - 1].content

  </script>


<div class="flex flex-col items-center h-full w-full text-true-white" bind:this={div}>
  <div class="{$drawerOpen ? 'hidden sm:block' : 'mt-[5.2rem] md:mt-[6rem]'} z-40">
    <input class="check" type="checkbox" id="checkbox_toggle">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-static-element-interactions -->
    <div class="checkbox lg:xlcheckbox border-none font-medium max-w-[190px] rounded-full" on:click={toggleTT}>
      <label for="checkbox_toggle" class="slide bg-black bg-opacity-40 text-true-white">
        <label for="checkbox_toggle" class="toggle_box bg-true-white bg-opacity-10"></label>
        <label for="checkbox_toggle" class="text -ml-2 {!talking ? 'opacity-40 transition-opacity' : 'transition-opacity'}">Talk</label>
        <label for="checkbox_toggle" class="text -ml-6 {talking ? 'opacity-40 transition-opacity' : 'transition-opacity'}">Train</label>
      </label>
  </div>
    
  </div>
  {#if talking} 

  <div class="flex justify-center h-full relative">
    <div class="min-w-[350px] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[900px] xl:max-w-[1200px] m-6 rounded-xl flex justify-center items-center mb-32 overflow-y-auto">
      <!-- <CodeBlock language="ts" code={message.content}></CodeBlock> -->
      <!-- // here to side code -->
      <div class="row-span-5 overflow-auto ">
        <ul>
          {#each $messages as message}
          <li>
            {#if message.role == 'user'}
            <div class="text-left text-true-white text-md bg-true-white bg-opacity-10 rounded-xl  backdrop-blur-xl my-2 drop-shadow-xl"><pre class="w-full p-2 px-4 overflow-auto whitespace-pre-wrap ">{message.content}<pre/></div>
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
      <div class="row-span-1 py-3 bottom-0 mb-2 xl:mb-4 rounded-2xl px-6 fixed backdrop-blur-lg flex flex-col mx-2">
        <div class="pb-2 flex flex-row gap-1">
          <button class="btn btn-sm bg-black bg-opacity-40 border-none rounded-full hover:bg-white hover:bg-opacity-10 text-white font-normal normal-case content-center" on:click={reload} disabled={msgcount === 1}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            
          </button>
          <button class="btn btn-sm bg-black bg-opacity-40 border-none rounded-full hover:bg-white hover:bg-opacity-10 text-white font-normal normal-case content-center" on:click={stop} disabled={!$isLoading}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
            </svg>
          </button>
          <button class="btn btn-sm bg-red-600 bg-opacity-90 border-none rounded-full hover:bg-white hover:bg-opacity-10 text-white font-normal normal-case content-center {error ? '' : 'hidden'}" on:click={reload}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </button>
          <button class="btn btn-sm bg-black bg-opacity-40 border-none rounded-full hover:bg-white hover:bg-opacity-10 text-white font-normal normal-case content-center" on:click={clearChat} disabled={msgcount === 1}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
          
          

          
          <button class="btn btn-sm bg-black bg-opacity-40 border-none rounded-full hover:bg-white hover:bg-opacity-10 text-white font-normal normal-case content-center" on:click={loadMore} disabled={msgcount === 1}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
            </svg>
            
          </button>
          <!-- Idea generator -->
          
            <form on:submit={ideaSubmit}>
              <input bind:value={$ideaInput} hidden>
              <!-- Idea Input: {$ideaInput}
              <br>
    
              Answer: {idea}
              
               -->
              <button class="btn btn-sm bg-black bg-opacity-40 border-none rounded-full hover:bg-white hover:bg-opacity-10 text-white font-normal normal-case content-center" type="submit" disabled={msgcount === 1}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                </svg>
                
                
              </button>
            </form>
          



          <!-- <button class="btn btn-sm bg-black bg-opacity-40 border-none rounded-full hover:bg-white hover:bg-opacity-10 text-white font-normal normal-case">
            {msgcount}
          </button> -->
          
        </div>
        <div class="">
          <form on:submit={handleSubmit}>
            <div class="grid grid-cols-10">
              <div class="col-span-9">
                <textarea rows={rows} name="message" class="{rounded} overflow-auto appearance-none touch-manipulation {message.length > 0 ? '' : 'breathe'} select-none resize-none min-h-[40px] 
                  s-apple-input bg-black bg-opacity-40 w-full font-regular force-opaque-sm text-[15px] hover:text-true-white hover:opacity-100 text-true-white
                   focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque
                    focus:border-none" placeholder="Send a message" bind:value={$input} on:keydown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        handleSubmit(event);
                      }}} disabled={$isLoading}></textarea>
              </div>
              <div class="col-span-1 px-1">
                <!-- <button class="btn bg-true-black text-xl bg-opacity-50 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md border-none normal-case drop-shadow-2xl h-[40px] apple-btn w-full" type="submit" disabled={$isLoading}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                  
                </button> -->
                <button class="btn btn-sm bg-black bg-opacity-40 border-none rounded-full hover:bg-white hover:bg-opacity-10 text-white font-normal normal-case content-center min-h-[40px]" type="submit" disabled={$isLoading}>
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
    <LiveCard 
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
    </LiveCard>
      </div>
    
    <LiveCard>
  
        {#if selectedFile}
            <p>File: {selectedFile.name}</p>
        {:else}
            <!-- <p>Drop a PDF file here or click to select</p> -->
            <p>Train with Website</p>
            <!-- <input type="file" accept="application/pdf" on:change="{handleChange}" class="hidden" id="fileInput">
            <label for="fileInput" class="cursor-pointer text-system-cyan pt-2">Select a file</label> -->
        {/if}
      </LiveCard>

  </div>

  {/if}
  <div class="justify-center items-center content-center">
    <form 
          action="?/updateXP"
          method="POST"
          use:enhance={submitUpdateXP}
          class="max-w-min"
          >
    <AltaCard>
      <div class="mb-2">
        <h2>
          Personality
        </h2>
      </div>
      
        <!-- <input 
            id="perso" 
            label="perso" 
            type="text" 
            name="perso"
            class=" hidden apple-input rounded-full bg-black bg-opacity-40 font-regular force-opaque p-2 text-md w-[50vh] focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-text text-true-white text-opacity-60"  
            value={form?.data?.perso}
          /> -->
  
          <input 
            id="perso" 
            label="perso" 
            type="text" 
            name="perso"
            class="hidden apple-input rounded-full bg-black bg-opacity-40 font-regular force-opaque p-2 text-md w-full min-w-[30vh] focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-text text-true-white text-opacity-60"  
            value={perso}
          />
  
          <!-- Naming -->
          <input 
            id="ainame" 
            label="ainame" 
            type="text" 
            name="ainame"
            class="hidden apple-input rounded-full bg-black bg-opacity-40 font-regular force-opaque p-2 text-md w-full min-w-[30vh] focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-text text-true-white text-opacity-60"  
            value={ainame}
          />
  
        <!-- <div>
          <RadioGroup class="border-none">
            <RadioItem bind:group={value} name="justify" value={0} class="">
              <span class="{value === 0 ? ' bg-true-white bg-opacity-20' : ''} btn bg-black bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">
                Personal Assistant
              </span>
            </RadioItem>
            <RadioItem bind:group={value} name="justify" value={1}>
              <span class="{value === 1 ? ' bg-true-white bg-opacity-20' : ''} btn bg-black bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">
                Tutor / Expert
              </span>
            </RadioItem>
            <RadioItem bind:group={value} name="justify" value={2}>
              <span class=" {value === 2 ? ' bg-true-white bg-opacity-20' : ''} btn bg-black bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">
                Emotional Support
              </span>
            </RadioItem>
          </RadioGroup>
        </div> -->
        <div>
          
              <button on:click={() => {value = -1; updatePerso()}} class=" {value === -1 ? ' bg-true-white bg-opacity-20' : ''} {data?.user?.username === 'Sir' ? '' : 'hidden'} btn bg-black my-2 bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">
                Monday
              </button>
            
              <button on:click={() => {value = 0; updatePerso()}} class="{value === 0 ? ' bg-true-white bg-opacity-20' : ''} btn bg-black my-2 bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">
                Personal Assistant
              </button>
          
            
              <button on:click={() => {value = 1; updatePerso()}} class="{value === 1 ? ' bg-true-white bg-opacity-20' : ''} btn bg-black my-2 bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">
                Tutor / Expert
              </button>
            
            
              <button on:click={() => {value = 2; updatePerso()}} class=" {value === 2 ? ' bg-true-white bg-opacity-20' : ''} btn bg-black my-2 bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">
                Emotional Support
              </button>
  
              <button on:click={() => {value = 3; updatePerso()}} class=" {value === 3 ? ' bg-true-white bg-opacity-20' : ''} btn bg-black my-2 bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">
                Best Friend
              </button>
  
              
            
          
        </div>
    
        {#if debugMode}
          Personality: {perso}
        {/if}
    
        <!-- <div class="divider"></div>
        <div class="my-2">
    
            <div class="mt-3">
              <button type="submit" class="btn bg-black bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl" on:click={updatePerso}
                >Set personality</button
              >
            </div>
        </div> -->
      
  
  
    </AltaCard>
  
    <div class="mt-6">
      <h1 class="text-true-white text-center">
        Type in what you want to train your AI on
      </h1>
    </div>
    <AltaCard>
      <div class="mb-2">
        <h2>
          Text
        </h2>
      </div>
      <div class="my-2">
        
          
          <input 
            id="xp" 
            label="XP" 
            type="text" 
            name="xp"
            class="apple-input rounded-full bg-black bg-opacity-40 font-regular force-opaque p-2 text-md w-full min-w-[30vh] focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-text text-true-white text-opacity-60"  
            on:keydown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
              }}}
          />
  
          
        
        </div>
        
        
      </AltaCard>
  
      <div class="mt-3 flex justify-center">
        <button type="submit" class="btn bg-black bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl" disabled={loading}
          >Run training</button
        >
      </div>
    </form>
  
    
  
    <div class="text-true-white text-center text-sm italic my-4">
      <p>Reload the page to apply the new training</p>
    </div>
  </div>

  {/if}
</div>

