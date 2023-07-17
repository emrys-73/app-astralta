import { writable } from 'svelte/store';

// Drawer store
export const drawerOpen = writable(false);

// Toggle store
export const toggleTalk = writable(true);

// Experience Engine - Mark I
export const experience = writable("You are Jarvis, Iron Man's asistant");

export const textTrainining = writable("");


// This part lets you eprsonalise the greeting to your own name.
// export const ironman = writable("Adrian");