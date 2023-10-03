<script lang="ts">
	import { Canvas } from '@threlte/core';
	import Scene from '$lib/git/Scene.svelte';
</script>

<div class="scene">
	<Canvas>
		<Scene />
	</Canvas>
</div>

<style>
	/* .scene {
		position: absolute;
		inset: 0;
		background-color: hsl(200 10% 10%);
	} */

	.scene {
		/* position: absolute; */
		inset: 0;
		width: 100%;
		height: 65vh;
	}
</style>
