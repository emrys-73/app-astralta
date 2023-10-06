<div class="flex flex-col items-center h-full w-full text-true-white px-6 justify-center my-12">
    <h2 class="mt-2 text-center text-xl sm:text-2xl pb-4 lg:text-3xl font-bold tracking-light text-true-white lg:pb-8">
        Apply for the waitlist
    </h2>
    <span>
        We are giving early-access to new users every week.
    </span>
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

        <!-- <div class="form-control w-full max-w-md py-2">
            <label for="code" class="label font-medium py-2 hidden">
                <span class="label-text text-transparent">
                    Referral Code
                </span>
            </label>
                <input type="text" name="code" class="apple-input rounded-full bg-black bg-opacity-40 w-full max-w-md font-semibold force-opaque p-3 text-lg focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none"  placeholder="Referral Code"/>
            
        </div> -->


        <div class="form-control w-full max-w-md py-2">
            <label for="code" class="label font-medium py-2 hidden">
                <span class="label-text text-transparent">
                    Tell us about you
                </span>
            </label>
                <input type="text" name="goal" class="apple-input rounded-full bg-black bg-opacity-40 w-full max-w-md font-semibold force-opaque p-3 text-lg focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none"  placeholder="Tell us more about you"/>
            
        </div>

        <a href="/login">
            <div class="text-[#0a8dff] hover:bg-true-white hover:bg-opacity-5 hover:cursor-pointer rounded-full p-2 hover:backdrop-blur-sm px-4 transition-all duration-500 ease-in-out">
                Already have an account?
            </div>
        </a>


        <div class="flex-none h-8">

        </div>


        <div class="w-full max-w-md pt-0 flex justify-center items-center">
            <!-- <button type="submit" class="btn btn-primary w-full">Register</button> -->
            <button type="submit" class=" bg-system-blue rounded-full px-4 py-1 hover:bg-[#0a8dff] hover:px-6 transition-all duration-300 ease-in-out">
                <div class="px-1.5 font-regular">
                    Apply now
                </div>
            </button>
        </div>
    </form>
</div>