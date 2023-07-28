<script lang='ts'>
	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	// The ordering of these imports is critical to your app working properly
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { LeftDrawer, Home, GlassCard, InfoModal } from '$lib/components';
	import { getImageURL } from "$lib/utils";
    import { drawerOpen, darkMode } from '../stores';
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    inject({ mode: dev ? 'development' : 'production' });
	export let data; // to accept that data property

    const toggleDrawer = () => {
        drawerOpen.update((state) => !state)
    }

    let avatarUrl = `https://ui-avatars.com/api/?name=${data.user?.name}`;

    onMount(() => {

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

<AppShell class="bg-[url('/dark_home.png')] bg-image">
	
	<svelte:fragment slot="sidebarLeft">
        {#if $drawerOpen}
		    <LeftDrawer>
                <span slot="title">
                    {#if data?.user?.ainame}
                        Astralta
                    {:else}
                        Launchpad
                    {/if}
                </span>
            </LeftDrawer>
        {/if}
	</svelte:fragment>
	
	<svelte:fragment slot="pageHeader">

    <AppBar gridColumns="grid-cols-3" slotDefault="place-self-center" slotTrail="place-content-end" class=" backdrop-blur-sm {$drawerOpen ? 'relative' : 'fixed'}  top-0 w-full z-50 ">

        <svelte:fragment slot="lead">
            {#if !$drawerOpen}
            <button class="btn bg-gray-300 bg-opacity-10 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md border-none normal-case shadow-xl" on:click={toggleDrawer}>
                +
            </button>
            {/if}
        </svelte:fragment>

        <div class="text-center text-2xl xl:text-3xl text-true-white font-bold uppercase {$drawerOpen ? 'hidden sm:block' : '' } ">
            <a href="/">
                <span>
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
    <!-- <Home>
        <span>
            {#if data?.user}
            <div class="h-full text-center text-true-white content-center flex justify-center items-center">
                <a href="/my/ai"> 
                    <GlassCard>
                        Hi {data?.user?.username}!
                    </GlassCard>
                </a>
              </div>
            {:else}
            <InfoModal>
                <span slot="backlink">
                  <div class="mt-4 mb-2">
                    <a href="/login" class="text-center">
                      <div class="text-system-cyan hover:bg-true-white hover:bg-opacity-5 hover:cursor-pointer rounded-xl p-2 hover:backdrop-blur-md">
                        Log In
                      </div>
                    </a>
                  </div>
                    <div class="mb-4">
                        <a href="/waitlist" class="text-center">
                          <div class="text-system-cyan hover:bg-true-white hover:bg-opacity-5 hover:cursor-pointer rounded-xl p-2 hover:backdrop-blur-md">
                            Join Waitlist
                          </div>
                        </a>
                      </div>
                </span>
            </InfoModal>
            
            {/if}
        </span>
    </Home> -->
</AppShell>
