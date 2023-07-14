<script>
    export let form
</script>

<div class="flex flex-col items-center h-full w-full text-true-white bg-gradient-to-b to-black from-transparent px-6">
    <!-- <a href="/">
        <h1 class="text-3xl text-true-white pt-8 font-bold uppercase">
            Astralta
        </h1>
    </a>
     -->

    <div class="flex-none h-16 lg:h-32">

    </div>
    <h2 class="mt-2 text-center text-3xl font-bold tracking-light text-true-white pb-2">
        Reset your password
    </h2>
    <p class="text-center mt-1 opacity-60 pb-6">
        We'll send you an Email with a link to reset your password
    </p>
    <form action="?/resetPassword" method="POST" class="flex flex-col items-center space-y-2 w-full pt-4">
        <div class="form-control w-full max-w-md py-3 pb-8">
            <label for="email" class="label font-medium py-2 hidden">
                <span class="label-text">
                    Email
                </span>
            </label>
            <input type="email" name="email" class="apple-input rounded-full bg-black bg-opacity-40 w-full max-w-md font-semibold force-opaque p-3 text-lg focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none"  placeholder="Email"/>
        </div>
        
        <div class="w-full max-w-md pt-2">
            <!-- <button type="submit" class="btn btn-primary w-full">Register</button> -->
            <button class="btn bg-true-black w-full bg-opacity-10 backdrop-blur-md text-xl hover:bg-opacity-20 hover:bg-gray-500 rounded-full text-true-white font-semibold btn-md border-none normal-case drop-shadow-2xl  duration-500 ease-in-out" type="submit">
                <div class="px-1.5 font-regular">
                    Request password reset
                </div>
            </button>
        </div>
        <a href="/login">
            <div class="text-system-cyan hover:bg-true-white hover:bg-opacity-5 hover:cursor-pointer rounded-xl pt-4 pb-4 hover:backdrop-blur-md px-4 duration-500 ease-in-out">
                Nvm, I remembered my password
            </div>
        </a>
        {#if form?.success}
            <div class="alert bg-system-green w-full max-w-md rounded-full text-white bg-opacity-70 border-none drop-shadow-lg">
                <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6 " fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>An Email has been sent to reset your password</span>
            </div>
        {/if}
    </form>
</div>