
<script>
    import { LiveCard } from "$lib/components";

    let models = [
        {
            "name": "John",
            "description": "A super cool model that helps you with copywriting and writing A super cool model that helps you with copywriting and writing A super cool model that helps you with copywriting and writing A super cool model that helps you with copywriting and writing A super cool model that helps you with copywriting and writing dope posts for twitter",
            "tags": ["twitter", "X", "professional"],
            "avatar": '/profile.png',
        },
        {
            "name": "John",
            "description": "A super cool model that helps you with copywriting and writing dope posts for twitter",
            "tags": ["twitter", "X", "professional"],
            "avatar": '/profile.png',
        },
        {
            "name": "John",
            "description": "A super cool model that helps you with copywriting and writing dope posts for twitter",
            "tags": ["twitter", "X", "professional"],
            "avatar": '/profile.png',
        },
        {
            "name": "John",
            "description": "A super cool model that helps you with copywriting and writing dope posts for twitter",
            "tags": ["twitter", "X", "professional"],
            "avatar": '/profile.png',
        },
        {
            "name": "John",
            "description": "A super cool model that helps you with copywriting and writing dope posts for twitter",
            "tags": ["twitter", "X", "professional"],
            "avatar": '/profile.png',
        },
        {
            "name": "John",
            "description": "A super cool model that helps you with copywriting and writing dope posts for twitter",
            "tags": ["twitter", "X", "professional"],
            "avatar": '/profile.png',
        },
        {
            "name": "John",
            "description": "A super cool model that helps you with copywriting and writing dope posts for twitter",
            "tags": ["twitter", "X", "professional"],
            "avatar": '/profile.png',
        },
        {
            "name": "John",
            "description": "A super cool model that helps you with copywriting and writing dope posts for twitter",
            "tags": ["twitter", "X", "professional"],
            "avatar": '/profile.png',
        },
    ]

</script>


<div class="w-full h-full flex flex-col justify-center">
    <div class="w-full h-[500px] bg-[url('/categories/business.png')] bg-image justify-center flex items-center flex-col">
        <div class="text-center justify-center flex text-white font-thin">
            Made for
        </div>
        <div class="font-regular text-center text-white text-4xl lg:text-6xl">
            Social Media
        </div>
    </div>
    <div class=" w-full my-12">
        <div class="flex justify-center items-center mx-4 md:mx-10 flex-wrap">
            {#each models as model}
            <div class="max-w-md">
                <div class="bg-true-white bg-opacity-5 rounded-2xl m-2 p-3 hover:bg-opacity-10 transition-all ease-in-out duration-300 hover:cursor-pointer">



                    <div class=" grid grid-cols-5 px-2 ">
                        <div class="col-span-1 flex justify-center items-center">
                            <img src={model.avatar} alt="Avatar" class="w-10 h-10">
                        </div>
                        <div class="col-span-4 justify-center items-center text-white">
                            <div class=" font-normal">
                                {model.name}
                            </div>
                            <div class="font-thin text-sm max-h-16 overflow-auto">
                                {model.description}
                            </div>
                            <div class="my-1">
                                {#each model.tags as tag}
                                    <span class="bg-white bg-opacity-10 rounded-full px-4 mx-1 text-center">
                                        {tag}
                                    </span>
                                {/each}
                            </div>

                        </div>
                    </div>
                </div>
                
            </div>
            {/each}
        </div>
    </div>

</div>