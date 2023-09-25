<script>
    export let data;

</script>


<div class="w-full h-full my-6 flex flex-col mx-6 md:mx-20 ">
    <div class="text-white font-semibold text-3xl">
        <span>
            Browse
        </span>
    </div>

    <div class="w-full flex flex-wrap gap-4 my-8">
        {#each data?.cats as cat}
        <a href={`/browse/${cat.id}`} class="relative transition-all ease-in-out duration-300">
            <img src={cat.image_url} alt="bg" class="w-[400px] h-[200px] rounded-3xl md:hover:w-[420px] hover:h-[210px] transition-all duration-300 ease-in-out">

            <span class="text-white absolute bottom-4 left-4 font-semibold text-2xl">
                {cat.name}
                {cat.image_url}
            </span>
        </a>




        {/each}
        
    </div>
</div>