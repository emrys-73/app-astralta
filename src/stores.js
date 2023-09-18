/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
import { writable } from 'svelte/store';

// Drawer store
export const drawerOpen = writable(false);

// Toggle store
export const toggleTalk = writable(true);

// Experience Engine - Mark I
export const experience = writable("")

export const textTrainining = writable("");

// 0: personal assistant
// 1: tutor
// 2: emotional support 

export const personality = writable(0);

// User appearance
export const darkMode = writable(true);

// GPT Mode
export const gpt4 = writable(false);

export const current_chat = writable({
    "id": undefined,
    "title": undefined,
})


export const chatCount = writable(0);


export const header = writable("Astralta") 


export const publicUrl = writable("/");

export const bg = writable("forest");

export const back = writable("bg-[url('/bg/forest.png')]");

// This is a temp store while creating the agent to balance the workload
export const newAgentData = writable();



// New useful stuff

export const lastUrl = writable("/");

export const showActionBar = writable(true);

export const actionIslandData = writable([
    {
        title: 'Home',
        href: '/',
        icon: {
                "d" : "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25",
            }
    },
]);