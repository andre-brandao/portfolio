<script lang="ts">
	import type { Contributions } from '$lib/types';

	import BarChart from '$lib/d3/bar-chart.svelte';
	import DonutChart from '$lib/d3/donut-chart.svelte';
	import ScatterChart from '$lib/d3/scatter-chart.svelte';

	import { onMount } from 'svelte';

	let data: { x: string; y: number }[] = [];
	$: scatterData = [
		{
			id: 'scatter',
			data: data,
		},
	];

	onMount(async () => {
		const response = await fetch(`api/git/andre-brandao/2023`);
		const contributions = await response.json();
		// console.log(contributions);
		data = sumCountsPerDayOfWeek(contributions);
		console.log(data);
	});

	function sumCountsPerDayOfWeek(contributions: Contributions[]) {
		const result = new Map<string, number>();
		console.log(contributions);

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
		console.log(result);

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

		return sortedResult;
	}
</script>

{#if data.length > 0}
	<DonutChart {data} />
	<BarChart {data} />
	<!-- <ScatterChart data={scatterData} /> -->
{/if}
