<!-- All of this is outdated code that only serves for reference -->

<script lang="ts">
    import { drawerStore } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import type { DrawerSettings } from '@skeletonlabs/skeleton';

    const drawerSettings: DrawerSettings = {
		id: 'base',
		bgDrawer: 'bg-black bg-opacity-40 backdrop-blur-sm text-true-white',
		// bgBackdrop: 'bg-gradient-to-tr from-indigo-500/50 via-purple-500/50 to-pink-500/50',
		width: 'w-[250px] md:w-[250px]',
		padding: 'p-2',
		rounded: 'rounded-2xl',
	};

    const drawerOpen = () => {
        drawerStore.open(drawerSettings)
    } 
    const drawerClose = () => {
        drawerStore.close();
    }

    const toggleDrawer = () => {
        
    }

    $: drawerState = $drawerStore

    
    const navigation = [
            {
                title: 'My AI',
                href: '/my/ai',
                symbol: 'MyAI.png'
            },
            {
                title: 'Settings',
                href: '/my/settings',
                symbol: 'Settings.png'
            },
            {
                title: 'Help',
                href: '/help',
                symbol: 'Help.png'
            },
            {
                title: 'Feedback',
                href: '/my/feedback',
                symbol: 'Feedback.png'
            },
        ]
    
    onMount(() => {
        function handleKeyDown(event: { metaKey: any; key: string; ctrlKey: any; }) {
            if (event.metaKey && event.key === 'x') {
                drawerOpen()
            }
            if (event.ctrlKey && event.key === 'x') {
                drawerOpen()
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    })

</script>

<div class="grid grid-cols-5 p-1 max-w-[250px]">
    <div class="col-span-3">
        <h3 class="text-true-white text-xl md:text-2xl font-bold md:pt-0.5">
            {drawerState}
        </h3>
    </div>
    <div class="">
        <button class="btn bg-gray-300 bg-opacity-10 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold md:ml-6 ml-12 btn-sm md:h-[2.5rem] md:w-20 border-none normal-case drop-shadow-2xl" on:click={drawerClose}>
            Less
        </button>
    </div>
    
    <!-- <div>
        open drawer: {openDrawer}
    </div> -->
    
</div>


