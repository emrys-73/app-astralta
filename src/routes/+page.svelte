<script>
  import { InfoModal } from '$lib/components';
  export let data;

  import { drawerOpen } from '../stores.js';


  let drawerState = false;
  // The dollar sign label tells Svelte that the following statement should be re-run whenever one of the state variables it references is updated
  $: drawerState;


  drawerOpen.subscribe((value) => {
    drawerState = value;
  })


  const toggleDrawer = () => {
    drawerOpen.update((state) => !state)
  }


</script>



<div class="text-3xl text-true-white w-full h-full text-center bg-gradient-to-b to-black from-transparent">
  {drawerState}


  <button class="btn-primary rounded-full p-4" on:click={toggleDrawer}>
    Toggle Drawer
  </button>
</div>



  
{#if data.waitlist}
      <InfoModal>
          <!-- <span slot="header">
              This is Astralta
          </span> -->
          <!-- <span slot="image" class="">
              <img src="ty.png" alt="nice" class="rounded-xl my-6 max-h-[210px] items-center ml-24">
          </span> -->
          <!-- <span slot="sub">
            Apply for early access here
          </span> -->
          <span slot="backlink">
            <div class="mt-4 mb-2">
              <a href="/login" class="text-center">
                <div class="text-system-cyan hover:bg-true-white hover:bg-opacity-5 hover:cursor-pointer rounded-xl p-2 hover:backdrop-blur-md">
                  Log In
                </div>
              </a>
            </div>
              <div class="mb-4">
                  <a href="/waitlist" class="text-center">
                    <div class="text-system-cyan hover:bg-true-white hover:bg-opacity-5 hover:cursor-pointer rounded-xl p-2 hover:backdrop-blur-md">
                      Join Waitlist
                    </div>
                  </a>
                </div>

          </span>
      </InfoModal>
{/if}