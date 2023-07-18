<script>
  import { darkMode } from "../../stores";

  let darkModeState = false
  darkMode.subscribe((value) => {darkModeState = value})

  const toggleDarkMode = () => {
    darkMode.update((value) => !value)
  }

</script>

<div class="w-full h-full items-center text-center text-true-white text-2xl ">
    <h1 class="font-semibold">Appearance</h1>
    <button class="btn {darkModeState ? 'bg-black bg-opacity-20' : 'bg-gray-300 bg-opacity-10'} hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold my-2 btn-sm md:text-md border-none normal-case shadow-xl" on:click={toggleDarkMode}>
        {#if darkModeState}
          Dark Mode
        {:else}
          Light Mode
        {/if}
    </button>

  </div>
  