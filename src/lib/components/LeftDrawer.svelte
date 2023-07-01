<script>
    import { page } from '$app/stores'

    // This is some ugly ass way to code it but works
    // If I ever hire someone, pls fix it
    // ty
    let openDrawer = false;
    $: openDrawer;

    const toggleDrawer = () => {
        openDrawer = !openDrawer;
    }

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

</script>

<!-- Extra safety here but a little redundance. Might wanna clean the code later -->
<div class="drawer max-w-[400px] {openDrawer ? 'drawer-open' : 'drawer-closed'} {$page.url.pathname === '/register' ? ' hidden' : ''} {$page.url.pathname === '/verify' ? ' hidden' : ''} {$page.url.pathname === '/login' ? ' hidden' : ''} {$page.url.pathname === '/reset-password' ? ' hidden' : ''} {$page.url.pathname === '/thanks-bro' ? ' hidden' : ''} {$page.url.pathname === '/whoops' ? ' hidden' : ''}">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col items-center justify-center">
      <!-- Page content here -->
      <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
    
    </div> 
    <div class="drawer-side ">
      <label for="my-drawer-2" class="drawer-overlay"></label> 
      <ul class="menu p-4 w-80 h-full bg-black bg-opacity-40  text-base-content border-r-[0.25px] border-r-true-black">
        <div class="w-full p-2 flex">
            <h3 class="text-true-white text-3xl font-bold pb-4 pt-1.5">
                Launchpad
            </h3>
            <!-- <div>
                open drawer: {openDrawer}
            </div> -->
            <button class="btn bg-gray-300 bg-opacity-10 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-md border-none normal-case absolute right-4 drop-shadow-2xl " on:click={toggleDrawer}>
                <div class="px-1.5 font-regular">
                    Less
                </div>
            </button>
        </div>
        {#each navigation as navItem}
            {#if navItem.title === 'My AI'}
            <li class=" hover:bg-true-white hover:bg-opacity-0 my-0.5 rounded-3xl text-true-white hover:drop-shadow-2xl hover:backdrop-blur-sm">
                
                <a href={navItem.href} class="font-regular text-md text-[13pt] h-[55px] content-center hover:text-true-white {$page.url.pathname === navItem.href ? 'bg-true-white bg-opacity-10' : ''} ">
                    <img src={navItem.symbol} alt={navItem.title} class="max-w-[30px] px-1"/>
                    {navItem.title}
                </a>
            </li>
            {/if}
            
        {/each}
      </ul>
    
    </div>
  </div>
  {#if !openDrawer}
  <div class="pl-4 pt-6 absolute z-50 {$page.url.pathname === '/register' ? ' hidden ' : ''} {$page.url.pathname === '/verify' ? ' hidden' : ''} {$page.url.pathname === '/login' ? ' hidden' : ''} {$page.url.pathname === '/reset-password' ? ' hidden' : ''} {$page.url.pathname === '/waitlist' ? ' hidden' : ''} {$page.url.pathname === '/thanks-bro' ? ' hidden' : ''} {$page.url.pathname === '/whoops' ? ' hidden' : ''} ">
    <button class="btn bg-gray-300 bg-opacity-10 hover:bg-opacity-20 hover:bg-gray-300 rounded-full text-true-white font-semibold btn-md border-none normal-case drop-shadow-2xl " on:click={toggleDrawer}>
        <div class="px-1.5 font-regular">
            More
        </div>
    </button>
  </div>
  {/if}