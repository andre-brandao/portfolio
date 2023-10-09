<script lang="ts">
   import type { Contributions } from '$lib/types.ts';
   import { Canvas } from '@threlte/core';
   import Scene from '$lib/git3d/Scene.svelte';

   export let git_data: Contributions[] = [];
   // export let user = 'andre-brandao'
   // export let year = '2023'
</script>

<div class="scene">
   <Canvas>
      <!-- <Scene user={user} year={year}/> -->
      <Scene contributions={git_data} />
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
