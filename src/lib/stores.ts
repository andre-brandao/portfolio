import { writable } from 'svelte/store';

function createEECounter() {
	const { subscribe, set, update } = writable<string[]>([]);

	// const ee = ['custom-themes', 'your-git-3d'];

	// empty array to store found ee

	return {
		subscribe,
		found: (foundEE: string) => {
			update((ee) => {
                
                if (ee.includes(foundEE)) {
                    return ee;
				}
                
                console.log('found a ee:' + foundEE);
				ee = [...ee, foundEE];
				console.log(ee);
				return ee;
			});
		},
		reset: () => set([])
		// increment: () =>
		// update((n) => n+1),
		// decrement: () => update((n) => n - 1),
		// reset: () => set(0)
	};
}

export const eeCounter = createEECounter();
