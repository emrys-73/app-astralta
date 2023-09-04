<script>
// @ts-nocheck
    import { darkMode, gpt4, bg, back } from "../../stores";
    import { enhance, applyAction } from '$app/forms';
    import { AltaCard } from "$lib/components";

    // export let form;
    export let data;


    let loading = false;
    let invalidUsername = false;

    const toggleDarkMode = () => {
        darkMode.update((value) => !value)
    }

    const toggleGPT = () => {
        gpt4.update((value) => !value)
    }

    const submitUpdateUsername = () => {
      loading = true;
      invalidUsername = false;
      return async ({ result }) => {
        switch (result.type) {
          case 'success':
            await invalidateAll();
            break;
          case 'error':
            invalidUsername = true;
            break;
          default:
            await applyAction(result);
        }
        loading = false;
      };
    };


    const updateBg = (newBg) => {
        back.update(newBg)
    }

    const backgrounds = [
        {
            "name": "home",
            "url": "bg-[url('/bg/home.png')]"
        },
        {
            "name": "dubai",
            "url": "bg-[url('/bg/dubai.png')]"
        },
        {
            "name": "forest",
            "url": "bg-[url('/bg/forest.png')]"
        },
    ]


</script>

<div class="w-full h-full flex flex-col gap-4 justify-center items-center my-8">
    <div class="flex-wrap flex gap-4 justify-center items-center">
        <div>

        </div>
        <AltaCard>
            <div>
                <h2 class="text-true-white text-lg font-bold tetx-center">Account Settings</h2>
            </div>
            <div class="my-4">
                <div>
                    <h3 class="text-md font-regular text-true-white text-center my-2">Name</h3>
                </div>
                <div>
                    <form 
                        action="?/updateName"
                        method="POST"    
                    >
                    
                    <input id="name" label="Name" type="text" name="name" class=" rounded-full mb-4 apple-input {$darkMode ? 'bg-black bg-opacity-40 text-opacity-80' : 'bg-black bg-opacity-5 text-opacity-90'} w-[30vh] ease-in-out duration-700 font-regular force-opaque p-1.5 text-md text-opacity-50 focus:text-opacity-100 focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-text text-true-white " value="{data?.user?.name}" />
                    <div class="flex justify-center">
                        <button type="submit" class="btn {$darkMode ? 'bg-black bg-opacity-20' : 'bg-gray-300 bg-opacity-10'} ease-in-out duration-700 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold my-2 btn-sm md:text-md border-none normal-case shadow-xl" disabled={loading}>
                            Set name
                        </button>
                    </div>
                    </form>
                </div>
            </div>
            <div class="my-4">
                <div>
                    <h3 class="text-md font-regular text-true-white text-center my-2">Username</h3>
                </div>
                <div>
                    <form 
                        action="?/updateUsername"
                        method="POST"    
                        use:enhance={submitUpdateUsername}
                    >
                    
                    <input id="username" label="Username" type="text" name="username" class=" rounded-full mb-4 apple-input {$darkMode ? 'bg-black bg-opacity-40 text-opacity-80' : 'bg-black bg-opacity-5 text-opacity-90'} ease-in-out duration-700 w-[30vh] font-regular text-opacity-50 force-opaque p-1.5 text-md focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-text focus:text-opacity-100 text-true-white " value="{data?.user?.username}" />
                    <div class="flex justify-center">
                        <button type="submit" class="btn {$darkMode ? 'bg-black bg-opacity-20' : 'bg-gray-300 bg-opacity-10'} ease-in-out duration-700 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold my-2 btn-sm md:text-md border-none normal-case shadow-xl" disabled={loading}>
                            Set username
                        </button>
                    </div>
                    </form>
                    {#if invalidUsername}
                    <div class="flex justify-center">
                        <span class="italic font-regular text-true-white bg-red-600 rounded-2xl p-1 px-4 text-sm">
                            Username already taken
                        </span>
                    </div>
                    {/if}
                </div>
            </div>
    
            
            <a href="/reset-password">
                <div class="flex justify-center">
                    <button type="submit" class="btn {$darkMode ? 'bg-black bg-opacity-20' : 'bg-gray-300 bg-opacity-10'} ease-in-out duration-700 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold my-2 btn-sm md:text-md border-none normal-case shadow-xl" disabled={loading}>
                        Change Password
                    </button>
                </div>
            </a>
        </AltaCard>
        

        <div class="flex flex-col gap-4">
            <!-- <AltaCard>
                <div>
                    <h3 class="text-center text-true-white font-semibold text-xl mb-6">
                        My Data
                    </h3>
                </div>
                
                    <form 
                        action="?/updateBaseData"
                        method="POST"    
                    >
                    
                    <textarea id="baseData" label="baseData" type="text" name="baseData" rows="4" class=" rounded-2xl mb-4 apple-input {$darkMode ? 'bg-black bg-opacity-40 text-opacity-80' : 'bg-black bg-opacity-5 text-opacity-90'} overflow-y-auto h-60 w-[30vh] ease-in-out duration-700 font-regular force-opaque p-1.5 text-md text-opacity-50 focus:text-opacity-100 focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-text text-true-white " value="{data?.user?.baseData}" />
                    <div class="flex justify-center">
                        <button type="submit" class="btn {$darkMode ? 'bg-black bg-opacity-20' : 'bg-gray-300 bg-opacity-10'} ease-in-out duration-700 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold my-2 btn-sm md:text-md border-none normal-case shadow-xl" disabled={loading}>
                            Set my data
                        </button>
                    </div>
                    </form>

                
            </AltaCard> -->

            <!-- <AltaCard>
                <div>
                    <h3 class="text-center text-true-white font-semibold text-xl">
                        Stats
                    </h3>
                </div>
            </AltaCard> -->
        </div>
    </div>
    

    <div>
        <form action="/logout" method="POST" class="text-true-white hover:text-true-white">
            <div class="flex flex-row max-h-[35px]">
                <div class="py-2 px-1 pl-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                      </svg>                              
                </div>
                <button type="submit" class="py-2 px-2">
                    Log Out
                </button>
            </div>
          </form>
    </div>
</div>