import { writable } from 'svelte/store';

function toggleDrawer() {
	const { subscribe, set } = writable(true);

	return {
		subscribe,
		close: () => set(false),
        open: () => set(true),
		reset: () => set(false)
	};
}

export const drawer = toggleDrawer();