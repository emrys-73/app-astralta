<script>
    // @ts-nocheck
        import { darkMode, header } from '../../../../../stores.js';
        import { useChat } from "ai/svelte";
        export let data

        header.set(data?.agent.name)
    
        let debugMode = false;
    
        let ideaGenerated = false;
    
        let lastMessage;
        $: lastMessage = ""
    
        let msgcount;
        $: msgcount = $messages.length - 1;
    
        let thisMsgCount;
        $: thisMsgCount = 0;
    
        let error;
        $: error;

    
        const copyToClipboard = () => {
            navigator.clipboard.writeText($messages[$messages.length - 1].content);
          }
    
    
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

        async function generateTitle (ChatID, agentID, firstMessage) {
          const response = await fetch('/api/generateTitle', {
                method: 'POST',
                body: JSON.stringify({ ChatID, agentID, firstMessage }),
                headers: {
                    'content-type': 'application/json'
                }
            });
    
            const result = await response.json()
        }

        const { messages: titleMsg, handleSubmit: titleSubmit, input: titleInput, reload: reloadTitle, isLoading: titleLoading } = useChat({
            api: "/x-engine/title",
            initialMessages: [{"role": "system", "content": "Your task is to reply with just one short title in a short sentence that is best suitable for the following message interaction with an user and an AI."}],
            onFinish: () => {

              // updateTitle on DB
            }
          });
    
    
        // Helper function created to see what the message storage sends
        async function seeData (msgData) {
          const response = await fetch('/api/seeData', {
                method: 'POST',
                body: JSON.stringify({ msgData }),
                headers: {
                    'content-type': 'application/json'
                }
            });
    
            const result = await response.json()
        }
    
        let chatOptions = {
            api: "/chat",
            initialMessages: formatMessages(data.messages),
            onFinish: () => {
              error = false;
              thisMsgCount = thisMsgCount + 1;
              ideaInput.set($messages[$messages.length - 1].content)
              storeMessage(data.chat.id, $messages[$messages.length - 2].content, $messages[$messages.length - 1].content)
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
    
    
          $: rows = message.length > 0 ? Math.min(Math.ceil(message.length / 100), MAX_ROWS) : 1;
          $: rounded = rows > 1 ? "rounded-lg" : "rounded-full";


          // get custom background

    
    </script>
    
    
    <div class="h-full flex justify-center relative">
      <div class="w-full fixed top-0 z-50 backdrop-blur-md py-2">
        <h1 class="text-center text-true-white font-bold text-2xl">
          {data?.agent?.name}
        </h1>
      </div>
        <div class="min-w-[350px] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[900px] xl:max-w-[1200px] m-6 rounded-xl flex justify-center items-center mb-32 overflow-y-auto flex-col mt-12">
          <!-- Messages start -->
            <div class="row-span-5 overflow-auto">
              
                <ul>
                    <!-- {#each data?.messages as message} -->
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
            </div>
            <!-- Messages end -->
    
            <!-- Input area start -->
            <div class="row-span-1 py-3 bottom-0 mb-2 xl:mb-4 rounded-2xl px-6 fixed backdrop-blur-lg flex flex-col mx-2 xl:w-[40vw] {$darkMode ? 'bg-black bg-opacity-60' : ''} altashadow">
              <!-- Action island start -->
              <div class="pb-2 flex flex-row gap-1">
                <!-- Regenerate -->
                <!-- <button class="btn btn-sm bg-black bg-opacity-40 border-none rounded-full hover:bg-white hover:bg-opacity-10 text-white font-normal normal-case content-center" on:click={reload} disabled={msgcount === 1}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </button> -->
    
                <!-- Home -->
                <a href="/">
                  <button class="btn btn-sm bg-black bg-opacity-40 border-none rounded-full hover:bg-white hover:bg-opacity-10 text-white font-normal normal-case content-center">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                    </svg>
                  </button>
                </a>
    
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
      
                <!-- Delete -->
                <!-- <button class="btn btn-sm bg-black bg-opacity-40 border-none rounded-full hover:bg-white hover:bg-opacity-10 text-white font-normal normal-case content-center" on:click={clearChat} disabled={msgcount === 1}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button> -->
      
                <!-- Keep writing -->
                <button class="btn btn-sm bg-black bg-opacity-40 border-none rounded-full hover:bg-white hover:bg-opacity-10 text-white font-normal normal-case content-center" on:click={loadMore} disabled={msgcount === 1}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
                  </svg>
                  
                </button>
                <!-- Idea generator -->
                
                {#if !ideaGenerated}
                <form on:submit={ideaSubmit}>
                  <input bind:value={$ideaInput} hidden>
                  <button class="btn btn-sm bg-black bg-opacity-40 border-none rounded-full hover:bg-white hover:bg-opacity-10 text-white font-normal normal-case" type="submit" disabled={$ideaLoading || thisMsgCount < 1}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                  </button>
                </form>
                {:else }
                <form on:submit={reloadIdea}>
                  <input bind:value={$ideaInput} hidden>
                  <button class="btn btn-sm bg-black bg-opacity-40 border-none rounded-full hover:bg-white hover:bg-opacity-10 text-white font-normal normal-case" type="submit" disabled={$ideaLoading || thisMsgCount < 1}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                  </button>
                </form>
                {/if}

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
                <button class="btn btn-sm bg-black bg-opacity-40 border-none rounded-full hover:bg-white hover:bg-opacity-10 text-white font-normal normal-case content-center" on:click={copyToClipboard} disabled={msgcount === 1}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                  </svg>
                  
                  
                </button>
      
      
              </div>
              <!-- Action island end -->
    
              <div>
                <form on:submit={handleSubmit}>
                  <div class="grid grid-cols-10">
                    <div class="col-span-9">
                      <textarea id="myMessage" rows={rows} name="message" class="{rounded} overflow-auto appearance-none touch-manipulation {message.length > 0 ? '' : 'breathe'} z-10 select-none resize-none min-h-[40px] 
                        s-apple-input {$darkMode ? 'bg-black bg-opacity-40 focus:bg-black focus:bg-opacity-40' : 'bg-white bg-opacity-0 focus:bg-white focus:bg-opacity-0'} w-full font-regular force-opaque-sm text-[15px] hover:text-true-white hover:opacity-100 text-true-white
                           focus:apple-input focus:force-opaque
                          focus:border-none" placeholder="Send a message" bind:value={$input} on:keydown={(event) => {
                            if (event.key === 'Enter' && !event.shiftKey) {
                              event.preventDefault();
                              handleSubmit(event);
                            }}} disabled={$isLoading}></textarea>
                    </div>
                    <div class="col-span-1 ml-1 md:ml-2 w-full">
                      <button class="btn w-full btn-sm bg-black bg-opacity-40 border-none rounded-full hover:bg-white hover:bg-opacity-10 text-white font-normal normal-case min-h-[40px] apple-btn" type="submit" disabled={$isLoading}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
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
    </div>
    