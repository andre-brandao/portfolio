<script>
	import Toggle from '$lib/components/toggle.svelte';
	import * as config from '$lib/config';
</script>

<nav>
	<a href="/" class="title">
		<b>{config.title}</b>
	</a>

	<ul class="links">
		<li>
			<a href="/">Home</a>
		</li>
		<li>
			<a href="/about">About Me</a>
		</li>
		<li>
			<a href="/contact">Contact</a>
		</li>
		<!-- <li>
            <a href="/rss.xml" target="_blank">RSS</a>
        </li> -->
		<li>
			<a href="/git3dgraph">Git3D</a>
		</li>
	</ul>

	<Toggle />
</nav>

<style>
	nav {
		padding-block: var(--size-7);
		background-color: var(--border);
		padding-inline: var(--size-7);
	}

	.links {
		margin-block: var(--size-7);
	}

	a {
		color: inherit;
		/* text-decoration: none; */
	}

	@media (min-width: 768px) {
		nav {
			display: flex;
			justify-content: space-between;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			z-index: 1;			
		}

		.links {
			display: flex;
			gap: var(--size-7);
			margin-block: 0;
		}
	}
</style>
