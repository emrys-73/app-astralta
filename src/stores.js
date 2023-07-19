import { writable } from 'svelte/store';

// Drawer store
export const drawerOpen = writable(false);

// Toggle store
export const toggleTalk = writable(true);

// Experience Engine - Mark I
export const experience = writable("")

export const textTrainining = writable("");

// User appearance
export const darkMode = writable(true);