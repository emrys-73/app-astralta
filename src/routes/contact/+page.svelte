<script>
    import { LiveCard } from "$lib/components";
    import { onMount, onDestroy } from "svelte";
    import { header } from "../../stores";


    onMount(() => {
        header.set("Astralta")
    })
    
    onDestroy(() => {
        header.set("Astralta")
    })

</script>

<div class="h-full text-center text-true-white content-center flex justify-center items-center mx-6">
    <div class="">
        <a href="mailto:montoya@astralta.com">
            <LiveCard>
                <p class="text-left text-true-white text-md font-mono tracking-wider">
                    Hi, 
                    <br>
                    <br>
                    
                    Whilst Astralta develops AI Software, we firmly believe in the value of human interactions. 
                    
                    <br>
                    Feel free to get in touch personally anytime by sending me an Email. 
                    
                    <br>
                    <br>
                    Thank you for creating with us,
                    <br>
                    Adrian Montoya - founder of Astralta.
                    <br>
                    <!-- thank you for using Astralta 🤍. -->
            
            
                </p>
    
                <div class="items-center justify-center pt-8 pb-2">
    
                    <a href="mailto:montoya@astralta.com">
            
                        <button class="btn bg-true-white bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">Get in touch</button>
                    </a>
                </div>
            </LiveCard>
        </a>    
        
    </div>
    
    
    
  </div>
  