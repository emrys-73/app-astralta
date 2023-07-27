<!-- Adapt to get image for symbols from pocketbase -->
<!-- Might need to migrate it to the layout to get the data from data -->
<!-- Find a way to fix the code duplication between here and layout -->

<script lang="ts">
    import { onMount } from 'svelte';
    import { page } from '$app/stores';
    import { drawerOpen, darkMode } from '../../stores';

    let drawerState = false;
    // The dollar sign label tells Svelte that the following statement should be re-run whenever one of the state variables it references is updated
    $: drawerState;


    drawerOpen.subscribe((value) => {
        drawerState = value;
    })


    const toggleDrawer = () => {
        drawerOpen.update((state) => !state)
    }


    const navigation = [
            {
                title: 'Home',
                href: '/',
                symbol: '/home_icon.png'
            },
            {
                title: 'My AI',
                href: '/my/ai',
                symbol: '/MyAI.png'
            },
            {
                title: 'Settings',
                href: '/settings',
                symbol: '/Settings.png'
            },
            {
                title: 'Help',
                href: '/help',
                symbol: '/Help.png'
            },
            {
                title: 'Get in touch',
                href: '/contact',
                symbol: '/contact.png'
            },
        ]

    onMount(() => {
        // Ensures to set both states to false
        // resetDrawer()

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

<!-- {#if isOpen} -->
    <div class="flex flex-col w-64 h-full {$darkMode ? 'bg-black bg-opacity-40' : 'bg-white bg-opacity-5'} backdrop-blur-md">
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
            <!-- Closing button -->
            <!-- <div class="hover:-translate-y-0.5 transition ease-in-out md:mt-0.5">
                <button class="btn bg-gray-300 bg-opacity-10 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm md:text-md border-none normal-case shadow-xl" on:click={toggleDrawer}>
                    x
                </button>
            </div> -->
    
        </div>
        <!-- Navigation list -->
        <div>
            <ul>
                {#each navigation as navItem}
                    <!-- {#if navItem.title === 'My AI'} -->
                    <li class="hover:bg-true-white hover:bg-opacity-20 rounded-xl text-true-white hover:backdrop-blur-sm p-2 m-2 duration-700 ease-out {$page.url.pathname === navItem.href ? 'bg-true-white bg-opacity-10' : '' }">
                        <a href={navItem.href} class="font-regular content-center hover:text-true-whit ">
                            <div class="flex flex-row max-h-[35px]">
                                <div class="p-2">
                                    <img src={navItem.symbol} alt={navItem.title} class=" max-w-[26px]"/>
                                </div>
                                <div class="py-2 px-2">
                                    {navItem.title}
                                </div>
                            </div>
                        </a>
                    </li>
                    <!-- {/if} -->
                    
                {/each}
            </ul>
        </div>
    </div>
<!-- 	
{:else}
<div class="flex items-center max-w-[60px] {$page.url.pathname === '/verify' ? ' hidden' : ''} {$page.url.pathname === '/register' ? ' hidden' : ''} {$page.url.pathname === '/login' ? ' hidden' : ''} {$page.url.pathname === '/reset-password' ? ' hidden' : ''} {$page.url.pathname === '/waitlist' ? ' hidden' : ''} {$page.url.pathname === '/thanks-bro' ? ' hidden' : ''} {$page.url.pathname === '/whoops' ? ' hidden' :'' }">
    <div class="hover:-translate-y-0.5 transition ease-in-out md:mt-1.5 mt-1">
        <button class="btn bg-gray-300 bg-opacity-10 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm ml-4 mt-4 md:ml-2 md:text-md md:mt-4 md:h-[2rem] border-none normal-case drop-shadow-2xl" on:click={toggleDrawer}>
            +
        </button>
    </div>
</div>
{/if} -->