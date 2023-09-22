<script>
  
  // @ts-nocheck
	      import { onMount, onDestroy } from 'svelte';
        import { darkMode, header, showActionBar, elevateActionBar, animate, backgroundConfig } from '../../../../stores.js';
        import { useChat } from "ai/svelte";
        import { modeCurrent } from '@skeletonlabs/skeleton';
        import { setModeCurrent } from '@skeletonlabs/skeleton';

        export let data

        let userTextColor = "text-white";
        let accentColor = "bg-[#DFB5B1]"
        let backgroundColor = "bg-black"

        let store = false;

        onMount(() => {
          elevateActionBar.set(true)
          showActionBar.set(false)
          ideaInput.set($messages[$messages.length - 1].content)
          setAccentColor(data?.agent.accent)
          setBackgroundColor(data?.agent?.bg)
          setStore(data.agent.store_messages)
        })

        const setStore = (value) => {
          store = value
        }

        const setBackgroundColor = (bg) => {
          switch (bg) {
              case "classic":
                backgroundColor = "bg-[#F1F1F1] dark:bg-[#000000]"
              break;

              case "notion":
                backgroundColor = "bg-notion-light dark:bg-notion-dark"
                backgroundConfig.set("bg-notion-light dark:bg-notion-dark")
              break;

            default:
            backgroundColor = "bg-[#F1F1F1] dark:bg-[#000000]"
              break;
          }
        }

        const setAccentColor = (accent) => {
          switch (accent) {
            case "astralta":
              accentColor = "bg-[#4930FF]"
              userTextColor = "text-white"
              break;

            case "red":
              accentColor = "bg-[#FF453A]"
              userTextColor = "text-white"
              break;  
          
            case "orange":
              accentColor = "bg-[#EB8D00]"
              userTextColor = "text-white"
              break;

            case "yellow":
              accentColor = "bg-[#FFD60A]"
              userTextColor = "text-black"
              break;

            case "green":
              accentColor = "bg-[#1FB536]"
              userTextColor = "text-white"
              break;
            
            case "teal":
              accentColor = "bg-[#5BACC2]"
              userTextColor = "text-white"
              break;

            case "cyan":
              accentColor = "bg-[#53BAE3]"
              userTextColor = "text-white"
              break;

            case "blue":
              accentColor = "bg-[#0A84FF]"
              break;

            case "indigo":
              accentColor = "bg-[#5E5CE6]"
              userTextColor = "text-white"
              break;

            case "purple":
              accentColor = "bg-[#BF5AF2]"
              userTextColor = "text-white"
              break;
            
            case "pink":
              accentColor = "bg-[#FF375F]"
              userTextColor = "text-white"
              break;

            case "brown":
              accentColor = "bg-[#AC8E68]"
              userTextColor = "text-white"
              break;

            case "gray":
              accentColor = "bg-[#98989D]"
              userTextColor = "text-white"
              break;
          
            // From now on iPhone colors

            case "black_titanium":
              accentColor = "bg-[#393B3C]"
              userTextColor = "text-white"
              break;
              
              case "natural_titanium":
              accentColor = "bg-[#9D968B]"
              userTextColor = "text-white"
              break;

              case "blue_titanium":
              accentColor = "bg-[#373F4F]"
              userTextColor = "text-white"
              break;

              case "white_titanium":
              accentColor = "bg-[#F2F1EA]"
              userTextColor = "text-white"
              break;

              case "space_black":
              accentColor = "bg-[#302E2D]"
              userTextColor = "text-white"
              break;

              case "deep_purple":
              accentColor = "bg-[#4A4055]"
              userTextColor = "text-white"
              break;

              case "alpine_green":
              accentColor = "bg-[#485A47]"
              userTextColor = "text-white"
              break;

              case "sierra_blue":
              accentColor = "bg-[#87A3BB]"
              userTextColor = "text-white"
              break;

              case "graphite":
              accentColor = "bg-[#454340]"
              userTextColor = "text-white"
              break;

              case "pacific_blue":
              accentColor = "bg-[#1D3F4D]"
              userTextColor = "text-white"
              break;

              case "rose_gold":
              accentColor = "bg-[#DFB5B1]"
              userTextColor = "text-white"
              break;
          
            default:
            accentColor = "bg-[#4930FF]"
              break;
          }
        }

        onDestroy(() => {
          backgroundConfig.set("bg-true-white dark:bg-black")
          elevateActionBar.set(false)
        })
    
        let ideaGenerated = false;
    
        let lastMessage;
        $: lastMessage = ""
    
        let msgcount;
        $: msgcount = $messages.length - 1;
    
        let thisMsgCount;
        $: thisMsgCount = 0;
    
        let error;
        $: error;
    
        const formatMessages = ( msgs ) => {
          const formattedMessages = msgs.map((msg) => {
            return {
              role: msg.role,
              content: msg.content
            };
          });
    
          return formattedMessages;
        }
    
        async function storeMessage (ChatID, UserMessage, AIMessage) {
          const response = await fetch('/api/storeMsg', {
                method: 'POST',
                body: JSON.stringify({ ChatID, UserMessage, AIMessage }),
                headers: {
                    'content-type': 'application/json'
                }
            });
    
            const result = await response.json()
        }
    
        let chatOptions = {
            api: "/chat/pro",
            initialMessages: formatMessages(data.messages),
            onFinish: () => {
              error = false;
              thisMsgCount = thisMsgCount + 1;
              ideaInput.set($messages[$messages.length - 1].content)
              if (store) {
                storeMessage(data.chat.id, $messages[$messages.length - 2].content, $messages[$messages.length - 1].content)
              }
            },
            onError: () => {
              error = true;
            }
          }
    
          const { messages, handleSubmit, input, isLoading, reload, stop, setMessages } = useChat(chatOptions);

    
          const { messages: ideaMsgs, handleSubmit: ideaSubmit, input: ideaInput, reload: reloadIdea, isLoading: ideaLoading } = useChat({
            api: "/x-engine/idea",
            initialMessages: [{"role": "system", "content": "Your task is to reply with just one possible question and nothing else that I could ask you later on based on the input I give you. The question will be one possible way to continue the conversation"}],
            onFinish: () => {
              // set input as result from this
              input.set($ideaMsgs[$ideaMsgs.length - 1].content)
              ideaGenerated = true;
            }
          });
          
    
          const loadMore = () => {
            input.set("keep writing");
          }

          const actionPrompt = () => {
            input.set(data?.agent?.action_prompt);
          }
          
          let message;
    
          input.subscribe((value) => message = value)
          const MAX_ROWS = 10;
    
    
          $: rows = message.length > 0 ? Math.min(Math.ceil(message.length / 100), MAX_ROWS) : 1;
          $: rounded = rows > 1 ? "rounded-lg" : "rounded-full";

          let messageCopied = false;

          setTimeout(() => {
            messageCopied = false;
          }, 3000);

          // New stuff

          let baseColor = "bg-[#DCDCDC] dark:bg-[#202020]"

    </script>
    
    
    <div class="w-full h-full justify-center flex items-center {backgroundColor}">
      <div class="w-full px-4 h-16 backdrop-blur-md absolute top-0 flex items-center text-white text-md font-medium tracking-wider flex-row gap-2 md:gap-6 ">
        <a href={`/agents/${data?.agent.id}`}>
          <div class="flex flex-row gap-2 md:gap-4 ml-2 md:ml-20">
            <!-- <div class="rounded-full btn-circle avatar w-8 bg-white h-8">
                <div class="rounded-full">
                    <img src={data?.agent?.avatarUrl} alt="avatar" id="avatar-preview">
                </div>
            </div> -->
            <div class="text-black dark:text-white flex items-center justify-center hover:text-xl font-semibold transition-all duration-300 ease-in-out">
              {data?.agent.name}
            </div>
          </div>
        </a>

      </div>

      <div class=" w-full h-full flex flex-col px-2 md:w-5/6 gap-3 py-16 pb-36 " >
        {#each $messages as m}
        {#if m.role === "assistant"}
        <div class="{baseColor} text-black dark:text-white mr-auto ml-0 rounded-2xl px-3 py-2 ">
          <pre class="w-full p-2 overflow-y-auto whitespace-pre-wrap font-sans text-[12pt]">{m.content}</pre>
        </div>
        {/if}
        {#if m.role === "user"}  
        <div class="{accentColor} {userTextColor} ml-auto mr-0 rounded-2xl px-3 py-2 ">
          <pre class="w-full font-sans overflow-y-auto whitespace-pre-wrap text-[12pt]">{m.content}</pre>
        </div>
        {/if}
          
        {/each}
      </div>


      <!-- Input area start -->
      <div class="row-span-1 py-3 bottom-0 mb-2 xl:mb-4 rounded-2xl px-6 fixed backdrop-blur-lg flex flex-col mx-1 xl:w-[40vw] {$darkMode ? 'bg-white bg-opacity-5' : ''} dark:altashadow altashadow-light" >
        <!-- Action island start -->
        <div class="pb-2 flex flex-row gap-1">
          <!-- Regenerate -->
          <!-- <button class="btn btn-sm bg-black bg-opacity-40 border-none rounded-full hover:bg-white hover:bg-opacity-10 text-white font-normal normal-case content-center" on:click={reload} disabled={msgcount === 1}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
          </button> -->


          <button class="btn btn-sm {accentColor} dark:bg-black dark:bg-opacity-40 bg-opacity-100 border-none rounded-full hover:bg-white hover:bg-opacity-10 {userTextColor} font-normal normal-case content-center" on:click={stop} disabled={!$isLoading}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
            </svg>
          </button>
          <button class="btn btn-sm bg-red-600 bg-opacity-90 border-none rounded-full hover:bg-white hover:bg-opacity-10 {userTextColor} dark:bg-black dark:bg-opacity-40 font-normal normal-case content-center {error ? '' : 'hidden'}" on:click={reload}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
          </button>

          <!-- Action Button  -->
          <button on:click={actionPrompt} class="btn btn-sm {accentColor} dark:bg-black dark:bg-opacity-40 bg-opacity-100 border-none rounded-full hover:bg-white hover:bg-opacity-10 {userTextColor} font-normal normal-case content-center">
            <svg class="w-4 h-4" viewBox="0 0 626 626" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g filter="url(#filter0_d_238_174)">
              <path d="M102.999 507.919H40.2871C81.1048 477.645 102.423 459.095 136.83 422.387C184.728 369.672 204.758 340.949 233.19 271.689C252.733 220.966 261.063 156.833 265.371 143.798C269.679 130.763 269.117 118.246 292.783 109.583C306.318 108.046 313.906 108.141 327.44 109.583C343.201 112.051 348.069 116.915 353.02 136.465C357.97 156.015 366.783 218.777 381.9 269.244C403.845 324.724 423.337 356.922 473.492 416.685C511.229 459.14 535.696 480.609 585.712 514.436H527.952C450.953 453.155 419.445 415.733 375.299 345.815C340.16 282.181 328.87 247.148 325.781 186.015C324.349 177.481 322.147 174.672 315.88 172.981C310.414 172.516 312.486 172.383 307.632 172.829C300.061 174.147 297.946 177.513 296.08 185.863C286.53 252.717 271.746 289.482 241.624 345.815C197.757 410.432 168.058 446.008 102.999 507.919Z" fill="url(#paint0_linear_238_174)"/>
              <path d="M304.129 317.603C269.3 396.107 243.105 440.535 176.643 511.249H227.026C264.21 468.015 280.018 441.773 304.129 400.48C329.168 445.125 339.239 471.132 390.392 514.436H436.959C369.824 451.011 342.135 401.314 304.129 317.603Z" fill="url(#paint1_linear_238_174)"/>
              </g>
              <defs>
              <filter id="filter0_d_238_174" x="30.2871" y="104.466" width="565.426" height="425.971" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix"/>
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
              <feOffset dy="6"/>
              <feGaussianBlur stdDeviation="5"/>
              <feComposite in2="hardAlpha" operator="out"/>
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.52 0"/>
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_238_174"/>
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_238_174" result="shape"/>
              </filter>
              <linearGradient id="paint0_linear_238_174" x1="313" y1="108.466" x2="313" y2="514.436" gradientUnits="userSpaceOnUse">
              <stop stop-color="white"/>
              <stop offset="1" stop-color="white"/>
              </linearGradient>
              <linearGradient id="paint1_linear_238_174" x1="306.801" y1="317.603" x2="306.801" y2="514.436" gradientUnits="userSpaceOnUse">
              <stop offset="0.411458" stop-color="white"/>
              <stop offset="1" stop-color="white" stop-opacity="0"/>
              </linearGradient>
              </defs>
              </svg>
              
          </button>

          <!-- Delete -->
          <!-- <button class="btn btn-sm bg-black bg-opacity-40 border-none rounded-full hover:bg-white hover:bg-opacity-10 text-white font-normal normal-case content-center" on:click={clearChat} disabled={msgcount === 1}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button> -->

          <!-- Keep writing -->
          <button class="btn btn-sm {accentColor} dark:bg-black dark:bg-opacity-40 bg-opacity-100 border-none rounded-full hover:bg-white hover:bg-opacity-10 {userTextColor} font-normal normal-case content-center" on:click={loadMore} disabled={$messages.length < 2 || $isLoading}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
            </svg>
            
          </button>
          <!-- Idea generator -->
          
          {#if !ideaGenerated}
          <form on:submit={ideaSubmit}>
            <input bind:value={$ideaInput} hidden>
            <button class="btn btn-sm {accentColor} dark:bg-black dark:bg-opacity-40 bg-opacity-100 border-none rounded-full hover:bg-white hover:bg-opacity-10 {userTextColor} font-normal normal-case" type="submit" disabled={$ideaLoading}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 ">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </button>
          </form>
          {:else }
          <form on:submit={reloadIdea}>
            <input bind:value={$ideaInput} hidden>
            <button class="btn btn-sm {accentColor} dark:bg-black dark:bg-opacity-40 bg-opacity-100 border-none rounded-full hover:bg-white hover:bg-opacity-10 {userTextColor} font-normal normal-case" type="submit" disabled={$ideaLoading || thisMsgCount < 1}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
              </svg>
            </button>
          </form>
          {/if}


          <!-- <div>
            <AltaCard>
              This is the thing
              {#each $titleMsgs as msg}

                <span>
                  {msg.role}: {msg.content}
                </span>
              {/each}

              <form on:submit={titleHandleSubmit}>
                <input bind:value={$titleInput}/>
                <button type="submit">
                  Submit
                </button>
              </form>
            </AltaCard>
          </div> -->

          <!-- Title generation -->
          <!-- <form on:submit={titleSubmit}>
            <input bind:value={$titleInput} hidden>
            <button class="btn btn-sm bg-black bg-opacity-40 border-none rounded-full hover:bg-white hover:bg-opacity-10 text-white font-normal normal-case" type="submit" disabled={$titleLoading || thisMsgCount < 1}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
              </svg>
            </button>
          </form> -->

          <!-- Copy to Clipboard -->
          <!-- <button class="btn btn-sm bg-black bg-opacity-40 border-none rounded-full hover:bg-white hover:bg-opacity-10 text-white font-normal normal-case content-center" on:click={copyToClipboard} disabled={$messages.length < 2 || $isLoading}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4 hover:w-6 hover:h-6 transition-all duration-300 ease-in-out">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
            </svg>
            
            
          </button> -->

          <!-- Settings -->
          <!-- <a href={`${$page.url}/settings`}>
            <button class="btn btn-sm {accentColor} dark:bg-black dark:bg-opacity-40 bg-opacity-100 border-none rounded-full hover:bg-white hover:bg-opacity-10 {userTextColor} font-normal normal-case content-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>
          </a> -->

     
          <!-- Lightswitch -->
        <button on:click={setModeCurrent(!$modeCurrent)} class="btn btn-sm {accentColor} bg-opacity-100 dark:bg-black dark:bg-opacity-40 border-none rounded-full hover:bg-white hover:bg-opacity-10 {userTextColor} font-normal normal-case">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
          </svg>
        </button>

        </div>
        <!-- Action island end -->

        <div>
          <form on:submit={handleSubmit}>
            <div class="grid grid-cols-10">
              <div class="col-span-9">
                <textarea id="myMessage" rows={rows} name="message" class="{rounded} overflow-auto appearance-none touch-manipulation z-10 select-none resize-none min-h-[40px] 
                  s-apple-input bg-white dark:bg-black dark:bg-opacity-40 w-full font-regular force-opaque-sm text-[15px]
                     focus:apple-input focus:force-opaque dark:text-white text-black
                    focus:border-none" placeholder="Send a message" bind:value={$input} on:keydown={(event) => {
                      if (event.key === 'Enter' && !event.shiftKey) {
                        event.preventDefault();
                        handleSubmit(event);
                      }}} disabled={$isLoading}></textarea>
              </div>
              <div class="col-span-1 ml-1 md:ml-2 w-full">
                <button class="btn w-full btn-sm {accentColor} {$animate} border-none rounded-full hover:bg-black hover:bg-opacity-40 text-white font-normal normal-case min-h-[40px]" type="submit" disabled={$isLoading}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                  
                </button>
                
              </div>
            </div>
          </form>
        </div>
        
        
      </div>
      <!-- Input area end -->
    </div>



    
