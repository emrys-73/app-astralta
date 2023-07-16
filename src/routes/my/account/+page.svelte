  <script>
// @ts-nocheck

    import { enhance, applyAction } from '$app/forms';
    import { invalidateAll } from '$app/navigation';
    import { Input, Modal } from '$lib/components';
  
    export let form;
    export let data;
    let emailModalOpen;
    let usernameModalOpen;
    let loading;
  
    $: emailModalOpen = false;
    $: usernameModalOpen = false;
    $: loading = false;
  
    const submitUpdateEmail = () => {
      loading = true;
      emailModalOpen = true;
      return async ({ result }) => {
        switch (result.type) {
          case 'success':
            await invalidateAll();
            emailModalOpen = false;
            break;
          case 'error':
            break;
          default:
            await applyAction(result);
        }
        loading = false;
      };
    };
  
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
  </script>

  <div class="h-full flex flex-col items-center">
    <div class="justify-center w-[600px] py-2">
      <h3 class="text-2xl font-semibold text-true-white text-center">Email</h3>
    </div>
    <!-- <div class="w-full justify-center items-center content-center">
      <Input id="username" label="Username" value={data?.user?.username} disabled />
    </div> -->
    <input id="username" label="Username" type="text" name="email" class="apple-input rounded-full mb-4 bg-black bg-opacity-40 w-full max-w-md font-semibold force-opaque p-2 text-lg focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none hover:cursor-not-allowed text-true-white text-opacity-60" value="{data?.user?.email}" disabled />
    <div class="justify-center ">
      <Modal label="change-email" checked={emailModalOpen}>
        <span slot="trigger" class="btn bg-true-white bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">Change Email</span>
        <h3 slot="heading">Change Your Email</h3>
        <form action="?/updateEmail" method="POST" class="space-y-2 text-true-white" use:enhance={submitUpdateEmail}>
          <Input
            id="email"
            type="email"
            label="Enter your new email address"
            required={true}
            value={form?.data?.email}
            disabled={loading}
          />
          <div class="">
            <button type="submit" class="btn bg-true-white bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl" disabled={loading}
            >Change my email</button
          >
          </div>
          
        </form>
      </Modal>
    </div>
  
  </div>
  
  <div class="flex flex-col w-full h-full space-y-12">
    
    <div class="w-full">
      <h3 class="text-2xl font-semibold text-true-white text-center">Change Username</h3>
      <div class="divider mb-0.5" />
      <Input id="username" label="Username" value={data?.user?.username} disabled />
      <Modal label="change-username" checked={usernameModalOpen}>
        <span slot="trigger" class="btn bg-true-white bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">Change Username</span>
        <h3 slot="heading">Change Your Username</h3>
        <form
          action="?/updateUsername"
          method="POST"
          class="space-y-2"
          use:enhance={submitUpdateUsername}
        >
          <Input
            id="username"
            type="text"
            label="Enter your new username"
            required={true}
            value={form?.data?.username}
            disabled={loading}
          />
          <button type="submit" class="btn btn-primary w-full" disabled={loading}
            >Change my username</button
          >
        </form>
      </Modal>
    </div>
  </div>