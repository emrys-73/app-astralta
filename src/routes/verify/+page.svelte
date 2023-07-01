<div class="flex flex-col items-center h-full w-full text-true-white bg-black bg-opacity-30">
    <h1 class="text-4xl text-true-white pt-10 font-bold uppercase">
        Astralta
    </h1>

    <div class="flex-none h-44">

    </div>
    <h2 class="mt-2 text-center text-3xl font-bold tracking-light text-true-white pb-12">
        Verify your account
    </h2>

    <!-- This text is pretty much useless. Change it -->
    <p class="text-true-white text-center">
        We are making Astralta available for early-adopters.
    </p>
    <!-- <p class="text-center mt-1 opacity-50">
        Or <a href="/login" class="text-primary font-medium hover:cursor-pointer hover:underline ">Sign In</a>
        if you already have an account

    </p> -->

    <form action="?/register" method="POST" class="flex flex-col items-center space-y-2 w-full pt-4">
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
            <label for="password" class="label font-medium py-2 hidden">
                <span class="label-text text-transparent">
                    Password
                </span>
            </label>
            <input type="password" name="password" class="apple-input rounded-full bg-black bg-opacity-40 w-full max-w-md font-semibold force-opaque p-3 text-lg focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none" placeholder="Password" />
        </div>
        <div class="form-control w-full max-w-md py-2">
            <label for="passwordConfirm" class="label font-medium py-2 hidden">
                <span class="label-text text-transparent">
                    Confirm Password
                </span>
            </label>
                <input type="password" name="passwordConfirm" class="apple-input rounded-full bg-black bg-opacity-40 w-full max-w-md font-semibold force-opaque p-3 text-lg focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none"  placeholder="Confirm Password"/>
            
        </div>


        <a href="/login">
            <div class="text-system-cyan hover:bg-true-white hover:bg-opacity-5 hover:cursor-pointer rounded-xl p-2 hover:backdrop-blur-md">
                Already have an account?
            </div>
        </a>


        <div class="flex-none h-8">

        </div>


        <div class="w-full max-w-md pt-2">
            <!-- <button type="submit" class="btn btn-primary w-full">Register</button> -->
            <button class="btn bg-true-black w-full bg-opacity-10 backdrop-blur-md text-xl hover:bg-opacity-20 hover:bg-gray-500 rounded-full text-true-white font-semibold btn-md border-none normal-case drop-shadow-2xl " type="submit">
                <div class="px-1.5 font-regular">
                    Register
                </div>
            </button>
        </div>
    </form>
</div>