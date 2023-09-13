
<script>
    import { LiveCard } from "$lib/components";

    export let data;

    let avatarUrl = `https://ui-avatars.com/api/?name=${data?.user?.name}`;

</script>


<div class="w-full h-full flex flex-col justify-center items-center">
    <!-- Banner image -->
    <div class="w-full h-[200px] bg-[url('/banner/base.jpg')] bg-image top-0 fixed z-40">

    </div>

    <!-- user tag and image -->
    <div class="fixed top-40 md:left-12 left-4 flex flex-row justify-center items-center z-40">
        <!-- Avatar -->
        <div class="">
            <button class="btn border-none bg-transparent hover:bg-transparent mx-1 active:border-none avatar w-18 p-2">
                <div class="rounded-full">
                    <img src={avatarUrl} alt="avatar" id="avatar-preview">
                </div>
            </button>
        </div>
        <!-- Username -->
        <div class="text-white font-semibold text-3xl tracking-widest">
            <span>
                @{data.user.username}
            </span>
        </div>

    </div>

    <div class=" mt-60 flex flex-col justify-start py-8 h-full w-full items-center">
        <!-- Bio -->
    <div class="w-full px-6 pb-16 md:px-20">
        {#if data.user.bio}
            <div class="rounded-2xl text-white p-4 bg-white backdrop-blur-md bg-opacity-10 w-full max-h-24 overflow-y-auto">
                {data.user.bio}
            </div>
        {/if}
        <!-- Favourite AI (3) -->
    
    
        <!-- Resliche AI -->
        <div class="h-full justify-center items-center flex overflow-x-auto flex-col text-white">
            {#each data.agents as ai}
                {#if ai.public}    
                    <a href={`/${data.user.username}/public/${ai.id}`} class="bg-white rounded-2xl bg-opacity-5 hover:bg-opacity-10 hover:text-lg transition-all ease-in-out duration-300 backdrop-blur-md px-6 w-full py-2 my-1">
                        <span class="">
                            {ai.name}
                        </span>
                    </a>
                {/if}
            {/each}
        </div>
    </div>

    </div>


    

</div>