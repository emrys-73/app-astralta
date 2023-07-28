<script>
    import { drawerOpen, experience } from '../../stores.js';
    
  
    let xp = "";
    $: xp;
  
    experience.subscribe((value) => { xp = value; })
  
    let drawerState = false;
    // The dollar sign label tells Svelte that the following statement should be re-run whenever one of the state variables it references is updated
    $: drawerState;
  
  
    drawerOpen.subscribe((value) => {
      drawerState = value;
    })
  
  </script>
  
  
  
  <!-- Couldnt add custom name yet -->
  <slot/> 

