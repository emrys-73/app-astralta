<script>
// @ts-nocheck

  import { darkMode, gpt4, drawerOpen, bg } from "../../stores";
  import { enhance, applyAction } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import { Input, Modal } from '$lib/components';
  
    export let form;
    export let data;
    let ainameModalOpen;
    let emailModalOpen;
    let usernameModalOpen;
    let nameModalOpen;
    let loading;
    let bgModalOpen;
  
    $: ainameModalOpen = false;
    $: emailModalOpen = false;
    $: usernameModalOpen = false;
    $: nameModalOpen = false;
    $: bgModalOpen = false;
    $: loading = false;
  
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

    const submitUpdateAIName = () => {
      loading = true;
      ainameModalOpen = true;
      return async ({ result }) => {
        switch (result.type) {
          case 'success':
            await invalidateAll();
            ainameModalOpen = false;
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

  let gpt4On = false;
  gpt4.subscribe((value) => {gpt4On = value})


  const toggleGPT = () => {
    gpt4.update((value) => !value)
  }

</script>


<!-- My AI Settings -->
<div class="w-full h-full items-center text-center text-true-white text-2xl justify-center bg-black bg-opacity-0 {$drawerOpen ? 'hidden sm:block' : 'mt-20'}">
  <div class="mb-4">
    <h1 class="font-semibold ">My AI</h1>
    <div class="mb-6">

      <h2 class="text-lg font-regular text-true-white text-center mt-2">Appearance</h2>
      <button class="btn {darkModeState ? 'bg-black bg-opacity-20' : 'bg-gray-300 bg-opacity-10'} hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold my-2 btn-sm md:text-md border-none normal-case shadow-xl" on:click={toggleDarkMode}>
          {#if darkModeState}
            Dark Mode
          {:else}
            Light Mode
          {/if}
      </button>
    </div>

    <div class=" justify-center flex">
      <h2 class="text-lg font-regular text-true-white text-center mt-2 flex">Background</h2>
    </div>
    <form action="?/updateBg" method="POST" class="mb-12 justify-center flex content-center">
      <div class="mb-2 flex-col flex w-32 md:flex-row gap-2 justify-center content-cente">
        <input 
          id="bg"
          type="text"
          value={$bg}
          name="bg"
          hidden>

        
        
        <button class="btn {darkModeState ? 'bg-black bg-opacity-20' : 'bg-gray-300 bg-opacity-10'} {$bg === 'home' ? 'bg-white bg-opacity-30' : ''} hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold my-2 btn-sm md:text-md border-none normal-case shadow-xl" on:click={() => {bg.set("home")}}>
          Home
        </button>
        <button class="btn {darkModeState ? 'bg-black bg-opacity-20' : 'bg-gray-300 bg-opacity-10'} {$bg === 'ocean' ? 'bg-white bg-opacity-30' : ''} hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold my-2 btn-sm md:text-md border-none normal-case shadow-xl" on:click={() => {bg.set("ocean")}}>
            Ocean
        </button>
        <button class="btn {darkModeState ? 'bg-black bg-opacity-20' : 'bg-gray-300 bg-opacity-10'} {$bg === 'forest' ? 'bg-white bg-opacity-30' : ''} hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold my-2 btn-sm md:text-md border-none normal-case shadow-xl" on:click={() => {bg.set("forest")}}>
          Forest
        </button>
        <button class="btn {darkModeState ? 'bg-black bg-opacity-20' : 'bg-gray-300 bg-opacity-10'} {$bg === 'vulcano' ? 'bg-white bg-opacity-30' : ''} hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold my-2 btn-sm md:text-md border-none normal-case shadow-xl" on:click={() => {bg.set("vulcano")}}>
          Vulcano
        </button>
        <button class="btn {darkModeState ? 'bg-black bg-opacity-20' : 'bg-gray-300 bg-opacity-10'} {$bg === 'ny' ? 'bg-white bg-opacity-30' : ''} hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold my-2 btn-sm md:text-md border-none normal-case shadow-xl" on:click={() => {bg.set("ny")}}>
          New York
        </button>
        <button class="btn {darkModeState ? 'bg-black bg-opacity-20' : 'bg-gray-300 bg-opacity-10'} {$bg === 'muc' ? 'bg-white bg-opacity-30' : ''} hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold my-2 btn-sm md:text-md border-none normal-case shadow-xl" on:click={() => {bg.set("muc")}}>
          Munich
        </button>
        <button class="btn {darkModeState ? 'bg-black bg-opacity-20' : 'bg-gray-300 bg-opacity-10'} {$bg === 'dubai' ? 'bg-white bg-opacity-30' : ''} hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold my-2 btn-sm md:text-md border-none normal-case shadow-xl" on:click={() => {bg.set("dubai")}}>
          Dubai
        </button>
        <button class="btn {darkModeState ? 'bg-black bg-opacity-20' : 'bg-gray-300 bg-opacity-10'} {$bg === 'pink' ? 'bg-white bg-opacity-30' : ''} hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold my-2 btn-sm md:text-md border-none normal-case shadow-xl" on:click={() => {bg.set("pink")}}>
          Pink
        </button>
      </div>
      <div>
      </div>
    </form>

    <div class="mb-6">

      <h2 class="text-lg font-regular text-true-white text-center mt-2">GPT Model</h2>
      <button class="btn {darkModeState ? 'bg-black bg-opacity-20' : 'bg-gray-300 bg-opacity-10'} hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold my-2 btn-sm md:text-md border-none normal-case shadow-xl" on:click={toggleGPT}>
          {#if gpt4On}
            GPT-4
          {:else}
            GPT-3.5-Turbo
          {/if}
      </button>
    </div>
    <div class="mb-20">
      <!-- AI Name -->
        
      <h2 class="text-lg font-regular text-true-white text-center mt-2">AI Name</h2>

      <input id="ainame" label="AIName" type="text" name="ainame" class="apple-input rounded-full mb-4 bg-black bg-opacity-40 w-[50vh] font-semibold force-opaque p-2 text-lg focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-not-allowed text-true-white text-opacity-60" value="{data?.user?.ainame}" disabled />
      
      <Modal label="change-ainame" checked={ainameModalOpen}>
        <span slot="trigger" class="btn bg-true-white bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">Change AI name</span>
        <h3 slot="heading">Name my AI</h3>
        <form
          action="?/updateAIName"
          method="POST"
          class="text-true-white"
          use:enhance={submitUpdateAIName}
        >
        <div class="mb-8 items-center">
          <Input
            id="ainame"
            type="text"
            label="Enter new name"
            required={true}
            value={form?.data?.ainame}
            disabled={loading}
          />
        </div>
          <div class="">
            <button type="submit" class="btn bg-true-white bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl" disabled={loading}
              >Name my AI</button
            >
          </div>
        </form>
        
      </Modal>
      
    </div>

  </div>
  
  
  <!-- My Account Settings -->
  <div class="my-4">
    
    <h1 class="font-semibold mb-4">My Account</h1>
    
    <!-- Username -->
    <div class="mb-12">
        <h2 class="text-lg font-regular text-true-white text-center my-2">Username</h2>

        <input id="username" label="Username" type="text" name="username" class="apple-input rounded-full mb-4 bg-black bg-opacity-40 w-[50vh] font-semibold force-opaque p-2 text-lg focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-not-allowed text-true-white text-opacity-60" value="{data?.user?.username}" disabled />
        
        <Modal label="change-username" checked={usernameModalOpen}>
          <span slot="trigger" class="btn bg-true-white bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">Change username</span>
          <h3 slot="heading">Username</h3>
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
    <div class="mb-8">
        <h2 class="text-lg font-regular text-true-white text-center my-2">Name</h2>

        <input id="name" label="Name" type="text" name="name" class="apple-input rounded-full mb-4 bg-black bg-opacity-40 w-[50vh] font-semibold force-opaque p-2 text-lg focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-not-allowed text-true-white text-opacity-60" value="{data?.user?.name}" disabled />
        
        <Modal label="change-name" checked={nameModalOpen}>
          <span slot="trigger" class="btn bg-true-white bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">Change name</span>
          <h3 slot="heading">Name</h3>
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
      <div class="">
        <form action="/logout" method="POST" class="text-true-white hover:text-true-white">
          <button type="submit" class="btn bg-black bg-opacity-60 px-6 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl"
          >Log Out</button
        >
        </form>
        
      </div>
  </div>
    