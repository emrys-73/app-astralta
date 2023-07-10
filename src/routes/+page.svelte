
<!-- <script>
    let talking = true;
    let training = false;

    $: talking = !training;
    $: training

    const toggle_ai = () => {
        training = talking;
    }

</script>


<div class="flex flex-col items-center h-full w-full text-true-white">
    <input class="check" type="checkbox" id="checkbox_toggle">
    
    <div class="checkbox border-none font-medium max-w-[190px]" on:click={toggle_ai}>
      <label for="checkbox_toggle" class="slide bg-black bg-opacity-40 backdrop-blur-sm text-true-white">
        <label for="checkbox_toggle" class="toggle_box bg-true-white bg-opacity-10"></label>
        <label for="checkbox_toggle" class="text -ml-1 {!talking ? 'opacity-40 transition-opacity' : 'transition-opacity'}">Talk</label>
        <label for="checkbox_toggle" class="text -ml-3 {!training ? 'opacity-40 transition-opacity' : 'transition-opacity'}">Train</label>
      </label>
    </div>
</div> -->




<!-- <div class="w-full h-full text-true-white text-center content-center justify-center">
  <h1 class="text-2xl">
    Join waitlist
  </h1>

  <div class="items-center">
    <a href="/waitlist">
      <div class="pl-2 z-50">
        <div class="hover:-translate-y-0.5 transition ease-in-out md:mt-0.5">
          <button class="btn bg-true-white bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm ml-4 mt-4 md:ml-2 md:text-md md:mt-4 md:h-[2rem] border-none normal-case drop-shadow-2xl">
            Join Waitlist
          </button>
        </div>
      </div>
    </a>
  </div>
</div> -->


<script>
  import { InfoModal } from '$lib/components';
  import { afterUpdate } from 'svelte';
  import { page } from '$app/stores';

  let modalOpen = false;

  $: modalOpen;

  const hadnleSubmit = () => {
      modalOpen = true;
  };
</script>


<!-- This was just copy paste the waitlist site but has to be integrated into 
the logic, I was just too sleepy to do it -->

<div class="flex flex-col items-center h-full w-full text-true-white bg-black bg-opacity-30">
  <a href="/">
      <h1 class="text-4xl text-true-white pt-10 font-bold uppercase">
          Astralta
      </h1>
  </a>
  <div class="flex-none h-44">

  </div>
  <h2 class="mt-2 text-center text-3xl font-bold tracking-light text-true-white pb-2">
      Join waitlist
  </h2>
  <!-- This text is pretty much useless. Change it -->
  <p class="text-true-white text-center opacity-50">
      We are making Astralta available for early-adopters.
  </p>
  <!-- <p class="text-center mt-1 opacity-50">
      Or <a href="/login" class="text-primary font-medium hover:cursor-pointer hover:underline ">Sign In</a>
      if you already have an account

  </p> -->


  <form action="?/join" method="POST" class="flex flex-col items-center space-y-2 w-full pt-4" on:submit={hadnleSubmit}>
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
          <h2 class="text-true-white text-2xl text-center">
              Tell us more about you
          </h2>
          <p class="text-true-white opacity-60 text-center py-4">
              What do you plan using Astralta for?
          </p>
          <input type="text" name="info" class="apple-input rounded-full bg-black bg-opacity-40 w-full max-w-md font-semibold force-opaque p-3 text-lg focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none"  placeholder="This is all you"/>
      </div>
      <!-- <div class="form-control w-full max-w-md py-2">
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
          
      </div> -->


      <a href="https://astralta.com">
          <div class="text-system-cyan hover:bg-true-white hover:bg-opacity-5 hover:cursor-pointer rounded-xl p-2 hover:backdrop-blur-md">
              Back to astralta.com
          </div>
      </a>


      <div class="flex-none h-8">

      </div>


      <div class="w-full max-w-md pt-2">
          <!-- <button type="submit" class="btn btn-primary w-full">Register</button> -->
          <button class="btn bg-true-black w-full bg-opacity-10 backdrop-blur-md text-xl hover:bg-opacity-20 hover:bg-gray-500 rounded-full text-true-white font-semibold btn-md border-none normal-case drop-shadow-2xl " type="submit">
              <div class="px-1.5 font-regular">
                  Join now
              </div>
          </button>
      </div>
  </form>

  {#if true}
      <InfoModal>
          <span slot="header">
              Join Waitlist
          </span>
          <!-- <span slot="image" class="">
              <img src="ty.png" alt="nice" class="rounded-xl my-6 max-h-[210px] items-center ml-24">
          </span> -->
          <!-- <span slot="sub">
            Apply for early access here
          </span> -->
          <span slot="backlink">
              <div class="">
                  <a href="/waitlist" class="text-center">
                    <div class="text-system-cyan hover:bg-true-white hover:bg-opacity-5 hover:cursor-pointer rounded-xl p-2 hover:backdrop-blur-md">
                      Apply for early access
                    </div>
                  </a>
                </div>

          </span>
      </InfoModal>
  {/if}
</div>