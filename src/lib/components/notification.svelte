<script context="module">
    // @ts-nocheck
   import { writable } from 'svelte/store';

   export const notifications = (() => {
      const { update, subscribe } = writable([]);
    //   @ts-ignore
      const push = (val) => update((arr) => [...arr, val]);
      const pop = () => update((arr) => (arr.shift(), arr));

      return {
         pop,
         push,
         subscribe,
      };
   })();
</script>

<script>
   import { createEventDispatcher } from 'svelte';

   export let duration = 1000;

   const dispatch = createEventDispatcher();
   /**
    * @type {boolean | NodeJS.Timeout}
    */
   let timeout;

   notifications.subscribe(({ length }) => {
      if (timeout || !length) return;

      dispatch('notify', $notifications[0]);

      timeout = setTimeout(() => {
         timeout = false;
         notifications.pop();
      }, duration);
   });
</script>

{#if $notifications[0]}
   <slot payload={$notifications[0]} />
{/if}
