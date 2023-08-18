<script>
    import { InfoModal } from '$lib/components';

    let modalOpen = false;
    $: modalOpen;

    const handleSubmit = () => {
        modalOpen = true;
    };
    
</script>

<div class="flex flex-col justify-center items-center h-full w-full text-true-white bg-gradient-to-b to-black from-transparent px-6 mt-20">

    <h2 class="mt-2 text-center text-xl sm:text-2xl pb-4 lg:text-3xl font-bold tracking-light text-true-white lg:pb-8">
        Join waitlist
    </h2>

    <form action="?/join" method="POST" class="flex flex-col items-center space-y-2 w-full pt-4" on:submit={handleSubmit}>
        <div class="form-control w-full max-w-md py-2">
            <label for="name" class="label font-medium py-2 hidden">
                <span class="label-text text-transparent">
                    Name
                </span>
            </label>
            <input type="text" name="name" class="apple-input rounded-full bg-black bg-opacity-40 w-full max-w-md font-semibold force-opaque p-3 text-lg focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none" placeholder="Name" />
        </div>
        <div class="form-control w-full max-w-md py-2">
            <label for="email" class="label font-medium py-2 hidden">
                <span class="label-text">
                    Email
                </span>
            </label>
            <input type="email" name="email" class="apple-input rounded-full bg-black bg-opacity-40 w-full max-w-md font-semibold force-opaque p-3 text-lg focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none"  placeholder="Email"/>
        </div>
        <div class="form-control w-full max-w-md py-2">
            <label for="info" class="label font-medium py-2 hidden">
                <span class="label-text">
                    Email
                </span>
            </label>

            <input type="text" name="info" class="apple-input rounded-full bg-black bg-opacity-40 w-full max-w-md font-semibold force-opaque p-3 text-lg focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none"  placeholder="What will you use Astralta for?"/>
        </div>

        <div class="flex-none h-8">

        </div>

        <div class="w-full max-w-md pt-2">
            <button class="btn bg-true-black w-full bg-opacity-10 backdrop-blur-md text-xl hover:bg-opacity-20 hover:bg-gray-500 rounded-full text-true-white font-semibold btn-md border-none normal-case drop-shadow-2xl   duration-500 ease-in-out" type="submit">
                <div class="px-1.5 font-regular">
                    Join now
                </div>
            </button>
        </div>
    </form>

    {#if modalOpen}
        <InfoModal>
            <span slot="image">
                <img src="ty.png" alt="nice" class="rounded-xl my-6">
            </span>
        </InfoModal>
    {/if}
</div>