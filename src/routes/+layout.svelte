<script lang="ts">
   import type { LayoutData } from './$types';

   export let data: LayoutData;

   import 'open-props/style';
   import 'open-props/normalize';
   import 'open-props/buttons';

   import Header from '$lib/components/header.svelte';
   import Footer from '$lib/components/footer.svelte';
   import PageTransition from '$lib/components/transition.svelte';

   import Notification from '$lib/components/notification.svelte';

   import '../app.css';

   import { afterNavigate } from '$app/navigation';
   import { Trophy } from 'lucide-svelte';

   afterNavigate(() => {
      for (const node of document.querySelectorAll('pre > code')) {
         const button = document.createElement('button');
         button.className = 'copy-button';
         const svgIcon = document.createElement('img');
         svgIcon.src = 'copy-icon.svg';
         svgIcon.alt = 'Copy';
         button.appendChild(svgIcon);
         button.onclick = () => navigator.clipboard.writeText(node.textContent ?? '');

         node.parentNode?.prepend(button);
      }
   });
</script>

<div class="layout">
   <Header />
   <main>
      <PageTransition url={data.url}>
         <slot />
      </PageTransition>
   </main>
   <Footer />
</div>

<Notification let:payload duration={5000}>
   <span>
      <Trophy />
      {payload}
   </span>
</Notification>

<style>
   span {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      background-color: var(--surface-3);
      border-top-left-radius: 0.5rem;
      color: var(--brand);
      /* display: block; */
      position: fixed;
      bottom: 0;
      right: 0;
      padding: 2.5rem;
      box-shadow: var(--shadow-3);
   }
   .layout {
      /* height: 100%; */
      max-inline-size: 1440px;
      /* display: grid;
		grid-template-rows: auto 1fr auto; */
      margin-inline: auto;
   }

   main {
      padding-top: var(--size-11);
   }
</style>
