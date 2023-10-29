---
title: WebRTC VideoCalls
description: Real time videocalls using WebRTC
date: '2023-10-29'
categories:
  - sveltekit
  - firebase
  - WebRTC

published: true
---

## Table of Contents

## Description
Try it for yourself, its alreafy live on vercel: [Site Link](https://svelte-rtc.vercel.app)

Git repo: [GitHub](https://github.com/andre-brandao/svelte-rtc/tree/main)
![img](meet.png)

## RTC store

[RTCCodeStore is too long to put here, you can find it here!!!](https://github.com/andre-brandao/svelte-rtc/blob/main/src/lib/rtc.ts)

[Googles RTC explanation here](https://webrtc.org/?hl=pt-br)

I made a svelte store with all WebRtc logic so its really easy to use in inside components, like this:

```svelte
<script lang="js">
 import Video from '$lib/Video.svelte';
 import { roomStore } from '$lib/rtc';
 import { onMount } from 'svelte';

 export let data;

 onMount(async () => {
  await roomStore.joinRoom(data.roomID);
 });
</script>

<div class="text-center font-bold text-5xl">
 <p>
  Current room is {$roomStore.roomId}
 </p>
</div>

<div class="flex flex-wrap justify-center gap-4">
 <div class="text-center font-bold bg-primary-500">
  <Video bind:src={$roomStore.localStream} muted={true} />
  <p>You</p>
 </div>
 <div class="text-center font-bold bg-secondary-500">
  <Video bind:src={$roomStore.remoteStream} />
  <p>Outro</p>
 </div>
</div>
```

