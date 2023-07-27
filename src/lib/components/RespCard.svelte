<script>
    import { darkMode } from "../../stores";

</script>


<div class="{$darkMode ? 'bg-black bg-opacity-20' : 'bg-white bg-opacity-10'} rounded-2xl w-[5rem] h-[5rem]">
    <slot/>
</div>