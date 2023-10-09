import { writable } from 'svelte/store';
import { notifications } from './components/notification.svelte';

function createEECounter() {
	const { subscribe, set, update } = writable<string[]>([]);

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
				notifications.push('EE:'+foundEE);
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
