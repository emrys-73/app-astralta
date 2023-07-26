<script>
    export let form
</script>

<div class="flex flex-col items-center h-full w-full text-true-white bg-gradient-to-b to-black from-transparent px-6 mt-20">
    <!-- <a href="/">
        <h1 class="text-3xl text-true-white pt-8 font-bold uppercase">
            Astralta
        </h1>
    </a> -->

    <div class="flex-none h-10 xl:h-32">

    </div>


     <h2 class="mt-2 text-center text-xl sm:text-2xl pb-4 lg:text-3xl font-bold tracking-light text-true-white lg:pb-8">
        Log in to your account
    </h2>
    <!-- <p class="text-center mt-1">
        Or <a href="/register" class="text-primary font-medium hover:cursor-pointer hover:underline">register</a>
        if you don't have an account yet

    </p> -->
    <form action="?/login" method="POST" class="flex flex-col items-center space-y-2 w-full pt-4">
        <!-- <div class="form-control w-full max-w-md">
            <label for="email" class="label font-medium pb-1">
                <span class="label-text">
                    Email
                </span>
            </label>
            <input type="email" name="email" class="input input-bordered w-full max-w-md" />
        </div>
        <div class="form-control w-full max-w-md">
            <label for="password" class="label font-medium pb-1">
                <span class="label-text">
                    Password
                </span>
            </label>
            <input type="password" name="password" class="input input-bordered w-full max-w-md" />
        </div> -->
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
            <div class="text-system-cyan hover:bg-true-white hover:bg-opacity-5 hover:cursor-pointer rounded-xl p-2 hover:backdrop-blur-md  duration-500 ease-in-out">
                Forgot password?
            </div>
        </a>



        <div class="flex-none h-8">

        </div>


        <div class="w-full max-w-md pt-2">
            <!-- <button type="submit" class="btn btn-primary w-full">Register</button> -->
            <button class="btn bg-true-black w-full bg-opacity-10 backdrop-blur-md text-xl hover:bg-opacity-20 hover:bg-gray-500 rounded-full text-true-white font-semibold btn-md border-none normal-case drop-shadow-2xl   duration-500 ease-in-out" type="submit">
                <div class="px-1.5 font-regular">
                    Log In
                </div>
            </button>
        </div>
        <a href="/waitlist">
            <div class="text-system-cyan hover:bg-true-white hover:bg-opacity-5 hover:cursor-pointer rounded-xl p-2 hover:backdrop-blur-md pt-4  duration-500 ease-in-out">
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