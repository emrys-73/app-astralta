<script>
    import { AltaCard } from '$lib/components/index.js';
    import { darkMode } from '../../../../stores.js';
    import { publicUrl } from '../../../../stores.js';


    export let data;


</script>

<div class="w-full h-full flex justify-center items-center px-4">
        <AltaCard>
            <div class="flex flex-row pb-2 gap-3">
              <div>
                <h1 class="text-xl font-bold uppercase text-center mt-6">
                    {data?.agent.name}
                </h1>
              </div>
              <!-- {#if data?.agent.model === "gpt-4"}
                <div class="justify-center items-center flex">
                  <span class="rounded-2xl bg-black bg-opacity-50 px-4 text-xs py-1">
                      PRO
                  </span>
                </div>
                {/if} -->
            </div>
            <div class="md:grid md:grid-cols-6 md:gap-0 flex flex-col justify-center items-center">
                <!-- <div>
                    <div class="justify-center items-center flex flex-col">
                        {#if data?.agent?.summary}
                        <div>
                            <div class="bg-black bg-opacity-20 rounded-2xl backdrop-blur-md text-center p-2">
                                {data?.agent.summary}
                            </div>
                        </div>
                        {/if}
                      </div>
                </div> -->
                <div class="col-span-6">
                    <form action="?/createPublicAgent" method="POST" class="justify-center flex ">

                      <button type="submit" class="my-4 flex flex-row text-center items-center justify-center gap-2 backdrop-blur-md {$darkMode ? 'bg-black bg-opacity-60' : 'bg-black bg-opacity-30'} altashadow text-true-white p-4 hover:bg-true-black hover:bg-opacity-40 hover:cursor-pointer rounded-2xl transition duration-500 ease-in-out">
                        <!-- <div>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                          
                        </div> -->
                        <div>
                          <h1 class="text-true-white text-md text-center">
                            Start Chat
                        </h1>
                        <!-- {$publicUrl} -->
                        </div>
                      </button>
                    </form>
                    
                </div>
                
                <!-- <div class="col-span-4 justify-center items-center flex flex-col">
                    <div class="justify-center items-center flex flex-col">
                      {#if data?.agent?.summary}
                      <div>
                          <div class="bg-black bg-opacity-20 rounded-2xl backdrop-blur-md text-center p-4">
                              {data?.agent.summary}
                          </div>
                      </div>
                      {/if}
    
    
                    </div>
                </div>
                
                
            </div> -->
        </AltaCard>
</div>