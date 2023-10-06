<script>
    import { InfoModal } from '$lib/components';
</script>


<!-- This was just copy paste the waitlist site but has to be integrated into 
the logic, I was just too sleepy to do it -->

<div class="flex flex-col items-center h-full w-full text-true-white bg-black bg-opacity-30">

 
    {#if true}
        <InfoModal>
            <span slot="header">
                <div class="mt-8">
                    You're in!
                </div>
            </span>
            <span slot="image" class="justify-center items-center flex">
                <img src="ty.png" alt="nice" class="rounded-xl my-6 max-h-[210px] justify-center items-center flex">
            </span>
            <span slot="sub">
                <!-- You will receive an Email once you get full access -->
                Check your inbox to verify your EMail.
            </span>
            <span slot="backlink">
                <div class="h-10 w-full">

                </div>
                <!-- <div class="my-4">
                    <a href="https://astralta.com" class="text-center">
                      <div class="text-system-cyan hover:bg-true-white hover:bg-opacity-5 hover:cursor-pointer rounded-xl p-2 hover:backdrop-blur-md">
                        astralta.com
                      </div>
                    </a>
                  </div> -->
                  <!-- <div class="my-4">
                    <a href="/login" class="text-center">
                      <div class="text-system-cyan hover:bg-true-white hover:bg-opacity-5 hover:cursor-pointer rounded-xl p-2 hover:backdrop-blur-md">
                        Log In
                      </div>
                    </a>
                  </div> -->

            </span>
        </InfoModal>
    {/if}
</div>