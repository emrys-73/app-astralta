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

export const bg = writable("home");