<script>
    import { LiveCard } from "$lib/components/index.js";

    export let data;

</script>

<div class="w-full h-full flex justify-center items-center breathe">
    <a href={data?.url}>
        <LiveCard>
            Start Chat with {data?.url}
        </LiveCard>
    </a>
</div>