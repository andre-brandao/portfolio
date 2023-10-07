<script lang="ts">
	import { theme, setCustomTheme } from '$lib/theme';
	//import type theme
	import type { Theme } from '$lib/theme';

	//create a function to change the theme

</script>

<!-- select theme -->
<select
	bind:value={$theme}
	on:change={(e) => {

        // TODO improve this shit code

        //@ts-ignore
		const newTheme = e.target?.value;
		switch (newTheme) {
			case 'light':
				setCustomTheme('light');

				break;

			case 'dark':
				setCustomTheme('dark');

				break;

			case 'custom-1':
				setCustomTheme('custom-1');

				break;

			case 'custom-2':
				setCustomTheme('custom-2');

				break;

			case 'custom-3':
				setCustomTheme('custom-3');

				break;

			case 'custom-4':
				setCustomTheme('custom-4');

				break;

			default:
				break;
		}

		console.log(newTheme);
	}}
>
	<option value="light">Light</option>
	<option value="dark">Dark</option>
	<option value="custom-1">C1</option>
	<option value="custom-2">C2</option>
	<option value="custom-3">C3</option>
	<option value="custom-4">C4</option>
</select>

<style>
    select {
    background: var(--surface-1);
    
    }
</style>