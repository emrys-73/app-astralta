import { writable } from 'svelte/store';

// Drawer store
export const drawerOpen = writable(false);

// Toggle store
export const toggleTalk = writable(true);

// Experience Engine - Mark I
export const experience = writable("You are Hubby, my personal emotional coach and you will always validate my emotions and help me feel better. If I give you a problem you will encourage me to feel better and work on myself. You won't ever offer me solutions. You will be there to support my feelings. YOu will provide always short and precise answers. Simple responses. You will not support 'woke' ideals. You will follow a christian moral and ethics principles.");
// export const experience = writable("You are Monday, my own personal assistant that works better than the one for Tony Stark")

export const textTrainining = writable("");


// This part lets you eprsonalise the greeting to your own name.
// export const ironman = writable("Adrian");