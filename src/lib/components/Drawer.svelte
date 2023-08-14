<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { drawerOpen, darkMode, current_chat } from '../../stores';


    let drawerState = false;
    $: drawerState;


    drawerOpen.subscribe((value) => {
        drawerState = value;
    })


    const toggleDrawer = () => {
        drawerOpen.update((state) => !state)
    }

    const toggleDarkMode = () => {
        darkMode.update((value) => !value)
    }

    const navigation = [
            {
                title: 'Home',
                href: '/',
                icon: {
                    "d" : "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
                }
            },
            // {
            //     title: 'My AI',
            //     href: '/my/ai',
            //     icon: {
            //         "d" : "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z",
            //     }
            // },
            // {
            //     title: 'Chat',
            //     href: `/chats/${$current_chat.id}`,
            //     icon: {
            //         "d" : "M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z",
            //     }
            // },
            {
                title: 'Create',
                href: '/create',
                icon: {
                    "d" : "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z",
                }
            },
            {
                title: 'Settings',
                href: '/gen-settings',
                icon: {
                    "d" : "M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495",
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
                title: 'Get in touch',
                href: '/contact',
                icon: {
                    "d" : "M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z",
                }
            },
        ]

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

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    })

</script>


<div class="flex flex-col w-64 h-full {$darkMode ? 'bg-black bg-opacity-40' : 'bg-white bg-opacity-5'} backdrop-blur-md relative z-40 ease-in-out duration-1000">
    <!-- Header grid -->
    <div class="text-xl text-true-white grid grid-cols-6">
        <!-- Title -->
        <div class="col-span-5">
            <h3 class="font-bold p-4 md:text-2xl mt-0.5 md:mt-2">
                <slot name="title"/>
            </h3>
        </div>
        <div class="col-span-1">

            <button class="btn bg-gray-300 bg-opacity-10 mt-6 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md border-none normal-case shadow-xl" on:click={toggleDrawer}>
                {#if drawerState}
                x
                {/if}
            </button>
        </div>
    </div>
    <!-- Navigation list -->
    <div>
        <ul>
            {#each navigation as navItem}
                <li class="hover:bg-true-white hover:bg-opacity-30 rounded-xl text-true-white p-2 m-2 duration-700 ease-in-out {$page.url.pathname === navItem.href ? 'bg-true-white bg-opacity-10' : '' }">
                    <a href={navItem.href} class="font-regular content-center hover:text-true-whit ">
                        <div class="flex flex-row max-h-[35px]">
                            <div class="py-2 px-1 pl-2">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d={navItem.icon?.d} />
                                </svg>
                            </div>
                            <div class="py-2 px-2">
                                {navItem.title}
                            </div>
                        </div>
                    </a>
                </li>                    
            {/each}
            <li class="hover:bg-true-white hover:bg-opacity-30 hover:cursor-pointer rounded-xl text-true-white p-2 m-2 duration-700 ease-out">
                <form action="/logout" method="POST" class="text-true-white hover:text-true-white">
                    <div class="flex flex-row max-h-[35px]">
                        <div class="py-2 px-1 pl-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                              </svg>                              
                        </div>
                        <button type="submit" class="py-2 px-2">
                            Log Out
                        </button>
                    </div>
                  </form>
            </li>
        </ul>
    </div>
    <div class="absolute bottom-2 lg:bottom-4 ml-[78px]">
        <div>
            <button class="btn {$darkMode ? 'bg-black bg-opacity-20' : 'bg-true-white bg-opacity-10'} hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold my-2 btn-sm md:text-md border-none normal-case shadow-xl" on:click={toggleDarkMode}>
                {#if $darkMode}
                  Dark Mode
                {:else}
                  Light Mode
                {/if}
            </button>
        </div>
    </div>
</div>
