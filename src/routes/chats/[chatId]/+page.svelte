<script>
// @ts-nocheck

    import { LiveCard } from '$lib/components';
    export let data
</script>


<div class="w-full h-full justify-center flex items-center">
    <LiveCard>
        <h1 class="text-true-white text-lg text-center">
            {data?.chat?.title}
        </h1>
    </LiveCard>
</div>
