<script>
    import { darkMode } from "../../stores";
</script>

<div class="my-4  backdrop-blur-md {$darkMode ? 'bg-black bg-opacity-30' : 'bg-black bg-opacity-5'} drop-shadow-xl text-true-white p-4 min-w-[350px] hover:bg-true-white hover:bg-opacity-5 hover:cursor-pointer rounded-2xl transition duration-[200ms] ease-in relative">
    <slot />
</div>