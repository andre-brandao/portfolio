<script lang="ts">
	import { formatDate } from '$lib/utils';
	import * as config from '$lib/config';

	export let data;
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<!-- Posts -->
<section>
	<ul class="posts">
		{#each data.posts as post}
			<a href={post.slug}>
				<li class="post">
					<p class="title">{post.title}<p/>
					<p class="date">{formatDate(post.date)}</p>
					<p class="description">{post.description}</p>
				</li>
			</a>
		{/each}
	</ul>
</section>

<style>
	a {
		text-decoration: none;
	}
	.posts {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(25rem, 1fr));
		gap: 2rem;
	}
	
	.post {
		/* max-inline-size: var(--size-content-2); */
		background-color: var(--surface-4);
		padding: var(--size-7);
		border-radius: var(--size-3);
		box-shadow: var(--shadow-4);

		/* give it a min height */
		min-block-size: 400px;

	}
	/* when hover post it gets bigger*/
	.post:hover {
		background-color: var(--surface-1);
		transition: background-color 0.2s ease-in-out;


	}

	.post:not(:last-child) {
		border-bottom: 1px solid var(--border);
		padding-bottom: var(--size-7);
	}

	.title {
		font-size: var(--font-size-fluid-3);
		text-transform: capitalize;
	}

	.date {
		color: var(--text-2);
	}

	.description {
		margin-top: var(--size-3);
	}
</style>
