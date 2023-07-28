<script>
  import { InfoModal } from '$lib/components';
	import GlassCard from '$lib/components/GlassCard.svelte';
  import { drawerOpen } from '../stores.js';
  import { experience } from '../stores.js';
  export let data;

  let xp = "";
  $: xp;

  experience.subscribe((value) => { xp = value; })

  let drawerState = false;
  // The dollar sign label tells Svelte that the following statement should be re-run whenever one of the state variables it references is updated
  $: drawerState;


  drawerOpen.subscribe((value) => {
    drawerState = value;
  })

</script>

<div class="h-full text-center text-true-white content-center flex justify-center items-center">
  <a href="/my/ai">  
    <GlassCard>
      Hi {data?.user?.username}!
    </GlassCard>
  </a>
</div>
  
{#if data.waitlist}
  <InfoModal>
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