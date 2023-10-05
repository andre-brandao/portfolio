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

<Contribuitions/>

## How was it made?

Im using the github contribuitions api to get the html and then parse it to get the data I need.

A fullscreen version of the graph can be found [here](/git3dgraph)

The full code for the API can be found [here](https://github.com/andre-brandao/portfolio/blob/main/src/routes/api/git/%5Buser%5D/%5Byear%5D/%2Bserver.ts)

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

Then I use threlte a three.js wrapper for svelte to render the 3d scene.

```svelte
<Grid infiniteGrid sectionColor="#4a4b4a" sectionSize={20} cellSize={20} fadeDistance={400} />

<T.PerspectiveCamera makeDefault position={[10, 500, 300]} fov={60}>
 <OrbitControls enableDamping autoRotate />
</T.PerspectiveCamera>

<T.AmbientLight  intensity={0.4} />
<T.DirectionalLight position={[0, 200, 200]} intensity={2}  />
<T.DirectionalLight position={[0, 200, -200]}  intensity={2} />

<Align auto position.y={100}>
 {#each contributions as row, i}
  {#each row as day, j}
   {#if day}

            {@const color = getColor(day.level)}
            {@const y = normalize(day.count)}

    <T.Group position={[0, 0, 12 * i]} scale.y={$scaleY}>
     <T.Mesh position={[12 * j, y / 2, 0]}>
      <T.BoxGeometry args={[10, y, 10]} />
      <T.MeshStandardMaterial {color}/>
     </T.Mesh>
    </T.Group>
   {/if}
  {/each}
 {/each}
</Align>
```
