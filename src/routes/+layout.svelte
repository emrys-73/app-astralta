<script lang='ts'>
// @ts-nocheck
	import { AppShell } from '@skeletonlabs/skeleton';
	import { onMount } from 'svelte';
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	import '../app.postcss';
    import { bg, darkMode, showActionBar, actionIslandData, elevateActionBar } from '../stores';
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    inject({ mode: dev ? 'development' : 'production' });
	export let data;

    let bgUrl;
    $: bgUrl = `bg-[url('/bg/${$bg}.png')]`

    let curPage;
    $: curPage = ""

    const getImageURL = (collectionId, recordId, fileName, size = '0x0') => {
		return `http://139.144.176.23:80/api/files/${collectionId}/${recordId}/${fileName}?thumb=${size}`;
	};

    let backgroundUrl = "/bg/home.png"

    let username = data.user ? data.user.username : '/login'

    onMount(() => {
        setActionIslandData();

        // function handleKeyDown(event: { metaKey: any; key: string; ctrlKey: any; }) {
        //     if (event.metaKey && event.key === 'x') {
        //         toggleDrawer()
        //     }
        //     if (event.ctrlKey && event.key === 'x') {
        //         toggleDrawer()
        //     }
        // }

        window.addEventListener('keydown', handleKeyDown);

        // if (data?.user?.avatar) {
        //     avatarUrl = getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar).toString()
        // }

        // if (data?.user?.background){
        //     backgroundUrl = getImageURL(data.user?.collectionId, data.user?.id, data.user?.background).toString()
        // }

        // back.set(`bg-[url('${backgroundUrl}'')]`)

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };

    })


    const setActionIslandData = () => {

        actionIslandData.set(
            [
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
                {
                    title: 'Profile',
                    href: `/${username}`,
                    icon: {
                            "d" : "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
                        }
                },
                {
                    title: 'Help',
                    href: '/help',
                    icon: {
                            "d" : "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z",
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
        )
    }

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
                {
                    title: 'Profile',
                    href: `/${username}`,
                    icon: {
                            "d" : "M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z",
                        }
                },
                {
                    title: 'Help',
                    href: '/help',
                    icon: {
                            "d" : "M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z",
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



    // let bgImagePath = '/bg/forest.png';

    // $: {
    // document.body.style.backgroundImage = `url(${bgImagePath})`;
    // }
    

    // let actionIslandItems;
    // $: actionIslandItems = []

    // actionBarData.subscribe

</script>



<!-- <AppShell class="bg-[url('{backgroundUrl}')] bg-image"> -->
<!-- <AppShell class="{$back} bg-image"> -->
<!-- <AppShell class="{$darkMode ? `bg-[url('/bg/ocean.png')]` : 'bg-[#c7c7c7]'} bg-image"> -->
<AppShell class="{$darkMode ? `bg-[#000]` : 'bg-[#c7c7c7]'} bg-image">
	
	<svelte:fragment slot="sidebarLeft">
        <!-- {#if $showActionBar} -->
        <div class="md:h-full {$elevateActionBar ? 'bottom-32' : 'bottom-2'} md:w-12 w-full {$showActionBar ? '' : 'hidden'}  md:backdrop-blur-none fixed md:left-2 z-50 justify-center flex items-center bg-opacity-20">
            <div class="bg-white  md:opacity-50  hover:opacity-100 hover:bg-opacity-10 bg-opacity-5 transition-all ease-in-out duration-300 hover:cursor-pointer backdrop-blur-md rounded-full md:w-10 w-full mx-4 h-10 px-4 md:px-0 md:mx-0 text-white py-4  justify-center flex items-center flex-row md:flex-col gap-6 md:h-64">
                {#each AIData as item}
                    <a href={item.href}>
                        <button class="opacity-50 hover:opacity-100 transition-all ease-in-out duration-150 flex flex-row">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 hover:w-8 hover:h-8 transition-all ease-in-out duration-150">
                                <path stroke-linecap="round" stroke-linejoin="round" d={item.icon?.d} />
                            </svg>
                        </button>
                    </a>
                {/each}
            </div>
        </div>
        <!-- {/if} -->
	</svelte:fragment>
	
    <!-- <div class="{!$page.url.pathname.toString().includes(`public`) ? '' : 'hidden'}">
        <div class="fixed top-0 w-full z-40 backdrop-blur-md justify-center flex items-center min-h-16 bg-white bg-opacity-5 hover:bg-opacity-10 transition-all ease-in-out duration-300"> -->

            <!-- <div class="text-center text-2xl xl:text-3xl text-true-white font-bold uppercase {$drawerOpen ? 'hidden sm:block' : '' } mx-20">
                <a href="/">
                    <span class="drop-shadow-md text-md">
                        {$header}
                    </span>
                </a>
            </div> -->

            <!-- {#if data?.user}
            <div class="fixed right-0">
                    <a href="/gen-settings">
                    <span class="btn bg-transparent border-none hover:bg-transparent active:border-none avatar w-20 z-50">
                        <div class=" rounded-full w-[35px] lg:w-[45px]">
                        <img src={avatarUrl} alt="avatar" id="avatar-preview">
                        </div>
                    </span>
                    
                </a>
            </div>
            {/if} -->
<!-- 
        </div>
    </div>        -->

    <slot/>
</AppShell>
