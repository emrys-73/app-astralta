<script>
    import { darkMode } from "../../stores";
</script>

<div class="my-4 bg-black backdrop-blur-md bg-opacity-30 drop-shadow-xl text-true-white p-4 px-6 rounded-2xl {$darkMode ? 'bg-black bg-opacity-30' : 'bg-black bg-opacity-5'} flex flex-col justify-center items-center ease-in-out duration-700">
    <slot />
</div>