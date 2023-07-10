<script>
    let message = ""
</script>

<div class="w-full sm:max-w-[600px] lg:max-w-[800px] grid grid-cols-12 absolute bottom-2 xl:bottom-4 content-center items-center justify-center">
    <div class="col-span-2">
      <a href="https://astralta.com">
        <div class="hover:-translate-y-0.5 transition ease-in-out h-[40px] lg:ml-10">
          <button class="btn bg-true-black bg-opacity-50 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:w-16 border-none normal-case drop-shadow-2xl h-[40px] ml-4 apple-btn w-[50px]">
            <!-- Learn more -->
            <img src="/logo_white.png" alt="cta" class="h-[30px] w-[30px]"/>
          </button>
        </div>
      </a>
    </div>
    <div class="col-span-8">
      <input type="text" name="message" class=" h-[40px] s-apple-input rounded-full bg-black bg-opacity-40 w-full font-regular force-opaque-sm text-sm focus:bg-black focus:bg-opacity-40 focus:apple-input focus:force-opaque focus:border-none" placeholder="Send a message" bind:value={message}/>
    </div>
    <div class="col-span-2">
      <div class="hover:-translate-y-0.5 transition ease-in-out">
        <button class="btn bg-true-black  text-xl bg-opacity-50 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:w-16 border-none normal-case drop-shadow-2xl h-[40px] ml-4 apple-btn w-[50px]" type="submit">
          <!-- Learn more -->
          ➤
        </button>
      </div>
    </div>
  </div>