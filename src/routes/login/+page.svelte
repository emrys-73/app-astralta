<script>
    export let form
</script>

<div class="flex flex-col items-center h-full w-full text-true-white px-6 justify-center my-12">

     <h2 class="mt-2 text-center text-xl sm:text-2xl pb-4 lg:text-3xl font-bold tracking-light text-true-white lg:pb-8">
        Log in
    </h2>


    <form action="?/login" method="POST" class="flex flex-col items-center space-y-2 w-full pt-4">
        <div class="form-control w-full max-w-md py-2">
            <label for="email" class="label font-medium py-2 hidden">
                <span class="label-text">
                    Email
                </span>
            </label>
            <!-- <input type="text" name="message" class=" max-h-[35px] s-apple-input rounded-full bg-black bg-opacity-40 w-full font-regular force-opaque-sm text-sm focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none" placeholder="Send a message" /> -->
            <input type="email" name="email" class="apple-input rounded-full bg-black bg-opacity-40 w-full max-w-md font-semibold force-opaque p-3 text-lg focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none"  placeholder="Email"/>
        </div>
        <div class="form-control w-full max-w-md py-2">
            <label for="password" class="label font-medium py-2 hidden">
                <span class="label-text text-transparent">
                    Password
                </span>
            </label>
            <input type="password" name="password" class="apple-input rounded-full bg-black bg-opacity-40 w-full max-w-md font-semibold force-opaque p-3 text-lg focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none" placeholder="Password" />
        </div>

        <!-- <div class="w-full max-w-md">
            <a href="/reset-password" class="font-medium text-primary hover:cursor-pointer hover:underline">Forgot Password?</a>
        </div> -->
        <a href="/reset-password">
            <div class="text-system-cyan hover:bg-true-white hover:bg-opacity-5 hover:cursor-pointer rounded-full p-2 hover:backdrop-blur-sm px-4 transition-all duration-500 ease-in-out">
                Forgot password?
            </div>
        </a>

        <div class="w-full max-w-md">
            <!-- <button type="submit" class="btn btn-primary w-full">Register</button> -->
            <button class="btn bg-true-black w-full bg-opacity-10 backdrop-blur-md text-xl hover:bg-opacity-20 hover:bg-gray-500 rounded-full text-true-white font-semibold btn-md border-none normal-case duration-500 ease-in-out" type="submit">
                <div class="font-regular">
                    Log In
                </div>
            </button>
        </div>
        <a href="/register">
            <div class="text-system-cyan hover:bg-true-white hover:bg-opacity-5 hover:cursor-pointer rounded-full p-2 hover:backdrop-blur-sm px-4 transition-all duration-500 ease-in-out">
                I don't have an account yet
            </div>
        </a>

        {#if form?.notVerified}
            <div class="alert alert-error shadow-lg w-full max-w-md">
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>You are on the waitlist. We will notify you when you get full access.</span>
          </div>
        {/if}
    </form>
</div>