<!-- Todo: Fix drag n drop functionality -->

<script>
    // @ts-nocheck
    import { GlassCard } from "$lib/components";

    import { onMount } from 'svelte';
    let selectedFile = null;

    function dragOver(e) {
        e.preventDefault();
    }

    function dropHandler(e) {
        e.preventDefault();
        if (e.dataTransfer.items) {
        if (e.dataTransfer.items[0].kind === 'file') {
            selectedFile = e.dataTransfer.items[0].getAsFile();
        }
        } else {
        selectedFile = e.dataTransfer.files[0];
        }
    }

    function handleChange(e) {
        selectedFile = e.target.files[0];
    }
</script>

<div class="items-center justify-center">
    <GlassCard 
        on:dragover="{dragOver}"
        on:drop="{dropHandler}"
        >

        {#if selectedFile}
            <p>File: {selectedFile.name}</p>
        {:else}
            <!-- <p>Drop a PDF file here or click to select</p> -->
            <p>Train with PDF</p>
            <input type="file" accept="application/pdf" on:change="{handleChange}" class="hidden" id="fileInput">
            <label for="fileInput" class="cursor-pointer text-system-cyan pt-2">Select a file</label>
        {/if}
    </GlassCard>
</div>

