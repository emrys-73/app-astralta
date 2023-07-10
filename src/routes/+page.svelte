
<!-- <script>
    let talking = true;
    let training = false;

    $: talking = !training;
    $: training

    const toggle_ai = () => {
        training = talking;
    }

</script>


<div class="flex flex-col items-center h-full w-full text-true-white">
    <input class="check" type="checkbox" id="checkbox_toggle">
    
    <div class="checkbox border-none font-medium max-w-[190px]" on:click={toggle_ai}>
      <label for="checkbox_toggle" class="slide bg-black bg-opacity-40 backdrop-blur-sm text-true-white">
        <label for="checkbox_toggle" class="toggle_box bg-true-white bg-opacity-10"></label>
        <label for="checkbox_toggle" class="text -ml-1 {!talking ? 'opacity-40 transition-opacity' : 'transition-opacity'}">Talk</label>
        <label for="checkbox_toggle" class="text -ml-3 {!training ? 'opacity-40 transition-opacity' : 'transition-opacity'}">Train</label>
      </label>
    </div>
</div> -->




<!-- <div class="w-full h-full text-true-white text-center content-center justify-center">
  <h1 class="text-2xl">
    Join waitlist
  </h1>

  <div class="items-center">
    <a href="/waitlist">
      <div class="pl-2 z-50">
        <div class="hover:-translate-y-0.5 transition ease-in-out md:mt-0.5">
          <button class="btn bg-true-white bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm ml-4 mt-4 md:ml-2 md:text-md md:mt-4 md:h-[2rem] border-none normal-case drop-shadow-2xl">
            Join Waitlist
          </button>
        </div>
      </div>
    </a>
  </div>
</div> -->


<script>
  import { InfoModal } from '$lib/components';
  import { afterUpdate } from 'svelte';
  import { page } from '$app/stores';
  export let data;

  let modalOpen = false;

  $: modalOpen;

  const hadnleSubmit = () => {
      modalOpen = true;
  };
</script>


  
{#if data.waitlist}
      <InfoModal>
          <span slot="header">
              Join Waitlist
          </span>
          <!-- <span slot="image" class="">
              <img src="ty.png" alt="nice" class="rounded-xl my-6 max-h-[210px] items-center ml-24">
          </span> -->
          <!-- <span slot="sub">
            Apply for early access here
          </span> -->
          <span slot="backlink">
              <div class="pb-6">
                  <a href="/waitlist" class="text-center">
                    <div class="text-system-cyan hover:bg-true-white hover:bg-opacity-5 hover:cursor-pointer rounded-xl p-2 hover:backdrop-blur-md">
                      Apply for early access
                    </div>
                  </a>
                </div>

          </span>
      </InfoModal>
{/if}