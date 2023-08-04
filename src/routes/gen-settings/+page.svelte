<script>
// @ts-nocheck
    import { darkMode, gpt4, drawerOpen } from "../../stores";
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

</script>

<div class="{$drawerOpen ? 'sm:flex' : 'mt-20'} w-full h-full flex flex-col md:flex-row gap-4 justify-center items-center">
    <AltaCard>
        <div>
            <h2 class="text-true-white text-lg font-bold tetx-center">System Settings</h2>
        </div>
        <div class="my-4">
            <div>
                <h3 class="text-md font-regular text-true-white text-center mt-2">Appearance</h3>
            </div>
            <div>
                <button type="submit" class="btn {$darkMode ? 'bg-black bg-opacity-20' : 'bg-gray-300 bg-opacity-10'} hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold my-2 btn-sm md:text-md border-none normal-case shadow-xl" on:click={toggleDarkMode}>
                    {#if $darkMode}
                        Dark Mode
                    {:else}
                        Light Mode
                    {/if}
                </button>
            </div>
        </div>
        <div class="my-4">
            <div>
                <h3 class="text-md font-regular text-true-white text-center my-2">AI Name</h3>
            </div>
            <div>
                <form 
                    action="?/updateAIName"
                    method="POST"    
                >
                
                <input id="ainame" label="AIName" type="text" name="ainame" class=" rounded-full mb-4 apple-input {$darkMode ? 'bg-black bg-opacity-40 text-opacity-80' : 'bg-black bg-opacity-5 text-opacity-90'} w-[30vh] font-regular force-opaque p-1.5 text-md text-opacity-50 focus:text-opacity-100 focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-text text-true-white " value="{data?.user?.ainame}" />
                <div class="flex justify-center">
                    <button type="submit" class="btn {$darkMode ? 'bg-black bg-opacity-20' : 'bg-gray-300 bg-opacity-10'} hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold my-2 btn-sm md:text-md border-none normal-case shadow-xl" disabled={loading}>
                        Name my AI
                    </button>
                </div>
                </form>
            </div>
        </div>
    </AltaCard>
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
                
                <input id="name" label="Name" type="text" name="name" class=" rounded-full mb-4 apple-input {$darkMode ? 'bg-black bg-opacity-40 text-opacity-80' : 'bg-black bg-opacity-5 text-opacity-90'} w-[30vh] font-regular force-opaque p-1.5 text-md text-opacity-50 focus:text-opacity-100 focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-text text-true-white " value="{data?.user?.name}" />
                <div class="flex justify-center">
                    <button type="submit" class="btn {$darkMode ? 'bg-black bg-opacity-20' : 'bg-gray-300 bg-opacity-10'} hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold my-2 btn-sm md:text-md border-none normal-case shadow-xl" disabled={loading}>
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
                
                <input id="username" label="Username" type="text" name="username" class=" rounded-full mb-4 apple-input {$darkMode ? 'bg-black bg-opacity-40 text-opacity-80' : 'bg-black bg-opacity-5 text-opacity-90'} w-[30vh] font-regular text-opacity-50 force-opaque p-1.5 text-md focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-text focus:text-opacity-100 text-true-white " value="{data?.user?.username}" />
                <div class="flex justify-center">
                    <button type="submit" class="btn {$darkMode ? 'bg-black bg-opacity-20' : 'bg-gray-300 bg-opacity-10'} hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold my-2 btn-sm md:text-md border-none normal-case shadow-xl" disabled={loading}>
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

        
    </AltaCard>

</div>