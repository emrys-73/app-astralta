<script>
    let talking = true;
    let training = false;

    $: talking = !training;
    $: training

    const toggle_ai = () => {
        training = talking;
    }

</script>


<div class="flex flex-col items-center h-full w-full text-true-white -ml-11 lg:-ml-10">
    <input class="check" type="checkbox" id="checkbox_toggle">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="checkbox lg:xlcheckbox border-none font-medium max-w-[190px] rounded-full" on:click={toggle_ai}>
      <label for="checkbox_toggle" class="slide bg-black bg-opacity-40 backdrop-blur-sm text-true-white">
        <label for="checkbox_toggle" class="toggle_box bg-true-white bg-opacity-10"></label>
        <label for="checkbox_toggle" class="text -ml-1 {!talking ? 'opacity-40 transition-opacity' : 'transition-opacity'}">Talk</label>
        <label for="checkbox_toggle" class="text -ml-3 {!training ? 'opacity-40 transition-opacity' : 'transition-opacity'}">Train</label>
      </label>
    </div>
    <div class="w-full sm:max-w-[600px] lg:max-w-[800px] grid grid-cols-12 absolute bottom-2 content-center items-center justify-center">
        <div class="col-span-2">
          <a href="https://astralta.com">
            <div class="hover:-translate-y-0.5 transition ease-in-out ml-0.5 sm:ml-3 md:ml-4 lg:mt-2 lg:ml-10 xl:ml-10 mt-2 xl:mt-1.5">
              <button class="btn bg-gray-300 bg-opacity-10 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md ml-3 md:h-[2rem] md:w-16 border-none normal-case drop-shadow-2xl">
                <!-- Learn more -->
                <img src="/logo_white.png" alt="cta" class="h-[30px] w-[30px] -mt-1"/>
              </button>
            </div>
          </a>
        </div>
        <div class="col-span-8">
          <input type="text" name="message" class=" max-h-[35px] s-apple-input rounded-full bg-black bg-opacity-40 w-full font-regular force-opaque-sm text-sm focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none" placeholder="Send a message" />
        </div>
        <div class="col-span-1">
          <div class="hover:-translate-y-0.5 transition ease-in-out">
            <button class="btn bg-true-black bg-opacity-50 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md ml-3 md:h-[35px] md:w-16 border-none normal-case drop-shadow-2xl">
              <!-- Learn more -->
              ➤
            </button>
          </div>
        </div>

      </div>
        
        
      <div>
  </div>
</div>

