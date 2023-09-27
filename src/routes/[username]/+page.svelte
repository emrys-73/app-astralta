
<script>
// @ts-nocheck

    import { page } from '$app/stores';
    import { InfoModal } from "$lib/components";
    import { darkMode } from "../../stores.js";

    export let data;

    let loading = false;

    let avatarUrl = "https://ui-avatars.com/api/?name=AI"
    if (data.user) {
        avatarUrl = `https://ui-avatars.com/api/?name=${data?.user?.name}`;
    }


    let profileCopied = false;

    async function copyToClipboard(content) {
    try {
        await navigator.clipboard.writeText(content);
        profileCopied = true
        // ALERT COPIED TO CLIPBOARD
        console.log('Link to profile copied!');
    } catch (error) {
        console.error('Failed to copy content to clipboard:', error);
    }
    }

    setTimeout(() => {
        profileCopied = false;
    }, 3000);

    let editing;
    $: editing = false;

    const closeEdit = () => {
        editing = false;
    }

    const openEdit = () => {
        editing = true;
    }

</script>


<div class="w-full h-full flex flex-col justify-center items-center">
    <!-- Banner image -->
    <div class="w-full h-[200px] bg-[url('/banner/base.jpg')] bg-image top-0 fixed z-40 blur-3xl">

    </div>
    <div class="w-full h-[200px] bg-[url('/banner/base.jpg')] bg-image top-0 fixed z-40">

    </div>

    <!-- user tag and image -->
    <div class="fixed top-40 md:left-20 left-4 flex flex-row justify-center items-center z-40">
        <!-- Avatar -->
        <div class="">
            <button on:click={copyToClipboard(`${$page.url}`)} class="btn border-none bg-transparent hover:bg-transparent mx-1 active:border-none avatar w-18 p-2">
                <div class="rounded-full">
                    <img src={avatarUrl} alt="avatar" id="avatar-preview">
                </div>
            </button>
        </div>
        <!-- Username -->
        <div class="text-white font-semibold text-3xl tracking-widest flex flex-col justify-center items-center gap-0">
          <div>
            <span>
                {data?.user?.name}
            </span>
          </div>
          <div class="flex flex-row items-center gap-1 opacity-50 text-sm w-full ">
            <span class="">
              @{data?.user?.username}
            </span>
            {#if data?.user?.verified_creator}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
              </svg>
              
            {/if}
          </div>
        </div>

        <!-- <button class="text-white fixed  right-8 md:right-24 opacity-50 hover:opacity-100 hover:cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
              
        </button> -->

    </div>

    <div class=" mt-60 flex flex-col justify-start py-8 h-full w-full items-center">
        <!-- Bio -->
    <div class="w-full px-6 pb-16 md:px-20">
        {#if data.user.bio}
            <div class="rounded-2xl text-white p-4 bg-white backdrop-blur-md bg-opacity-10 w-full max-h-24 overflow-y-auto">
                {data.user.bio}
            </div>
        {/if}

        <!-- Favourite AI (3) -->
    
    
        <!-- Resliche AI -->
        <div class="h-full justify-center items-center flex overflow-x-auto flex-col text-white">
            {#each data.agents as ai}
                {#if ai.public}    
                    <a href={`/${data.user.username}/public/${ai.id}`} class="bg-white rounded-2xl bg-opacity-5 hover:bg-opacity-10 hover:text-lg transition-all ease-in-out duration-300 backdrop-blur-md px-6 w-full py-2 my-1 flex-row relative justify-start flex items-center">
                        <div>
                            <span class="">
                                {ai.name}
                            </span>
                        </div>
                        <!-- <div class="absolute right-4 flex flex-row gap-1 justify-center items-center opacity-50">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                              </svg>
                              <span class="">
                                {ai.likes}
                              </span>
                              
                        </div> -->
                    </a>
                {/if}
            {/each}
        </div>
    </div>

    </div>

    {#if editing}
        <InfoModal>
            <div class="bg-white bg-opacity-5 rounded-2xl p-6">
                <form action="?/updateProfile" method="POST" class="flex flex-col gap-4">
                
                
                    <input id="name" label="Name" type="text" name="name" class=" rounded-full mb-4 apple-input {$darkMode ? 'bg-black bg-opacity-40 text-opacity-80' : 'bg-black bg-opacity-5 text-opacity-90'} w-[30vh] ease-in-out duration-700 font-regular force-opaque p-1.5 text-md text-opacity-50 focus:text-opacity-100 focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-text text-true-white " value="{data?.user?.name}" />


                    <input id="username" label="Username" type="text" name="username" class=" rounded-full mb-4 apple-input {$darkMode ? 'bg-black bg-opacity-40 text-opacity-80' : 'bg-black bg-opacity-5 text-opacity-90'} ease-in-out duration-700 w-[30vh] font-regular text-opacity-50 force-opaque p-1.5 text-md focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-text focus:text-opacity-100 text-true-white " value="{data?.user?.username}" />

                    <input id="bio" label="bio" type="text" name="bio" class=" rounded-full mb-4 apple-input {$darkMode ? 'bg-black bg-opacity-40 text-opacity-80' : 'bg-black bg-opacity-5 text-opacity-90'} ease-in-out duration-700 w-[30vh] font-regular text-opacity-50 force-opaque p-1.5 text-md focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-text focus:text-opacity-100 text-true-white " value="{data?.user?.bio}" />

                    <button on:click={closeEdit()} type="submit" class="btn {$darkMode ? 'bg-black bg-opacity-20' : 'bg-gray-300 bg-opacity-10'} ease-in-out duration-700 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold my-2 btn-sm md:text-md border-none normal-case shadow-xl" disabled={loading}>
                        Save changes
                    </button>
                </form>
            </div>
        </InfoModal>
    {/if}

<!-- 
    {#if profileCopied}
    <div class="toast toast-center text-white">
      <div class="alert alert-success rounded-2xl bg-green-500">
        <span>Copied link to profile!</span>
      </div>
    </div>
  {/if} -->
    

</div>