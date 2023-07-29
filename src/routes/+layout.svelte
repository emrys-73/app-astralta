<script lang='ts'>
// @ts-nocheck
	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import { Drawer } from '$lib/components';
    import { drawerOpen } from '../stores';
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    inject({ mode: dev ? 'development' : 'production' });
	export let data;

    let bg;
    $: bg = "home"

    let bgUrl;
    $: bgUrl = `bg-[url('/bg/${bg}.png')]`
    

    const getImageURL = (collectionId, recordId, fileName, size = '0x0') => {
		return `http://139.144.176.23:80/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
	};

    const toggleDrawer = () => {
        drawerOpen.update((state) => !state)
    }

    let avatarUrl = `https://ui-avatars.com/api/?name=${data.user?.name}`;

    onMount(() => {

        // if (data?.user?.bg) {
        //     bg = data?.user?.bg;
        // }

        function handleKeyDown(event: { metaKey: any; key: string; ctrlKey: any; }) {
            if (event.metaKey && event.key === 'x') {
                toggleDrawer()
            }
            if (event.ctrlKey && event.key === 'x') {
                toggleDrawer()
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        if (data?.user?.avatar) {
            avatarUrl = getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar).toString()
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    })
</script>

<AppShell class="bg-[url('/bg/home.png')] bg-image">
	
	<svelte:fragment slot="sidebarLeft">
        {#if $drawerOpen}
		    <Drawer>
                <span slot="title">
                    {#if data?.user?.ainame}
                        Astralta
                    {:else}
                        Launchpad
                    {/if}
                </span>
            </Drawer>
        {/if}
	</svelte:fragment>
	
	<svelte:fragment slot="pageHeader">

    <AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end" class=" backdrop-blur-sm {$drawerOpen ? 'relative' : 'fixed'}  top-0 w-full z-50 ">

        <svelte:fragment slot="lead">
            {#if !$drawerOpen}
            <button class="btn bg-gray-300 bg-opacity-10 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md border-none normal-case shadow-xl" on:click={toggleDrawer}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                  </svg>                  
            </button>
            {/if}
        </svelte:fragment>

        <div class="text-center text-2xl xl:text-3xl text-true-white font-bold uppercase {$drawerOpen ? 'hidden sm:block' : '' } ">
            <a href="/">
                <span class="drop-shadow-md">
                    {#if data?.user?.ainame}
                        {data?.user?.ainame}
                    {:else}
                        Astralta
                    {/if}
                    
                </span>
            </a>
        </div>
        <svelte:fragment slot="trail">
            {#if !data.user}
                <div class="flex-row hidden sm:flex">
                    <a href="/waitlist">
                        <div class="">
                            <div class="hover:-translate-y-0.5 transition ease-in-out md:mt-0.5">
                                <button class="btn bg-true-white bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] border-none normal-case drop-shadow-2xl">
                                    Join Waitlist
                                </button>
                            </div>
                        </div>
                    </a>
                    <a href="/login">
                        <div class="hover:-translate-y-0.5 transition ease-in-out md:mt-0.5">
                            <button class="btn bg-true-white bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md md:h-[2rem] md:w-16 border-none normal-case drop-shadow-2xl">
                                Log In
                            </button>
                        </div>
                    </a>
                </div>
            {:else}
                <div class="dropdown dropdown-end">
                    <span class="btn bg-transparent border-none hover:bg-transparent active:border-none avatar w-20 z-50">
                        <div class=" rounded-full w-[35px] lg:w-[45px]">
                        <img src={avatarUrl} alt="avatar" id="avatar-preview">
                        </div>
                    </span>
                    <ul class="menu menu-compact dropdown-content shadow rounded-xl bg-true-black bg-opacity-50 text-true-white drop-shadow backdrop-blur-md hover:text-true-white xl:mr-4 mt-2">
                        <li>
                            <form action="/logout" method="POST" class="text-true-white hover:text-true-white">
                                <button type="submit" class="w-full text-start hover:text-true-white">Logout</button>
                            </form>
                        </li>
                    </ul>
                </div>
            {/if}
        </svelte:fragment>
    </AppBar>

	</svelte:fragment>

    <slot/>
</AppShell>
