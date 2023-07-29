<script>
    // @ts-nocheck
    
        export let label;
        export let checked;
    </script>
    
    <label for={label} class="justify-center">
        <slot name="trigger" />
    </label>
    
    <input type="checkbox" id={label} class="modal-toggle" {checked} />
    <label for={label} class="modal modal-bottom sm:modal-middle  items-center bg-black px-4">
        <label for="" class="modal-box bg-black bg-opacity-40 drop-shadow-xl backdrop-blur-md text-true-white">
            <div class="font-bold text-xl text-center text-true-white mt-1">
                <slot name="heading" />
            </div>
            <div class="my-4 items-center text-true-white">
                <slot />
            </div>
            <!-- <div class="justify-center text-true-white">
                <slot name="actions" />
            </div> -->
        </label>
    </label>