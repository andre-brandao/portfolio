<script lang="ts">
   import BarChart from '$lib/d3/bar-chart.svelte';
   import DonutChar from '$lib/d3/donut-chart.svelte';
   import Contribuitions3D from '$lib/git3d/Contribuitions.svelte';

   import { eeCounter } from '$lib/stores';
   import type { Contributions } from '$lib/types';
   import { onMount } from 'svelte';
   let user = 'andre-brandao';
   let year = '2023';

   let selected_user = user;
   let selected_year = year;

   let contributions: Contributions[] = [];

   let data: { x: string; y: number }[] = [];

   onMount(async () => {
      // $scaleY = 1;
      const response = await fetch(`api/git/andre-brandao/2023`);
      contributions = await response.json();
      console.log(contributions);
      data = mapDataToGraphs(contributions);
   });

   async function getContributions() {
      const response = await fetch(`api/git/${user}/${year}`);
      contributions = await response.json();
      console.log(contributions);
      data = mapDataToGraphs(contributions);
   }

   function mapDataToGraphs(contributions: Contributions[]) {
      const result = new Map<string, number>();
      // console.log(contributions);

      for (const row of contributions) {
         for (const day of row) {
            if (day?.name === undefined) {
               continue;
            }

            if (result.has(day.name)) {
               const currentValue = result.get(day.name);
               result.set(day.name, currentValue! + day.count);
            } else {
               result.set(day.name, day.count);
            }
         }
      }
      // console.log(result);

      const daysOfWeekOrder = [
         'Sunday',
         'Monday',
         'Tuesday',
         'Wednesday',
         'Thursday',
         'Friday',
         'Saturday',
      ];
      const sortedResult = daysOfWeekOrder.map((dayName) => ({
         x: dayName,
         y: result.get(dayName) || 0, // Default to 0 if the day doesn't exist in contributions
      }));
      console.log(sortedResult);
      return sortedResult;
   }
</script>

<div class="flex">
   <p>Try your GitHub account:</p>
   <input type="text" bind:value={user} />
   <input type="text" bind:value={year} />
   <button
      on:click={() => {
         selected_user = user;
         selected_year = year;
         console.log(selected_user, selected_year);
         getContributions();
         eeCounter.found('Try your GitHub account on stats');
      }}>Refresh Map</button
   >
</div>
<div class="graph-wrap">
   {#key contributions}
      <Contribuitions3D git_data={contributions} />
      {#key data}
         {#if data.length > 1}
            <BarChart {data} />
            <DonutChar {data} />
         {/if}
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

   .graph-wrap {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 10px;
   }

   input{
      width: 1fr;
      padding: 5px;
      border-radius: 5px;
      border: 1px solid var(--text-1);
      

      background-color: var(--border);
      color: var(--text-1);
   }
</style>
