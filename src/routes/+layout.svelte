<script lang='ts'>
	import { AppShell } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores'
	// The ordering of these imports is critical to your app working properly
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { LeftDrawer, Header } from '$lib/components';
	export let data; // to accept that data property
	import { getImageURL } from "$lib/utils";
</script>


<AppShell class="bg-black bg-opacity-30">
	<!-- (header) -->
	<svelte:fragment slot="sidebarLeft">
		<LeftDrawer/>
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<svelte:fragment slot="pageHeader">
		<div class="w-full flex  h-[80px] bg-transparent {$page.url.pathname === '/register' ? ' hidden' : ''} {$page.url.pathname === '/verify' ? ' hidden' : ''} {$page.url.pathname === '/login' ? ' hidden' : ''} {$page.url.pathname === '/reset-password' ? ' hidden' : ''} {$page.url.pathname === '/waitlist' ? ' hidden' : ''} {$page.url.pathname === '/thanks-bro' ? ' hidden' : ''} {$page.url.pathname === '/whoops' ? ' hidden' : ''}">
			<div class="flex-none w-[78px] ">
				<!-- This div should totally be used to fix the padding -->
			</div>
			
			<div class="grow text-center text-3xl text-true-white font-bold uppercase pt-8 {!data.user ? 'ml-[200px]' : ''}">
				<a href="/"> ASTRALTA </a>
			</div>
			{#if !data.user}
			<div class="pr-4 flex flex-row">
				<a href="/login">
					<div class="pl-4 pt-6 z-50">
						<button class="btn bg-gray-300 bg-opacity-10 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-md border-none normal-case drop-shadow-2xl ">
							<div class="px-1.5 font-regular">
								Log In
							</div>
						</button>
					</div>
				</a>
				<a href="/register">
					<div class="pl-4 pt-6 z-50">
						<button class="btn bg-gray-300 bg-opacity-10 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-md border-none normal-case drop-shadow-2xl ">
							<div class="px-1.5 font-regular">
								Register
							</div>
						</button>
					</div>
				</a>

			</div>
			
			<a href="/login">
				<div class="dropdown dropdown-end ">
					<div class="pl-4 pt-6 absolute z-50 {$page.url.pathname === '/register' ? ' hidden ' : ''} {$page.url.pathname === '/verify' ? ' hidden' : ''} {$page.url.pathname === '/login' ? ' hidden' : ''} {$page.url.pathname === '/reset-password' ? ' hidden' : ''} {$page.url.pathname === '/waitlist' ? ' hidden' : ''}">
						<button class="btn bg-gray-300 bg-opacity-10 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-md border-none normal-case drop-shadow-2xl ">
							<div class="px-1.5 font-regular">
								Log In
							</div>
						</button>
					  </div>
				</div>
			</a>
			<a href="/register">
				<div class="dropdown dropdown-end ">
					<div class="pl-4 pt-6 absolute z-50 {$page.url.pathname === '/register' ? ' hidden ' : ''} {$page.url.pathname === '/verify' ? ' hidden' : ''} {$page.url.pathname === '/login' ? ' hidden' : ''} {$page.url.pathname === '/reset-password' ? ' hidden' : ''} {$page.url.pathname === '/waitlist' ? ' hidden' : ''} {$page.url.pathname === '/thanks-bro' ? ' hidden' : ''} {$page.url.pathname === '/whoops' ? ' hidden' : ''}">
						<button class="btn bg-gray-300 bg-opacity-10 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-md border-none normal-case drop-shadow-2xl ">
							<div class="px-1.5 font-regular">
								Register
							</div>
						</button>
					  </div>
				</div>
			</a>
            
            {:else}
			<div class="dropdown dropdown-end">
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <!-- svelte-ignore a11y-label-has-associated-control -->
                <label tabindex="0" class="btn bg-transparent border-none hover:bg-transparent active:border-none avatar w-20 mt-4">
                    <div class=" rounded-full">
                        <img src={data.user?.avatar ? getImageURL(data.user?.collectionId, data.user?.id, data.user?.avatar) : 
                            `https://ui-avatars.com/api/?name=${data.user?.name}`
                        } alt="avatar" id="avatar-preview">
                    </div>
                </label>
                <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
                <ul
                    tabindex="0"
                    class="menu menu-compact dropdown-content mt-0 p-2 mr-6 shadow rounded-xl bg-gray-500 bg-opacity-10 text-true-white drop-shadow backdrop-blur-md  w-64"
                >
                    <li>
                        <a href="/my/profile" class="justify-between">Profile</a>
                    </li>
                    <li>
                        <a href="/my/account" class="justify-between">Account</a>
                    </li>
					<li>
                        <a href="/my/security" class="justify-between">Security</a>
                    </li>
                    <li>
                        <!-- calls the server POST to clear the cookies -->
                        <form action="/logout" method="POST">
                            <button type="submit" class="w-full text-start">Logout</button>
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