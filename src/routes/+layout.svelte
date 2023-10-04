<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	import 'open-props/style';
	import 'open-props/normalize';
	import 'open-props/buttons';

	import Header from '$lib/components/header.svelte';
	import Footer from '$lib/components/footer.svelte';
	import PageTransition from '$lib/components/transition.svelte';

	import '../app.css';

	import { afterNavigate } from '$app/navigation';

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

<style>
	.layout {
		height: 100%;
		max-inline-size: 1440px;
		display: grid;
		grid-template-rows: auto 1fr auto;
		margin-inline: auto;
		padding-inline: var(--size-7);
	}

	main {
		padding-block: var(--size-9);
	}
	
	@media (min-width: 1440px) {
		.layout {
			padding-inline: 0;
		}
		main{
			margin-top: var(--size-8);
			
		}
	}
</style>
