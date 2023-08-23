<script lang='ts'>
// @ts-nocheck
	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
	import { Drawer } from '$lib/components';
    import { drawerOpen, bg, darkMode, header } from '../stores';
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    inject({ mode: dev ? 'development' : 'production' });
    import { page } from '$app/stores';
	export let data;

    let bgUrl;
    $: bgUrl = `bg-[url('/bg/${$bg}.png')]`

    let curPage;
    $: curPage = ""

    const getImageURL = (collectionId, recordId, fileName, size = '0x0') => {
		return `http://139.144.176.23:80/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
	};

    const toggleDrawer = () => {
        drawerOpen.update((state) => !state)
    }

    let avatarUrl = `https://ui-avatars.com/api/?name=${data?.user?.name}`;

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

<style>
    :global(body) {
      @apply h-full;
      background-image: url('/bg/ocean_2.png');
      background-attachment: fixed;
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    }
  </style>

<!-- <AppShell class="bg-[url('/bg/ocean.png')] bg-image"> -->
<AppShell class="">
	
	<svelte:fragment slot="sidebarLeft">
        
		    <Drawer>
                <span slot="title">
                    <div class="flex flex-row">
                        <div>
                            <img src="/astralta_logo.png" alt="logo" class="w-8 h-8 ml-2"/>
                        </div>
                        <div class="ml-2">
                            Astralta
                        </div>
                    </div>
                </span>
            </Drawer>
        
	</svelte:fragment>
	
    <div class="{!$page.url.pathname.toString().includes(`public`) ? '' : 'hidden'}">
        <div class="fixed top-0 w-full z-40 backdrop-blur-md justify-center flex items-center min-h-16">
            <div class="left-4 fixed">
                {#if !$drawerOpen}
                <button class="btn {$darkMode ? 'bg-black bg-opacity-30' : 'bg-gray-300 bg-opacity-10'} hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md border-none normal-case shadow-xl" on:click={toggleDrawer}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                      </svg>                  
                </button>
                {/if}
            </div>


            <div class="text-center text-2xl xl:text-3xl text-true-white font-bold uppercase {$drawerOpen ? 'hidden sm:block' : '' } mx-20">
                <a href="/">
                    <span class="drop-shadow-md text-md">
                        {$header}
                    </span>
                </a>
            </div>

            {#if data?.user}
            <div class="fixed right-0">
                    <a href="/gen-settings">
                    <span class="btn bg-transparent border-none hover:bg-transparent active:border-none avatar w-20 z-50">
                        <div class=" rounded-full w-[35px] lg:w-[45px]">
                        <img src={avatarUrl} alt="avatar" id="avatar-preview">
                        </div>
                    </span>
                    
                </a>
            </div>
            {/if}


        </div>
    </div>       

    <slot/>
</AppShell>
