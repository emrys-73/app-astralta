<script lang='ts'>
	import { AppShell } from '@skeletonlabs/skeleton';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores'
	import { onMount } from 'svelte';
	// The ordering of these imports is critical to your app working properly
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { LeftDrawer, SideBarLeft } from '$lib/components';
	export let data; // to accept that data property
	import { getImageURL } from "$lib/utils";
	import { drawer } from '../stores';
	import { error } from '@sveltejs/kit';

	let isOpen = false;
    $: isOpen;

    const drawerOpen = () => {
        if (!isOpen) {
            drawer.open()
            isOpen = true;
        }
    }

    const drawerClose = ()  => {
        if (isOpen) {
            drawer.close()
            isOpen = false;
        }
    }

    const resetDrawer = () => {
        drawer.reset()
        isOpen = false;
    }


    const toggleDrawer  = ()  => {
        switch (isOpen) {
            case true:
                drawerClose()
                break;
            case false:
                drawerOpen()
                break;
            default:
                resetDrawer()
                break;
        }
    }

    onMount(() => {
        // Ensures to set both states to false
        resetDrawer()

        function handleKeyDown(event: { metaKey: any; key: string; ctrlKey: any; }) {
            if (event.metaKey && event.key === 'x') {
                toggleDrawer()
            }
            if (event.ctrlKey && event.key === 'x') {
                toggleDrawer()
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        const img = new Image();
        img.onload = () => {
            imageIsLoaded = true;
        };
        img.onerror = () => {
            imageSrc = `https://ui-avatars.com/api/?name=${data.user?.name}`;
            imageIsLoaded = true;
        };
        img.src = data.user?.avatar ? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar) : `https://ui-avatars.com/api/?name=${data.user?.name}`;
        if(img.complete) imageIsLoaded = true;

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    })

    // Ensure image loading before displaying

    let imageIsLoaded = false;
    let imageSrc = "";


</script>

<!-- <Drawer>
	<SideBarLeft />
</Drawer> -->
<!-- <AppShell class="bg-[url('home.png')] bg-image"> -->
<AppShell class="bg-[url('/home.png')] bg-image">
	<!-- This was an attempt to have a gradient on the header - didnt work -->
	<!-- <div class="h-full w-full bg-gradient-to-b from-black absolute top-0 left-0 opacity-80 -z-10">
	</div> -->

	<!-- (header) -->
	<svelte:fragment slot="sidebarLeft">
		<LeftDrawer/>
	</svelte:fragment>
	
	<!-- (sidebarRight) -->
	<svelte:fragment slot="pageHeader">
		<div class="w-full flex h-[70px] backdrop-blur-sm {$page.url.pathname === '/register' ? ' hidden' : ''} {$page.url.pathname === '/verify' ? ' hidden' : ''} {$page.url.pathname === '/login' ? ' hidden' : ''} {$page.url.pathname === '/reset-password' ? ' hidden' : ''} {$page.url.pathname === '/waitlist' ? ' hidden' : ''} {$page.url.pathname === '/thanks-bro' ? ' hidden' : ''} {$page.url.pathname === '/whoops' ? ' hidden' : ''}">
			
			<div class="grow text-center text-lg sm:text-xl md:text-2xl lg:text-3xl text-true-white font-bold uppercase pt-5 sm:pt-5 md:pt-4 ">
				<a href="/"> ASTRALTA </a>
			</div>
			{#if !data.user}
			<div class="pr-4 flex flex-row">
                <a href="/waitlist">
					<div class="pl-2 z-50">
						<div class="hover:-translate-y-0.5 transition ease-in-out md:mt-0.5">
							<button class="btn bg-true-white bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm ml-4 mt-4 md:ml-2 md:text-md md:mt-4 md:h-[2rem] border-none normal-case drop-shadow-2xl">
								Join Waitlist
							</button>
						</div>
					</div>
				</a>
				<a href="/login">
					<div class="hover:-translate-y-0.5 transition ease-in-out md:mt-0.5">
						<button class="btn bg-true-white bg-opacity-10 backdrop-blur-xl hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-sm ml-4 mt-4 md:ml-2 md:text-md md:mt-4 md:h-[2rem] md:w-16 border-none normal-case drop-shadow-2xl">
							Log In
						</button>
					</div>
				</a>
				

			</div>
			
            
            {:else}
			<div class="dropdown dropdown-end">
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label tabindex="0" class="btn bg-transparent border-none hover:bg-transparent active:border-none avatar w-20 mt-1.5 lg:mt-0.5">
                    <div class=" rounded-full w-[35px] lg:w-[45px]">
                        <!-- <img src={data.user?.avatar ? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar) : 
                            `https://ui-avatars.com/api/?name=${data.user?.name}`
                        } alt="avatar" id="avatar-preview"> -->
<!-- 
                                            <img
                        src={data.user?.avatar ? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar) : 
                            `https://ui-avatars.com/api/?name=${data.user?.name}`
                        }
                        alt="avatar"
                        id="avatar-preview"
                        class="{!imageIsLoaded ? 'hidden' : ''}"
                    > -->
                    {#if imageIsLoaded}
                    <img src={imageSrc} alt="avatar" id="avatar-preview">
                    {/if}

                    </div>
                </label>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <ul
                    tabindex="0"
                    class="menu menu-compact dropdown-content mt-0 p-2 mr-6 shadow rounded-xl bg-true-black bg-opacity-50 text-true-white drop-shadow backdrop-blur-md  hover:text-true-white z-50"
                >
                    <li>
                        <a href="/my/profile" class="justify-between hover:text-true-white">Profile</a>
                    </li>
                    <li>
                        <a href="/my/account" class="justify-between hover:text-true-white">Account</a>
                    </li>
					<li>
                        <a href="/my/security" class="justify-between hover:text-true-white">Security</a>
                    </li>
                    <li>
                        <!-- calls the server POST to clear the cookies -->
                        <form action="/logout" method="POST" class="text-true-white hover:text-true-white">
                            <button type="submit" class="w-full text-start hover:text-true-white">Logout</button>
                        </form>
                    </li>
                </ul>
            </div>
			{/if}
			
		</div>
		<!-- <div class="w-full h-[80px] bg-black text-center flex">
			<div class="text-true-white font-bold text-3xl pt-6">
				ASTRALTA
			</div>
			<div class="avatar">
				<div class="avatar placeholder">
					<div class="bg-neutral-focus text-neutral-content rounded-full w-12">
					  <span>MX</span>
					</div>
				</div> 
		</div> -->
	</svelte:fragment>
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<!-- <svelte:fragment slot="pageFooter">
		Page Footer
	</svelte:fragment> -->
	<!-- (footer) -->
</AppShell>
