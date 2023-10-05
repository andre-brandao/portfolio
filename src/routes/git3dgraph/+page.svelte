<script lang="ts">
	import Contribuitions from '$lib/git3d/Contribuitions.svelte';

	let user = 'andre-brandao';
	let year = '2023';

	let selected_user = user;
	let selected_year = year;
</script>

<div class="flex">
	<p>try your git account:</p>
	<input type="text" bind:value={user} />
	<input type="text" bind:value={year} />
	<button
		on:click={() => {
			selected_user = user;
			selected_year = year;
			console.log(selected_user, selected_year);
		}}>refresh graph</button
	>
</div>
<div>
	{#key selected_user}
		{#key selected_year}
			<Contribuitions user={selected_user} year={selected_year} />
		{/key}
	{/key}
</div>

<style>
	.flex {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 10px;
	}
</style>
