<script>
// @ts-nocheck

  import { darkMode } from "../../stores";
  import { enhance, applyAction } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import { Input, Modal } from '$lib/components';
  
    export let form;
    export let data;
    let emailModalOpen;
    let usernameModalOpen;
    let nameModalOpen;
    let loading;
  
    $: emailModalOpen = false;
    $: usernameModalOpen = false;
    $: nameModalOpen = false;
    $: loading = false;
  
    // const submitUpdateEmail = () => {
    //   loading = true;
    //   emailModalOpen = true;
    //   return async ({ result }) => {
    //     switch (result.type) {
    //       case 'success':
    //         await invalidateAll();
    //         emailModalOpen = false;
    //         break;
    //       case 'error':
    //         break;
    //       default:
    //         await applyAction(result);
    //     }
    //     loading = false;
    //   };
    // };
  
    const submitUpdateUsername = () => {
      loading = true;
      usernameModalOpen = true;
      return async ({ result }) => {
        switch (result.type) {
          case 'success':
            await invalidateAll();
            usernameModalOpen = false;
            break;
          case 'error':
            break;
          default:
            await applyAction(result);
        }
        loading = false;
      };
    };

    const submitUpdateName = () => {
      loading = true;
      nameModalOpen = true;
      return async ({ result }) => {
        switch (result.type) {
          case 'success':
            await invalidateAll();
            nameModalOpen = false;
            break;
          case 'error':
            break;
          default:
            await applyAction(result);
        }
        loading = false;
      };
    };

  let darkModeState = false
  darkMode.subscribe((value) => {darkModeState = value})

  const toggleDarkMode = () => {
    darkMode.update((value) => !value)
  }

</script>

<div class="w-full h-full items-center text-center text-true-white text-2xl justify-center">
  <div class="mb-4">
    <h1 class="font-semibold ">Appearance</h1>
    <button class="btn {darkModeState ? 'bg-black bg-opacity-20' : 'bg-gray-300 bg-opacity-10'} hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold my-2 btn-sm md:text-md border-none normal-case shadow-xl" on:click={toggleDarkMode}>
        {#if darkModeState}
          Dark Mode
        {:else}
          Light Mode
        {/if}
    </button>
  </div>
  <!-- <div class="divider"></div> -->
  <div class="my-4">
    
    <h1 class="font-semibold mb-4">Account</h1>
    
    <!-- Email -->
    <!-- <div>
      <h2 class="text-xl font-regular text-true-white text-center my-2">Email</h2>
      
      <input id="username" label="Username" type="text" name="email" class="apple-input rounded-full mb-4 bg-black bg-opacity-40 w-full max-w-md font-semibold force-opaque p-2 text-lg focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-not-allowed text-true-white text-opacity-60" value="{data?.user?.email}" disabled />
      <div class="justify-center ">
        <Modal label="change-email" checked={emailModalOpen}>
          <span slot="trigger" class="btn bg-true-white bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">Change Email</span>
          <h3 slot="heading">Change Your Email</h3>
          <form action="?/updateEmail" method="POST" class="text-true-white" use:enhance={submitUpdateEmail}>
            <div class="mb-8">
              <Input
              id="email"
              type="email"
              label="Enter your new email address"
              required={true}
              value={form?.data?.email}
              disabled={loading}
              
            />
            </div>
            <div class="">
              <button type="submit" class="btn bg-true-white bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl" disabled={loading}
              >Change my email</button
            >
            </div>
            
          </form>
        </Modal>
      </div>
    </div> -->

    <!-- Username -->
    <div class="mb-12">
        <h2 class="text-lg font-regular text-true-white text-center my-2">Username</h2>

        <input id="username" label="Username" type="text" name="username" class="apple-input rounded-full mb-4 bg-black bg-opacity-40 w-full max-w-md font-semibold force-opaque p-2 text-lg focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-not-allowed text-true-white text-opacity-60" value="{data?.user?.username}" disabled />
        
        <Modal label="change-username" checked={usernameModalOpen}>
          <span slot="trigger" class="btn bg-true-white bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">Change username</span>
          <h3 slot="heading">Change your username</h3>
          <form
            action="?/updateUsername"
            method="POST"
            class="text-true-white"
            use:enhance={submitUpdateUsername}
          >
          <div class="mb-8 items-center">
            <Input
              id="username"
              type="text"
              label="Enter your new username"
              required={true}
              value={form?.data?.username}
              disabled={loading}
            />
          </div>
            <div class="">
              <button type="submit" class="btn bg-true-white bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl" disabled={loading}
                >Change my username</button
              >
            </div>
            <div class="mt-8">
              <p class="text-true-white text-opacity-25 italic text-sm">
                *Your username must be unique. 
                <br>If you can't change it, means it is not available
              </p>
            </div>
            
          </form>
          
        </Modal>
      </div>
      
    </div>

    <!-- Name -->
    <div>
        <h2 class="text-lg font-regular text-true-white text-center my-2">Name</h2>

        <input id="name" label="Name" type="text" name="name" class="apple-input rounded-full mb-4 bg-black bg-opacity-40 w-full max-w-md font-semibold force-opaque p-2 text-lg focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-not-allowed text-true-white text-opacity-60" value="{data?.user?.name}" disabled />
        
        <Modal label="change-name" checked={nameModalOpen}>
          <span slot="trigger" class="btn bg-true-white bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">Change name</span>
          <h3 slot="heading">Change your name</h3>
          <form
            action="?/updateName"
            method="POST"
            class="text-true-white"
            use:enhance={submitUpdateName}
          >
          <div class="mb-8 items-center">
            <Input
              id="name"
              type="text"
              label="Enter your new name"
              required={true}
              value={form?.data?.name}
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

    <!-- <div class="divider"></div> -->


  </div>
    