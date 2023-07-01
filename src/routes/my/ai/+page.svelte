<script>
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
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="checkbox border-none font-medium max-w-[190px]" on:click={toggle_ai}>
      <label for="checkbox_toggle" class="slide bg-black bg-opacity-40 backdrop-blur-sm text-true-white">
        <label for="checkbox_toggle" class="toggle_box bg-true-white bg-opacity-10"></label>
        <label for="checkbox_toggle" class="text -ml-1 {!talking ? 'opacity-40 transition-opacity' : 'transition-opacity'}">Talk</label>
        <label for="checkbox_toggle" class="text -ml-3 {!training ? 'opacity-40 transition-opacity' : 'transition-opacity'}">Train</label>
      </label>
    </div>
    <div class="form-control w-full content-center py-2 flex-row absolute bottom-3">
      <div class="flex-none w-[500px]">

      </div>
      <div class="">
        <a href="https://astralta.com">
          <button class="btn bg-gray-300 bg-opacity-10 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-md border-none normal-case drop-shadow-lg mr-2 ">
            <div class="px-1.5 font-regular">
                Learn More
            </div>
        </button>
        </a>
        
      </div>
      <input type="text" name="message" class="apple-input rounded-full bg-black bg-opacity-40 w-full font-regular force-opaque-sm p-2 text-md focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none" placeholder="Send a message" />
      <div class="flex-none w-[500px]">

      </div>
  </div>
</div>

