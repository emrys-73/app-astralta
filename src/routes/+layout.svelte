<script lang='ts'>
// @ts-nocheck
	import { AppShell } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
    import { bg, showActionBar, elevateActionBar } from '../stores';
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    inject({ mode: dev ? 'development' : 'production' });
    import { setInitialClassState } from '@skeletonlabs/skeleton';
    import { setModeCurrent } from '@skeletonlabs/skeleton';
    import { modeOsPrefers, modeUserPrefers, modeCurrent } from '@skeletonlabs/skeleton';
	export let data;

    let bgUrl;
    $: bgUrl = `bg-[url('/bg/${$bg}.png')]`

    let curPage;
    $: curPage = ""

    let username = data.user ? data.user.username : '/login'

    onMount(() => {
        showActionBar.set(true)
        elevateActionBar.set(false)
        setModeCurrent(false)
    })

    let AIData = [
        {
            title: 'Home',
            href: '/',
            icon: {
                    "d" : "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
                }
        },
        
        {
            title: 'Create',
            href: '/create',
            icon: {
                    "d" : "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z",
                }
        },
        // {
        //     title: 'Profile',
        //     href: `/${username}`,
        //     icon: {
        //             "d" : "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
        //         }
        // },
        {
            title: 'Settings',
            href: '/settings',
            icon: {
                    "d" : "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z",	                            "d" : "M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495",
                }	                        
        },
        {
            title: 'Browse',
            href: '/browse',
            icon: {
                    "d" : "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
                }
        },
    ]
</script>

<svelte:head>{@html `<script>(${setInitialClassState.toString()})();</script>`}</svelte:head>

<AppShell class="bg-true-white dark:bg-black bg-image">
	<svelte:fragment slot="sidebarLeft">
        <div class="md:h-full {$elevateActionBar ? 'bottom-32' : 'bottom-2'} md:w-12 w-full {$showActionBar ? '' : 'hidden'}  md:backdrop-blur-none fixed md:left-2 z-50 justify-center flex items-center bg-opacity-20">
            <div class="bg-black  md:opacity-50  hover:opacity-100 hover:bg-opacity-10 bg-opacity-10 transition-all ease-in-out duration-300 hover:cursor-pointer backdrop-blur-md rounded-full md:w-10 w-full mx-4 h-10 px-4 md:px-0 md:mx-0 text-white py-4  justify-center flex items-center flex-row md:flex-col gap-6 md:h-72">
                {#each AIData as item}
                    <a href={item.href}>
                        <button class="opacity-50 hover:opacity-100 transition-all ease-in-out duration-150 flex flex-row">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-6 h-6 hover:w-8 hover:h-8 transition-all ease-in-out duration-150 stroke-black dark:stroke-white">
                                <path stroke-linecap="round" stroke-linejoin="round" d={item.icon?.d} />
                            </svg>
                        </button>
                    </a>
                {/each}
                <button on:click={() => {setModeCurrent(!$modeCurrent)}} class="opacity-50 hover:opacity-100 transition-all ease-in-out duration-150 flex flex-row">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" class="w-6 h-6 hover:w-8 hover:h-8 transition-all ease-in-out duration-150 stroke-black dark:stroke-white">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
                    </svg>
                </button>
            </div>
        </div>
	</svelte:fragment>
    <slot/>
</AppShell>
