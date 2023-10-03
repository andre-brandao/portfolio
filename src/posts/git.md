---
title: 3D Git Contribuitions Graph
description: 3D threlte visualization of my git contribuitions.
date: '2023-4-14'
categories:
  - sveltekit
  - svelte
  - git
  - threlte
published: true
---

<script>

  import Contribuitions from '$lib/git3d/Contribuitions.svelte'
</script>

## Table of Contents

## Git 3D Contribuitions Graph

<Contribuitions/>

# How was it made?

Im using the github contribuitions api to get the html and then parse it to get the data I need.


```ts
async function getContributions({ user, year }: RouteParams) {
	let api = `https://github.com/users/${user}/contributions?from=${year}-12-01&to=${year}-12-31`

	const isCurrentYear = new Date().getFullYear().toString() === year

	if (isCurrentYear) {
		const date = new Date().toLocaleDateString('en-CA')
		const month = date.split('-')[1]
		api = `https://github.com/users/${user}/contributions?from=${year}-${month}-01&to=${date}`
	}

	try {
		const response = await fetch(api)

		if (!response.ok) {
			throw new Error(`Failed to fetch: ${response.status}`)
		}

		return await response.text()
	} catch (e) {
		throw new Error(`Something went wrong: ${e}`)
	}
}
```