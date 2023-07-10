<script>
	import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    let talking = true;
    let training = false;

    $: talking = !training;
    $: training

    const toggle_ai = () => {
        training = talking;
        if ($page.url.pathname === '/my/ai/talk') {
          goto('train')
        }
        else {
          goto('talk')
        }
    }

    let message = ""


</script>


<div class="flex flex-col items-center h-full w-full text-true-white -ml-11 lg:-ml-10">
    <input class="check" type="checkbox" id="checkbox_toggle">
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class="checkbox lg:xlcheckbox border-none font-medium max-w-[190px] rounded-full" on:click={toggle_ai}>
      <label for="checkbox_toggle" class="slide bg-black bg-opacity-40 text-true-white">
        <label for="checkbox_toggle" class="toggle_box bg-true-white bg-opacity-10"></label>
        <label for="checkbox_toggle" class="text -ml-2 {!talking ? 'opacity-40 transition-opacity' : 'transition-opacity'}">Talk</label>
        <label for="checkbox_toggle" class="text -ml-6 {!training ? 'opacity-40 transition-opacity' : 'transition-opacity'}">Train</label>
      </label>
    </div>
    <!-- Here is where the magic happens -->
    <p class="text-2xl text-true-white font-semibold text-center justify-center py-4 ">
      {message}
    </p>
    <slot/>


    
      <div>
  </div>
</div>

