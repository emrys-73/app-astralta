<script>
    export let form
</script>

<div class="flex flex-col items-center h-full w-full text-true-white justify-center px-6">
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
            <div class="text-system-cyan hover:bg-true-white hover:bg-opacity-5 hover:cursor-pointer rounded-full p-2 hover:backdrop-blur-sm px-4 transition-all duration-500 ease-in-out">
                Nvm, I remembered my password
            </div>
        </a>
        {#if form?.success}
            <div class=" py-2 px-4 gap-2 bg-system-green max-w-md rounded-full text-white bg-opacity-70 justify-center items-center flex flex-row">
                <!-- <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current  h-4 w-4 bg-white" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> -->

                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                      </svg>
                </div>
                <div>
                    <span class="text-center justify-center items-center">An Email has been sent to reset your password</span>
                </div>
                  
            </div>
            <a href="/login">
                <div class="text-system-cyan hover:bg-true-white hover:bg-opacity-5 hover:cursor-pointer rounded-full p-2 hover:backdrop-blur-sm px-4 transition-all duration-500 ease-in-out">
                    Log In
                </div>
            </a>
        {/if}
    </form>
</div>