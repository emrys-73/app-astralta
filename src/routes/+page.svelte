<script>
// @ts-nocheck

  import { InfoModal, LiveCard } from '$lib/components';
  export let data;

</script>

<div class="h-full text-center text-true-white content-center flex justify-center items-center">
  <a href="/my/ai">  
    <LiveCard>
      Hi {data?.user?.username}!
    </LiveCard>
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