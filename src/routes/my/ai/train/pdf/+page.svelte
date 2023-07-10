<script>
// @ts-nocheck

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
  
  <svelte:head>
    <link href="/public/tailwind.css" rel="stylesheet">
    <script src="/public/pdf.js"></script>
  </svelte:head>
  
  <div class="h-screen w-screen flex items-center justify-center bg-gray-100">
    <div class="p-4 bg-white shadow-md rounded"
         on:dragover="{dragOver}"
         on:drop="{dropHandler}">
  
      {#if selectedFile}
        <p>File: {selectedFile.name}</p>
      {:else}
        <p>Drop a PDF file here or click to select</p>
        <input type="file" accept="application/pdf" on:change="{handleChange}" class="hidden" id="fileInput">
        <label for="fileInput" class="cursor-pointer text-blue-600">Select a file</label>
      {/if}
    </div>
  </div>
  